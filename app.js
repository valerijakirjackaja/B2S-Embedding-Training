console.log("Hello from Back 2 School!");

// TO DO
// 1. Create a URL variable for storing the dasbhoard
// 2. Grab the container from the HTML
// 3. Set soem dashboard optuins (width, height, etc)

const url =
  "https://public.tableau.com/views/MonthlyPerformanceOverview/MonthlyPerformanceOverview";
const vizContainer = document.getElementById("vizContainer");
const vizOptions = {
  device: "desktop",
  Department: ["Financial Services", "Commercial"], //filtering before dashboard loads
};
let viz;
//1. Grab button from HTML
const pdfButton = document.getElementById("exportPDF");
const pptButton = document.getElementById("exportPPT");

function initViz() {
  console.log("Hello from initViz");
  viz = new tableau.Viz(vizContainer, url, vizOptions);
}

//2. Create a fcuntion to generate PDF
function exportPDF() {
  console.log("Generating a PDF...");
  viz.showExportPDFDialog();
}

//  Create a function to generate PPT
function exportPPT() {
  console.log("Generating a PPT...");
  viz.showExportPowerPointDialog();
}

//function to grab filter values
function getRangeValues() {
  //get values from input boxes
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  //get the workbook
  const workbook = viz.getWorkbook();
  //get active sheet - dashaboard
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorkseets();
  const sheetToFilter = sheets[1]; //need to link sheets in the dashboard
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)"),
    {
      min: minValue,
      max: maxValue,
    };
}

//wait till content has loaded and execute initViz
document.addEventListener("DOMContentLoaded", initViz);
pdfButton.addEventListener("click", exportPDF);
pptButton.addEventListener("click", exportPPT);

//filter the dashboard for sales
document
  .getElementById("filterButton")
  .addEventListener("click", getRangeValues);
