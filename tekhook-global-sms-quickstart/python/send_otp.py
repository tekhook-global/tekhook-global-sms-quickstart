# send_otp.py — Send a one-time password via Tekhook SMS
# Docs: https://tekhook.co

import random
import os
from dotenv import load_dotenv
from tekhook import TekHook

load_dotenv()

client = TekHook()


def generate_otp(length: int = 6) -> str:
    return "".join([str(random.randint(0, 9)) for _ in range(length)])


def send_otp(phone_number: str) -> dict:
    otp = generate_otp()
    sender = os.environ.get("TEKHOOK_SENDER_ID", "Tekhook")

    print(f"📤 Sending OTP to {phone_number}...")

    result = client.sms.send(
        to=phone_number,
        message=f"Your verification code is: {otp}. Valid for 10 minutes. Do not share this code.",
        sender=sender,
    )

    print(f"✅ OTP sent!")
    print(f"   Message ID : {result['message_id']}")
    print(f"   Status     : {result['status']}")
    print(f"   Delivery   : ~{result.get('delivery_time', 'N/A')}")

    # In production: store otp + expiry in your database
    return {"otp": otp, "message_id": result["message_id"]}


if __name__ == "__main__":
    send_otp("+971585767831")
