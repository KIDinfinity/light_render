/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import lodash from 'lodash';
import moment from 'moment';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';

// 【遗留问题】如果fieldId重复，会出问题
const configMock = [
  {
    domainId: 'insured',
    fieldId: 'dateTimeOfDeath',
    description: '死亡时间',
    sort: 999,
    // TODO 从配置化取（目前是从配置化复制的)
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.datetime-of-death',
    },
  },
  {
    domainId: 'incident',
    fieldId: 'incidentDate',
    description: '事故时间',
    sort: 2,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.date-of-incident',
    },
  },
  {
    domainId: 'incident',
    fieldId: 'identificationDate',
    description: '鉴定时间',
    sort: '3-998',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.identification-date',
    },
  },
  {
    domainId: 'incident',
    fieldId: 'firstConsultationDate',
    description: '首次就诊时间',
    sort: '4-8',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'FirstConsultationDate',
    },
  },
  {
    domainId: 'diagnosis',
    fieldId: 'symptomDate',
    description: '症状时间',
    sort: 1,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'SymptomDate',
    },
  },
  {
    domainId: 'treatment',
    fieldId: 'dateOfConsultation',
    description: '就诊时间',
    sort: '4-7',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-consultation',
    },
  },
  {
    domainId: 'treatment',
    fieldId: 'dateOfAdmission',
    description: '入院时间',
    sort: 4,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-admission',
    },
  },
  {
    domainId: 'treatment',
    fieldId: 'dateOfDischarge',
    description: '出院时间',
    sort: 7,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-discharge',
    },
  },
  {
    domainId: 'treatment',
    fieldId: 'icuFromDate',
    description: 'icu开始时间',
    sort: 5,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.form-date',
    },
  },
  {
    domainId: 'treatment',
    fieldId: 'icuToDate',
    description: 'icu结束时间',
    sort: 6,
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.to-date',
    },
  },
  {
    domainId: 'procedure',
    fieldId: 'operationDate',
    description: '手术时间',
    sort: '5-6',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.date-of-operation',
    },
  },
  {
    domainId: 'invoice',
    fieldId: 'invoiceDate',
    description: '费用时间',
    sort: '4-7',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.invoice-date',
    },
  },
  // {
  //   domainId: 'invoice',
  //   fieldId: 'exchangeDate',
  //   description: '缴费时间',
  //   sort: '5-6',
  //   label: {
  //     dictTypeCode: 'Label_BIZ_Claim',
  //     dictCode: 'ExchangeDate',
  //   },
  // },
];

const getSorts = (data: any) =>
  lodash.isNumber(data)
    ? [data, data]
    : lodash.split(data, '-').map((item) => lodash.parseInt(item));

/**
 * 获取需要与该字段进行比较的字段列表[左边的字段，右边的字段]
 * @param config 全量配置
 * @param fieldId 字段ID
 * @returns
 */
const getDiffFields = (config: any, fieldId: string) => {
  const sort = (lodash.find(config, (item: any) => item.fieldId === fieldId) as any)?.sort;
  const [sortLeft, sortRight] = getSorts(sort);

  const leftFields = lodash.filter(config, (item: any) => {
    const [, itemSortRight] = getSorts(item.sort);
    return itemSortRight < sortLeft;
  }) as any;
  const rightFields = lodash.filter(config, (item: any) => {
    const [itemSortLeft] = getSorts(item.sort);
    return sortRight < itemSortLeft;
  }) as any;

  return [leftFields, rightFields];
};

/**
 * 获取当前的domain对象的真实id
 *
 * @param configDomainId 该字段的配置里的domainId
 * @param params
 * @returns
 */
const getDomainRealId = (configDomainId: string, params: any) => {
  const { incidentId, treatmentId, diagnosisId, procedureId, invoiceId } = params;

  switch (configDomainId) {
    case 'incident':
      return incidentId;
    case 'treatment':
      return treatmentId;
    case 'diagnosis':
      return diagnosisId;
    case 'procedure':
      return procedureId;
    case 'invoice':
      return invoiceId;
    default:
      return '';
  }
};

/**
 * 时间大小关系校验
 * @param type left (比较字段fieldData < 改动字段changedField) |right ( 改动字段changedField < 比较字段fieldData)
 * @param changedField 改动字段
 * @param fieldData 比较字段
 * @param precision 精度
 * @returns
 */
