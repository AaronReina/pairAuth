const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

let loginPromise = (req, user) => {
  return new Promise((resolve,reject) => {
    req.login(user, e => e? reject(e):resolve(user))
  })
}

router.post("/auth/login", (req, res, next)=>

passport.authenticate("local",(err, theUser , fail)=> {
  if (err) return res.status(500).json({ message: 'Something went wrong' });
  if (!theUser) return res.status(401).json(fail);
  loginPromise(req, theUser)
    .then(() => res.status(200).json(req.user))
    .catch(e => res.status(500).json({ message: e.message }));
}));



router.post("/auth/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const campus = req.body.campus;
  const course = req.body.course;
  if (username === "" || password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      campus,
      course
    });

    newUser.save()
    .then(user => loginPromise(req, user))
    .catch(err => {
      res.json({
        message:"Something goes Bad"
      })
    })
  });
});
router.get("/auth/loggedin", (req, res) => {
  const {user} = req;
  if(user){
    res.json({succes: "OK", user})
  }else{
    res.status(401).json({succes: "NO USER LOGGED IN"})
  }
});
router.get("/auth/logout", (req, res) => {
  req.logout();
  res.json({succes:"Done"});
});

module.exports = router;
