import _ from 'lodash';
import XLSX from 'xlsx';

/**
   * parse sheet data to json form
   */
export function toJSON(workbook) {
  const result = {};

  workbook.SheetNames.forEach(sheetName => {
    var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
    if (roa.length > 0) result[sheetName] = roa;
  });
  return result;
}

/**
 * remove file on local
 */
export function removeFile(fileName) {
  localStorage.removeItem(fileName);
}

/**
 * remove all files
 */
export function removeAllFiles() {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    removeFile(key);
  });
}

/**
 * load file with key
 */
export function getFile(key) {
  const keys = Object.keys(localStorage);
  if (keys.indexOf(key) === -1) return null;
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Get all files
 */
export function getAllFiles() {
  const keys = Object.keys(localStorage);
  const result = [];
  keys.forEach(key => {
    result.push({ name: key, data: getFile(key) });
  });
  return result;
}

/**
 * Save file
 * @param {string} key 
 * @param {any} content 
 */
export function saveFile(key, content) {
  let out = _.cloneDeep(content);
  if (typeof(out) !== 'string') out = JSON.stringify(out);
  localStorage.setItem(key, out);
}
