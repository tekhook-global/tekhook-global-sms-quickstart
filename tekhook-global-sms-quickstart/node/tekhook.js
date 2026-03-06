// tekhook.js — Lightweight Tekhook API wrapper
// Full API docs: https://tekhook.co

const BASE_URL = 'https://api.tekhook.co/v1';

class SMSClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async send({ to, message, from }) {
    const res = await fetch(`${BASE_URL}/sms/send`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, message, from }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Tekhook API error: ${err.message || res.statusText}`);
    }

    return res.json();
  }

  async sendBulk({ recipients, message, from }) {
    const res = await fetch(`${BASE_URL}/sms/bulk`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recipients, message, from }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(`Tekhook API error: ${err.message || res.statusText}`);
    }

    return res.json();
  }
}

class TekHook {
  constructor(apiKey) {
    if (!apiKey) throw new Error('TEKHOOK_API_KEY is required');
    this.sms = new SMSClient(apiKey);
  }
}

module.exports = { TekHook };