const validate = (type: string, changedField: any, fieldData: any, precision: any) => {
  const fieldDataValue = formUtils.queryValue(fieldData);
  const changedFieldValue = formUtils.queryValue(changedField);

  if (fieldDataValue && changedFieldValue) {
    return type === 'left'
      ? moment(fieldDataValue).isAfter(changedFieldValue, precision)
      : moment(fieldDataValue).isBefore(changedFieldValue, precision);
  }

  return false;
};

const getChangeFieldErrors = (
  hasError: boolean,
  changedFields: any,
  changedFieldId: string,
  config: any,
  targetFieldId: string
) => {
  const changedField = changedFields[changedFieldId];

  const originData: any = lodash.isObject(changedField) ? changedField : { value: changedField };
  let errors: any = lodash.isArray(originData.errors) ? [...originData.errors] : [];

  if (hasError) {
    const {
      label: { dictTypeCode, dictCode },
    } = lodash.find(config, (item: any) => item.fieldId === targetFieldId);
    const message = `${formatMessageApi(
      {
        Label_COM_Message: 'MSG_000529',
      },
      formatMessageApi({
        [dictTypeCode]: dictCode,
      })
    )}`;

    if (!lodash.some(errors, (item) => item.id === changedFieldId)) {
      errors.push({
        message,
        field: changedFieldId,
        id: changedFieldId,
      });
    } else {
      errors = lodash.map(errors, (error: any) => {
        if (error.id === changedFieldId) {
          return {
            message,
            field: changedFieldId,
            id: changedFieldId,
          };
        }

        return error;
      });
    }

    return errors;
  }

  errors = lodash.filter(errors, (err) => err.id !== changedFieldId);
  if (lodash.isEmpty(errors)) {
    errors = null;
  }
  return errors;
};

// 存在claimProcessData的数据对象
const GLOBAL_DOMAINS = ['insured'];

/**
 * 获取字段对应的数据
 * @param draftState
 * @param field
 * @param domainRealId
 * @returns
 */
const getFieldData = (draftState: any, field: any, domainObj?: any) => {
  if (GLOBAL_DOMAINS.includes(field.domainId)) {
    return draftState.claimProcessData?.[field.domainId]?.[field.fieldId];
  }

  if (field.domainId && domainObj) {
    return draftState.claimEntities?.[`${field.domainId}ListMap`]?.[domainObj.id]?.[field.fieldId];
  }

  return null;
};

const matchDomainId = ({ domainId, domainObj, params }: any) => {
  switch (domainId) {
    case 'incident':
      return domainObj.incidentId === params.incidentId;
    case 'treatment':
      return domainObj.treatmentId === params.treatmentId;
    case 'diagnosis':
      return domainObj.incidentId === params.incidentId;
    case 'procedure':
      return domainObj.treatmentId === params.treatmentId;
    case 'invoice':
      return domainObj.invoiceNo === params.invoiceNo;
    default:
      return false;
  }
};

