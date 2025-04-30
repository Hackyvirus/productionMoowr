

let first = false,
  second = false,
  indi = false,
  gross = false,
  confirm = false,
  notConfirm = false,
  domestic = false,
  domestic2 = false,
  imported = false,
  imported2 = false,
  grossIndi = true,
  capPage = false,
  rawPage = false,
  commonPage = false;


function formatNumberPDF(valuePDF) {
  console.log("valuePDF", valuePDF);

  if (valuePDF === "N/A" || valuePDF === "Nill") {
    return valuePDF;
  }

  if (isNaN(valuePDF) || valuePDF === null || valuePDF === undefined) {
    return "Invalid Input";
  }

  valuePDF = parseFloat(valuePDF);
  let isNegative = valuePDF < 0;

  // Convert to absolute value for easier handling
  valuePDF = Math.abs(valuePDF);

  // Convert to crores
  let croreValue = valuePDF / 100000;
  let formattedValue = croreValue.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  if (isNegative) {
    formattedValue = "-" + formattedValue;
  }

  return formattedValue;
}

function safeParseFloat(value) {
  if (typeof value !== "string") {
    value = String(value);
  }
  return isNaN(parseFloat(value.replace(/,/g, "")))
    ? 0
    : parseFloat(value.replace(/,/g, ""));
}


let grossCIF,
  grossBCD,
  grossSGD,
  grossCWD,
  grossAIDC,
  grossADD,
  grossIGST,
  grossDisposal,
  grossIntendedPeriod,
  GrossSWS,
  grossCIF2,
  grossBCD2,
  grossSGD2,
  grossCWD2,
  grossAIDC2,
  grossADD2,
  grossIGST2,
  GrossSWS2,
  domesticCapitalGoods;

let GrossRawCIF,
  GrossRawBCD,
  GrossRawSWS,
  GrossRawAIDC,
  GrossRawADD,
  GrossRawSGD,
  GrossRawCWD,
  GrossRawIGST,
  GrossRawCIF2,
  GrossRawBCD2,
  GrossRawAIDC2,
  GrossRawADD2,
  GrossRawSGD2,
  GrossRawCWD2,
  GrossRawSWS2,
  GrossRawIGST2,
  DomesticRawMaterialValueSEZ,
  DomesticRawMaterialValueDomesticSale,
  GrossRawDomesticCIF,
  GrossRawDomesticBCD,
  GrossRawDomesticSWS,
  GrossRawDomesticAIDC,
  GrossRawDomesticADD,
  GrossRawDomesticSGD,
  GrossRawDomesticCWD;

let ExpectedAnnualGrowth,
  rateOfInterest,
  timeGap,
  annualValueofRoDTEP,
  GrossAnnualValue,
  conversionOfRaw,
  exportSales,
  domesticSales,
  deemedExport;
