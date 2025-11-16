from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, Dict, Any
import uvicorn

app = FastAPI(title="InvestEase API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class UserDetails(BaseModel):
    age: int
    investment_amount: float
    risk_preference: str
    monthly_income: Optional[float] = None
    savings: Optional[float] = None
    time_horizon: Optional[str] = None
    investment_experience: Optional[str] = None
    financial_goals: Optional[str] = None
    monthly_expenses: Optional[float] = None

class SIPCalculation(BaseModel):
    monthly_amount: float
    expected_return: float
    time_period: float

# Routes
@app.get("/")
async def root():
    return {"message": "InvestEase API is running"}

@app.post("/api/recommend")
async def get_recommendation(user_details: UserDetails):
    """
    TODO: Implement ML-based recommendation logic
    Currently returns dummy data based on risk preference
    """
    risk_recommendations = {
        "Low": {
            "expected_return": "8-10%",
            "allocation": {
                "Fixed Deposits": 40,
                "Government Bonds": 30,
                "Debt Funds": 20,
                "Gold ETF": 10
            },
            "features": [
                "Capital protection",
                "Steady returns",
                "Low volatility",
                "Tax efficient options"
            ],
            "explanation": "This conservative portfolio is designed for investors who prioritize capital preservation over high returns. With 70% allocation to fixed-income securities (FDs and bonds), your investment is protected from market volatility. The remaining 30% in debt funds and gold ETF provides modest growth potential while maintaining stability. This approach is ideal for investors nearing retirement or those who cannot afford significant losses."
        },
        "Medium": {
            "expected_return": "10-12%",
            "allocation": {
                "Equity Funds": 40,
                "Debt Funds": 25,
                "Hybrid Funds": 20,
                "Gold ETF": 10,
                "FD": 5
            },
            "features": [
                "Balanced growth",
                "Moderate risk",
                "Diversified portfolio",
                "Professional management"
            ],
            "explanation": "This balanced portfolio offers the best of both worlds - growth potential through equity exposure (60% in equity and hybrid funds) while maintaining stability through debt instruments (30%). This diversified approach helps smooth out market volatility while targeting inflation-beating returns. The 10% gold allocation acts as a hedge against economic uncertainty, making this suitable for investors with a 5-10 year investment horizon."
        },
        "High": {
            "expected_return": "12-15%",
            "allocation": {
                "Equity Funds": 50,
                "Small Cap Funds": 25,
                "International Funds": 15,
                "Debt Funds": 10
            },
            "features": [
                "High growth potential",
                "Long-term wealth creation",
                "Market-linked returns",
                "Tax benefits available"
            ],
            "explanation": "This aggressive growth portfolio is designed for long-term wealth creation with 90% equity exposure across different market segments. The large allocation to small-cap funds (25%) and international funds (15%) provides exposure to high-growth opportunities. While this portfolio carries higher volatility, it has the potential to significantly outperform inflation over 10+ years. The minimal debt allocation (10%) provides some stability during market downturns. This strategy is ideal for young investors with high risk tolerance and long investment horizons."
        }
    }
    
    recommendation = risk_recommendations.get(user_details.risk_preference)
    if not recommendation:
        raise HTTPException(status_code=400, detail="Invalid risk preference")
    
    return {
        "status": "success",
        "recommendation": recommendation,
        "user_profile": user_details.dict()
    }

@app.get("/api/compare")
async def compare_plans():
    """
    TODO: Implement dynamic plan comparison
    Currently returns static comparison data
    """
    plans = [
        {
            "name": "Safe Growth Plan",
            "risk": "Low",
            "expected_return": "8-10%",
            "min_investment": 1000,
            "lock_in": "None",
            "tax_benefit": True
        },
        {
            "name": "Balanced Growth Plan",
            "risk": "Medium",
            "expected_return": "10-12%",
            "min_investment": 1000,
            "lock_in": "3 years",
            "tax_benefit": True
        },
        {
            "name": "Aggressive Growth Plan",
            "risk": "High",
            "expected_return": "12-15%",
            "min_investment": 1000,
            "lock_in": "5 years",
            "tax_benefit": True
        }
    ]
    
    return {"status": "success", "plans": plans}

@app.get("/api/report/pdf")
async def generate_pdf_report():
    """
    TODO: Implement PDF generation using reportlab or similar
    Currently returns placeholder response
    """
    return {
        "status": "success",
        "message": "PDF generation feature coming soon",
        "download_url": None
    }

@app.post("/api/ml/predict")
async def ml_prediction(user_details: UserDetails):
    """
    TODO: Implement ML model for investment prediction
    This would include risk assessment, return prediction, etc.
    """
    return {
        "status": "success",
        "message": "ML prediction feature coming soon",
        "prediction": None
    }

@app.post("/api/sip/calc")
async def calculate_sip(sip_data: SIPCalculation):
    """
    Calculate SIP returns based on input parameters
    """
    monthly_amount = sip_data.monthly_amount
    annual_return = sip_data.expected_return
    years = sip_data.time_period
    
    # Calculate SIP returns
    monthly_return = annual_return / 12 / 100
    total_months = years * 12
    
    # Future Value calculation
    future_value = monthly_amount * (((1 + monthly_return) ** total_months - 1) / monthly_return) * (1 + monthly_return)
    total_invested = monthly_amount * total_months
    total_returns = future_value - total_invested
    
    return {
        "status": "success",
        "calculation": {
            "future_value": round(future_value, 2),
            "total_invested": round(total_invested, 2),
            "total_returns": round(total_returns, 2),
            "monthly_amount": monthly_amount,
            "annual_return": annual_return,
            "time_period": years
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
