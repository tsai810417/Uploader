import moment from 'moment-timezone';
import Papa from 'papaparse';
import appConfig, { memoString } from '../config';

export default function LibreParser(file, productId) {
  let records = [];
  const convertToRecords = data => {
    const timeZone = appConfig.timeZone;
    data.forEach(record => {
      if (record[4] || record[5]) {
        const utcTime = moment(record[2], "DD-MM-YYYY HH:mm").tz(timeZone).toISOString();

        records.push({
          recorded_at: utcTime,
          product_glycemia_id: productId,
          glycemia: parseInt(record[4]) || parseInt(record[5]),
          memo: memoString
        });
      }
    });

    return records;
  }

  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      skipEmptyLines: true,
      complete: function(results) {
        let data = results.data;
        resolve(convertToRecords(data.slice(2)));
      }
    })
  })
}