const singleChange = (
  draftState: any,
  action: any,
  changedFields: any,
  config: any,
  precision: any
) => {
  if (lodash.size(changedFields) === 1) {
    const changedFieldId = lodash.keys(changedFields)?.[0] || ''; // 触发变动的字段ID
    const changedFieldConfig = lodash.find(config, (item: any) => item.fieldId === changedFieldId); // 该字段的时间配置

    if (changedFieldId && changedFieldConfig) {
      // 1-找到该Field需要进行比较的Field
      const changedFieldDomainId = changedFieldConfig.domainId;
      const changedFieldRealDomainId = getDomainRealId(changedFieldDomainId, action.payload); // 该字段对应哪个Domain数据对象(例如incident、treatment)
      const [leftFields] = getDiffFields(config, changedFieldId); // 需要与该字段进行比较的字段列表[左边的字段，右边的字段]

      let hasError = false; // 是否存在错误
      let targetFieldId = ''; // 目标控件
      let lastSort = -1; // 上次错误字段的sort，保留最近sort的那个error

      const map = (arr: any, type: string) => {
        lodash.map(arr, (field: any) => {
          const fieldRealDomainId = getDomainRealId(field.domainId, action.payload);

          if (GLOBAL_DOMAINS.includes(field.domainId)) {
            const fieldData = getFieldData(draftState, field);
            if (fieldData) {
              const errors = validate(type, changedFields[changedFieldId], fieldData, precision);

              if (type === 'left' && errors && lastSort < getSorts(field.sort)[0]) {
                hasError = true;
                targetFieldId = field.fieldId;
                lastSort = getSorts(field.sort)?.[1];
              }
            }
          } else {
            lodash.map(draftState.claimEntities[`${field.domainId}ListMap`], (domainObj: any) => {
              if (matchDomainId({ domainId: field.domainId, domainObj, params: action.payload })) {
                if (
                  (fieldRealDomainId && domainObj.id === fieldRealDomainId) ||
                  !fieldRealDomainId
                ) {
                  const fieldData = getFieldData(draftState, field, domainObj);

                  if (fieldData) {
                    const errors = validate(
                      type,
                      changedFields[changedFieldId],
                      fieldData,
                      precision
                    );

                    if (type === 'left' && errors && lastSort < getSorts(field.sort)[0]) {
                      hasError = true;
                      targetFieldId = field.fieldId;
                      lastSort = getSorts(field.sort)?.[1];
                    }
                  }
                }
              }
            });
          }
        });
      };

      map(leftFields, 'left');

      const changedFieldErrors = getChangeFieldErrors(
        hasError,
        changedFields,
        changedFieldId,
        config,
        targetFieldId
      );

      const targetData = changedFields[changedFieldId];

      // 录入时，那些没有值的控件，不应该显示错误信息
      if (lodash.size(changedFields) === 1 && !targetData) {
        return;
      }

      if (GLOBAL_DOMAINS.includes(changedFieldDomainId)) {
        if (lodash.isPlainObject(targetData)) {
          draftState.claimProcessData[changedFieldDomainId][changedFieldId] = {
            ...targetData,
            name: changedFieldId,
            errors: changedFieldErrors,
            validating: false,
          };
        } else {
          draftState.claimProcessData[changedFieldDomainId][changedFieldId] = {
            value: targetData,
            name: changedFieldId,
            errors: changedFieldErrors,
            validating: false,
          };
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (lodash.isPlainObject(targetData)) {
          draftState.claimEntities[`${changedFieldDomainId}ListMap`][changedFieldRealDomainId][
            changedFieldId
          ] = {
            ...targetData,
            name: changedFieldId,
            errors: changedFieldErrors,
            validating: false,
          };
        } else {
          draftState.claimEntities[`${changedFieldDomainId}ListMap`][changedFieldRealDomainId][
            changedFieldId
          ] = {
            value: targetData,
            name: changedFieldId,
            errors: changedFieldErrors,
            validating: false,
          };
        }
      }

      if (!draftState.hasTimeError && !!hasError) {
        draftState.hasTimeError = true;
      }
    }
  }
};

// 【遗留问题】 当配置放后端后，需要补充防错处理
export const VLD_000609 = (state: any, action: any) => {
  const nextState = produce(state, (draftState: any) => {
    const { config = configMock } = action.payload || {};
    const precision = 'day';
    draftState.hasTimeError = false;
    lodash.map(config, (field) => {
      if (['insured'].includes(field.domainId)) {
        const targetDate = draftState.claimProcessData?.[field.domainId]?.[field.fieldId];

        // 模拟action、changedFields
        const mockChangedFields = {
          [field.fieldId]: targetDate,
        };
        const mockAction = {
          payload: {},
        };

        singleChange(draftState, mockAction, mockChangedFields, config, precision);
      } else {
        lodash.map(draftState.claimEntities[`${field.domainId}ListMap`], (domainObj: any) => {
          // 模拟action、changedFields
          const mockChangedFields = {
            [field.fieldId]: domainObj[field.fieldId],
          };

          let incidentId = null;
          let treatmentId = null;
          let diagnosisId = null;
          let procedureId = null;
          let invoiceId = null;
          if (field.domainId === 'incident') {
            incidentId = domainObj.id;
          } else if (field.domainId === 'treatment') {
            incidentId = domainObj.incidentId;
            treatmentId = domainObj.id;
          } else if (field.domainId === 'diagnosis') {
            incidentId = domainObj.incidentId;
            diagnosisId = domainObj.id;
          } else if (field.domainId === 'procedure') {
            incidentId = domainObj.incidentId;
            treatmentId = domainObj.treatmentId;
            procedureId = domainObj.id;
          } else if (field.domainId === 'invoice') {
            incidentId = domainObj.incidentId;
            treatmentId = domainObj.treatmentId;
            invoiceId = domainObj.id;
          }
          const mockAction = {
            payload: {
              incidentId,
              treatmentId,
              diagnosisId,
              procedureId,
              invoiceId,
            },
          };

          singleChange(draftState, mockAction, mockChangedFields, config, precision);
        });
      }
    });
  });
  return nextState;
};
