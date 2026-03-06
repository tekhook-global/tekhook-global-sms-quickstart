// send-otp.js — Send a one-time password via Tekhook SMS
// Docs: https://tekhook.co

require('dotenv').config();
const { TekHook } = require('./tekhook');

const client = new TekHook(process.env.TEKHOOK_API_KEY);

function generateOTP(length = 6) {
  return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1)).toString();
}

async function sendOTP(phoneNumber) {
  const otp = generateOTP();

  console.log(`📤 Sending OTP to ${phoneNumber}...`);

  const result = await client.sms.send({
    to: phoneNumber,
    from: process.env.TEKHOOK_SENDER_ID || 'Tekhook',
    message: `Your verification code is: ${otp}. Valid for 10 minutes. Do not share this code.`,
  });

  console.log(`✅ OTP sent!`);
  console.log(`   Message ID : ${result.message_id}`);
  console.log(`   Status     : ${result.status}`);
  console.log(`   Delivery   : ~${result.delivery_time}`);

  // In production: store { otp, expiresAt } in your DB against the user
  return { otp, messageId: result.message_id };
}

// --- Run ---
sendOTP('+971585767831').catch((err) => {
  console.error('❌ Failed to send OTP:', err.message);
  process.exit(1);
});
