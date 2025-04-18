// Load environment variables
require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const session = require("express-session");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const Listing = require("./models/listing.js");
const User = require("./models/user.js");

// Using the exact connection string provided with database name
const MONGO_URL = "mongodb+srv://balajichandaka:Mongo25%40balaji@cluster0.lvial4t.mongodb.net/bookhaven";

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected to DB"))
    .catch(err => console.log("MongoDB connection error:", err));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || "supersecret",
    resave: false,
    saveUninitialized: false,
}));

// Middleware to check if the user is logged in
function isLoggedIn(req, res, next) {
    if (!req.session.userId) {
        return res.redirect("/login");
    }
    next();
}

// Basic routes
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/aboutus", (req, res) => {
    res.render("users/aboutus");
});

app.get("/contactus", (req, res) => {
    res.render("users/contactus");
});

// Signup Route
app.get("/signup", (req, res) => {
    res.render("users/signup");
});

app.post("/signup", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body;
    try {
        if (!username || !email || !password) {
            return res.render("users/signup", { errorMessage: "All fields are required" });
        }
        
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.render("users/signup", { 
                errorMessage: "Passwords do not match", 
                username, 
                email 
            });
        }
        
        console.log("Checking for existing user with email:", email);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render("users/signup", { 
                errorMessage: "Email already in use.",
                username
            });
        }
        
        console.log("Creating new user with username:", username);
        // Password will be hashed by the pre-save hook in the User model
        const newUser = new User({ username, email, password });
        await newUser.save();
        console.log("User saved successfully:", newUser._id);
        res.redirect("/login");
    } catch (error) {
        console.error("Error during signup:", error);
        return res.render("users/signup", { 
            errorMessage: "Error creating account: " + (error.message || "Unknown error"),
            username,
            email
        });
    }
});

// Login Route
app.get("/login", (req, res) => {
    res.render("users/login");
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("users/login", { errorMessage: "Invalid email or password" });
        }
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render("users/login", { errorMessage: "Invalid email or password" });
        }
        
        req.session.userId = user._id;
        res.redirect("/listings");
    } catch (error) {
        console.log(error);
        res.status(500).send("Error during login");
    }
});

// Forgot Password Route
app.get("/forgot-password", (req, res) => {
    res.render("users/forgot-password");
});

app.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.render("users/forgot-password", { errorMessage: "No account with that email exists." });
        }

        // Generate token
        const resetToken = crypto.randomBytes(32).toString("hex");
        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 3600000; // 1-hour expiry
        await user.save();

        // Email configuration
        // NOTE: Set these in environment variables for security
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER || "your-test-email@gmail.com",
                pass: process.env.EMAIL_PASS || "your-app-password",
            },
        });

        const resetUrl = `${process.env.APP_URL || 'http://localhost:8080'}/reset-password/${resetToken}`;

        // Send email
        await transporter.sendMail({
            to: user.email,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
        });

        res.render("users/forgot-password", { successMessage: "Password reset link sent to your email." });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error processing request.");
    }
});

// Reset Password Route
app.get("/reset-password/:token", async (req, res) => {
    const user = await User.findOne({
        resetToken: req.params.token,
        resetTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
        return res.render("users/reset-password", { errorMessage: "Invalid or expired token." });
    }

    res.render("users/reset-password", { token: req.params.token });
});

app.post("/reset-password/:token", async (req, res) => {
    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.render("users/reset-password", { 
                errorMessage: "Invalid or expired token.", 
                token: req.params.token 
            });
        }

        const { password, confirmPassword } = req.body;
        
        // Check if passwords match
        if (password !== confirmPassword) {
            return res.render("users/reset-password", { 
                errorMessage: "Passwords do not match.", 
                token: req.params.token 
            });
        }

        // Password will be hashed by the pre-save hook
        user.password = password;
        user.resetToken = undefined;
        user.resetTokenExpires = undefined;
        await user.save();

        res.redirect("/login");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error resetting password.");
    }
});

// Logout Route
app.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("Error during logout");
        res.redirect("/");
    });
});

// Listings Routes
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
});

app.get("/listings/new", isLoggedIn, (req, res) => {
    res.render("listings/new");
});

app.post("/listings", isLoggedIn, async (req, res) => {
    try {
        const newListing = new Listing(req.body);
        await newListing.save();
        res.redirect("/listings");
    } catch (error) {
        console.error("Error saving listing:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/listings/:id", async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/show", { listing });
});

app.get("/listings/:id/edit", isLoggedIn, async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    res.render("listings/edit", { listing });
});

app.put("/listings/:id", isLoggedIn, async (req, res) => {
    await Listing.findByIdAndUpdate(req.params.id, req.body.listing);
    res.redirect(`/listings/${req.params.id}`);
});

app.delete("/listings/:id", isLoggedIn, async (req, res) => {
    await Listing.findByIdAndDelete(req.params.id);
    res.redirect("/listings");
});

// Start Server
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
