import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { IExtendedRequest, UserRole } from "./type";

/**
 * isLoggedIn – verifies the JWT token from the Authorization header.
 * Attaches a minimal user object (id, companyNumber, role) to req.user.
 */
const isLoggedIn = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ success: false, message: "Please provide token" });
    return;
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || "thisissecret",
    async (error, result: any) => {
      if (error) {
        res.status(403).json({ success: false, message: "Token invalid" });
        return;
      }

      const userData = await User.findByPk(result.id, {
        attributes: ["id", "role"],
      });

      if (!userData) {
        res
          .status(403)
          .json({ success: false, message: "Invalid token — user not found" });
        return;
      }

      console.log(`[isLoggedIn] id=${userData.id} role=${userData.role}`);

      req.user = {
        id: userData.id,
        role: userData.role as UserRole,
      };

      next();
    }
  );
};

/**
 * restrictTo – role-based access control middleware.
 * Usage: restrictTo(UserRole.ADMIN, UserRole.USER)
 */
const restrictTo = (...roles: UserRole[]) => {
  return (req: IExtendedRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role as UserRole;

    if (roles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "You don't have access to this resource",
      });
    }
  };
};

export { isLoggedIn, restrictTo };
