from pydantic import BaseModel, validator
from typing import Optional
from enum import Enum

class RiskPreference(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"

class InvestmentExperience(str, Enum):
    BEGINNER = "Beginner"
    INTERMEDIATE = "Intermediate"
    ADVANCED = "Advanced"

class UserProfile(BaseModel):
    age: int
    investment_amount: float
    risk_preference: RiskPreference
    monthly_income: Optional[float] = None
    savings: Optional[float] = None
    time_horizon: Optional[str] = None
    investment_experience: Optional[InvestmentExperience] = None
    financial_goals: Optional[str] = None
    monthly_expenses: Optional[float] = None
    
    @validator('age')
    def validate_age(cls, v):
        if v < 18 or v > 100:
            raise ValueError('Age must be between 18 and 100')
        return v
    
    @validator('investment_amount')
    def validate_investment_amount(cls, v):
        if v < 1000:
            raise ValueError('Minimum investment amount is ₹1,000')
        return v
