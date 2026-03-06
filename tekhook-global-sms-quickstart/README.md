# 📱 Tekhook SMS Quickstart

![Tekhook](https://img.shields.io/badge/Tekhook-SMS%20API-blue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js)
![Python](https://img.shields.io/badge/Python-3.8%2B-yellow?style=for-the-badge&logo=python)
![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)

> Send your first SMS in under 2 minutes using the [Tekhook SMS API](https://tekhook.co) — 190+ countries, sub-2s delivery, 99.9% uptime.

---

## What's in This Repo

| Example | Description |
|---------|-------------|
| `send-otp` | Generate and send a one-time password |
| `send-bulk` | Send a message to a list of recipients |
| `transactional` | Order confirmation / alert message |
| `webhook-handler` | Receive delivery receipts and inbound replies |

---

## Prerequisites

- A free Tekhook account → [Sign up here](https://tekhook.co) (includes **1,000 free SMS credits**)
- Your API key from the [Tekhook Dashboard](https://tekhook.co/dashboard)
- Node.js 18+ **or** Python 3.8+

---

## ⚡ 60-Second Quickstart

### Node.js

```bash
git clone https://github.com/tekhook/tekhook-sms-quickstart.git
cd tekhook-sms-quickstart/node
npm install
cp .env.example .env          # add your API key
node send-otp.js
```

### Python

```bash
cd tekhook-sms-quickstart/python
pip install -r requirements.txt
cp .env.example .env          # add your API key
python send_otp.py
```

---

## Environment Variables

Create a `.env` file (see `.env.example`):

```env
TEKHOOK_API_KEY=your_api_key_here
TEKHOOK_SENDER_ID=Tekhook        # your registered sender ID
```

---

## Examples

### Send an OTP (Node.js)

```js
const { TekHook } = require('./tekhook');

const client = new TekHook(process.env.TEKHOOK_API_KEY);

const otp = Math.floor(100000 + Math.random() * 900000);

const result = await client.sms.send({
  to: '+971585767831',
  message: `Your Tekhook verification code is: ${otp}. Valid for 10 minutes.`,
  from: process.env.TEKHOOK_SENDER_ID,
});

console.log(`✅ Sent! Message ID: ${result.message_id}`);
```

### Handle Delivery Receipts (Webhook)

```js
app.post('/webhook/delivery', (req, res) => {
  const { message_id, status, delivered_at } = req.body;
  console.log(`Message ${message_id} → ${status} at ${delivered_at}`);
  res.sendStatus(200);
});
```

---

## Folder Structure

```
tekhook-sms-quickstart/
├── node/
│   ├── tekhook.js          # Lightweight API wrapper
│   ├── send-otp.js
│   ├── send-bulk.js
│   ├── transactional.js
│   ├── webhook-handler.js
│   ├── package.json
│   └── .env.example
├── python/
│   ├── tekhook.py          # Lightweight API wrapper
│   ├── send_otp.py
│   ├── send_bulk.py
│   ├── transactional.py
│   ├── webhook_handler.py
│   └── requirements.txt
└── README.md
```

---

## API Reference

All examples call `https://api.tekhook.co/v1/sms/send`. Full API docs → [docs.tekhook.co](https://tekhook.co)

| Parameter | Type | Description |
|-----------|------|-------------|
| `to` | string | Recipient phone number (E.164 format) |
| `message` | string | SMS body text |
| `from` | string | Sender ID or number |

---

## More Tekhook Quickstarts

- 🟢 [tekhook-whatsapp-node](https://github.com/tekhook/tekhook-whatsapp-node) — WhatsApp Business API
- 💬 [tekhook-rcs-examples](https://github.com/tekhook/tekhook-rcs-examples) — Rich Communication Services
- 📧 [tekhook-email-quickstart](https://github.com/tekhook/tekhook-email-quickstart) — Transactional Email API
- 🔐 [tekhook-verify-quickstart](https://github.com/tekhook/tekhook-verify-quickstart) — Multi-channel OTP Verification

---

## Support

- 📖 [Documentation](https://tekhook.co)
- 💬 [WhatsApp Support](https://wa.me/971585767831)
- 🐛 [Open an Issue](https://github.com/tekhook/tekhook-sms-quickstart/issues)

---

> Built with ❤️ by the [Tekhook](https://tekhook.co) team.
