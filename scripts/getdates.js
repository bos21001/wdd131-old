/**
 * JavaScript
 * Reference the "getdates.js" JavaScript file by using a <script> reference in the head of the HTML file and using the attribute defer.
 * Why is the defer boolean attribute important?
 * How else can we successful reference and employ JavaScript?
 * In getdates.js, write JavaScript statements that dynamically output the following:
 * the copyright year (the current year) in the footer's first paragraph, and
 * Note this CodePen summary of using the Date object in different ways.
 * the date the document was last modified in the second paragraph.
 * Use the lastModified property of the document object to get this date/time dynamically.
 * You do not need to alter the document.lastModified native format.
 */

// Get the current year
let currentYear = new Date().getFullYear();
// Get the last modified date
let lastModified = document.lastModified;

// Output the current year and last modified date
document.getElementById("currentYear").textContent = currentYear;
document.getElementById("lastModified").textContent = `Last Modification: ${lastModified}`;