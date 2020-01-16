import { IBFRecord } from "./IBFRecord";

function readIBFRecord(buffer) {
  let remainingBytes = buffer.length;
  if (remainingBytes < 4) {
    return [null, buffer];
  }

  let recordSize = buffer.readUInt16BE(0);
  if (remainingBytes < recordSize + 2) {
    return [null, buffer];
  }

  let data = buffer.slice(2, recordSize);
  let checksum = new Int32Array(1);
  data.forEach(value => {
    checksum[0] += (value & 0xff);
  });

  let expectedChecksum = buffer.readUInt16BE(recordSize);
  if (checksum[0] !== expectedChecksum) {
    let loggedData = [
      'expectedChecksum = ' + expectedChecksum,
      'actualChecksum = ' + checksum,
      'recordSize = ' + recordSize,
      'bytes = ' + data.toString('hex')
    ];
    throw Error('IBFIntegrityException: checksum(' + loggedData.join(', ') + ')');
  }

  return [new IBFRecord(data), buffer.slice(recordSize + 2, buffer.length)];
}

export { readIBFRecord };
