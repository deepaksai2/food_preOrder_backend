import jwt from "jsonwebtoken";
import config from "../config/env.js";

export const generateToken = (user) => {
  return jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role
    },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpiresIn || "1d"
    }
  );
};
