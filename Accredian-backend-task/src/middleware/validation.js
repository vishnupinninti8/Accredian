export const validateReferral = (req, res, next) => {
  console.log('Raw request body:', JSON.stringify(req.body)); // Debug log

  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({
      success: false,
      message: 'Invalid request body format'
    });
  }

  // Extract and trim all fields
  const fields = {
    referrerName: req.body.referrerName?.trim(),
    referrerEmail: req.body.referrerEmail?.trim(),
    friendName: req.body.friendName?.trim(),
    friendEmail: req.body.friendEmail?.trim(),
    courseName: req.body.courseName?.trim()
  };

  console.log('Processed fields:', fields); // Debug log

  // Check if any field is missing or empty
  const missingFields = Object.entries(fields)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing required fields: ${missingFields.join(', ')}`
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(fields.referrerEmail) || !emailRegex.test(fields.friendEmail)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  // Attach cleaned fields to request
  req.body = fields;
  next();
};
