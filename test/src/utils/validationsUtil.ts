import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const validateTime = (dataItem, earlyDateName, lateDateName, finalChangedFields, messageId) => {
  if (lodash.has(dataItem, earlyDateName) && lodash.has(finalChangedFields, lateDateName)) {
    const nextFinalChangedFields = { ...finalChangedFields };
    const earlyDate = lodash.get(dataItem, earlyDateName);
    const lateDate = lodash.get(dataItem, lateDateName);
    if (
      moment(formUtils.queryValue(earlyDate)).startOf('day').valueOf() >
      moment(formUtils.queryValue(lateDate)).startOf('day').valueOf()
    ) {
      // eslint-disable-next-line no-param-reassign
      nextFinalChangedFields[lateDateName].errors = [
        {
          message: formatMessageApi({
            Label_COM_WarningMessage: messageId,
          }),
          field: lateDateName,
        },
      ];
    }
    return nextFinalChangedFields;
  }
  return finalChangedFields;
};

const validateTime3 = (
  earlyDataItem,
  lateDataItem,
  earlyDateName,
  lateDateName,
  finalChangedFields,
  messageId,
  earlyDateValidating
) => {
  if (
    lodash.has(earlyDataItem, earlyDateName) &&
    lodash.has(finalChangedFields, earlyDateValidating ? earlyDateName : lateDateName)
  ) {
    const nextFinalChangedFields = { ...finalChangedFields };
    const earlyDate = lodash.get(earlyDataItem, earlyDateName);
    const lateDate = lodash.get(lateDataItem, lateDateName);
    if (
      moment(formUtils.queryValue(earlyDate)).startOf('day').valueOf() >
      moment(formUtils.queryValue(lateDate)).startOf('day').valueOf()
    ) {
      // eslint-disable-next-line no-param-reassign
      nextFinalChangedFields[`${earlyDateValidating ? earlyDateName : lateDateName}`].errors = [
        {
          message: formatMessageApi({
            Label_COM_WarningMessage: messageId,
          }),
          field: earlyDateValidating ? earlyDateName : lateDateName,
        },
      ];
    }
    return nextFinalChangedFields;
  }
  return finalChangedFields;
};

const validateTime2 = (
  firstDataItem,
  secondDataItem,
  earlyDateName,
  middleDateName,
  lateDateName,
  finalChangedFields,
  messageId
) => {
  finalChangedFields = validateTime3(
    firstDataItem,
    secondDataItem,
    earlyDateName,
    middleDateName,
    finalChangedFields,
    messageId
  );
  finalChangedFields = validateTime3(
    secondDataItem,
    firstDataItem,
    middleDateName,
    lateDateName,
    finalChangedFields,
    messageId,
    true
  );
  return finalChangedFields;
};

const validateEmptyAndSubmited = (list, submited) => {
  if (submited === undefined) {
    return lodash.isEmpty(list);
  }
  return lodash.isEmpty(list) && submited;
};

const validateDuplication = (
  finalChangedFields,
  claimEntities,
  fatherNormalizrMapName,
  sonNormalizrMapName,
  fatherId,
  fieldName,
  messageId,
  listName
) => {
  if (lodash.has(finalChangedFields, fieldName)) {
    const procedureListData = claimEntities?.[fatherNormalizrMapName]?.[fatherId]?.[listName];
    const procedureExisted = [];
    lodash.map(procedureListData, (itemId) => {
      if (
        formUtils.queryValue(claimEntities?.[sonNormalizrMapName]?.[itemId]?.[fieldName]) ===
        formUtils.queryValue(finalChangedFields?.[fieldName])
      ) {
        procedureExisted.push(itemId);
      }
    });
    // 如果存在相同的项，则添加错误信息
    if (procedureExisted.length > 1) {
      finalChangedFields[fieldName].errors = [
        {
          message: formatMessageApi({
            Label_COM_WarningMessage: messageId,
          }),
          field: fieldName,
        },
      ];
    }
  }
  return finalChangedFields;
};

const validateDateOfAdmission = (dataSource, finalChangedFields) => {
  lodash
    .chain(formUtils.cleanValidateData(dataSource))
    .get('incidentList')
    .map((v) => {
      // Date of Admission shouldn't be earlier than Date of Incident
      lodash.map(v.treatmentList, (v2) => {
        if (new Date(v.incidentDate).getTime() > new Date(v2.dateOfAdmission).getTime()) {
          lodash.set(finalChangedFields, 'dateOfAdmission.errors', [
            {
              message: "Date of Admission shouldn't be earlier than Date of Incident.",
              field: 'dateOfAdmission', // 这个field有什么用？？？
            },
          ]);
        }
      });
      return null;
    })
    .value();
};

const validateIncludes = () => (arr, reg) => arr?.includes?.(reg);

const compareCurrentTimeTargetTime = (currentTime, targetTime) => {
  if (currentTime && targetTime) {
    return (
      moment(currentTime).startOf('day').valueOf() < moment(targetTime).startOf('day').valueOf()
    );
  }

  return false;
};

const compareCurrenthourTargethour = (
  currentTime,
  targetTime,
  granularity = 'day',
  incidentTime?: any
) => {
  const compareTarget = moment(targetTime);
  if (granularity === 'minute' && incidentTime) {
    const incidentTimeValue = moment(incidentTime);
    compareTarget.hour(incidentTimeValue.hour()).minute(incidentTimeValue.minute());
  }
  if (currentTime && compareTarget) {
    return moment(currentTime).isBefore(compareTarget, granularity);
  }
  return false;
};

export {
  validateTime,
  validateEmptyAndSubmited,
  validateDuplication,
  validateTime2,
  validateDateOfAdmission,
  validateIncludes,
  compareCurrentTimeTargetTime,
  compareCurrenthourTargethour,
};
