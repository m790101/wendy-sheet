const SHEET_ID = '1JOI3bsoUtouqjy83TKuCyYPOo9TuF5_bPV_kevu0P_I'
const API_KEY = 'AIzaSyC2OHK_UbyA63pz6rnON7JeT-RgTgrjwdQ'
const SHEET_NAME = 'sheet1'
const CLIENT_ID = '959759694370-q9mnos3o0pkoqocavsmr1h0d86hvt5h8.apps.googleusercontent.com'
const SHEET_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?alt=json&key=${API_KEY}`

const GOOGLE_SCRIPT = `https://script.google.com/macros/s/AKfycby_F9vlssFMQ6pTDgELPUNX6lptFDTDSlRkkrKfdHflgeKYZsdwwsxJ8O6aJXMbBuSG/exec`

// example:
// https://sheets.googleapis.com/v4/spreadsheets/{表單id}/values/{sheet名稱}?alt=json&key={API金鑰}

// wendy-chart = 
// https://sheets.googleapis.com/v4/spreadsheets/1JOI3bsoUtouqjy83TKuCyYPOo9TuF5_bPV_kevu0P_I/values/sheet1?alt=json&key=AIzaSyC2OHK_UbyA63pz6rnON7JeT-RgTgrjwdQ

// google script 
// https://script.google.com/macros/s/AKfycbxynImK8qt1JoDwjgjOqwZCoJ4NpgYmG9rZkI5LOD2s8ASGMTNd51LqoL9hWMtqFxl0/exec

//https://script.google.com/macros/library/d/1OTHvJVOqhGUyKMNjP_dkxg4BMxV4GqaXhEA0AO-HE6TiFBRy6B1Alq59/1

export { SHEET_URL , API_KEY, GOOGLE_SCRIPT, SHEET_ID, SHEET_NAME,CLIENT_ID}