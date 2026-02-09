import bcrypt from 'bcryptjs';
import db from '../db.js';
import { registerSchema, loginSchema } from '../utils/validation.js';
import {
  generateAccessToken,
  generateRefreshToken,
  saveRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
  deleteUserRefreshTokens,
} from '../utils/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      error.isJoi = true;
      return next(error);
    }

    const { name, email, password } = value;

    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db('users')
      .insert({
        name,
        email,
        password: hashedPassword,
        role: 'user',
      })
      .returning(['id', 'name', 'email', 'role']);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await saveRefreshToken(user.id, refreshToken);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      error.isJoi = true;
      return next(error);
    }

    const { email, password } = value;

    const user = await db('users').where({ email }).first();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await saveRefreshToken(user.id, refreshToken);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token required',
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: 'Invalid refresh token',
      });
    }

    const storedToken = await db('refresh_tokens')
      .where({ token: refreshToken })
      .first();

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: 'Refresh token not found',
      });
    }

    const user = await db('users')
      .where({ id: decoded.id })
      .select('id', 'name', 'email', 'role')
      .first();

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found',
      });
    }

    await deleteRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    await saveRefreshToken(user.id, newRefreshToken);

    res.json({
      success: true,
      message: 'Token refreshed successfully',
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (refreshToken) {
      await deleteRefreshToken(refreshToken);
    }

    res.json({
      success: true,
      message: 'Logout successful',
    });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await db('users')
      .where({ id: req.user.id })
      .select('id', 'name', 'email', 'role')
      .first();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};