let DutyPayble = ((2.2 - 11.1) / 22.2) * 1.7;
let totalCost = 2 + 1.7;
let IGSTinterest = ((totalCost * 15) / 100) * 7;

let EO = 259000000
let igst = 20000000;
let totalDuty = 17000000
let totalExport = 103000000
let UEO = EO - totalExport;
let per = UEO/EO * totalDuty;
console.log("per", per);
console.log("UEO", UEO);

let interest = ((igst+igst * 15) / 100) * 7;
console.log("interest", interest);

let totalDutyPayablewithinterestOnunfullfilledEO =interest + per;
console.log(
  "totalDutyPayablewithinterestOnunfullfilledEO",
  totalDutyPayablewithinterestOnunfullfilledEO
);

let totalNVP = totalDutyPayablewithinterestOnunfullfilledEO;
// let totalNVP = 4.48;
let E2 = 0;
for (let i = 0; i < 7; i++) {
  if (E2 == 0) {
    E2 = 9 / 100 + 1;
  } else {
    E2 = E2 * (9 / 100 + 1);
  }
}
console.log("E2", totalNVP / E2);


