class IBFRecord {
  constructor(buffer) {
    this.buffer = buffer;
  }

  byteReader() {
    return new IBFByteReader(this.buffer);
  }
}

class Version {
  constructor(major, minor, patch) {
    this.major = major;
    this.minor = minor;
    this.patch = patch;
  }
}

class IBFByteReader {
  constructor(buffer) {
    this.buffer = buffer;
    this.offset = 0;
  }
  /* the number of bytes left in the IBFRecord that have not been consumed. */
  remaining() {
    return this.buffer.length - this.offset;
  }

  /* skips the specified number of bytes. */
  skip(n) {
    this.offset += n;
  }

  /* the next byte (int8) */
  nextInt8() {
    let value = this.buffer.readInt8(this.offset);
    this.offset += 1;
    return value;
  }

  /* the next unsigned short (uint16) in little-endian format */
  nextUInt16LE() {
    let value = this.buffer.readUInt16LE(this.offset);
    this.offset += 2;
    return value;
  }

  /* the next unsigned short (uint16) in big-endian format */
  nextUInt16BE() {
    let value = this.buffer.readUInt16BE(this.offset);
    this.offset += 2;
    return value;
  }

  /* the next signed short (int16) in little-endian format */
  nextInt16LE() {
    let value = this.buffer.readInt16LE(this.offset);
    this.offset += 2;
    return value;
  }

  /* the next signed short (int16) in big-endian format */
  nextInt16BE() {
    let value = this.buffer.readInt16BE(this.offset);
    this.offset += 2;
    return value;
  }

  /* the next unsigned integer (uint32) in little-endian format */
  nextUInt32LE() {
    let value = this.buffer.readUInt32LE(this.offset);
    this.offset += 4;
    return value;
  }

  /* the next unsigned integer (uint32) in big-endian format */
  nextUInt32BE() {
    let value = this.buffer.readUInt32BE(this.offset);
    this.offset += 4;
    return value;
  }

  /* the next signed integer (int32) in little-endian format */
  nextInt32LE() {
    let value = this.buffer.readInt32LE(this.offset);
    this.offset += 4;
    return value;
  }

  /* the next signed integer (int32) in big-endian format */
  nextInt32BE() {
    let value = this.buffer.readInt32BE(this.offset);
    this.offset += 4;
    return value;
  }

  /* the next date (Y-m-d H:m:s), inferred to be in the local time zone */
  nextDate() {
    if (this.remaining() < 7) {
      return null;
    }

    let day = this.nextInt8();
    let month = this.nextInt8();
    let year = this.nextUInt16LE();
    let seconds = this.nextInt8();
    let minutes = this.nextInt8();
    let hours = this.nextInt8();

    return new Date(year, month - 1, day, hours, minutes, seconds);
  }

  /* the next version, as major.minor.patch with numerical components */
  nextVersion() {
    if (this.remaining() < 3) {
      return null;
    }

    let major = this.nextInt8();
    let minor = this.nextInt8();
    let patch = this.nextInt8();

    return new Version(major, minor, patch);
  }

  /*
   * nextString reads a null-terminated string from a fixed-width field.
   *
   * Any bytes after the first null byte in the fixed-width field will be ignored.
   */
  nextString(fixedLength) {
    let idx = this.offset;
    while (this.buffer[idx] !== 0x00) {
      idx++;
    }
    let strBuffer = this.buffer.slice(this.offset, idx);
    this.offset += fixedLength;
    return strBuffer.toString('latin1');
  }
}

export { IBFRecord, Version, IBFByteReader }
