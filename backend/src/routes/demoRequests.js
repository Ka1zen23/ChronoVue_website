import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { query } from '../db/index.js';

export const demoRequestsRouter = Router();

const validate = [
  body('firstName').trim().notEmpty().isLength({ max: 100 }),
  body('lastName').trim().notEmpty().isLength({ max: 100 }),
  body('email').isEmail().normalizeEmail(),
  body('hospital').trim().notEmpty().isLength({ max: 255 }),
  body('bedsRange').optional().isLength({ max: 50 }),
  body('message').optional().trim().isLength({ max: 2000 }),
];

demoRequestsRouter.post('/', validate, async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const { firstName, lastName, email, hospital, bedsRange, message } = req.body;
    const result = await query(
      `INSERT INTO demo_requests (first_name, last_name, email, hospital, beds_range, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, created_at`,
      [firstName, lastName, email, hospital, bedsRange || null, message || null],
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    next(err);
  }
});
