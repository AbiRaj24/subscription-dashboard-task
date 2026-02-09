import db from '../db.js';

export const subscribe = async (req, res, next) => {
  try {
    const { planId } = req.params;
    const userId = req.user.id;

    const plan = await db('plans').where({ id: planId }).first();

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: 'Plan not found',
      });
    }

    const existingSubscription = await db('subscriptions')
      .where({ user_id: userId, status: 'active' })
      .first();

    if (existingSubscription) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active subscription',
      });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + plan.duration);

    const [subscription] = await db('subscriptions')
      .insert({
        user_id: userId,
        plan_id: planId,
        start_date: startDate,
        end_date: endDate,
        status: 'active',
      })
      .returning('*');

    const subscriptionWithPlan = await db('subscriptions')
      .join('plans', 'subscriptions.plan_id', 'plans.id')
      .where('subscriptions.id', subscription.id)
      .select(
        'subscriptions.*',
        'plans.name as plan_name',
        'plans.price',
        'plans.features',
        'plans.duration'
      )
      .first();

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: { subscription: subscriptionWithPlan },
    });
  } catch (error) {
    next(error);
  }
};

export const getMySubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const subscription = await db('subscriptions')
      .join('plans', 'subscriptions.plan_id', 'plans.id')
      .where('subscriptions.user_id', userId)
      .where('subscriptions.status', 'active')
      .select(
        'subscriptions.*',
        'plans.name as plan_name',
        'plans.price',
        'plans.features',
        'plans.duration'
      )
      .first();

    if (!subscription) {
      return res.json({
        success: true,
        data: { subscription: null },
        message: 'No active subscription found',
      });
    }

    const currentDate = new Date();
    const endDate = new Date(subscription.end_date);

    if (currentDate > endDate && subscription.status === 'active') {
      await db('subscriptions')
        .where({ id: subscription.id })
        .update({ status: 'expired' });
      
      subscription.status = 'expired';
    }

    res.json({
      success: true,
      data: { subscription },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await db('subscriptions')
      .join('plans', 'subscriptions.plan_id', 'plans.id')
      .join('users', 'subscriptions.user_id', 'users.id')
      .select(
        'subscriptions.*',
        'plans.name as plan_name',
        'plans.price',
        'plans.features',
        'plans.duration',
        'users.name as user_name',
        'users.email as user_email'
      )
      .orderBy('subscriptions.created_at', 'desc');

    res.json({
      success: true,
      data: { subscriptions },
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const subscription = await db('subscriptions')
      .where({ user_id: userId, status: 'active' })
      .first();

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'No active subscription found',
      });
    }

    await db('subscriptions')
      .where({ id: subscription.id })
      .update({ status: 'cancelled' });

    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
    });
  } catch (error) {
    next(error);
  }
};