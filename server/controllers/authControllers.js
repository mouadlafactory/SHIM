const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const multer = require("multer");
const session = require("express-session");
const User = require("../models/User");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const ErrorHandler = require("../utils/ErrorHandler");


router.use(express.static("uploads"));

router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());
router.use(
  session({
    secret: "Mouad",
    resave: false,
    saveUninitialized: true,
  })
);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const JWT_SECRET = process.env.JWT_SECRET || "Mouad";

router.post("/login",
  [
    body("email").notEmpty().withMessage("Username is required").trim(),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 6 characters long")
      .escape(),
  ],
  async (req, res, next) => {
    console.log(req.body);
    const { email, password } = req.body;
    let button = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const register = req.session.register || undefined;
      const username = req.session.username || undefined;
      return res.render("users/login.ejs", {
        errors: errors.array(),
        error: undefined,
        register,
        username,
      });
    }

    try {
      var user = await User.findOne({ email: email });
    } catch (err) {
      console.error("Error fetching blog data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
    console.log("user : ", user);
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log("JWT_SECRET: ", JWT_SECRET);
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: "2h" }
      );
      res.cookie("token", token, { httpOnly: true });
      res.redirect("/users");
    } else {
      const register = req.session.register || undefined;
      const username = req.session.username || undefined;
      let error = "User not found , Try again";
      res.render("users/login.ejs", {
        errors: undefined,
        error: error,
        register,
        username,
      });
    }
  }
);

router.post("/create-user", upload.single("image"), async (req, res) => {
    try {
        var {
            firstName,
            lastName,
            age,
            gender,
            email,
            phone,
            username,
            password,
            birthDate,
            image,
            address,
          } = req.body;
        const userEmail = await User.findOne({ email });
    
        if (userEmail) {
          return next(new ErrorHandler("User already exists", 400));
        }
    
        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
          folder: "avatars",
        });
    
        const user = {
          name: name,
          email: email,
          password: password,
          avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
        };
    
        const activationToken = createActivationToken(user);
    
        const activationUrl = `http://localhost:3000/activation/${activationToken}`;
    
        try {
          await sendMail({
            email: user.email,
            subject: "Activate your account",
            message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
          });
          res.status(201).json({
            success: true,
            message: `please check your email:- ${user.email} to activate your account!`,
          });
        } catch (error) {
          return next(new ErrorHandler(error.message, 500));
        }
      } catch (error) {
        return next(new ErrorHandler(error.message, 400));
      }
  
    var errors = validationResult(req);


  var image = `/${req.file.originalname}`;
  console.log("image :::::::: ", image);


  console.log(image , " " , username)
  console.log("password : ",password);
  var password = await bcrypt.hash(password, 10);

  
  console.log("hashedpw : ",password);

  if (!errors.isEmpty()) {
    return res.render("users/register.ejs", {
      errors: errors.array(),
    });
  }

  try {
    const count = await User.countDocuments({});
    console.log('Number of documents in the collection:', count);
      try {
        // Create a new user instance
        const newUser = new User({
          id: count+1,
          firstName,
          lastName,
          age,
          gender,
          email,
          phone,
          username,
          password,
          birthDate,
          image,
          address,
          blog: [],
        });
        // Save the new user to the database
        await newUser.save();
        req.session.register = true;
        req.session.username = username;
        console.log(username);
        res.redirect("/login");
      } catch (err) {
        console.error("Error fetching blog data:", err);
        res.status(500).json({ error: "Internal Server Error" });
      }
  } catch (err) {
    console.error('Error counting documents:', err);
  }
   
      

});

router.get("/logout", (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
