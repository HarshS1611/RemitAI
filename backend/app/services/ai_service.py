import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()


# initialize client
client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


async def detect_anomaly(transaction: dict) -> dict:
    """
    Uses Gemini to assign fraud risk score.

    Returns:
    {
        risk_score: float (0-1),
        reason: str
    }

    AI output is advisory only.
    """

    prompt = f"""
    You are a fintech fraud detection assistant.

    Analyse the following transaction and return ONLY JSON:

    {{
        "risk_score": float between 0 and 1,
        "reason": short explanation
    }}

    transaction:
    amount: {transaction.get("amount")}
    currency: {transaction.get("currency")}
    user_id: {transaction.get("user_id")}
    recipient_id: {transaction.get("recipient_id")}
    """

    try:

        response = client.models.generate_content(
            model="gemini-3-flash-preview",
            contents=prompt,
        )

        text = response.text.strip()

        parsed = json.loads(text)

        return parsed

    except Exception:

        # fallback rule-based logic if AI fails
        amount = float(transaction.get("amount", 0))

        if amount > 10000:

            return {
                "risk_score": 0.85,
                "reason": "High transaction amount"
            }

        return {
            "risk_score": 0.15,
            "reason": "Normal transaction"
        }