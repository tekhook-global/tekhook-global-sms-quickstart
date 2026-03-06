// webhook-handler.js — Receive delivery receipts and inbound SMS replies
// Configure your webhook URL in the Tekhook Dashboard → Settings → Webhooks
// Docs: https://tekhook.co

require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

// POST /webhook/delivery — Tekhook calls this when a message is delivered
app.post('/webhook/delivery', (req, res) => {
  const { message_id, status, to, delivered_at, error_code } = req.body;

  if (status === 'delivered') {
    console.log(`✅ [${message_id}] Delivered to ${to} at ${delivered_at}`);
  } else if (status === 'failed') {
    console.warn(`❌ [${message_id}] Failed to ${to} — error: ${error_code}`);
    // TODO: trigger retry logic or fallback channel here
  } else {
    console.log(`ℹ️  [${message_id}] Status update: ${status}`);
  }

  res.sendStatus(200); // Always respond 200 quickly
});

// POST /webhook/inbound — Tekhook calls this when a user replies
app.post('/webhook/inbound', (req, res) => {
  const { from, to, message, received_at } = req.body;

  console.log(`📩 Inbound from ${from}: "${message}"`);

  if (message.trim().toUpperCase() === 'STOP') {
    console.log(`🚫 Opt-out request from ${from} — unsubscribe from your list.`);
    // TODO: remove from your marketing list
  } else if (message.trim().toUpperCase() === 'HELP') {
    console.log(`ℹ️  Help request from ${from}`);
    // TODO: send help reply
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Webhook listener running on port ${PORT}`);
  console.log(`   Delivery receipts : POST http://localhost:${PORT}/webhook/delivery`);
  console.log(`   Inbound replies   : POST http://localhost:${PORT}/webhook/inbound`);
  console.log(`\n   Tip: Use ngrok to expose locally → ngrok http ${PORT}`);
});
