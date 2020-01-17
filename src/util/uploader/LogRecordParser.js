import {
  ActivateLogRecord,
  AlarmLogRecord,
  AlarmType,
  BasalLogRecord,
  BloodGlucoseFlag,
  BloodGlucoseLogRecord,
  BolusLogRecord,
  CarbLogRecord,
  DateChangeLogRecord,
  HistoryLogRecord,
  HistoryLogRecordFlag,
  HistoryLogRecordType,
  // LogRecord,
  LogRecordType,
  PumpAlarmDetails,
  RemoteHazardAlarmLogRecord,
  SuggestedCalculationLogRecord,
  TerminateBasalLogRecord,
  TerminateBolusLogRecord,
  TimeChangeLogRecord
} from './LogRecord';

export function parseLogRecord(ibfRecord) {
  let it = ibfRecord.byteReader();
  if (it.remaining() < 18) {
    return [
      Error('Insufficient data: ' + it.remaining()),
      null
    ];
  }

  let logType = it.nextInt8();

  if (logType !== LogRecordType.HISTORY && logType !== LogRecordType.PUMP_ALARM) {
    return [
      Error('Unknown log record type: ' + logType),
      null
    ];
  }

  let logIndex = it.nextInt32BE();
  let recordSize = it.nextUInt16BE();
  let errorCode = it.nextUInt16BE();
  let timestamp = it.nextDate();

  it.skip(1);

  let secondsSincePowerUp = it.nextUInt32LE();
  // declare all the variables might needed
  let basalRatePerHour,
  durationInMinutes,
  percent,
  units,
  extendedDurationMinutes,
  calculationRecordOffset,
  immediateDurationSeconds,
  newDate,
  newTime,
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
  icRatioUsed,
  alarmTime,
  alarmType,
  fileNumber,
  lineNumber,
  alarmErrorCode,
  bgErrorCode,
  bgReading,
  userTag1,
  userTag2,
  bgFlagsValue,
  carbs,
  wasPreset,
  presetType,
  insulinLeft,
  timeLeftMinutes,
  lotNumber,
  serialNumber,
  podVersion,
  interlockVersion,
  alarmTimestamp,
  alarmTypeID,
  seqNumber,
  processorVersion

  switch (logType) {
    case LogRecordType.HISTORY:
      let historyLogRecordType = it.nextInt32LE();
      let foundRecordType = HistoryLogRecordType.values().find(value => value === historyLogRecordType);
      if (foundRecordType === undefined) {
        return [
          Error('Unknown history log record type: ' + historyLogRecordType),
          null
        ];
      }

      let historyLogRecordFlagsValue = it.nextUInt16LE();
      let historyLogRecordFlags = HistoryLogRecordFlag.values().filter(flag => (flag & historyLogRecordFlagsValue) !== 0);

      it.skip(2);

      switch (historyLogRecordType) {
        case HistoryLogRecordType.BASAL_RATE:
          basalRatePerHour = it.nextUInt32LE() / 100;
          durationInMinutes = it.nextUInt16LE();
          percent = it.nextUInt16LE() / 100;

          return [
            null,
            new BasalLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              basalRatePerHour,
              durationInMinutes,
              percent
            )
          ];

        case HistoryLogRecordType.BOLUS:
          units = it.nextUInt32LE() / 100;
          extendedDurationMinutes = it.nextUInt16LE();
          calculationRecordOffset = it.nextUInt16LE();
          immediateDurationSeconds = it.nextUInt16LE();

          return [
            null,
            new BolusLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              units,
              extendedDurationMinutes,
              calculationRecordOffset,
              immediateDurationSeconds
            )
          ];

        case HistoryLogRecordType.DATE_CHANGE:
          newDate = it.nextDate();

          return [
            null,
            new DateChangeLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              newDate
            )
          ];

        case HistoryLogRecordType.TIME_CHANGE:
          newTime = it.nextDate();

          return [
            null,
            new TimeChangeLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              newTime
            )
          ];

        case HistoryLogRecordType.SUGGESTED_CALC:
          correctionDelivered = it.nextUInt32LE() / 100;
          carbBolusDelivered = it.nextUInt32LE() / 100;
          correctionProgrammed = it.nextUInt32LE() / 100;
          carbBolusProgrammed = it.nextUInt32LE() / 100;
          correctionSuggested = it.nextUInt32LE() / 100;
          carbBolusSuggested = it.nextUInt32LE() / 100;
          correctionJob = it.nextUInt32LE();
          mealJob = it.nextUInt32LE();
          correctionFactorUsed = it.nextUInt16LE();
          currentBG = it.nextUInt16LE();
          targetBG = it.nextUInt16LE();
          correctionThresholdBG = it.nextUInt16LE();
          carbGrams = it.nextUInt16LE();
          icRatioUsed = it.nextUInt16LE();

          return [
            null,
            new SuggestedCalculationLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
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
            )
          ];

        case HistoryLogRecordType.REMOTE_HAZARD_ALARM:
          alarmTime = it.nextDate();
          it.skip(1);
          alarmType = it.nextUInt16LE();
          fileNumber = it.nextUInt16LE();
          lineNumber = it.nextUInt16LE();
          alarmErrorCode = it.nextUInt16LE();

          return [
            null,
            new RemoteHazardAlarmLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              alarmTime,
              alarmType,
              fileNumber,
              lineNumber,
              alarmErrorCode
            )
          ];

        case HistoryLogRecordType.ALARM:
          alarmTime = it.nextDate();
          it.skip(1);
          alarmType = it.nextUInt16LE();
          fileNumber = it.nextUInt16LE();
          lineNumber = it.nextUInt16LE();
          alarmErrorCode = it.nextUInt16LE();

          return [
            null,
            new AlarmLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              alarmTime,
              alarmType,
              fileNumber,
              lineNumber,
              alarmErrorCode
            )
          ];

        case HistoryLogRecordType.BLOOD_GLUCOSE:
          bgErrorCode = it.nextUInt32LE();
          bgReading = it.nextUInt16LE();
          userTag1 = it.nextString(24);
          userTag2 = it.nextString(24);
          bgFlagsValue = it.nextInt8();

          return [
            null,
            new BloodGlucoseLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              bgErrorCode,
              bgReading,
              userTag1,
              userTag2,
              BloodGlucoseFlag.fromBitSet(bgFlagsValue)
            )
          ];

        case HistoryLogRecordType.CARB:
          carbs = it.nextUInt16LE();
          wasPreset = it.nextInt8();
          presetType = it.nextInt8();

          return [
            null,
            new CarbLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              carbs,
              wasPreset,
              presetType
            )
          ];

        case HistoryLogRecordType.TERMINATE_BOLUS:
          insulinLeft = it.nextUInt32LE() / 100;
          timeLeftMinutes = it.nextUInt16LE();

          return [
            null,
            new TerminateBolusLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              insulinLeft,
              timeLeftMinutes
            )
          ];

        case HistoryLogRecordType.TERMINATE_BASAL:
          timeLeftMinutes = it.nextUInt16LE();

          return [
            null,
            new TerminateBasalLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              timeLeftMinutes
            )
          ];

        case HistoryLogRecordType.ACTIVATE:
          lotNumber = it.nextUInt16LE();
          serialNumber = it.nextUInt16LE();
          podVersion = it.nextVersion();
          interlockVersion = it.nextVersion();

          return [
            null,
            new ActivateLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags),
              lotNumber,
              serialNumber,
              podVersion,
              interlockVersion
            )
          ];

        default:
          return [
            null,
            new HistoryLogRecord(
              logType,
              logIndex,
              timestamp,
              secondsSincePowerUp,
              errorCode,
              historyLogRecordType,
              new Set(historyLogRecordFlags)
            )
          ];
      }

    case LogRecordType.PUMP_ALARM:
      alarmTimestamp = it.nextDate();
      it.skip(1);
      alarmTypeID = it.nextInt8();
      it.skip(1);
      alarmErrorCode = it.nextInt8();
      lotNumber = it.nextUInt32LE();
      seqNumber = it.nextUInt32LE();
      processorVersion = it.nextVersion();
      interlockVersion = it.nextVersion();

      return [
        null,
        new PumpAlarmDetails(
          logType,
          logIndex,
          timestamp,
          secondsSincePowerUp,
          errorCode,
          alarmTimestamp,
          AlarmType.forID(alarmTypeID),
          alarmErrorCode,
          lotNumber,
          seqNumber,
          processorVersion,
          interlockVersion
        )
      ];

    default:
      throw Error('Assertion failure: should be unreachable due to earlier log record type check.');
  }
}
