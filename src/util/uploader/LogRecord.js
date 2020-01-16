export class LogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error
  ) {
    this.logType = logType;
    this.logIndex = logIndex;
    this.timestamp = timestamp;
    this.secondsSincePowerUp = secondsSincePowerUp;
    this.error = error;
  }
}

export const LogRecordType = {
  HISTORY: 0x03,
  PUMP_ALARM: 0x05
};

export const LogRecordError = {
  NO_ERR: 0,
  GET_EEPROM_ERR: 3,
  CRC_ERR: 4,
  LOG_INDEX_ERR: 6,
  REC_SIZE_ERR: 8
};

export class HistoryLogRecord extends LogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error
    );
    this.historyLogRecordType = historyLogRecordType;
    this.flags = flags;
  }
}

export const HistoryLogRecordType = {
  END_MARKER: 0x0000,
  DEACTIVATE: 0x0001,
  TIME_CHANGE: 0x0002,
  BOLUS: 0x0004,
  BASAL_RATE: 0x0008,
  SUSPEND: 0x0010,
  DATE_CHANGE: 0x0020,
  SUGGESTED_CALC: 0x0040,
  REMOTE_HAZARD_ALARM: 0x0080,
  ALARM: 0x0400,
  BLOOD_GLUCOSE: 0x0800,
  CARB: 0x1000,
  TERMINATE_BOLUS: 0x2000,
  TERMINATE_BASAL: 0x4000,
  ACTIVATE: 0x8000,
  RESUME: 0x10000,
  DOWNLOAD: 0x20000,
  OCCLUSION: 0x40000,
  values: function() {
    return [
      HistoryLogRecordType.END_MARKER,
      HistoryLogRecordType.DEACTIVATE,
      HistoryLogRecordType.TIME_CHANGE,
      HistoryLogRecordType.BOLUS,
      HistoryLogRecordType.BASAL_RATE,
      HistoryLogRecordType.SUSPEND,
      HistoryLogRecordType.DATE_CHANGE,
      HistoryLogRecordType.SUGGESTED_CALC,
      HistoryLogRecordType.REMOTE_HAZARD_ALARM,
      HistoryLogRecordType.ALARM,
      HistoryLogRecordType.BLOOD_GLUCOSE,
      HistoryLogRecordType.CARB,
      HistoryLogRecordType.TERMINATE_BOLUS,
      HistoryLogRecordType.TERMINATE_BASAL,
      HistoryLogRecordType.ACTIVATE,
      HistoryLogRecordType.RESUME,
      HistoryLogRecordType.DOWNLOAD,
      HistoryLogRecordType.OCCLUSION
    ];
  }
};

export const HistoryLogRecordFlag = {
  CARRY_OVER: 0x01,
  NEW_DAY: 0x02,
  IN_PROGRESS: 0x04,
  END_DAY: 0x08,
  UNCONFIRMED: 0x10,
  REVERSE_CORR: 0x0100,
  MAX_BOLUS: 0x0200,
  ERROR: 0x80000000,
  values: function() {
    return [
      HistoryLogRecordFlag.CARRY_OVER,
      HistoryLogRecordFlag.NEW_DAY,
      HistoryLogRecordFlag.IN_PROGRESS,
      HistoryLogRecordFlag.END_DAY,
      HistoryLogRecordFlag.UNCONFIRMED,
      HistoryLogRecordFlag.REVERSE_CORR,
      HistoryLogRecordFlag.MAX_BOLUS,
      HistoryLogRecordFlag.ERROR
    ];
  }
};

export class DateChangeLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    newDate
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags
    );
    this.newDate = newDate;
  }
}

export class TimeChangeLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    newTime
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags
    );
    this.newTime = newTime;
  }
}

export class BasalLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    basalRatePerHour,
    durationInMinutes,
    percent
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags
    );
    this.basalRatePerHour = basalRatePerHour;
    this.durationInMinutes = durationInMinutes;
    this.percent = percent;
  }
}

export class BolusLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    units,
    extendedDurationMinutes,
    calculationRecordOffset,
    immediateDurationSeconds
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags
    );
    this.units = units;
    this.extendedDurationMinutes = extendedDurationMinutes;
    this.calculationRecordOffset = calculationRecordOffset;
    this.immediateDurationSeconds = immediateDurationSeconds;
    this.extended = (calculationRecordOffset === 65535);
  }
}

