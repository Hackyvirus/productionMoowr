let grossIntendedPeriod= 4;
let grossBCD= 10000000;
let grossAIDC = 1000000
let grossADD  =2000000
let grossSGD = 1000000
let grossCWD = 2000000
let  GrossSWS = grossBCD * 0.1;
let tatalDuty = grossBCD +grossAIDC+grossADD+grossSGD+grossCWD+GrossSWS;

let rateOfInterest = 9
function safeParseFloat(value) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return isNaN(parseFloat(value.replace(/,/g, "")))
    ? 0
    : parseFloat(value.replace(/,/g, ""));
}

function CalculateDuty(
  value1 = 0,
  value2 = 0,
  value3 = 0,
  value4 = 0,
  value5 = 0,
  value6 = 0
) {
  return (
    safeParseFloat(value1) +
    safeParseFloat(value2) +
    safeParseFloat(value3) +
    safeParseFloat(value4) +
    safeParseFloat(value5) +
    safeParseFloat(value6)
  );
}
function calculateDepreciationValueforFour (value,grossIntendedPeriod){
    let result = 0;
    console.log("value",value)
      for (let Q = 1; Q <= grossIntendedPeriod * 4; Q++) {
    if (Q >= 1 && Q <= 4) {
      P = 4;
      result += value * (P / 100);
    }}
    return result;
}
function calculateDepreciationValueforthree(value, grossIntendedPeriod,year) {
  let result = 0;
  for (let Q = 1; Q <= grossIntendedPeriod * 4; Q++) {
    if (Q >= 5 && Q <= 8 && year == 2) {
      let P = 3;
      result += value * (P / 100);
    }else if(Q >= 5 && Q <= 12 && year == 3){
      let P = 3;
      result += value * (P / 100);
    }
  }
  return result + calculateDepreciationValueforFour(value, grossIntendedPeriod)
}
function calculateDepreciationValueforthowfive(value, grossIntendedPeriod,year) {
  let result = 0;
  for (let Q = 1; Q <= grossIntendedPeriod * 4; Q++) {
    if (Q >= 13 && Q <= 16 && year == 4) {
      P = 2.5;
      result += value * (P / 100);
    } else if (Q >= 13 && Q <= 20 && year == 5) {
      P = 2.5;
      result += value * (P / 100);
    }
  }
  return result + calculateDepreciationValueforthree(value, grossIntendedPeriod,3)
}
function calculateDepreciationValuefortwo(value, grossIntendedPeriod,year){
  let result = 0;
  for (let Q = 1; Q <= grossIntendedPeriod * 4; Q++) {
      if (Q >= 21 && Q <= 24 && year == 6) {
        P = 2;
      result += value * (P / 100);
    }
      else if (Q >= 21 && Q <= 28 && year == 7) {
        P = 2;
      result += value * (P / 100);
    }
      else if (Q >= 21 && Q <= 32 && year == 8) {
        P = 2;
      result += value * (P / 100);
    }
      else if (Q >= 21 && Q <= 36 && year == 9) {
        P = 2;
      result += value * (P / 100);
    }
      else if (Q >= 21 && Q <= 40 && year == 10) {
        P = 2;
      result += value * (P / 100);
    }
  }
  return result + calculateDepreciationValueforthowfive(value, grossIntendedPeriod,5);
}

function calculateDepreciation(value,grossIntendedPeriod,year){
  let total;
  if(year == 1){
    total = calculateDepreciationValueforFour (value,grossIntendedPeriod)
  }else if(year == 2){
    total = calculateDepreciationValueforthree(value, grossIntendedPeriod,year)
  }else  if(year == 3){
   total =  calculateDepreciationValueforthree(value, grossIntendedPeriod,year)
  }
  else  if(year == 4){
    console.log("4")
   total =  calculateDepreciationValueforthowfive(value, grossIntendedPeriod,year)
  }
  else  if(year == 5){
    console.log("5")
   console.log("value",value)
   total =  calculateDepreciationValueforthowfive(value, grossIntendedPeriod,year)
   console.log("total",total)
  }
  else  if(year == 6){
   total =  calculateDepreciationValuefortwo(value, grossIntendedPeriod,year)
  }
  else  if(year == 7){
    total = calculateDepreciationValuefortwo(value, grossIntendedPeriod,year)
  }else  if(year == 8){
   total =  calculateDepreciationValuefortwo(value, grossIntendedPeriod,year)
  }
  else  if(year == 9){
   total =  calculateDepreciationValuefortwo(value, grossIntendedPeriod,year)
  }
  else  if(year == 10){
   total =  calculateDepreciationValuefortwo(value, grossIntendedPeriod,year)
  }
  return total;
}

function calculateDepreciation2(value, grossIntendedPeriod, year) {
  console.log("value",value)
  const depreciationRates = [
    { year: 1, from: 1, to: 4, rate: 4 },
    { year: 2, from: 5, to: 8, rate: 3 },
    { year: 3, from: 5, to: 12, rate: 3 },
    { year: 4, from: 13, to: 16, rate: 2.5 },
    { year: 5, from: 13, to: 20, rate: 2.5 },
    { year: 6, from: 21, to: 24, rate: 2 },
    { year: 7, from: 21, to: 28, rate: 2 },
    { year: 8, from: 21, to: 32, rate: 2 },
    { year: 9, from: 21, to: 36, rate: 2 },
    { year: 10, from: 21, to: 40, rate: 2 },
  ];

  let total = 0;

  // Always apply year 1 depreciation
  for (let Q = 1; Q <= Math.min(4, grossIntendedPeriod * 4); Q++) {
    total += value * (4 / 100);
  }
if (year == 1){
  return total;
}
// console.log("total",total)
  // Find and apply additional depreciation for current year if applicable
  for (const { year: y, from, to, rate } of depreciationRates) {
    if (y === year) {
      for (let Q = from; Q <= Math.min(to, grossIntendedPeriod * 4); Q++) {
        total += value * (rate / 100);
      }
      break;
    }
  }

console.log("total1: ",total)

  return total;
}

// let tempValue1=calculateDepreciation(tatalDuty,10,5)
let tempValue1=calculateDepreciationValueforthowfive(17000000, grossIntendedPeriod,5)
console.log("tempValue3",tempValue1)


      // let totaldeprValue = CalculateDuty(grossBCDDepreciationValue ,grossSGDDepreciationValue,grossCWDDepreciationValue ,grossAIDCDepreciationValue,grossADDDepreciationValue,GrossSWSDepreciationValue)
  
      // console.log("totaldeprValue", totaldeprValue);
      // // calclcualte the NPV of depre value
      // let E2 = 0;
      // for (let i = 0; i < 7; i++) {
      //   if (E2 == 0) {
      //     E2 = rateOfInterest / 100 + 1;
      //   } else {
      //     E2 = E2 * (rateOfInterest / 100 + 1);
      //   }
      // }
      // let EOUValue = totaldeprValue / E2;
      // console.log("2) For EOU: Total value:  ", EOUValue);
    