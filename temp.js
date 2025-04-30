let CIF = 100000000;
let BCD = 10000000;
let SWS = 1000000;
let AIDC = 1000000;
let ADD = 2000000;
let Safeguard = 1000000;
let CVD = 2000000;
let IGST = 20000000;
let Total_duties_of_customs_other_than_IGST = 17000000;
let Total_duties_of_customs_including_IGST = 37000000;
let EO_for_EPCG = 222000000;

function safeParseFloat(value) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

function safeParseFloat(value) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return isNaN(parseFloat(value.replace(/,/g, "")))
    ? 0
    : parseFloat(value.replace(/,/g, ""));
}



function CalculateNPV(Value, rateOfInterest, years) {
  let E = 0;
  for (let i = 0; i <= safeParseFloat(rateOfInterest); i++) {
    if (E == 0) {
      E = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      E = E * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
  }
  return Math.round(Value / E);
}
// let number = CalculateNPV(17000000, 9, 10);

function safeParseFloat(value) {
    const parsed = parseFloat(value);
    return isNaN(parsed) ? 0 : parsed;
  }
  
  function CalculateNPVwithGrowthRate(
    value,              // Initial value of raw material
    rateOfInterest,     // Annual discount/interest rate (percent)
    growthRate,         // Annual growth of raw material value (percent)
    years,              // Number of years to project
    conversionOfRaw     // Conversion factor (e.g., number of productive days)
  ) {
    let totalNPV = 0;
    let currentRawValue = safeParseFloat(value);
  
    const interestRateDecimal = safeParseFloat(rateOfInterest) / 100;
    const growthRateDecimal = safeParseFloat(growthRate) / 100;
    const conversionFactor = safeParseFloat(conversionOfRaw) / 365;
  
    for (let year = 1; year <= safeParseFloat(years); year++) {
      const benefit = currentRawValue * conversionFactor * interestRateDecimal;
      const discountFactor = Math.pow(1 + interestRateDecimal, year);
      const npv = benefit / discountFactor;
  
      totalNPV += npv;
  
      console.log(`Year ${year}: Benefit = ₹${benefit.toFixed(2)}, NPV = ₹${npv.toFixed(2)}`);
  
      // Apply growth to raw value for next year
      currentRawValue *= (1 + growthRateDecimal);
    }
  
    console.log("✅ Final NPV of Raw Material:", totalNPV.toFixed(2));
    return totalNPV;
  }
  
CalculateNPVwithGrowthRate(
  17000000,
  9,
  5,
  10,
  60
);

// console.log(number);
