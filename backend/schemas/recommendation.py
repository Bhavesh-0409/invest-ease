from pydantic import BaseModel
from typing import Dict, List

class AssetAllocation(BaseModel):
    asset_class: str
    percentage: float
    amount: float

class InvestmentRecommendation(BaseModel):
    expected_return: str
    risk_level: str
    allocation: List[AssetAllocation]
    features: List[str]
    rationale: str

class RecommendationResponse(BaseModel):
    status: str
    recommendation: InvestmentRecommendation
    user_profile: Dict
