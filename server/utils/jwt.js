import jwt from 'jsonwebtoken';
import db from '../db.js';

export const generateAccessToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email 
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  );
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

export const saveRefreshToken = async (userId, token) => {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
  
  await db('refresh_tokens').insert({
    user_id: userId,
    token,
    expires_at: expiresAt,
  });
};

export const deleteRefreshToken = async (token) => {
  await db('refresh_tokens').where({ token }).del();
};

export const deleteUserRefreshTokens = async (userId) => {
  await db('refresh_tokens').where({ user_id: userId }).del();
};