export class SuggestedCalculationLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    correctionDelivered,
    carbBolusDelivered,
    correctionProgrammed,
    carbBolusProgrammed,
    correctionSuggested,
    carbBolusSuggested,
    correctionJob,
    mealJob,
    correctionFactorUsed,
    currentBG,
    targetBG,
    correctionThresholdBG,
    carbGrams,
    icRatioUsed
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags
    );
    this.correctionDelivered = correctionDelivered;
    this.carbBolusDelivered = carbBolusDelivered;
    this.correctionProgrammed = correctionProgrammed;
    this.carbBolusProgrammed = carbBolusProgrammed;
    this.correctionSuggested = correctionSuggested;
    this.carbBolusSuggested = carbBolusSuggested;
    this.correctionJob = correctionJob;
    this.mealJob = mealJob;
    this.correctionFactorUsed = correctionFactorUsed;
    this.currentBG = currentBG;
    this.targetBG = targetBG;
    this.correctionThresholdBG = correctionThresholdBG;
    this.carbGrams = carbGrams;
    this.icRatioUsed = icRatioUsed;
  }
}

export class AlarmLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    alarmTime,
    alarmType,
    fileNumber,
    lineNumber,
    alarmErrorCode
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags
    );
    this.alarmTime = alarmTime;
    this.alarmType = alarmType;
    this.fileNumber = fileNumber;
    this.lineNumber = lineNumber;
    this.alarmErrorCode = alarmErrorCode;
  }
}

export class RemoteHazardAlarmLogRecord extends AlarmLogRecord {
  constructor(props) {
    super(props)
  }
}

export const BloodGlucoseFlag = {
  MANUAL_FLAG: 0x01,
  TEMPERATURE_FLAG: 0x02,
  BELOW_TARGET_FLAG: 0x04,
  ABOVE_TARGET_FLAG: 0x08,
  RANGE_ERROR_LOW_FLAG: 0x10,
  RANGE_ERROR_HIGH_FLAG: 0x20,
  OTHER_ERROR_FLAG: 0x40,
  values: function() {
    return [
      BloodGlucoseFlag.MANUAL_FLAG,
      BloodGlucoseFlag.TEMPERATURE_FLAG,
      BloodGlucoseFlag.BELOW_TARGET_FLAG,
      BloodGlucoseFlag.ABOVE_TARGET_FLAG,
      BloodGlucoseFlag.RANGE_ERROR_LOW_FLAG,
      BloodGlucoseFlag.RANGE_ERROR_HIGH_FLAG,
      BloodGlucoseFlag.OTHER_ERROR_FLAG
    ];
  },
  fromBitSet: function(bits) {
    return new Set(BloodGlucoseFlag.values().filter(bgFlag => (bgFlag & bits) !== 0));
  }
};

export class BloodGlucoseLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    errorCode,
    bgReading,
    userTag1,
    userTag2,
    bgFlags
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags,
    );
    this.errorCode = errorCode;
    this.bgReading = bgReading;
    this.userTag1 = userTag1;
    this.userTag2 = userTag2;
    this.bgFlags = bgFlags;
  }
}

export class CarbLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    carbs,
    wasPreset,
    presetType
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags,
    );
    this.carbs = carbs;
    this.wasPreset = wasPreset;
    this.presetType = presetType;
  }
}

export class TerminateBolusLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    insulinLeft,
    timeLeftMinutes
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags,
    );
    this.insulinLeft = insulinLeft;
    this.timeLeftMinutes = timeLeftMinutes;
  }
}

export class TerminateBasalLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    timeLeftMinutes
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags
    );
    this.timeLeftMinutes = timeLeftMinutes;
  }
}

export class ActivateLogRecord extends HistoryLogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    historyLogRecordType,
    flags,
    lotNumber,
    serialNumber,
    podVersion,
    interlockVersion
  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error,
      historyLogRecordType,
      flags
    );
    this.lotNumber = lotNumber;
    this.serialNumber = serialNumber;
    this.podVersion = podVersion;
    this.interlockVersion = interlockVersion;
  }
}

export class PumpAlarmDetails extends LogRecord {
  constructor(
    logType,
    logIndex,
    timestamp,
    secondsSincePowerUp,
    error,
    alarmTimestamp,
    alarmType,
    alarmErrorCode,
    lotNumber,
    sequenceNumber,
    processorVersion,
    interlockVersion

  ) {
    super(
      logType,
      logIndex,
      timestamp,
      secondsSincePowerUp,
      error
    );
    this.alarmTimestamp = alarmTimestamp;
    this.alarmType = alarmType;
    this.alarmErrorCode = alarmErrorCode;
    this.lotNumber = lotNumber;
    this.sequenceNumber = sequenceNumber;
    this.processorVersion = processorVersion;
    this.interlockVersion = interlockVersion;
  }
}

