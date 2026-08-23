const SPREADSHEET_ID = '1aIhmrdCgidSBxN4zla-z65tfmftpZhoaMVVyOkWkMs8';
const SHEET_NAME = 'Digests';

function doGet(e) {
  const expected = PropertiesService.getScriptProperties().getProperty('DIGEST_DATA_KEY');
  const supplied = e && e.parameter ? e.parameter.key : '';
  if (!expected || supplied !== expected) {
    return ContentService.createTextOutput(JSON.stringify({error:'unauthorized'}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const values = sheet.getDataRange().getDisplayValues();
  if (values.length < 2) {
    return ContentService.createTextOutput(JSON.stringify({items:[]}))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const headers = values[0];
  const items = values.slice(1)
    .filter(row => row.some(cell => cell !== ''))
    .map(row => headers.reduce((obj, header, i) => {
      obj[header] = row[i] || '';
      return obj;
    }, {}));

  return ContentService.createTextOutput(JSON.stringify({items:items}))
    .setMimeType(ContentService.MimeType.JSON);
}
