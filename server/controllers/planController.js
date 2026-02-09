import db from '../db.js';

export const getAllPlans = async (req, res, next) => {
  try {
    const plans = await db('plans').select('*').orderBy('price', 'asc');

    res.json({
      success: true,
      data: { plans },
    });
  } catch (error) {
    next(error);
  }
};

export const getPlanById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const plan = await db('plans').where({ id }).first();

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    res.json({
      success: true,
      data: { plan },
    });
  } catch (error) {
    next(error);
  }
};