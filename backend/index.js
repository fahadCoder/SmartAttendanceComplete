
// import express from "express";
// import cors from "cors";
// import TeacherRoute from "./Routes/router.js";
// import session from "express-session";
// import cookieParser  from "cookie-parser";
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());


//   const sessionMiddleware = session({
//     secret: process.env.SESSION_SECRET || 'secret',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: false,
//       httpOnly: false,
//       maxAge: 3600000, // 1 hour
//     },
//   });
  
//   app.use(sessionMiddleware);
//   app.use(TeacherRoute);


// app.listen(5000, ()=> console.log('Server up and running...5000'));





// import express from "express";
// import cors from "cors";
// import TeacherRoute from "./Routes/router.js";
// import session from "express-session";
// import cookieParser  from "cookie-parser";

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(cookieParser());

// const sessionMiddleware = session({
//   secret: process.env.SESSION_SECRET || 'secret',
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     secure: false,
//     httpOnly: false,
//     maxAge: 3600000, // 1 hour
//   },
// });

// app.use(sessionMiddleware); // Use session middleware for all routes
// app.use((req, res, next) => {
//   console.log("from index file ",req.session);
//   next();
// });
// app.use(TeacherRoute);

// app.listen(5000, ()=> console.log('Server up and running...5000'));


// ----------------------------------------------------------------------------
import express from "express";
import cors from "cors";
import TeacherRoute from "./Routes/router.js";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 3600000, // 1 hour
  },
});

app.use(sessionMiddleware); // Use session middleware for all routes
app.use((req, res, next) => {
  console.log("from index file ",req.session);
  next();
});
app.use(TeacherRoute);

app.listen(5000, ()=> console.log('Server up and running...5000'));