/*
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
  let totalDuty =
    safeParseFloat(GrossSWS) +
    safeParseFloat(grossBCD) +
    safeParseFloat(grossADD) +
    safeParseFloat(grossAIDC) +
    safeParseFloat(grossSGD) +
    safeParseFloat(grossCWD);
    
  console.log("1) totalDuty", totalDuty);

  let TotalExport = exportSales + SEZsale + deemedExport;
  let TotalImport = grossCIF + GrossRawCIF + GrossRawCIF2;
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

  EOUValue = "N/A";
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
          E2 = rateOfInterest / 100 + 1;
        } else {
          E2 = E2 * (rateOfInterest / 100 + 1);
        }
      }
      let EOUValue = totaldeprValue / E2;
      console.log("2) For EOU: Total value:  ", EOUValue);
    }
  }

  
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
    let E2 = 0;
    for (let i = 0; i < 7; i++) {
      if (E2 == 0) {
        E2 = rateOfInterest / 100 + 1;
      } else {
        E2 = E2 * (rateOfInterest / 100 + 1);
      }
    }
    let EPCGValue = totalNVP / E2;
    console.log("2) Total NPV for EPCG", EPCGValue);
  } else {
    EPCGValue = "N/A";
    console.log("EPCG is not applicable");
  }

  let totalNVP;
  if (grossDisposal === "Sale in DTA") {
    totalNVP =
      (totalDuty /
        Math.pow(
          1 + safeParseFloat(rateOfInterest) / 100,
          safeParseFloat(grossIntendedPeriod)
        )) *
      -1;
  } else {
    totalNVP = 0;
  }
  console.log("2) Total NPV For MOOWR ", totalNVP);

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
}*/
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
  let h = 100;
  for (let Q = 1; Q <= grossIntendedPeriod * 4; Q++) {
    if (Q >= 1 && Q <= 4) {
      P = 4;
      h -= P;
      console.log("H",h);
      if(h== 84){
      result = value * ((h) / 100);
      console.log("result1", result);
      }
    }
    if (Q >= 5 && Q <= 12) {
      P = 3;
      h -= P;
      console.log("H",h);
      if(h==72 || h==60){
      result = value * (h / 100);
      console.log("result2", result);
      }
    }
    if (Q >= 13 && Q <= 20) {
      P = 2.5;
      h -= P;
      console.log("H",h);
      if(h==50 || h==40){
      result = value * (h / 100);
      console.log("result3", result);
      }
    }
    if (Q >= 21 && Q <= 40) {
      P = 2;
      h -= P;
      console.log("H",h);
      if(h==32 || h==24 || h==16 || h==8 || h==0){
      result = value * (h / 100);
      console.log("result2", result);
      }
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
  console.log(Math.round(Value / E))
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
// console.log("CalculateGrowth", CalculateGrowth(40000000, 5, 6));

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
let RawTotalDuty = CalculateDuty(
  safeParseFloat(GrossRawBCD) ,
  safeParseFloat(GrossRawSWS) ,
  safeParseFloat(GrossRawAIDC) ,
  safeParseFloat(GrossRawADD) ,
  safeParseFloat(GrossRawSGD) ,
  safeParseFloat(GrossRawCWD));
console.log("Total", RawTotalDuty);

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
      safeParseFloat(GrossSWS) ,
      safeParseFloat(grossBCD) ,
      safeParseFloat(grossADD) ,
      safeParseFloat(grossAIDC) ,
      safeParseFloat(grossSGD) ,
      safeParseFloat(grossCWD)
  );
  let totalDutyandIGST = CalculateDuty(totalDuty, grossIGST);
  console.log("1) totalDuty", totalDuty);

// 2) EPCG AA + BR (Row 2 (First AND Second Cell))
  let EPCGValue;
  let TotalImportedRawMaterialsForNYears1 = CalculateGrowth(GrossRawCIF, 5, grossIntendedPeriod);
  let TotalImportedRawMaterialsForNYears2 = CalculateGrowth(GrossRawCIF2, 5, grossIntendedPeriod);
  let TotalExport = CalculateGrowth(exportSales, 5, grossIntendedPeriod) + CalculateGrowth(SEZsale, 5, grossIntendedPeriod)   + CalculateGrowth(deemedExport, 5, grossIntendedPeriod) ;
  let TotalImport = grossCIF + TotalImportedRawMaterialsForNYears1 + TotalImportedRawMaterialsForNYears2;
  let ExportObligationForEPCG = totalDutyandIGST * 6;
  let TotalExportForSixYears = CalculateGrowth((exportSales+SEZsale+deemedExport), 5, 6);
  console.log("exportSales", exportSales);  
  console.log("SEZsale", SEZsale);  
  console.log("deemedExport", deemedExport);  
  console.log("TotalExportForSixYears", TotalExportForSixYears);  
  console.log("ExportObligationForEPCG", ExportObligationForEPCG);  

  
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
  console.log("grossDisposal", grossDisposal);
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

// 4) EOU Value(Row 2(Fourth & Fifth Cell))
  let EOUValue = "N/A";
  console.log("TotalImport", TotalImport);
  console.log("TotalExport", TotalExport);

  let NFE = TotalExport - TotalImport;
  console.log("NFE", NFE);
  if (NFE < 0) {
    console.log("NFE for the intended period of project is negative")
    console.log(
      "EOU is not eligible because,totalImport ",
      TotalImport,
      " is more than totalExport",
      TotalExport
    );
    EOUValue = "N/A";
  }
  else if (NFE > 0 && grossIntendedPeriod < 10) { 
    let totalDutyDepre = calculateDepreciationValue(totalDuty, grossIntendedPeriod);
    console.log("totalDutyDepre", totalDutyDepre);
    console.log("2) For EOU: Total value (Total Duty):  ", CalculateNPV(totalDutyDepre, rateOfInterest, grossIntendedPeriod));
    EOUValue = CalculateNPV(totalDutyDepre, rateOfInterest, grossIntendedPeriod)
}
  else if(NFE > 0 && grossIntendedPeriod >= 10){
    EOUValue = 0;
  }
  else{
    
    EOUValue = "N/A";
  }

  let totalSavings =
    safeParseFloat(grossIGST) *
    (safeParseFloat(rateOfInterest) / 100) *
    (safeParseFloat(timeGap) / 365);
  console.log("3) total Savings", totalSavings);

  // Domestically procured capital goods
  const AIRAccuredOnDTA = (domesticCapitalGoods * 1.5) / 100;
  console.log("4) AIRAccuredOnDTA", AIRAccuredOnDTA);
  let DutySavedOnDomesticalyProcuredCPNetAIR;
  // for EPCG, BR, EOU
  const DutySavedOnDomesticalyProcuredCP =
    grossBCD2 + GrossSWS2 + grossAIDC2 + grossADD2 + grossSGD2 + grossCWD2;
  // for SEZ
    DutySavedOnDomesticalyProcuredCPNetAIR = DutySavedOnDomesticalyProcuredCP - AIRAccuredOnDTA;
  console.log(
    "5 A) DutySavedOnDomesticalyProcuredCP",
    DutySavedOnDomesticalyProcuredCP
  );
  console.log(
    "5 b) DutySavedOnDomesticalyProcuredCPNetAIR",
    DutySavedOnDomesticalyProcuredCPNetAIR
  );

  // Imported raw materials (for exports, SEZ supplies & deemed export)
  let RawTotalDuty = CalculateDuty(
    safeParseFloat(GrossRawBCD) ,
    safeParseFloat(GrossRawSWS) ,
    safeParseFloat(GrossRawAIDC) ,
    safeParseFloat(GrossRawADD) ,
    safeParseFloat(GrossRawSGD) ,
    safeParseFloat(GrossRawCWD));
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
  const AIRAccuredOnDTARawMaterial2 =
  (DomesticRawMaterialValueDomesticSale * 1.5) / 100;
  let AIRAccuredOnTARawMaterial =CalculateDuty(AIRAccuredOnDTARawMaterial ,AIRAccuredOnDTARawMaterial2);
  console.log("AIRAccuredOnTARawMaterial",AIRAccuredOnTARawMaterial)
  let DRM = 0;
  let lastNPVDRM = 0;
  let npvDRM;

  let tempAIRAccuredOnTARawMaterial = AIRAccuredOnTARawMaterial
  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    if (DRM == 0) {
      DRM = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      DRM = DRM * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npvDRM = tempAIRAccuredOnTARawMaterial / DRM;
    lastNPVDRM += npvDRM;
    tempAIRAccuredOnTARawMaterial =
      tempAIRAccuredOnTARawMaterial * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }
  console.log("A. AIRAccuredOnDTA", AIRAccuredOnDTARawMaterial);
  console.log("B. AIRAccuredOnDTA", AIRAccuredOnDTARawMaterial2);
  console.log("10) Total AIR Accured on DTA for SEZ and Domestic Sale", lastNPVDRM);

  let DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR;
  const DutySavedOnDomesticalyProcuredCPRawMaterial =
  GrossRawDomesticBCD +
  GrossRawDomesticSWS +
  GrossRawDomesticAIDC +
  GrossRawDomesticADD +
  GrossRawDomesticSGD +
  GrossRawDomesticCWD;
 
console.log("DutySavedOnDomesticalyProcuredCPRawMaterial",DutySavedOnDomesticalyProcuredCPRawMaterial)
console.log("AIRAccuredOnTARawMaterial",AIRAccuredOnTARawMaterial)
let E3 = 0;
let lastNPV3 = 0;
let npv3;
let tempRaw3 = DutySavedOnDomesticalyProcuredCPRawMaterial;
for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
  if (E3 == 0) {
    E3 = safeParseFloat(rateOfInterest) / 100 + 1;
  } else {
    E3 = E3 * (safeParseFloat(rateOfInterest) / 100 + 1);
  }
  npv3 = tempRaw3 / E3;
  lastNPV3 += npv3;
  tempRaw3 = tempRaw3 * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
}

