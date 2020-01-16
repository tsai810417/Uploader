import { LogRecordType, HistoryLogRecordType } from './LogRecord';
import * as IBFRecordReader from './IBFRecordReader';
import * as LogRecordParser from './LogRecordParser';

export default function IBFReader(file, productId) {
  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise((resolve, reject) => {
    let pumpRecords = [];
    reader.onload = function(e) {
      let buffer = Buffer.from(e.target.result);
      let recordCount = -18;
      let record;
      while (true) {
        [record, buffer] = IBFRecordReader.readIBFRecord(buffer);
        if (record === null || buffer.length === 0) {
          break;
        }
        recordCount++;
        if (recordCount >= 0) {
          let [err, parsed] = LogRecordParser.parseLogRecord(record);
          if (err) {
            // console.log(err);
            // reject(err);
          } else {
            let recordType;
            if (typeof parsed["historyLogRecordType"] !== 'undefined') {
              recordType = Object.keys(HistoryLogRecordType).find(key => HistoryLogRecordType[key] === parsed.historyLogRecordType);
            } else {
              recordType = Object.keys(LogRecordType).find(key => LogRecordType[key] === parsed.logType);
            }
            if (recordType === 'BASAL_RATE') {
              pumpRecords.push({
                recorded_at: parsed.timestamp,
                product_pump_id: productId,
                slow_insulin: parsed.basalRatePerHour
              })
            }
          }
        }
      }
      resolve(pumpRecords);
    };
  });
}
