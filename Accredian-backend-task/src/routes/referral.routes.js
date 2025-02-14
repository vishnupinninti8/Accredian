import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { sendReferralEmail } from '../config/mail.config.js';
import { validateReferral } from '../middleware/validation.js';

const router = Router();
const prisma = new PrismaClient();

router.post('/refer', validateReferral, async (req, res) => {
  try {
    console.log('Received request body:', req.body); // Debug log
    const { referrerName, referrerEmail, friendName, friendEmail, courseName } = req.body;

    // Debug log before Prisma create
    console.log('Data being sent to Prisma:', {
      referrerName,
      referrerEmail,
      friendName,
      friendEmail,
      courseName
    });

    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        friendName,
        friendEmail,
        courseName
      }
    });

    await sendReferralEmail(friendName, friendEmail, referrerName, courseName);

    res.status(201).json({
      success: true,
      message: 'Referral submitted successfully',
      data: referral
    });
  } catch (error) {
    console.error('Error details:', error); // Debug log
    res.status(500).json({
      success: false,
      message: 'Failed to process referral',
      error: error.message
    });
  }
});

export default router;