console.log("**) lastNPV3", lastNPV3);
console.log("**) lastNPVDRM", lastNPVDRM);


DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR = lastNPV3 - lastNPVDRM;
console.log("DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR",DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR)
if (lastNPV3 > lastNPVDRM ){
  DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR = DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR;
}else if (lastNPV3 < lastNPVDRM ){
  DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR = "N/A";
}
console.log(
  "11 A) Duties of customs saved on the domestically procured raw materials: ",
  lastNPV3
);
console.log(
  "11 B) Duties of customs saved on the domestically procured raw materials: ",
  DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR
);

let igst = 0;
let totalIgst = 0;
let lastNpvIGST = 0;
let NpvIgst;
let CurrentIGST = (DomesticRawMaterialValueSEZ + DomesticRawMaterialValueDomesticSale ) * 18/100
console.log("CurrentIGST", CurrentIGST);
for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
  totalIgst =
    safeParseFloat(CurrentIGST) *
    (parseFloat(safeParseFloat(timeGap)) / 365) *
    (parseFloat(safeParseFloat(rateOfInterest)) / 100);
  console.log("totalBenifitigst2", totalIgst);
  if (igst == 0) {
    igst = safeParseFloat(rateOfInterest) / 100 + 1;
  } else {
    igst = igst * (safeParseFloat(rateOfInterest) / 100 + 1);
  }
  NpvIgst = totalIgst / igst;
  console.log("NpvIgst",NpvIgst)
  lastNpvIGST += NpvIgst;
  CurrentIGST =
    CurrentIGST * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
}
console.log("12) Saving Of oportunities cost of capital on ", lastNpvIGST);


  // common question answer

  let Drodtep = 0;
  let npv4,npv5,npv6;
  let lastNPVrodtep = 0;
  let lastNPVtotalBenifit = 0;
  let lastNPVRawDuty = 0

  let totalBenifitrodtep =annualValueofRoDTEP;
  let lastNPVradtepAndAir =GrossAnnualValue ;
  let totalDutyOnRMGE = RawTotalDuty;

  for (let i = 0; i < parseFloat(safeParseFloat(grossIntendedPeriod)); i++) {
    if (Drodtep == 0) {
      Drodtep = safeParseFloat(rateOfInterest) / 100 + 1;
    } else {
      Drodtep = Drodtep * (safeParseFloat(rateOfInterest) / 100 + 1);
    }
    npv4 = totalBenifitrodtep / Drodtep;
    npv5 = lastNPVradtepAndAir / Drodtep;
    npv6 = totalDutyOnRMGE / Drodtep;
    console.log("NPV4",npv4)
    console.log("NPV5",npv5)
    console.log("NPV6",npv6)

    lastNPVrodtep += npv4;
    lastNPVtotalBenifit += npv5;
    lastNPVRawDuty += npv6;

    console.log("Total NPV of Redtep",lastNPVrodtep)
    console.log("Total NPV of AIR",lastNPVtotalBenifit)
    console.log("Total NPV of Raw Duty",lastNPVRawDuty)

    totalBenifitrodtep = totalBenifitrodtep * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
    lastNPVradtepAndAir = lastNPVradtepAndAir * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
    totalDutyOnRMGE = totalDutyOnRMGE * (safeParseFloat(ExpectedAnnualGrowth) / 100 + 1);
  }

  console.log("13) RoDTep Banifit", lastNPVrodtep);
  console.log("14) AIR Banifit", lastNPVtotalBenifit);
  console.log("15) total Duty On RMGE", lastNPVRawDuty);

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
  // updatePDFAndDownload(
  //   // First Row
  //   totalDuty,
  //   // Second Row
  //   EPCGValue,
  //   totalNVP,
  //   EOUValue,
  //   // Third Row
  //   totalSavings,
  //   // Fourth Row
  //   AIRAccuredOnDTA,
  //   // Fifth Row
  //   DutySavedOnDomesticalyProcuredCP,
  //   // Sixth Row
  //   lastNPV,
  //   // Seventh Row
  //   lastNPVigst,
  //   // Eighth Row
  //   lastNPV2,
  //   // Ninth Row
  //   lastNPVigst2,
  //   // Eleventh Row
  //   AIRAccuredOnDTARawMaterial + AIRAccuredOnDTARawMaterial2,
  //   // Twelth Row
  //   lastNPV3,
  //   // Thirteenth Row
  //   IGSTonDPRM,
  //   // Fourteenth Row
  //   totalBenifitRoDTEP,
  //   // Fifteenth Row
  //   lastNPVrair,
  //   // Sixteenth Row
  //   lastNPVF,
  //   // Seventeenth Row
  //   gstOnConstruction,
  //   // Eighteenth Row
  //   constOfDuty,
  //   // Nineteenth Row
  //   lastNPVigst1,
  //   // Twentieth Row
  //   lastNPVigst5
  // );
  DutySavedOnDomesticalyProcuredCP
