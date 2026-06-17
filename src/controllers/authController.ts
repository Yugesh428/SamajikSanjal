import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, UserRole } from "../models/User";
import asyncErrorHandler from "../middleware/asyncErrorHandler";

// ── Helpers ────────────────────────────────────────────────────────────────

const signToken = (id: string): string =>
  jwt.sign({ id }, process.env.JWT_SECRET || "thisissecret", {
    expiresIn: "7d",
  });

// ── Controllers ────────────────────────────────────────────────────────────

/**
 * POST /api/auth/register
 * Body: { name, email, password, username? }
 */
export const register = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "name, email and password are required" });
      return;
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      res.status(409).json({ success: false, message: "Email already in use" });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      username: username ?? null,
      role: UserRole.USER,
    } as any);

    const token = signToken(user.id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  }
);

/**
 * POST /api/auth/login
 * Body: { email, password }
 */
export const login = asyncErrorHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "email and password are required" });
      return;
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    if (user.isBanned) {
      res
        .status(403)
        .json({ success: false, message: "Your account has been banned" });
      return;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = signToken(user.id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role,
        avatar: user.avatar,
      },
    });
  }
);

/**
 * GET /api/auth/me
 * Requires isLoggedIn middleware
 */
export const getMe = asyncErrorHandler(
  async (req: Request, res: Response) => {
    // req.user is attached by isLoggedIn middleware
    const userId = (req as any).user?.id;

    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }

    res.status(200).json({ success: true, user });
  }
);

/**
 * POST /api/auth/logout
 * JWT is stateless – instruct the client to discard the token.
 */
export const logout = asyncErrorHandler(
  async (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "Logged out successfully. Please remove the token on the client.",
    });
  }
);
