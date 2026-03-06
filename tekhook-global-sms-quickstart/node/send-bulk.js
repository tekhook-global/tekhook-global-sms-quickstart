// send-bulk.js — Send a campaign to multiple recipients
// Docs: https://tekhook.co

require('dotenv').config();
const { TekHook } = require('./tekhook');

const client = new TekHook(process.env.TEKHOOK_API_KEY);

const recipients = [
  '+971585767831',
  '+919876543210',
  '+12025550187',
];

const message = '🔥 FLASH SALE! 50% OFF all plans for the next 6 hours. Use code: FLASH50 → tekhook.co/flash. Reply STOP to opt out.';

async function sendBulkCampaign() {
  console.log(`📤 Sending to ${recipients.length} recipients...`);

  const result = await client.sms.sendBulk({
    recipients,
    message,
    from: process.env.TEKHOOK_SENDER_ID || 'Tekhook',
  });

  console.log(`✅ Campaign dispatched!`);
  console.log(`   Batch ID   : ${result.batch_id}`);
  console.log(`   Accepted   : ${result.accepted}`);
  console.log(`   Rejected   : ${result.rejected}`);
}

sendBulkCampaign().catch((err) => {
  console.error('❌ Bulk send failed:', err.message);
  process.exit(1);
});
