const express = require("express");
const router = express.Router();
const User = require("../models/user"); 
const bcrypt = require("bcrypt");

// Signup Route - Show form
router.get("/signup", (req, res) => {
    res.render("auth/signup");
});

// Signup Route - Handle form submission
router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send("Email already in use!");
        }

        // Hash password and save new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        // Store user in session
        req.session.userId = newUser._id;
        res.redirect("/listings");
    } catch (err) {
        console.error(err);
        res.redirect("/signup");
    }
});

// Login Route - Show form
router.get("/login", (req, res) => {
    res.render("auth/login");
});

// Login Route - Handle form submission
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send("Invalid email or password!");
        }

        // Store user session
        req.session.userId = user._id;
        res.redirect("/listings");
    } catch (err) {
        console.error(err);
        res.redirect("/login");
    }
});

// Logout Route
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/login");
    });
});

module.exports = router;
