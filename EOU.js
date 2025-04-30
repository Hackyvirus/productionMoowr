function safeParseFloat(value) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return isNaN(parseFloat(value.replace(/,/g, "")))
    ? 0
    : parseFloat(value.replace(/,/g, ""));
}
let TotalExport = 3;
let TotalImport = 2;
function calculateDepreciationValue(value, grossIntendedPeriod) {
  let result = 0;
  for (let Q = 1; Q <= grossIntendedPeriod * 4; Q++) {
    if (Q >= 1 && Q <= 4) {
      P = 4;
      result += value * (P / 100);
      console.log(value * (P / 100));
      console.log(P);
      console.log("result1", result);
    }
    if (Q >= 5 && Q <= 12) {
      P = 3;
      result += value * (P / 100);
      console.log(value * (P / 100));
      console.log(P);
      console.log("result2", result);
    }
    if (Q >= 13 && Q <= 20) {
      P = 2.5;
      result += value * (P / 100);
      console.log(value * (P / 100));
      console.log(P);
      console.log("result3", result);
    }
    if (Q >= 21 && Q <= 40) {
      P = 2;
      result += value * (P / 100);
      console.log(value * (P / 100));
      console.log(P);
    }
  }
  console.log("result4", result);
  return result;
}
let mainResult = calculateDepreciationValue(15000000, 10);
console.log("mainResult", mainResult);
if (TotalImport > TotalExport) {
  console.log("EOU is not eligible");
} else {
    grossIntendedPeriod = safeParseFloat(
      document.getElementById("fourth-left-input").value
    );
  let grossIntendedPeriod = 7,grossBCD = 10000000,grossSGD = 1000000,grossCWD = 2000000,grossAIDC = 1000000,grossADD = 2000000,GrossSWS = 1000000;
  if (grossIntendedPeriod < 10) {
    grossBCDDepreciationValue = calculateDepreciationValue(
      grossBCD,
      grossIntendedPeriod
    );
    grossSGDDepreciationValue = calculateDepreciationValue(
      grossSGD,
      grossIntendedPeriod
    );
    grossCWDDepreciationValue = calculateDepreciationValue(
      grossCWD,
      grossIntendedPeriod
    );
    grossAIDCDepreciationValue = calculateDepreciationValue(
      grossAIDC,
      grossIntendedPeriod
    );
    grossADDDepreciationValue = calculateDepreciationValue(
      grossADD,
      grossIntendedPeriod
    );
    GrossSWSDepreciationValue = calculateDepreciationValue(
      GrossSWS,
      grossIntendedPeriod
    );
    console.log("grossBCDDepreciationValue", grossBCDDepreciationValue);
    console.log("grossSGDDepreciationValue", grossSGDDepreciationValue);
    console.log("grossCWDDepreciationValue", grossCWDDepreciationValue);
    console.log("grossAIDCDepreciationValue", grossAIDCDepreciationValue);
    console.log("grossADDDepreciationValue", grossADDDepreciationValue);
    console.log("GrossSWSDepreciationValue", GrossSWSDepreciationValue);

    let totaldeprValue =
      grossBCDDepreciationValue +
      grossSGDDepreciationValue +
      grossCWDDepreciationValue +
      grossAIDCDepreciationValue +
      grossADDDepreciationValue +
      GrossSWSDepreciationValue;
console.log("totaldeprValue", totaldeprValue);
    // calclcualte the NPV of depre value
    let E2 = 0;
    for (let i = 0; i < 7; i++) {
      if (E2 == 0) {
        E2 = 9 / 100 + 1;
      } else {
        E2 = E2 * (9 / 100 + 1);
      }
    }
    console.log("NPV ", totaldeprValue / E2);
  }
  console.log("EOU is eligible");
}