export class AlarmType {
  constructor(
    id,
    explanation,
    stopsDelivery
  ) {
    this.id = id;
    this.explanation = explanation;
    this.stopsDelivery = stopsDelivery;
  }

  static forID(id) {
    return this.values().find(alarmType => alarmType.id === id);
  }

  static values() {
    return [
      AlarmType.PDM_ERROR0,
      AlarmType.PDM_ERROR1,
      AlarmType.PDM_ERROR2,
      AlarmType.PDM_ERROR3,
      AlarmType.PDM_ERROR4,
      AlarmType.PDM_ERROR5,
      AlarmType.PDM_ERROR6,
      AlarmType.PDM_ERROR7,
      AlarmType.PDM_ERROR8,
      AlarmType.PDM_ERROR9,
      AlarmType.SYSTEM_ERROR10,
      AlarmType.UNKNOWN11,
      AlarmType.SYSTEM_ERROR12,
      AlarmType.HAZ_REMOTE,
      AlarmType.HAZ_PUMP_VOL,
      AlarmType.HAZ_PUMP_AUTO_OFF,
      AlarmType.HAZ_PUMP_EXPIRED,
      AlarmType.HAZ_PUMP_OCCL,
      AlarmType.HAZ_PUMP_ACTIVATE,
      AlarmType.UNKNOWN19,
      AlarmType.UNKNOWN20,
      AlarmType.ADV_KEY,
      AlarmType.UNKNOWN22,
      AlarmType.ADV_PUMP_VOL,
      AlarmType.ADV_PUMP_AUTO_OFF,
      AlarmType.ADV_PUMP_SUSPEND,
      AlarmType.ADV_PUMP_EXP1,
      AlarmType.ADV_PUMP_EXP2,
      AlarmType.SYSTEM_ERROR28,
      AlarmType.EXP_WARNING,
      AlarmType.HAZ_PDM_AUTO_OFF
    ];
  }

  static PDM_ERROR0 = new AlarmType(0, "PDM error", null);
  static PDM_ERROR1 = new AlarmType(1, "PDM error", null);
  static PDM_ERROR2 = new AlarmType(2, "PDM error", null);
  static PDM_ERROR3 = new AlarmType(3, "PDM error", null);
  static PDM_ERROR4 = new AlarmType(4, "PDM error", null);
  static PDM_ERROR5 = new AlarmType(5, "PDM error", null);
  static PDM_ERROR6 = new AlarmType(6, "PDM error", null);
  static PDM_ERROR7 = new AlarmType(7, "PDM error", null);
  static PDM_ERROR8 = new AlarmType(8, "PDM error", null);
  static PDM_ERROR9 = new AlarmType(9, "PDM error", null);
  static SYSTEM_ERROR10 = new AlarmType(10, "system error", false);
  static UNKNOWN11 = new AlarmType(11, "Unknown alarm type", null);
  static SYSTEM_ERROR12 = new AlarmType(12, "system error", null);
  static HAZ_REMOTE = new AlarmType(13, "clock reset alarm", false);
  static HAZ_PUMP_VOL = new AlarmType(14, "empty reservoir", true);
  static HAZ_PUMP_AUTO_OFF = new AlarmType(15, "auto-off", true);
  static HAZ_PUMP_EXPIRED = new AlarmType(16, "pod expired", true);
  static HAZ_PUMP_OCCL = new AlarmType(17, "pump site occluded", true);
  static HAZ_PUMP_ACTIVATE = new AlarmType(18, "pod is a lump of coal", false);
  static UNKNOWN19 = new AlarmType(19, "Unknown alarm type", null);
  static UNKNOWN20 = new AlarmType(20, "Unknown alarm type", null);
  static ADV_KEY = new AlarmType(21, "PDM stuck key detected", false);
  static UNKNOWN22 = new AlarmType(22, "Unknown alarm type", null);
  static ADV_PUMP_VOL = new AlarmType(23, "low reservoir", false);
  static ADV_PUMP_AUTO_OFF = new AlarmType(24, "15 minutes to auto-off warning", false);
  static ADV_PUMP_SUSPEND = new AlarmType(25, "suspend done", false);
  static ADV_PUMP_EXP1 = new AlarmType(26, "pod expiration advisory", false);
  static ADV_PUMP_EXP2 = new AlarmType(27, "pod expiration alert", false);
  static SYSTEM_ERROR28 = new AlarmType(28, "system error", null);
  static EXP_WARNING = new AlarmType(37, "pod expiration advisory", false);
  static HAZ_PDM_AUTO_OFF = new AlarmType(39, "auto-off", true);
}