DutySavedOnDomesticalyProcuredCPNetAIR
  updatePDFAndDownload(
// first row 
    totalDuty,
// second row
    EPCGValue,
    RowTwoThirdCell,
    EOUValue,
// third row
    totalSavings,
// fourth row
    AIRAccuredOnDTA,
// fifth row
    DutySavedOnDomesticalyProcuredCP,
    DutySavedOnDomesticalyProcuredCPNetAIR,
// sixth row
    lastNPV,
// seventh row
    lastNPVigst,
// eighth row
    lastNPV2,
// ninth row
    lastNPVigst2,
// tenth row
    lastNPVDRM,
// eleventh row
    lastNPV3,
    DutySavedOnDomesticalyProcuredCPRawMaterialNetAIR,
// twelveth row
    lastNpvIGST,
// thirteenth row
    lastNPVrodtep,
// fourteenth row
    lastNPVtotalBenifit,
// fifteenth row
    lastNPVRawDuty,
// sixteenth row
    gstOnConstruction,
// seventeenth row
    constOfDuty,
// eighteenth row
    lastNPVigst1,
// nineteenth row
    lastNPVigst5
  );
}


async function updatePDFAndDownload(
  value0,
  value1,
  value2,
  value3,
  value4,
  value5,
  value6,
  value7,
  value8,
  value9,
  value10,
  value11,
  value12,
  value13,
  value14,
  value15,
  value16,
  value17,
  value18,
  value19,
  value20,
  value21,
  value22
) {
  console.log("value8", value8);
  console.log(
    value0,
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
    value8,
    value9,
    value10,
    value11,
    value12,
    value13,
    value14,
    value15,
    value16,
    value17,
    value18,
    value19,
    value20,
    value21,
    value22
    );
  let url = "Report.pdf";

  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes);

  // const zero = pdfDoc.getPages()[0];
  // const firstPage = pdfDoc.getPages()[1];
  const secondPage = pdfDoc.getPages()[2];
  const thirdPage = pdfDoc.getPages()[3];

  secondPage.drawText("Amount is in Lack", {
    x: 70,
    y: 440,
    size: 14,
    color: PDFLib.rgb(1, 0, 0),
  });

  // First Row
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 402,
    y: 332,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 472,
    y: 332,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 550,
    y: 332,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 624,
    y: 332,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value0).toString(), {
    x: 702,
    y: 332,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Second Row
  secondPage.drawText(formatNumberPDF(value1).toString(), {
    x: 402,
    y: 312,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value1).toString(), {
    x: 472,
    y: 312,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value2).toString(), {
    x: 550,
    y: 312,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value3).toString(), {
    x: 624,
    y: 312,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value3).toString(), {
    x: 702,
    y: 312,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Third Row
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 402,
    y: 292,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 472,
    y: 292,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 550,
    y: 292,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 624,
    y: 292,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value4).toString(), {
    x: 702,
    y: 292,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Fourth Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 402,
    y: 251,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 472,
    y: 251,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 550,
    y: 251,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 624,
    y: 251,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value5).toString(), {
    x: 702,
    y: 251,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Fifth Row
  secondPage.drawText(formatNumberPDF(value6).toString(), {
    x: 402,
    y: 230,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value6).toString(), {
    x: 472,
    y: 230,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 550,
    y: 230,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value6).toString(), {
    x: 624,
    y: 230,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value7).toString(), {
    x: 702,
    y: 230,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Sixth Row
  secondPage.drawText(formatNumberPDF(value8).toString(), {
    x: 402,
    y: 182,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 472,
    y: 182,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value8).toString(), {
    x: 550,
    y: 182,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value8).toString(), {
    x: 624,
    y: 182,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value8).toString(), {
    x: 702,
    y: 182,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Seventh Row
  secondPage.drawText(formatNumberPDF(value9).toString(), {
    x: 402,
    y: 148,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 472,
    y: 148,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value9).toString(), {
    x: 550,
    y: 148,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value9).toString(), {
    x: 624,
    y: 148,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value9).toString(), {
    x: 702,
    y: 148,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Eighth Row
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 402,
    y: 100,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 472,
    y: 100,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value10).toString(), {
    x: 550,
    y: 100,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 624,
    y: 100,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  secondPage.drawText(formatNumberPDF(value10).toString(), {
    x: 702,
    y: 100,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Nineth Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 402,
    y: 490,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 472,
    y: 490,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value11).toString(), {
    x: 550,
    y: 490,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value11).toString(), {
    x: 624,
    y: 490,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value11).toString(), {
    x: 702,
    y: 490,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Tenth Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 408,
    y: 448,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 480,
    y: 448,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 556,
    y: 448,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 628,
    y: 448,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value12).toString(), {
    x: 704,
    y: 448,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Eleventh Row
  thirdPage.drawText(formatNumberPDF(value13).toString(), {
    x: 408,
    y: 428,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value13).toString(), {
    x: 480,
    y: 428,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 556,
    y: 428,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value13).toString(), {
    x: 628,
    y: 428,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value14).toString(), {
    x: 704,
    y: 428,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Twelth Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 408,
    y: 400,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 480,
    y: 400,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 556,
    y: 400,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 628,
    y: 400,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value15).toString(), {
    x: 704,
    y: 400,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // common Questions
  // Thirteen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 408,
    y: 336,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 480,
    y: 336,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value16).toString(), {
    x: 556,
    y: 336,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 628,
    y: 336,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 704,
    y: 336,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Fourteen Row
  thirdPage.drawText(formatNumberPDF(value17).toString(), {
    x: 408,
    y: 306,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value17).toString(), {
    x: 480,
    y: 306,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 556,
    y: 306,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value17).toString(), {
    x: 628,
    y: 306,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value17).toString(), {
    x: 704,
    y: 306,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Fifteen Row
  thirdPage.drawText(formatNumberPDF(value18).toString(), {
    x: 408,
    y: 286,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value18).toString(), {
    x: 480,
    y: 286,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value18).toString(), {
    x: 556,
    y: 286,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value18).toString(), {
    x: 628,
    y: 286,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value18).toString(), {
    x: 704,
    y: 286,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Sixteen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 408,
    y: 264,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 480,
    y: 264,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 556,
    y: 264,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 628,
    y: 264,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value19).toString(), {
    x: 704,
    y: 264,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Seventeen Row
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 408,
    y: 244,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 480,
    y: 244,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 556,
    y: 244,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF("N/A").toString(), {
    x: 628,
    y: 244,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });
  thirdPage.drawText(formatNumberPDF(value20).toString(), {
    x: 704,
    y: 244,
    size: 12,
    color: PDFLib.rgb(0, 0, 0),
  });

  // Eighteen Row
    thirdPage.drawText(formatNumberPDF("N/A").toString(), {
      x: 408,
      y: 216,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });
    thirdPage.drawText(formatNumberPDF("N/A").toString(), {
      x: 480,
      y: 216,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });
    thirdPage.drawText(formatNumberPDF("N/A").toString(), {
      x: 556,
      y: 216,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });
    thirdPage.drawText(formatNumberPDF("N/A").toString(), {
      x: 628,
      y: 216,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });
    thirdPage.drawText(formatNumberPDF(value21).toString(), {
      x: 704,
      y: 216,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });

  // Nineteen Row
    thirdPage.drawText(formatNumberPDF("N/A").toString(), {
      x: 408,
      y: 184,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });
    thirdPage.drawText(formatNumberPDF("N/A").toString(), {
      x: 480,
      y: 184,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });
    thirdPage.drawText(formatNumberPDF("N/A").toString(), {
      x: 556,
      y: 184,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });
    thirdPage.drawText(formatNumberPDF("N/A").toString(), {
      x: 628,
      y: 184,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });
    thirdPage.drawText(formatNumberPDF(value22).toString(), {
      x: 704,
      y: 184,
      size: 12,
      color: PDFLib.rgb(0, 0, 0),
    });
  const pdfBytes = await pdfDoc.save();
  localStorage.setItem('sharedPDF', JSON.stringify(Array.from(pdfBytes)));

// Create blob from bytes
const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
const pdfUrl = URL.createObjectURL(pdfBlob);

  // const pdfUrl = URL.createObjectURL(
  //   new Blob([pdfBytes], { type: "application/pdf" })
  // );

  let modifiedPdfUrl = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`;

// Show the download button

const newTab = window.open('', '_blank');

if (!newTab) {
  alert('Popup blocked! Please allow popups for this site.');
  return;
}

newTab.document.write(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Optitx's Report</title>
      <!-- Link to external CSS file -->
      <link rel="stylesheet" href="style.css">
      <style>
        /* In-line styles if needed to override or add specific styles for the new tab's content */
        iframe {
             width: 60%;
    height: 100dvh;
    box-sizing: border-box;
    padding: 20px;
        }
          #toolbar{
          height: 60px;
          background-image: linear-gradient(rgba(37, 0, 110, 1), rgba(22, 0, 66, 1));
          display: flex;
          justify-content: center;
          gap: 50px;
          align-items: center;
        }
          button{
              padding: 10px;
    width: 100px;
    border: 0;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    }
    main{
    display:flex;
    font-family: "Open Sans";
    }

    aside{
    width:40%;
    height:100dvh;
    }
}
    aside.upcoming-tools {
    background: linear-gradient(135deg, #f0f4f8, #ffffff);
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    padding: 20px;
    max-width: 300px;
    font-family: 'Segoe UI', sans-serif;
  }

  aside.upcoming-tools h2 {
    font-size: 1.4em;
    margin-bottom: 15px;
    color: #333;
    border-bottom: 2px solid #ddd;
    padding-bottom: 5px;
  }

  .tool {
    margin-bottom: 15px;
    padding: 10px;
    border-left: 4px solid #4a90e2;
    background-color: #f9fbfd;
    border-radius: 6px;
    transition: background-color 0.3s ease;
  }

  .tool:hover {
    background-color: #eef5fc;
  }

  .tool-title {
    font-weight: bold;
    color: #2c3e50;
  }

  .tool-date {
    font-size: 0.85em;
    color: #7f8c8d;
  }
      </style>
    </head>
    <body>
      <div id="toolbar">
        <button onclick="downloadPDF()">Download</button>
      </div>
      <main>
      <iframe id="pdfFrame" src="${modifiedPdfUrl}"></iframe>
     <aside class="upcoming-tools">
  <h2>Upcoming Tools</h2>
  <div class="tool">
    <div class="tool-title">Ethenol Calculator</div>
    <div class="tool-date">Launching Soon</div>
  </div>
  <div class="tool">
    <div class="tool-title">Moowr Calculator</div>
    <div class="tool-date">Launching Soon</div>
  </div>
  <div class="tool">
    <div class="tool-title">Real-Time Calculation with AI</div>
    <div class="tool-date">Launching Soon</div>
  </div>
</aside>
      </main>
      <!-- Feedback Form -->
      <div id="custom-feedback-modal" class="modal-container">
        <div class="modal-box">
          <form action="https://formsubmit.co/sushant.atram@optitaxs.com" method="POST" id="feedback-form" class="feedback-form">
            <h2 class="form-title">We'd Love Your Feedback!</h2>
        
            <!-- Name Field -->
            <div class="form-group">
              <label for="user-name" class="form-label">Name</label>
              <input type="text" id="user-name" name="name" class="form-input" placeholder="Enter your name" required />
            </div>
        
            <!-- Email Field -->
            <div class="form-group">
              <label for="user-email" class="form-label">Email</label>
              <input type="email" id="user-email" name="email" class="form-input" placeholder="Enter your email" required />
            </div>
        
            <!-- Experience Feedback -->
            <div class="form-group">
              <label class="form-label">How was your experience with MOOWR Utility?</label>
              <div class="input-q">
                <label><input type="checkbox" name="experience" value="Great"> Great</label>
                <label><input type="checkbox" name="experience" value="Good"> Good</label>
                <label><input type="checkbox" name="experience" value="Average"> Average</label>
                <label><input type="checkbox" name="experience" value="Needs Improvement"> Needs Improvement</label>
              </div>
            </div>
        
            <!-- Additional Feedback -->
            <div class="form-group">
              <label for="user-feedback" class="form-label">Additional Feedback</label>
              <textarea id="user-feedback" name="feedback" class="form-input" rows="4" placeholder="Share your thoughts..." required></textarea>
            </div>
        
            <!-- Newsletter Opt-in -->
            <div class="form-group">
              <label for="newsletter-opt-in" class="form-label">Subscribe to our Newsletter?</label>
              <div class="checkbox-wrapper">
                <input type="checkbox" id="newsletter-opt-in" name="subscribeNewsletter" class="form-checkbox" />
                <label for="newsletter-opt-in">Yes, I want to stay updated!</label>
              </div>
            </div>
        
            <!-- Hidden Fields for FormSubmit -->
            <input type="hidden" name="_captcha" value="false">
            <input type="hidden" name="_autoresponse" value="Thank you for your feedback!">
            <input type="hidden" name="_next" value="http://127.0.0.1:5502/">
        
            <!-- Submit and Skip Buttons -->
            <div class="submit-skip">
              <div class="skip-btn" id="skip">Skip and Download</div>
              <button type="submit" id="submit-download" class="submit-btn">Submit & Download Report</button>
            </div>
          </form>
        </div>
      </div>

<script>
  function downloadPDF() {
    document.getElementById("custom-feedback-modal").style.display = "block";
  }

  let blobURLFromStorage = null;

  const stored = localStorage.getItem("sharedPDF");
  if (stored) {
    const byteArray = new Uint8Array(JSON.parse(stored));
    const blob = new Blob([byteArray], { type: "application/pdf" });
    blobURLFromStorage = URL.createObjectURL(blob);
    const frame = document.getElementById("pdfFrame");
    if (frame) {
      frame.src = blobURLFromStorage + "#toolbar=0&navpanes=0&scrollbar=0";
    }
  }

  function downloadPDF1() {
    const downloadUrl = blobURLFromStorage || document.getElementById('pdfFrame').src;
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = "Optitx's Report.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setTimeout(function () {
      if (window.opener && !window.opener.closed) {
        window.opener.location.reload();
      }
      window.close();
    }, 1000);
    localStorage.removeItem("sharedPDF");
  }

  document.getElementById("skip").addEventListener("click", function () {
    document.getElementById("custom-feedback-modal").style.display = "none";
    downloadPDF1();
  });

  document.getElementById("submit-download").addEventListener("click", function () {
    document.getElementById("custom-feedback-modal").style.display = "none";
    downloadPDF1();
    setTimeout(function () {
      location.reload();
    }, 5000);
  });
</script>

    </body>
  </html>
`);

newTab.document.close();

}  

  // document.getElementById("skip").addEventListener("click", function () {
  //   document.getElementById("custom-feedback-modal").style.display = "none";
  //   downloadPDF(pdfUrl);
  // });
  
  // document.getElementById("submit-download").addEventListener("click", function () {
  //   document.getElementById("custom-feedback-modal").style.display = "none";
  //   downloadPDF(pdfUrl);
  //   setTimeout(function () {
  //     location.reload();
  //   }, 5000);
  // });


  // Function to download PDF in another tab
//   function downloadPDF(url) {
//     let a = document.createElement("a");
//     a.href = url;
//     a.target = "_blank"; // Opens in a new tab
//     a.download = "document.pdf"; // Suggested filename
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   }
  


// async function downloadPDF(pdfUrl) {
//   const link = document.createElement("a");
//   link.href = pdfUrl;
//   link.download = "Optitx's Report.pdf";
//   link.target = '_blank'
//   link.click();
//   setTimeout(function () {
//     location.reload();
//   }, 1000);
// }

// function getScript(){
//     // import the script from the 
//     console.log("Script Loadeddd");
  
//   }