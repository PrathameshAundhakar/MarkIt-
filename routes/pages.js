const express = require("express");
const router = express.Router();
const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require('express-validator');

router.get("/", async (req, res, next) => {
    res.render("index");
});



router.get("/signup", (req, res, next) => {

    res.render("signup");
});

router.get("/login", async (req, res, next) => {
    res.render("login");
});

router.get("/notePage", async (req, res, next) => {
    res.render("notePage");
});

router.post('/login', async (req, res, next) => {
    const { email, password: Npassword } = req.body;
    if (!email || !Npassword) {
        req.flash('error', "Please Enter your email and password");
        res.render('login', { messages: req.flash() });
        return;
    }
    else {
        db.query('SELECT * FROM users WHERE email= ?', [email], async (err, result) => {
            if (err) throw err;
            if (!result.length || !await bcrypt.compare(Npassword, result[0].password)) {
                req.flash('error', "Incorrect Email or password");
                res.render('login', { messages: req.flash() });
                return;
            }
            else {
                // console.log(result[0].username)
                const username = result[0].username;
                db.query('SELECT * from notes where username= ?', [username], (err, results) => {
                    if (err) throw err
                    else {
                        res.render("notepage", { data: results });
                        // console.log(results);
                    }

                });
            }
        });
    }
});

router.post('/signup', [
    body('email').trim().isEmail().withMessage('Email must be a valid email').normalizeEmail().toLowerCase(),
    body('password').trim().isLength(2).withMessage('Username length too short, min 5 char required'),
    body('password').trim().isLength(2).withMessage('Password length short, min 2 char required'),
    body('password2').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password do not match');
        }
        return true;
    })
], async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        errors.array().forEach(error => {
            req.flash('error', error.msg)
        });
        res.render('signup', { messages: req.flash() });
        return;
    }

    const { email, username: username, password: Npassword } = req.body;
    if (!email || !Npassword) {
        res.flash('error', "Please Enter your email and password");
        res.render('signup', { messages: req.flash() });
        return;
    }
    else {
        db.query('SELECT email FROM users WHERE email= ?', [email], async (err, result) => {
            if (err) throw err;
            if (result[0]) {
                req.flash('error', "Email has already been registered");
                res.render('signup', { messages: req.flash() });
                return;
            }
            else {
                const password = await bcrypt.hash(Npassword, 8);
                db.query('INSERT INTO users SET ?', { email: email, username: username, password: password }, (error, results) => {
                    if (error) throw error;
                    req.flash('success', `Registered succesfully, you can now login`);
                    db.query('INSERT INTO notes SET ?', { email: email, username: username, note1: "Hello", note2: "# Better hello", note3: "Even better hello", note4: "Best Hello" }, (error, results) => {
                        if (error) throw error;
                    });



                    res.render('signup', { messages: req.flash() });
                    return;
                    // res.send({ status: "success", success: "User has been registered" });
                });
            }
        });
    }
});

router.post("/update", async (req, res, next) => {
    const { text, username, email, note1, note2, note3, note4 } = req.body;
    // console.log(username);
    db.query('UPDATE notes SET ? where username = ?', [{ note1: note1, note2: note2, note3: note3, note4: note4, }, username], (error, result) => {
        if (error) throw error;
    });
    var ret = [];
    db.query('SELECT * from notes where username= ?', [username], (err, results) => {
        if (err) throw err
        else {
            Object.keys(results).forEach(function (key) {
                ret = results[key];
            });
            // console.log("HI" + ret.email);
            db.query('UPDATE notes SET ? where username = ?', [{ note1: ret.note1, note2: ret.note2, note3: ret.note3, note4: ret.note4, }, username], (error, result) => {
                if (error) throw error;
            });
            res.render("notepage", { data: results });
            // console.log(results);
        }
    });

    // res.render('notePage', { username });
});



module.exports = router; 