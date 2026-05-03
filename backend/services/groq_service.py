import os
import json
from groq import Groq

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def build_prompt(data: dict) -> str:
    profile = data.get("riskProfile", {})
    return f"""You are a clinical nutrition AI assistant helping families in rural Bolivia and Peru detect child health risks early.

PATIENT DATA:
- Age: {data.get('age')} months
- Weight: {data.get('weight')} kg
- Height: {data.get('height')} cm
- Energy level (1-5): {data.get('energy')}
- Heart rate: {data.get('heartRate')} BPM
- Breathing rate: {data.get('breathingRate')} breaths/min
- Capillary refill time: {data.get('perfusionTime')} seconds
- Conjunctiva paleness score (0-100): {data.get('conjunctivaScore')}
- Appetite (0=very low, 3=good): {data.get('appetite')}
- Fatigue (0=always, 3=rarely): {data.get('fatigue')}
- Dizziness (0=daily, 3=never): {data.get('dizziness')}
- Mood (0=very irritable, 3=happy): {data.get('mood')}

COMPUTED RISK PROFILE:
- Anemia risk: {profile.get('anemia')}%
- Malnutrition risk: {profile.get('malnutrition')}%
- General state risk: {profile.get('general')}%
- Overall status: {profile.get('overall')}
- Confidence: {profile.get('confidence')}%

Based on this data, generate exactly 3-4 specific, actionable nutritional recommendations for this child in rural Bolivia/Peru context. Focus on locally available foods and practical actions.

Respond ONLY with a valid JSON array, no markdown, no explanation:
[
  {{"title": "recommendation title", "desc": "detailed description with specific local foods or actions", "urgent": true/false}},
  ...
]
"""

async def get_ai_recommendations(data: dict) -> list[dict] | None:
    try:
        prompt = build_prompt(data)
        response = client.chat.completions.create(
            model="meta-llama/llama-4-scout-17b-16e-instruct",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=800,
            temperature=0.3,
        )
        content = response.choices[0].message.content.strip()
        # Strip markdown fences if present
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        recommendations = json.loads(content)
        return recommendations
    except Exception as e:
        print(f"Groq error: {e}")
        return None
