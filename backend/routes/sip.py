# SIP calculation utilities

def calculate_sip_returns(monthly_amount, annual_return, years):
    """
    Calculate SIP returns using compound interest formula
    """
    monthly_return = annual_return / 12 / 100
    total_months = years * 12
    
    # Future Value of SIP
    future_value = monthly_amount * (((1 + monthly_return) ** total_months - 1) / monthly_return) * (1 + monthly_return)
    total_invested = monthly_amount * total_months
    total_returns = future_value - total_invested
    
    return {
        "future_value": future_value,
        "total_invested": total_invested,
        "total_returns": total_returns
    }

def generate_sip_projection(monthly_amount, annual_return, years):
    """
    TODO: Generate year-wise SIP projection
    - Year-wise investment and returns
    - Inflation adjustment
    - Tax implications
    """
    pass
