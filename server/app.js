const express = require('express');
const session = require('express-session');
// const redis = require('redis');
// const redisStore = require('connect-redis')(session);
// const client = redis.createClient();
const config = require('./config');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
const commentRoutes = require('./routes/comment');
const ingredientRoutes = require('./routes/ingredient');

const app = express();

// app.use(session({
//   secret: config.secret['SECRET'],
//   // create new redis store.
// //   store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 260 }),
// //   saveUninitialized: false,
// //   resave: false,
// //   cookie: {
// //     maxAge: 1000 * 60 * 60, // 1h in ms
// //     secure: false, // send cookie over http for development purposes
// //     httpOnly: true, // JS cannot access the cookie
// // }
// }));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});

app.use("/auth", authRoutes);
app.use("/recipe", recipeRoutes);
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
app.use("/ingredient", ingredientRoutes);


app.listen(3000, () => {
  console.log(("Development server started at http://localhost:%d"), 3000);
  console.log("Press CTRL-C to stop\n");
});

module.exports = app;
