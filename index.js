// 0) Parse Float Function
function safeParseFloat(value) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return isNaN(parseFloat(value.replace(/,/g, "")))
    ? 0
    : parseFloat(value.replace(/,/g, ""));
}

// 1) Calculate Total Duty
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

// 2) Calculate Depreciation of value
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

// 3) Calculate NPV
function CalculateNPV(Value, rateOfInterest, years) {
  let E = 0;
  for (let i = 0; i < years; i++) {
    if (E == 0) {
      E = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      E = E * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
  }
  return Math.round(Value / E);
}

// 4) Calculate Growth for value till number of years
function CalculateGrowth(value, growthRate, years) {
  let result = 0;
  for (let i = 0; i < years; i++) {
    if (i == 0) {
      value = value;
    } else {
      value = value * (1 + growthRate / 100);
    }
    result += value;
  }
  return result;
}
console.log("CalculateGrowth", CalculateGrowth(40000000, 5, 6));

// 4) Calculate EPCG Value
function calculateEPCGValue(
  totalDuty,
  grossIGST,
  TotalExport,
  rateOfInterest,
  years
) {
  let EPCGValue = "N/A";
  let EO = (totalDuty + grossIGST) * 7;
  console.log("EO", EO);
  console.log("totalDuty", totalDuty);
  console.log("IGST", grossIGST);
  if (TotalExport < EO) {
    let UEO = EO - TotalExport;
    let per = (UEO / EO) * totalDuty;
    console.log("per", per);
    console.log("UEO", UEO);
    let interest = (((totalDuty + grossIGST) * 15) / 100) * 7;
    let totalDutyPayablewithinterestOnunfullfilledEO = interest + per;
    let totalNVP = totalDutyPayablewithinterestOnunfullfilledEO;
    console.log(
      "totalDutyPayablewithinterestOnunfullfilledEO",
      totalDutyPayablewithinterestOnunfullfilledEO
    );
    console.log("interest", interest);
    console.log("totalNVP", totalNVP);

    EPCGValue = CalculateNPV(totalNVP, rateOfInterest, years);

    console.log("2) Total NPV for EPCG", EPCGValue);
    return EPCGValue;
  } else {
    console.log("EPCG is not applicable");
    return (EPCGValue = "N/A");
  }
}
// console.log("EPCGValue", calculateEPCGValue(28000000, 20000000, 222000000,9,10));

async function getAllInputValues() {
  // Gross Value of Captical Goods imported
  grossCIF = safeParseFloat(document.getElementById("first-left-input").value);
  grossBCD = safeParseFloat(document.getElementById("first-right-input").value);
  grossSGD = safeParseFloat(document.getElementById("sgd").value);
  grossCWD = safeParseFloat(document.getElementById("cwd").value);
  grossAIDC = safeParseFloat(
    document.getElementById("second-left-input").value
  );
  grossADD = safeParseFloat(
    document.getElementById("second-right-input").value
  );
  grossIGST = safeParseFloat(document.getElementById("third-left-input").value);
  grossIntendedPeriod = safeParseFloat(
    document.getElementById("fourth-left-input").value
  );

  grossDisposal = document.getElementById("third-right-input").value;
  GrossSWS = safeParseFloat(safeParseFloat(grossBCD) * 0.1);
  console.log(
    "grossCIF,grossBCD,grossSGD,grossCWD,grossAIDC,grossADD,grossIGST,grossIntendedPeriod,grossDisposal,GrossSWS",
    grossCIF,
    grossBCD,
    grossSGD,
    grossCWD,
    grossAIDC,
    grossADD,
    grossIGST,
    grossIntendedPeriod,
    grossDisposal,
    GrossSWS
  );

  //Gross values of Capital goods Domestic
  grossCIF2 = safeParseFloat(
    document.getElementById("Dfirst-left-input").value
  );
  grossBCD2 = safeParseFloat(
    document.getElementById("Dfirst-right-input").value
  );
  grossSGD2 = safeParseFloat(document.getElementById("Dsgd").value);
  grossCWD2 = safeParseFloat(document.getElementById("Dcwd").value);
  grossAIDC2 = safeParseFloat(
    document.getElementById("Dsecond-left-input").value
  );
  grossADD2 = safeParseFloat(
    document.getElementById("Dsecond-right-input").value
  );
  GrossSWS2 = parseFloat((safeParseFloat(grossBCD2) * 10) / 100);
  domesticCapitalGoods = safeParseFloat(
    document.getElementById("domesticCapitalGoods").value
  );
  console.log(
    "grossCIF2,grossBCD2,grossSGD2,grossCWD2,grossAIDC2grossADD2,GrossSWS2,domesticCapitalGoods",
    grossCIF2,
    grossBCD2,
    grossSGD2,
    grossCWD2,
    grossAIDC2,
    grossADD2,
    GrossSWS2,
    domesticCapitalGoods
  );

  // Gross Value of Raw Material iMPORTED 1
  GrossRawCIF = safeParseFloat(
    document.getElementById("first-left-input2").value
  );
  GrossRawBCD = safeParseFloat(
    document.getElementById("first-right-input2").value
  );

  GrossRawSWS = parseFloat((safeParseFloat(GrossRawBCD) * 10) / 100);
  GrossRawAIDC = safeParseFloat(
    document.getElementById("second-left-input2").value
  );
  GrossRawADD = safeParseFloat(
    document.getElementById("second-right-input2").value
  );
  GrossRawSGD = safeParseFloat(document.getElementById("sgd2").value);
  GrossRawCWD = safeParseFloat(document.getElementById("cwd2").value);
  GrossRawIGST = safeParseFloat(
    document.getElementById("third-left-input2").value
  );
  console.log(
    "GrossRawCIF,GrossRawBCD,GrossRawSWS,GrossRawAIDC,GrossRawADD,GrossRawSGD,GrossRawCWD,GrossRawIGST",
    GrossRawCIF,
    GrossRawBCD,
    GrossRawSWS,
    GrossRawAIDC,
    GrossRawADD,
    GrossRawSGD,
    GrossRawCWD,
    GrossRawIGST
  );

  // Gross Value of Raw Material iMPORTED 2
  GrossRawCIF2 = safeParseFloat(
    document.getElementById("first-left-input22").value
  );
  GrossRawBCD2 = safeParseFloat(
    document.getElementById("first-right-input22").value
  );
  console.log("GrossRawBCD2", GrossRawBCD2);
  GrossRawAIDC2 = safeParseFloat(
    document.getElementById("second-left-input22").value
  );
  GrossRawADD2 = safeParseFloat(
    document.getElementById("second-right-input22").value
  );
  GrossRawSGD2 = safeParseFloat(document.getElementById("sgd22").value);
  GrossRawCWD2 = safeParseFloat(document.getElementById("cwd22").value);
  GrossRawIGST2 = safeParseFloat(
    document.getElementById("third-left-input22").value
  );
  GrossRawSWS2 = parseFloat((safeParseFloat(GrossRawBCD2) * 10) / 100);
  console.log(
    "GrossRawCIF2,GrossRawBCD2,GrossRawAIDC2,GrossRawADD2,GrossRawSGD2,GrossRawCWD2,GrossRawIGST2,GrossRawSWS2",
    GrossRawCIF2,
    GrossRawBCD2,
    GrossRawAIDC2,
    GrossRawADD2,
    GrossRawSGD2,
    GrossRawCWD2,
    GrossRawIGST2,
    GrossRawSWS2
  );

  // Gross Value of Raw Material dOMESTIC
  GrossRawDomesticCIF = safeParseFloat(
    document.getElementById("GrossRawDomesticCIF").value
  );
  GrossRawDomesticBCD = safeParseFloat(
    document.getElementById("GrossRawDomesticBCD").value
  );
  GrossRawDomesticSWS = parseFloat(
    (safeParseFloat(GrossRawDomesticBCD) * 10) / 100
  );
  GrossRawDomesticAIDC = safeParseFloat(
    document.getElementById("GrossRawDomesticAIDC").value
  );
  GrossRawDomesticADD = safeParseFloat(
    document.getElementById("GrossRawDomesticADD").value
  );
  GrossRawDomesticSGD = safeParseFloat(
    document.getElementById("GrossRawDomesticSGD").value
  );
  GrossRawDomesticCWD = safeParseFloat(
    document.getElementById("GrossRawDomesticCWD").value
  );
  DomesticRawMaterialValueDomesticSale = safeParseFloat(
    document.getElementById("DomesticRawMaterialValueDomesticSale").value
  );
  DomesticRawMaterialValueSEZ = safeParseFloat(
    document.getElementById("DomesticRawMaterialValueSEZ").value
  );
  console.log(
    "GrossRawDomesticCIF,GrossRawDomesticBCD,GrossRawDomesticSWS,GrossRawDomesticAIDC,GrossRawDomesticADD,GrossRawDomesticSGD,GrossRawDomesticCWD,DomesticRawMaterialValueDomesticSale,DomesticRawMaterialValueSEZ",
    GrossRawDomesticCIF,
    GrossRawDomesticBCD,
    GrossRawDomesticSWS,
    GrossRawDomesticAIDC,
    GrossRawDomesticADD,
    GrossRawDomesticSGD,
    GrossRawDomesticCWD,
    DomesticRawMaterialValueDomesticSale,
    DomesticRawMaterialValueSEZ
  );

  // Gross Values of Common questions
  // grossIntendedPeriod = safeParseFloat(
  //   document.getElementById("first-left-input3").value
  // );
  ExpectedAnnualGrowth = safeParseFloat(
    document.getElementById("first-right-input3").value
  );
  domesticSales = safeParseFloat(
    document.getElementById("domestic-sales").value
  );
  exportSales = safeParseFloat(document.getElementById("export-sales").value);
  rateOfInterest = safeParseFloat(
    document.getElementById("second-left-input3").value
  );
  timeGap = safeParseFloat(
    document.getElementById("second-right-input3").value
  );
  annualValueofRoDTEP = safeParseFloat(
    document.getElementById("third-left-input3").value
  );
  GrossAnnualValue = safeParseFloat(
    document.getElementById("third-right-input3").value
  );
  conversionOfRaw = safeParseFloat(
    document.getElementById("fourth-right-input3").value
  );
  deemedExport = safeParseFloat(
    document.getElementById("fifth-left-input5").value
  );

  gstOnConstruction = safeParseFloat(
    document.getElementById("gstOnConstruction").value
  );
  constOfDuty = safeParseFloat(document.getElementById("constOfDuty").value);
  SEZsale = safeParseFloat(document.getElementById("SEZsale").value);
  igstOnprcuredvalue = safeParseFloat(
    document.getElementById("igstOnprcuredvalue").value
  );
  igstOnImportServices = safeParseFloat(
    document.getElementById("igstOnImportServices").value
  );
  console.log(
    "grossIntendedPeriod,ExpectedAnnualGrowth,domesticSales,exportSales,rateOfInterest,timeGap,annualValueofRoDTEP,GrossAnnualValue",
    grossIntendedPeriod,
    ExpectedAnnualGrowth,
    domesticSales,
    exportSales,
    rateOfInterest,
    timeGap,
    annualValueofRoDTEP,
    GrossAnnualValue
  );
  console.log(
    "conversionOfRaw,deemedExport,gstOnConstruction,constOfDuty,SEZsale,igstOnprcuredvalue,igstOnImportServices",
    conversionOfRaw,
    deemedExport,
    gstOnConstruction,
    constOfDuty,
    SEZsale,
    igstOnprcuredvalue,
    igstOnImportServices
  );
  // total calculation
  console.log("firstCal");
  // Imported capital goods

// 1) Total Import Duty (Row 1 (all Cells))
  let totalDuty = CalculateDuty(
      safeParseFloat(GrossSWS) +
      safeParseFloat(grossBCD) +
      safeParseFloat(grossADD) +
      safeParseFloat(grossAIDC) +
      safeParseFloat(grossSGD) +
      safeParseFloat(grossCWD)
  );
  let totalDutyandIGST = CalculateDuty(totalDuty, grossIGST);
  console.log("1) totalDuty", totalDuty);

// 2) EPCG AA + BR (Row 2 (First AND Second Cell))
  let EPCGValue;
  let TotalExport = exportSales + SEZsale + deemedExport + domesticSales;
  let TotalImport = grossCIF + GrossRawCIF + GrossRawCIF2;
  let ExportObligationForEPCG = totalDutyandIGST * 6;
  let TotalExportForSixYears = CalculateGrowth(TotalExport, 5, 6);
  
  // scenario 1A (applicable where EO in case of EPCG is completed within six years
  if (ExportObligationForEPCG < TotalExportForSixYears) {
    console.log(
      "Since the EO is fulfilled i.e. export within six year at M24 is more than the EO at E 13. therefore in the report in row no. 2 below AA+EPCG and BR+EPCG duty payable on redemption to be shown as nil "
    );
    EPCGValue = "Nill";
  }
  // scenario 1B (applicable where EO in case of EPCG is partially complete)
  if (ExportObligationForEPCG > TotalExportForSixYears) {
    let unfulfilledEO = ExportObligationForEPCG - TotalExportForSixYears;
    console.log("unfulfilledEO", unfulfilledEO);
    let ratioOfUnfulfilledEO = (unfulfilledEO / ExportObligationForEPCG) * 100;
    console.log("ratioOfUnfulfilledEO", ratioOfUnfulfilledEO);
    let unfulfilledEOUnderEPCG = (totalDuty * ratioOfUnfulfilledEO) / 100;
    console.log("unfulfilledEOUnderEPCG", unfulfilledEOUnderEPCG);
    let IGSTPayableatSeventhYear = (grossIGST * ratioOfUnfulfilledEO) / 100;
    console.log("IGSTPayableatSeventhYear", IGSTPayableatSeventhYear);
    let EPCGInterest =
      (((unfulfilledEOUnderEPCG + IGSTPayableatSeventhYear) * 15) / 100) * 7;
    console.log("EPCGInterest", EPCGInterest);
    let totalCostOfRedemption = unfulfilledEOUnderEPCG + EPCGInterest;
    console.log("totalCostOfRedemption", totalCostOfRedemption);
    let NPVOFcostofRedemption = CalculateNPV(
      totalCostOfRedemption,
      rateOfInterest,
      7
    );
    console.log("NPVOFcostofRedemption", NPVOFcostofRedemption);
    EPCGValue = NPVOFcostofRedemption;
  }
  console.log("2) EPCGValue", EPCGValue);

// 3) MOOWR Value (Row 2(Third Cell))
  // scenario 1 A (Sale In DTA)
  let RowTwoThirdCell = 0;
  if (grossDisposal === "Sale in DTA") {
    RowTwoThirdCell = CalculateNPV(totalDuty,rateOfInterest,grossIntendedPeriod)
  } else if (grossDisposal === "Destroy") {
     // scenario 1 B (Destroy)
    RowTwoThirdCell = 0;
  } else if(grossDisposal === "Export") {
     // scenario 1 C (Export)
    RowTwoThirdCell = 0;
  }else{
    RowTwoThirdCell = 0;
  }
  console.log("RowTwoThirdCell", RowTwoThirdCell);

// 4) EOU Value(Row 2(Fourth and Fifth Cell))
  let EOUValue = "N/A";
  if (TotalImport < TotalExport) {
    console.log(
      "EOU is not eligible because,totalImport ",
      TotalImport,
      " is more than totalExport",
      TotalExport
    );
  } else {
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

      let totaldeprValue = CalculateDuty(grossBCDDepreciationValue ,grossSGDDepreciationValue,grossCWDDepreciationValue ,grossAIDCDepreciationValue,grossADDDepreciationValue,GrossSWSDepreciationValue)
  
      console.log("totaldeprValue", totaldeprValue);
      // calclcualte the NPV of depre value
      let E2 = 0;
      for (let i = 0; i < 7; i++) {
        if (E2 == 0) {
          E2 = rateOfInterest / 100 + 1;
        } else {
          E2 = E2 * (rateOfInterest / 100 + 1);
        }
      }
      let EOUValue = totaldeprValue / E2;
      console.log("2) For EOU: Total value:  ", EOUValue);
    }
  }

  let totalSavings =
    safeParseFloat(grossIGST) *
    (safeParseFloat(rateOfInterest) / 100) *
    (safeParseFloat(timeGap) / 365);
  console.log("3) total Savings", totalSavings);

  // Domestically procured capital goods
  const AIRAccuredOnDTA = (domesticCapitalGoods * 1.5) / 100;
  console.log("4) AIRAccuredOnDTA", AIRAccuredOnDTA);
  const DutySavedOnDomesticalyProcuredCP =
    grossBCD2 + GrossSWS2 + grossAIDC2 + grossADD2 + grossSGD2 + grossCWD2;
  console.log(
    "5) DutySavedOnDomesticalyProcuredCP",
    DutySavedOnDomesticalyProcuredCP
  );

  // Imported raw materials (for exports, SEZ supplies & deemed export)
  let RawTotalDuty =
    safeParseFloat(GrossRawBCD) +
    safeParseFloat(GrossRawSWS) +
    safeParseFloat(GrossRawAIDC) +
    safeParseFloat(GrossRawADD) +
    safeParseFloat(GrossRawSGD) +
    safeParseFloat(GrossRawCWD);
  console.log("Total", RawTotalDuty);

  let E = 0;
  let totalBenifit = 0;
  let lastNPV = 0;
  let npv;
  let tempRaw = RawTotalDuty;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifit =
      tempRaw *
      (parseFloat(safeParseFloat(conversionOfRaw)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (E == 0) {
      E = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      E = E * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npv = totalBenifit / E;
    lastNPV += npv;
    tempRaw = tempRaw * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("6) Raw NPV: ", lastNPV);

  let Digst = 0;
  let totalBenifitigst = 0;
  let lastNPVigst = 0;
  let npvigst;

  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifitigst =
      safeParseFloat(GrossRawIGST) *
      (parseFloat(safeParseFloat(timeGap)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (Digst == 0) {
      Digst = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      Digst = Digst * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npvigst = totalBenifitigst / Digst;
    lastNPVigst += npvigst;
    GrossRawIGST =
      GrossRawIGST * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("7) IGST", lastNPVigst);

  let RawTotalDuty2 =
    safeParseFloat(GrossRawBCD2) +
    safeParseFloat(GrossRawSWS2) +
    safeParseFloat(GrossRawAIDC2) +
    safeParseFloat(GrossRawADD2) +
    safeParseFloat(GrossRawSGD2) +
    safeParseFloat(GrossRawCWD2);
  console.log("Total", RawTotalDuty2);

  let E2 = 0;
  let totalBenifit2 = 0;
  let lastNPV2 = 0;
  let npv2;
  let tempRaw2 = RawTotalDuty2;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifit2 =
      tempRaw2 *
      (parseFloat(safeParseFloat(conversionOfRaw)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (E2 == 0) {
      E2 = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      E2 = E2 * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npv2 = totalBenifit2 / E2;
    lastNPV2 += npv2;
    tempRaw2 = tempRaw2 * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("8) Raw NPV: ", lastNPV2);
  let Digst2 = 0;
  let totalBenifitigst2 = 0;
  let lastNPVigst2 = 0;
  let npvigst2;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifitigst2 =
      safeParseFloat(GrossRawIGST2) *
      (parseFloat(safeParseFloat(timeGap)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    console.log("totalBenifitigst2", totalBenifitigst2);
    if (Digst2 == 0) {
      Digst2 = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      Digst2 = Digst2 * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npvigst2 = totalBenifitigst2 / Digst2;
    lastNPVigst2 += npvigst2;
    GrossRawIGST2 =
      GrossRawIGST2 * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("9) IGST", lastNPVigst2);

  let RawTotalDuty3 =
    safeParseFloat(GrossRawDomesticBCD) +
    safeParseFloat(GrossRawDomesticSWS) +
    safeParseFloat(GrossRawDomesticAIDC) +
    safeParseFloat(GrossRawDomesticADD) +
    safeParseFloat(GrossRawDomesticSGD) +
    safeParseFloat(GrossRawDomesticCWD);
  console.log("Total", RawTotalDuty3);

  // Domestic Raw Materials
  const AIRAccuredOnDTARawMaterial = (DomesticRawMaterialValueSEZ * 1.5) / 100;
  const IGSTonDomesticallyProcuredRawMaterials =
    (DomesticRawMaterialValueSEZ + DomesticRawMaterialValueDomesticSale) *
    (18 / 100) *
    (rateOfInterest / 100) *
    (timeGap / 365);
  let E4 = 0;
  for (let i = 0; i < grossIntendedPeriod; i++) {
    if (E4 == 0) {
      E4 = rateOfInterest / 100 + 1;
    } else {
      E4 = E4 * (rateOfInterest / 100 + 1);
    }
  }
  let EPCGValue2 = IGSTonDomesticallyProcuredRawMaterials / E4;
  console.log("++++++) IGSTonDomesticallyProcuredRawMaterials:  ", EPCGValue2);
  const AIRAccuredOnDTARawMaterial2 =
    (DomesticRawMaterialValueDomesticSale * 1.5) / 100;
  console.log("A. AIRAccuredOnDTA", AIRAccuredOnDTARawMaterial);
  console.log("B. AIRAccuredOnDTA", AIRAccuredOnDTARawMaterial2);
  console.log(
    "10) Total AIR Accured on DTA for SEZ and Domestic Sale",
    AIRAccuredOnDTARawMaterial + AIRAccuredOnDTARawMaterial2
  );

  const DutySavedOnDomesticalyProcuredCPRawMaterial =
    GrossRawDomesticBCD +
    GrossRawDomesticSWS +
    GrossRawDomesticAIDC +
    GrossRawDomesticADD +
    GrossRawDomesticSGD +
    GrossRawDomesticCWD;
  console.log(
    "11) DutySavedOnDomesticalyProcuredCPRawMaterial",
    DutySavedOnDomesticalyProcuredCPRawMaterial
  );

  let E3 = 0;
  let totalBenifit3 = 0;
  let lastNPV3 = 0;
  let npv3;
  let tempRaw3 = DutySavedOnDomesticalyProcuredCPRawMaterial;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifit3 =
      tempRaw3 *
      (parseFloat(safeParseFloat(conversionOfRaw)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (E3 == 0) {
      E3 = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      E3 = E3 * (safeParseFloat(rateOfInterest) / 100 + 1);
      // console.log("D3", E3);
      console.log("rateOfInterest", rateOfInterest);
    }
    npv3 = totalBenifit3 / E3;
    lastNPV3 += npv3;
    tempRaw3 = tempRaw3 * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log(
    "11) Duties of customs saved on the domestically procured raw materials: ",
    lastNPV3
  );

  // Gross Value of Raw Material dOMESTIC
  GrossRawDomesticCIF = safeParseFloat(
    document.getElementById("GrossRawDomesticCIF").value
  );
  GrossRawDomesticBCD = safeParseFloat(
    document.getElementById("GrossRawDomesticBCD").value
  );
  GrossRawDomesticSWS = parseFloat(
    (safeParseFloat(GrossRawDomesticBCD) * 10) / 100
  );
  GrossRawDomesticAIDC = safeParseFloat(
    document.getElementById("GrossRawDomesticAIDC").value
  );
  GrossRawDomesticADD = safeParseFloat(
    document.getElementById("GrossRawDomesticADD").value
  );
  GrossRawDomesticSGD = safeParseFloat(
    document.getElementById("GrossRawDomesticSGD").value
  );
  GrossRawDomesticCWD = safeParseFloat(
    document.getElementById("GrossRawDomesticCWD").value
  );

  let IGSTonDPRM =
    ((GrossRawDomesticCIF +
      GrossRawDomesticBCD +
      GrossRawDomesticAIDC +
      GrossRawDomesticADD +
      GrossRawDomesticSGD +
      GrossRawDomesticCWD) *
      18) /
    100;
  console.log("12) IGSTonDPRM", IGSTonDPRM);

  // common question answer
  let Drodtep = 0;
  let totalBenifitrodtep = 0;
  let lastNPVrodtep = 0;

  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    if (Drodtep == 0) {
      Drodtep = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      Drodtep = Drodtep * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    totalBenifitrodtep =
      safeParseFloat(annualValueofRoDTEP) / safeParseFloat(Drodtep);
    lastNPVrodtep += totalBenifitrodtep;
    annualValueofRoDTEP =
      safeParseFloat(annualValueofRoDTEP) *
      (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("RoDTep Banifit", lastNPVrodtep);

  let Dair = 0;
  let totalBenifitair = 0;
  let lastNPVrair = 0;
  let npvair;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    if (Dair == 0) {
      Dair = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      Dair = Dair * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    totalBenifitair = safeParseFloat(GrossAnnualValue) / Dair;
    npvair = totalBenifitair / Dair;
    lastNPVrair += totalBenifitair;
    GrossAnnualValue =
      safeParseFloat(GrossAnnualValue) *
      (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  let totalBenifitRoDTEP = (lastNPVrodtep + lastNPVrair) * -1;
  console.log("13) TotalBenifitRoDTEP", totalBenifitRoDTEP);

  console.log("14) All indsty rate", lastNPVrair);

  const totalDutyOnRMGE =
    GrossRawBCD +
    GrossRawSWS +
    GrossRawSGD +
    GrossRawAIDC +
    GrossRawADD +
    GrossRawCWD;

  let DF = 0;
  let finishedGoods = 0;
  let lastNPVF = 0;
  let npvF;
  finishedGoods =
    (exportSales / (domesticSales + exportSales)) * totalDutyOnRMGE;
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    if (DF == 0) {
      DF = 1;
    } else {
      DF = DF * (rateOfInterest / 100 + 1);
    }
    npvF = finishedGoods / DF;
    lastNPVF += npvF;
    finishedGoods =
      finishedGoods * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("15) totalDutyOnRMGE", lastNPVF);
  console.log("16) gstOnConstruction", gstOnConstruction);
  console.log("17) constOfDuty", constOfDuty);
  let WCSOIGSTOISIAD = igstOnprcuredvalue + igstOnImportServices;
  let Digst1 = 0;
  let totalBenifitigst1 = 0;
  let lastNPVigst1 = 0;
  let npvigst1;

  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifitigst1 =
      safeParseFloat(WCSOIGSTOISIAD) *
      (parseFloat(safeParseFloat(timeGap)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (Digst1 == 0) {
      Digst1 = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      Digst1 = Digst1 * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npvigst1 = totalBenifitigst1 / Digst1;
    lastNPVigst1 += npvigst1;
    WCSOIGSTOISIAD =
      WCSOIGSTOISIAD * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("18) WCSOIGSTOISIAD", lastNPVigst1);

  let ACDPODSBSEZU = domesticSales - GrossRawDomesticCIF;
  let Digst5 = 0;
  let totalBenifitigst5 = 0;
  let lastNPVigst5 = 0;
  let npvigst5;

  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    totalBenifitigst5 =
      safeParseFloat(ACDPODSBSEZU) *
      (parseFloat(safeParseFloat(timeGap)) / 365) *
      (parseFloat(safeParseFloat(rateOfInterest)) / 100);
    if (Digst5 == 0) {
      Digst5 = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      Digst5 = Digst5 * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npvigst5 = totalBenifitigst5 / Digst5;
    lastNPVigst5 += npvigst5;
    ACDPODSBSEZU =
      ACDPODSBSEZU * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("19) ACDPODSBSEZU", lastNPVigst5);
  updatePDFAndDownload(
    // First Row
    totalDuty,
    // Second Row
    EPCGValue,
    totalNVP,
    EOUValue,
    // Third Row
    totalSavings,
    // Fourth Row
    AIRAccuredOnDTA,
    // Fifth Row
    DutySavedOnDomesticalyProcuredCP,
    // Sixth Row
    lastNPV,
    // Seventh Row
    lastNPVigst,
    // Eighth Row
    lastNPV2,
    // Ninth Row
    lastNPVigst2,
    // Eleventh Row
    AIRAccuredOnDTARawMaterial + AIRAccuredOnDTARawMaterial2,
    // Twelth Row
    lastNPV3,
    // Thirteenth Row
    IGSTonDPRM,
    // Fourteenth Row
    totalBenifitRoDTEP,
    // Fifteenth Row
    lastNPVrair,
    // Sixteenth Row
    lastNPVF,
    // Seventeenth Row
    gstOnConstruction,
    // Eighteenth Row
    constOfDuty,
    // Nineteenth Row
    lastNPVigst1,
    // Twentieth Row
    lastNPVigst5
  );
}
