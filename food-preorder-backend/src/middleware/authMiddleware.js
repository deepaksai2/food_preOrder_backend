import jwt from "jsonwebtoken";
import config from "../config/env.js";

export const authenticate = (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required"
      });
    }

    const token = header.split(" ")[1];

    const decoded = jwt.verify(token, config.jwtSecret);

    req.user = {
      id: decoded.userId,
      role: decoded.role
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token"
    });
  }
};
