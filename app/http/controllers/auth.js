const User = require("../../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const passport = require("passport");
function authcontroller() {
  return {
    login(req, res) {
      res.render("auth/login", { error: false });
    },
    postlogin(req, res, next) {
      const Error = validationResult(req);
      if (!Error.isEmpty()) {
        let err = Error.array()[0].msg;
        return res.render("auth/login", { error: err });
      }
      passport.authenticate("local", (err, user, info) => {
        if (user == false) {
          res.render("auth/login", { error: info.message });
          next();
        } else {
          // if (!user) {
          //   res.render("auth/login", { error: info.message });
          //   //res.redirect("/login");
          // }

          req.logIn(user, (err) => {
            if (err) {
              res.render("auth/login", { error: info.message });
              next(err);
            } else {
              res.redirect("/");
            }
          });
        }
      })(req, res, next);
    },
    register(req, res) {
      res.render("auth/register", { error: false, name: false, email: false });
    },
    async postregister(req, res) {
      const { name, email, password } = req.body;
      // validate request
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        let error = JSON.stringify(errors.array()[0].msg);
        res.render("auth/register", { error, name, email });
      }

      User.exists(email, async (err, result) => {
        if (result) {
          res.render("auth/register", { error: "Email Already taken" });
        }
        const hashpassword = await bcrypt.hash(password, 10);
        const user = new User({
          name: name,
          email: email,
          password: hashpassword,
        });

        user
          .save()
          .then((User) => {})
          .catch((err) => {
            res.render("auth/register", { error: err });
          });
      });
      return res.redirect("/");
    },
    logout(req, res) {
      req.logout();
      return res.redirect("/login");
    },
  };
}

module.exports = authcontroller;
