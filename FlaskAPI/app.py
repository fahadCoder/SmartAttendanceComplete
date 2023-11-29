from flask import Flask, request, jsonify
import cv2
from PIL import Image
from numpy import asarray, expand_dims
import pickle
from keras_facenet import FaceNet
import numpy as np
import os
from os import listdir
# import rarfile
# # transferLearning model unique libraries
# import io
# from keras.models import load_model
# import shutil
# import zipfile
# from werkzeug.utils import secure_filename
# import os
# import base64
# from io import BytesIO
# import imghdr
# --------------------------------for new model--------------------------------
from flask import Flask, request, jsonify
from PIL import Image
import numpy as np
from keras_facenet import FaceNet
# from sklearn.preprocessing import Normalizer
# from sklearn.preprocessing import LabelEncoder
from sklearn.preprocessing import LabelEncoder, Normalizer

from sklearn.svm import SVC
import joblib
from mtcnn import MTCNN
# ---------------------------------
from tqdm import tqdm
from sklearn.metrics import accuracy_score

app = Flask(__name__)

# Load the trained model and embeddings
HaarCascade = cv2.CascadeClassifier(cv2.samples.findFile(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'))

# with open('data.pkl', 'rb') as f:
#     database = pickle.load(f)

# with open('Daaata.pkl', 'rb') as f:
#     database = pickle.load(f)

MyFaceNet = FaceNet()
keras_model = MyFaceNet.model

# for new model----------------------------------------------------------------------
# Load the FaceNet model
MyFaceNet = FaceNet()
model = MyFaceNet.model

# Load the label encoder classes
label_classes = np.load('label_encoder_classes.npy')
# Load the normalizer
normalizer = joblib.load('normalizer.pkl')
# Load the SVM model
svm_model = joblib.load('svm_model.pkl')

# Load the normalizer scale from pickle file
with open('normalizer.pkl', 'rb') as f:
    normalizer = joblib.load(f)
# Face extraction function
def extract_face(image, required_size=(160, 160)):
    pixels = np.asarray(image)
    
    detector = MTCNN()
    results = detector.detect_faces(pixels)
    
    # Extract the bounding box from the first face
    x1, y1, width, height = results[0]['box']
    # Bug fix
    x1, y1 = abs(x1), abs(y1)
    
    x2, y2 = x1 + width, y1 + height
    
    face = pixels[y1:y2, x1:x2]
    
    image = Image.fromarray(face)
    image = image.resize(required_size)
    
    face_array = np.asarray(image)
    
    return face_array

# Face embedding function
def get_embedding(model, face_pixels):
    face_pixels = face_pixels.astype('float32')
    
    # Standardize pixel values across channels (global)
    mean, std = face_pixels.mean(), face_pixels.std()
    face_pixels = (face_pixels - mean) / std
    
    samples = np.expand_dims(face_pixels, axis=0)
    
    yhat = model.predict(samples)
    
    return yhat[0]

# Preprocess image and predict label
def preprocess_image(image, threshold):
    face = extract_face(image)
    face_embedding = get_embedding(MyFaceNet.model, face)
    face_embedding = np.expand_dims(face_embedding, axis=0)
    face_embedding = normalizer.transform(face_embedding)
    
    prediction_probabilities = svm_model.predict_proba(face_embedding)[0]
    max_probability = np.max(prediction_probabilities)
    predicted_label = label_classes[np.argmax(prediction_probabilities)]
    is_recognized = bool(max_probability >= threshold)
    
    return predicted_label, max_probability, is_recognized

@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found.'}), 400
    
    threshold = request.args.get('threshold', default=0.7, type=float)
    image = request.files['image']
    try:
        img = Image.open(image)
    except:
        return jsonify({'error': 'Invalid image file.'}), 400
    
    predicted_label, max_probability, is_recognized = preprocess_image(img, threshold)
   
    
    response = {
        'label': predicted_label,
        'accuracy': float(max_probability),
        'recognized': is_recognized
    }
    
    return jsonify(response)

# -------------------------------------Retrain Model---------------------
    # Face extraction function
def extract_face_Train(filename, required_size=(160, 160)):
    image = Image.open(filename)
    image = image.convert('RGB')
    pixels = np.asarray(image)
    
    detector = MTCNN()
    results = detector.detect_faces(pixels)
    
    # Extract the bounding box from the first face
    x1, y1, width, height = results[0]['box']
    # Bug fix
    x1, y1 = abs(x1), abs(y1)
    
    x2, y2 = x1 + width, y1 + height
    
    face = pixels[y1:y2, x1:x2]
    
    image = Image.fromarray(face)
    image = image.resize(required_size)
    
    face_array = np.asarray(image)
    
    return face_array

# Load faces from a directory
def load_faces(directory):
    faces = []
    for file_name in tqdm(os.listdir(directory)):
        path = os.path.join(directory, file_name)
        face = extract_face_Train(path)
        faces.append(face)
    return faces

# Load dataset from a directory
def load_dataset(directory):
    images, labels = [], []
    for folder in tqdm(os.listdir(directory)):
        path = os.path.join(directory, folder)
        
        if not os.path.isdir(path):
            continue
        
        faces = load_faces(path)

        print(f'Student: {folder}, Faces: {len(faces)}')

        label = [folder for _ in range(len(faces))]

        images.extend(faces)
        labels.extend(label)
        
    return np.asarray(images), np.asarray(labels)

# Train the model
def train_model():
    X_train, y_train = load_dataset('Dataset/')
    MyFaceNet = FaceNet()
    model = MyFaceNet.model

    trainX = []
    for pixels in tqdm(X_train):
        embedding = get_embedding(model, pixels)
        trainX.append(embedding)
    trainX = np.asarray(trainX)

    print('Train X:', trainX.shape)
    norm = Normalizer(norm='l2')

    trainX = norm.transform(trainX)

    label = LabelEncoder()

    trainy = label.fit_transform(y_train)

    svm_model = SVC(kernel='linear', probability=True)
    svm_model.fit(trainX, trainy)

    yhat_train = svm_model.predict(trainX)

    score_train = accuracy_score(trainy, yhat_train)

    print('Accuracy: train=%.3f' % (score_train*100))

    # Save the label encoder classes
    np.save('label_encoder_classes.npy', label.classes_)

    # Save the normalizer
    joblib.dump(norm, 'normalizer.pkl')
    
    # Save the SVM model
    joblib.dump(svm_model, 'svm_model.pkl')

 

# API endpoint to train the model
@app.route('/train', methods=['POST'])
def train():
    train_model()
    return jsonify({'message': 'Model trained successfully.'})


if __name__ == '__main__':
    app.run(debug=True)
