from fastapi import APIRouter
from models.schemas import AnalyzeRequest, AnalyzeResponse, Recommendation
from services.groq_service import get_ai_recommendations

router = APIRouter()

@router.post("/analyze", response_model=AnalyzeResponse)
async def analyze(request: AnalyzeRequest):
    data = request.model_dump()
    recommendations = await get_ai_recommendations(data)

    if recommendations:
        recs = [Recommendation(**r) for r in recommendations]
        return AnalyzeResponse(
            recommendations=recs,
            summary=f"AI analysis complete. Overall status: {request.riskProfile.overall if request.riskProfile else 'unknown'}.",
            aiEnhanced=True,
        )

    # Fallback offline recommendations if Groq fails
    fallback = [
        Recommendation(title="Add iron-rich foods", desc="Incorporate quinoa, lentils and spinach into daily meals.", urgent=False),
        Recommendation(title="Schedule pediatric appointment", desc="Consult a health professional to validate these results.", urgent=True),
        Recommendation(title="Monitor every 15 days", desc="Repeat this assessment regularly to track improvement.", urgent=False),
    ]
    return AnalyzeResponse(recommendations=fallback, summary="Offline fallback recommendations.", aiEnhanced=False)
