/**
 * =========================================================================
 * GOOGLE APPS SCRIPT: SparkLens Waitlist to Google Sheet
 * =========================================================================
 * 
 * Instructions to connect your Google Sheet in 2 minutes:
 * 1. Open Google Sheets (https://sheets.new) and create a new sheet named "SparkLens Waitlist".
 * 2. In row 1, add headers:
 *    Column A: Timestamp
 *    Column B: Email
 *    Column C: Source
 * 3. In Google Sheets menu, click: Extensions -> Apps Script
 * 4. Paste the code below into Code.gs:
 * 
 * -------------------------------------------------------------------------
 * function doPost(e) {
 *   try {
 *     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
 *     var data = JSON.parse(e.postData.contents);
 *     var timestamp = data.timestamp || new Date().toISOString();
 *     var email = data.email || '';
 *     var source = data.source || 'Landing Page';
 *     
 *     sheet.appendRow([timestamp, email, source]);
 *     
 *     return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   } catch (error) {
 *     return ContentService.createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
 *       .setMimeType(ContentService.MimeType.JSON);
 *   }
 * }
 * -------------------------------------------------------------------------
 * 
 * 5. Click "Deploy" (top right) -> "New deployment"
 * 6. Select type: "Web app"
 * 7. Set "Execute as": "Me"
 * 8. Set "Who has access": "Anyone" (important for web form submissions)
 * 9. Click "Deploy", copy the Web App URL (starts with https://script.google.com/macros/s/...)
 * 10. Add it to your Frontend/.env file:
 *     VITE_GOOGLE_SHEET_URL=https://script.google.com/macros/s/your_script_id/exec
 */

