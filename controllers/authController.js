const User = require("../schemas/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES;
const JWT_EXPIRATION_NUM = process.env.JWT_EXPIRATION_NUM;
const NODE_ENV = process.env.NODE_ENV;
const { ErrorHandler } = require("../utils/ErrorHandler");

//Helper function
const encryptPw = async (password) => {
  return await bcrypt.hash(password, 12);
};

//jwt helper function
const makeJwt = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

//jwt token function
const sendToken = (user, statusCode, req, res) => {
  const token = makeJwt(user._id);
  const options = {
    expires: new Date(Date.now() + JWT_EXPIRATION_NUM),
    secure: NODE_ENV === "production",
    httpOnly: NODE_ENV === "production",
  };
  res.cookie("jwt", token, options);

  res.status(statusCode).json({
    status: "Success",
    token,
    user,
  });
};

//Signup controller
exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler(400, "Please enter an email and password."));
    }

    if (password.length < 5) {
      return next(
        new ErrorHandler(401, "Password must be at least 8 characters")
      );
    }

    const pw = await encryptPw(password);
    const newUser = await User.create({
      email,
      password: pw,
    });
    newUser.password = null;
    sendToken(newUser, 201, req, res);
  } catch (err) {
    return next(err);
  }
};

//Login contoller
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler(400, "Incorrect email or password"));
    }
    const compared = await bcrypt.compare(password, user.password);
    user.password = null;

    if (!compared) {
      return next(new ErrorHandler(400, "Incorrect email or password"));
    }

    sendToken(user, 200, req, res);
  } catch (err) {
    return next(err);
  }
};

//Logout controller
exports.logout = async (req, res, next) => {
  try {
    const options = {
      expires: new Date(Date.now + 10000),
      secure: NODE_ENV === "production",
      httpOnly: NODE_ENV === "production",
    };
    res.cookie("jwt", "expiredtoken", options);
    res.status(200).json({ status: "success" });
  } catch (err) {
    return next(err);
  }
};

//Check User controller
const decryptJWT = async (token) => {
  return await jwt.verify(token, JWT_SECRET);
};

exports.checkUserCred = async (req, res, next) => {
  try {
    let token;
    if (req.cookies) token = req.cookies.jwt;
    if (!token || token === "expiredtoken") {
      return next(
        new ErrorHandler(401, "User does not have valid credentials")
      );
    }

    const jwtInfo = await decryptJWT(token);
    console.log(jwtInfo);

    if (jwtInfo.exp < Date.now() / 1000) {
      return next(
        new ErrorHandler(401, "User does not have valid credentials")
      );
    }

    const user = await User.findById(jwtInfo.id);
    if (!user) {
      return next(new ErrorHandler(404, "User not found"));
    }

    res.status(200).json({ status: "success", user });
  } catch (err) {
    return next(err);
  }
};
