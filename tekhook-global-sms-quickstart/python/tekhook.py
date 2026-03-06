# tekhook.py — Lightweight Tekhook API wrapper for Python
# Full API docs: https://tekhook.co

import os
import requests

BASE_URL = "https://api.tekhook.co/v1"


class SMSClient:
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        })

    def send(self, to: str, message: str, sender: str = "Tekhook") -> dict:
        """Send a single SMS message."""
        response = self.session.post(
            f"{BASE_URL}/sms/send",
            json={"to": to, "message": message, "from": sender},
        )
        response.raise_for_status()
        return response.json()

    def send_bulk(self, recipients: list[str], message: str, sender: str = "Tekhook") -> dict:
        """Send an SMS to multiple recipients."""
        response = self.session.post(
            f"{BASE_URL}/sms/bulk",
            json={"recipients": recipients, "message": message, "from": sender},
        )
        response.raise_for_status()
        return response.json()


class TekHook:
    def __init__(self, api_key: str | None = None):
        api_key = api_key or os.environ.get("TEKHOOK_API_KEY")
        if not api_key:
            raise ValueError("TEKHOOK_API_KEY is required. Set it as an env var or pass it directly.")
        self.sms = SMSClient(api_key)
