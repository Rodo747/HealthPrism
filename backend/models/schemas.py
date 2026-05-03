from pydantic import BaseModel
from typing import Optional

class RiskProfile(BaseModel):
    anemia: int
    malnutrition: int
    general: int
    confidence: int
    overall: str

class AnalyzeRequest(BaseModel):
    age: Optional[float] = None
    weight: Optional[float] = None
    height: Optional[float] = None
    energy: Optional[int] = None
    heartRate: Optional[int] = None
    breathingRate: Optional[int] = None
    perfusionTime: Optional[float] = None
    conjunctivaScore: Optional[int] = None
    appetite: Optional[int] = None
    fatigue: Optional[int] = None
    dizziness: Optional[int] = None
    mood: Optional[int] = None
    riskProfile: Optional[RiskProfile] = None
    conjunctivaImage: Optional[str] = None
    handImage: Optional[str] = None

class Recommendation(BaseModel):
    title: str
    desc: str
    urgent: bool

class AnalyzeResponse(BaseModel):
    recommendations: list[Recommendation]
    summary: str
    aiEnhanced: bool
