import { compareCurrenthourTargethour } from '@/utils/validationsUtil';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import lodash, { isString, isNumber, some, isPlainObject } from 'lodash';
import moment from 'moment';
import { cleanFieldsMeta } from 'claim/pages/utils/formUtils';
import {
  checkPolicyNoDuplicate,
  checkClaimPayableDuplicate,
  checkLifePayableDuplicate,
  checkOtherProcedureDuplicate,
  checkTreatmentPayableDuplicate,
  getMappingPolicyByProduct,
} from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfAssessment/_models/functions/claimPayableFunc';
import { PolicySetupStatus } from 'claim/pages/Japan/ProcessOfJPCLM/utils/constant';
import { compareCurrentTimeTargetTime } from '@/utils/validationsUtil';
import { add } from '@/utils/precisionUtils';
import { ClaimDecision } from 'claim/pages/utils/claim';
import { targetAccumulatorValue, isSkipCalculate } from './utils';
import { eClaimDecision } from '../../enum/claimDecision';

export const VLD_000001 =
  (totalPayoutAmount: number, field?: string) => (rule: any, value: any, callback: Function) => {
    if (totalPayoutAmount > 0 && !value) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000001' }, field));
    }
    callback();
  };

const UNIT = 'day';
/**
 *
 * @param incidentDateValue  事故发生时间
 * 相同的validation VLD_000175
 */
export const VLD_000004 =
  (incidentDateValue: any, granularity?: any, incidentTimeValue?: any, skip: boolean = false) =>
  (rule: any, value: any, callback: Function) => {
    if (!incidentDateValue || skip) return callback();
    if (compareCurrenthourTargethour(value, incidentDateValue, granularity, incidentTimeValue)) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000007' }));
    }
    callback();
  };

/**
 *
 * @param array 已存在的diagnosisCode
 */
export const VLD_000009 = (array: any) => (rule: any, value: any, callback: Function) => {
  if (lodash.includes(array, value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000017' }));
  }
  callback();
};

/**
 *
 * @param claimPayableListMap 事故理算列表
 */
export const VLD_000010 =
  (claimPayableListMap: any = {}, keyName?: string) =>
  (rule: any, value: any, callback: Function) => {
    if (value === ClaimDecision.approve) {
      const getDecision = (item: any) => {
        return formUtils.queryValue(item[keyName || 'claimDecision']);
      };
      const isApprove = lodash.some(claimPayableListMap, (item) => getDecision(item) === value);
      if (!isApprove) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000019' }));
      }
    }
    callback();
  };

/**
 *
 * @param isNoDiagnosisListMap Diagnosis是否为空
 */
export const VLD_000006 = (isNoDiagnosisListMap: any = {}) => {
  if (isNoDiagnosisListMap) {
    const ErrorMSG = formatMessageApi(
      { Label_COM_WarningMessage: 'MSG_000011' },
      formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.diagnosis',
      })
    );
    return ErrorMSG;
  }
};

/**
 * 手动改为Approve时， claim Decision，Approve和ExGratia都不存在
 * @param claimPayableListMap
 * @param keyName
 */
export const VLD_000010HKApproveAndExGratia =
  (claimPayableListMap: any = {}, keyName?: string) =>
  (rule: any, value: any, callback: Function) => {
    if (value === ClaimDecision.approve) {
      const getDecision = (item: any) => {
        return formUtils.queryValue(item[keyName || 'claimDecision']);
      };
      const isApprove = lodash.some(
        claimPayableListMap,
        (item) => getDecision(item) === ClaimDecision.approve
      );
      // const isexGratia = lodash.some(
      //   claimPayableListMap,
      //   (item) => getDecision(item) === ClaimDecision.exGratia
      // );
      if (!isApprove) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000019' }));
      }
    }
    callback();
  };

/**
 * 手动改为Approve时， claim Decision，存在ExGratia
 * @param claimPayableListMap
 * @param keyName
 */
export const VLD_000401 =
  (claimPayableListMap: any = {}, keyName?: string) =>
  (rule: any, value: any, callback: Function) => {
    if (value === ClaimDecision.approve) {
      const getDecision = (item: any) => {
        return formUtils.queryValue(item[keyName || 'claimDecision']);
      };
      const isexGratia = lodash.some(
        claimPayableListMap,
        (item) => getDecision(item) === ClaimDecision.exGratia
      );
      if (isexGratia) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000426' }));
      }
    }
    callback();
  };

/**
 * 手动改为ExGratia时， claim Decision，不存在 ExGratia
 * @param claimPayableListMap
 * @param keyName
 */
export const VLD_000400 =
  (claimPayableListMap: any = {}, keyName?: string) =>
  (rule: any, value: any, callback: Function) => {
    if (value === ClaimDecision.exGratia) {
      const getDecision = (item: any) => {
        return formUtils.queryValue(item[keyName || 'claimDecision']);
      };
      const isexGratia = lodash.some(
        claimPayableListMap,
        (item) => getDecision(item) === ClaimDecision.exGratia
      );
      if (!isexGratia) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000424' }));
      }
    }
    callback();
  };

/**
 * 手动改为Decline时， claim Decision，不存在 Decline
 * @param claimPayableListMap
 * @param keyName
 */
export const VLD_000182HK =
  (validating: boolean, claimPayableListMap: any = {}, keyName?: string) =>
  (rule: any, value: any, callback: Function) => {
    if (validating && value === ClaimDecision.deny) {
      const getDecision = (item: any) => {
        return formUtils.queryValue(item[keyName || 'claimDecision']);
      };
      const isAllDecline = lodash.every(claimPayableListMap, (item) => {
        return getDecision(item) === ClaimDecision.deny || getDecision(item) === ClaimDecision.NA;
      });
      if (!isAllDecline) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000422' }));
      }
    }
    callback();
  };

/**
 * submit 时 assessment decision = NA 且 所有的claim decision都为 NA
 * @param claimPayableListMap
 * @param keyName
 */
export const VLD_000562 =
  (
    submited: boolean,
    validating: boolean,
    isClickRegister: boolean = false,
    claimPayableListMap: any = {},
    keyName?: string
  ) =>
  (rule: any, value: any, callback: Function) => {
    if (!isClickRegister && submited && validating && value === ClaimDecision.NA) {
      const getDecision = (item: any) => {
        return formUtils.queryValue(item[keyName || 'claimDecision']);
      };
      const isAllNA = lodash.every(
        claimPayableListMap,
        (item) => getDecision(item) === ClaimDecision.NA
      );
      if (isAllNA) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000483' }));
        return;
      }
    }
    callback();
  };

/**
 * 手动改为NA时， claim Decision，不全为NA
 * @param claimPayableListMap
 * @param keyName
 */
export const VLD_000563 =
  (claimPayableListMap: any = {}, keyName?: string) =>
  (rule: any, value: any, callback: Function) => {
    if (value === ClaimDecision.NA) {
      const getDecision = (item: any) => {
        return formUtils.queryValue(item[keyName || 'claimDecision']);
      };
      const isAllNA = lodash.every(
        claimPayableListMap,
        (item) => getDecision(item) === ClaimDecision.NA
      );
      if (!isAllNA) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000484' }));
      }
    }
    callback();
  };

export const VLD_000283HK =
  (dataItem: any, level: string) => (rule: any, value: any, callback: Function) => {
    const dataMap = {
      claim: {
        amount: formUtils.queryValue(dataItem?.totalPayableAmount),
        message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000457' }),
      },
      incident: {
        amount: formUtils.queryValue(dataItem?.payableAmount),
        message: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000266' }),
      },
    };
    if (
      !dataMap[level].amount &&
      formUtils.queryValue(value) !== ClaimDecision.deny &&
      formUtils.queryValue(value) !== ClaimDecision.NA
    ) {
      callback(dataMap[level].message);
    }
    callback();
  };

/**
 * 手动改为pending
 */
export const VLD_000402 = () => (rule: any, value: any, callback: Function) => {
  if (value === ClaimDecision.pending) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000199' }));
  }
  callback();
};

export const VLD_000202 = () => (rule: any, value: any, callback: Function) => {
  if (value === ClaimDecision.pending) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000199' }));
  }
  callback();
};

/**
 *
 * @param target 服务项费用总额
 */
export const VLD_000015 = (_this: any) => (rule: any, value: any, callback: Function) => {
  const { totalExpense } = _this.props;
  if (value !== totalExpense) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000029' }));
  }
  callback();
};

/**
 *
 * @param dateOfAdmission 入院时间
 */
export const VLD_000018 =
  (dateOfAdmission: any, granularity?: any) => (rule: any, value: any, callback: Function) => {
    if (compareCurrenthourTargethour(value, dateOfAdmission, granularity)) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000035' }));
    }
    callback();
  };

/**
 *
 * @param incidentDate 事故发生时间
 */
export const VLD_000022 =
  (incidentDate: any, granularity?: any, skip: boolean = false) =>
  (rule: any, value: any, callback: Function) => {
    if (!incidentDate || skip) return callback();
    if (compareCurrenthourTargethour(value, incidentDate, granularity)) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000043' }));
    }
    callback();
  };

/**
 *
 * @param array 发票号码列表
 */
export const VLD_000021 = (array: any) => (rule: any, value: any, callback: Function) => {
  if (lodash.includes(array, value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000041' }));
  }
  callback();
};

export const VLD_000180 = (caseCategory: string) => (rule: any, value: any, callback: Function) => {
  if (
    caseCategory === 'TH_GC_CTG03' ||
    caseCategory === 'TH_GC_CTG06' ||
    caseCategory === 'TH_GC_CTG07'
  ) {
    if (value !== 'OP') {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000178' }));
    }
  }
  callback();
};

/**
 *
 * @param caseCategory 案件种类
 */
export const VLD_000029 = (caseCategory: string) => (rule: any, value: any, callback: Function) => {
  if (
    caseCategory === 'IAPC' ||
    caseCategory === 'IDAC' ||
    caseCategory === 'TH_GC_CTG02' ||
    caseCategory === 'TH_GC_CTG04'
  ) {
    if (value !== 'IP') {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000049' }, caseCategory));
    }
  }
  VLD_000180(caseCategory, value, callback);
  callback();
};

const checkCriticalIllness = (incidentItem: any) => {
  if (!incidentItem) return;
  const claimTypeList = formUtils.queryValue(incidentItem.claimTypeArray);
  const isCriticalIllnessRequest = lodash.isArray(claimTypeList) && claimTypeList.includes('CI');
  let hasCriticalIllness = false;
  lodash.map(incidentItem.diagnosisList, (item) => {
    if (item.criticalIllness === 1) {
      hasCriticalIllness = true;
    }
  });

  return isCriticalIllnessRequest ? hasCriticalIllness : true;
};

export const VLD_000051 =
  (submited: any, incidentItem: any) => (rule: any, value: any, callback: Function) => {
    if (submited && !checkCriticalIllness(incidentItem) && !value) {
      callback(
        'Require at least one critical diagnosis when claim type contains Critical Illness.'
      );
    }
    callback();
  };

/**
 *
 * @param dateOfAdmission 入院时间
 */
export const VLD_000056 =
  (dateOfAdmission: any, validateIf: boolean, granularity?: any) =>
  (rule: any, value: any, callback: Function) => {
    if (validateIf && compareCurrenthourTargethour(value, dateOfAdmission, granularity)) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000082' }));
    }
    callback();
  };

/**
 *
 * @param icuFromDate icu开始时间
 */
export const VLD_000057 =
  (icuFromDate: any, granularity?: any) => (rule: any, value: any, callback: Function) => {
    if (compareCurrenthourTargethour(value, icuFromDate, granularity)) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000084' }));
    }
    callback();
  };

/**
 *
 * @param hospitalization 入院期间
 */
export const VLD_000058 =
  (hospitalization: any, validateIf: boolean, granularity?: any) =>
  (rule: any, value: any, callback: Function) => {
    if (
      validateIf &&
      (compareCurrenthourTargethour(value, hospitalization[0], granularity) ||
        compareCurrenthourTargethour(hospitalization[1], value, granularity))
    ) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000086' }));
    }
    callback();
  };

export const VLD_000061 =
  (procedureListMap: any, oldprocedureItem: any) => (rule: any, value: any, callback: Function) => {
    const procedureList = cleanFieldsMeta(procedureListMap);
    const procedure = cleanFieldsMeta(oldprocedureItem);
    const { procedureCode, id } = procedure;

    const exist = some(
      procedureList,
      (procedureItem) =>
        isPlainObject(procedureItem) &&
        id !== procedureItem.id &&
        moment(value).isSame(formUtils.queryValue(procedureItem.operationDate), UNIT) &&
        formUtils.queryValue(procedureItem.procedureCode) === formUtils.queryValue(procedureCode)
    );
    if (formUtils.queryValue(procedureCode) && value && exist) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000091' }));
    }
    callback();
  };

/**
 *
 * @param claimPayableListMap 事故理算列表
 */
export const VLD_000182 =
  (validating: boolean, claimPayableListMap: any = {}, keyName?: string) =>
  (rule: any, value: any, callback: Function) => {
    if (validating && value === 'D') {
      const getDecision = (item: any) => {
        return formUtils.queryValue(item[keyName || 'claimDecision']);
      };
      const isApprove = lodash.every(claimPayableListMap, (item) => getDecision(item) === value);
      if (!isApprove) {
        callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000180' }));
      }
    }
    callback();
  };

/**
 * 日本事故受付节点Policy length checking
 * 长度只能10/11/12位,
 * 如果长度是11/12位，第一位一定是半角字符「オ」Or「イ」Or「ウ」Or「タ」，第二位以后一定是半角数值型,
 * 如果长度10位，一定都是半角数值型
 */
export const VLD_000036Rule = (value) => {
  let isCheckSuccess = true;
  if (!isString(value) || value === '') {
    isCheckSuccess = false;
  }
  const minLength = 10;
  const maxLength = 12;
  const checkFirstCharacterMinLength = 11;
  const checkFirstCharacterMaxLength = 12;
  const policyNoLength = value.length;
  const numberCharacterLength = 10;
  const legalFirstCharacter = ['ｵ', 'ｲ', 'ｳ', 'ﾀ'];
  // 长度小于10
  if (policyNoLength && policyNoLength < minLength) {
    isCheckSuccess = false;
  }
  // 长度大于12
  if (policyNoLength > maxLength) {
    isCheckSuccess = false;
  }
  // 长度在10/11/12之间
  if (
    policyNoLength <= checkFirstCharacterMaxLength &&
    policyNoLength >= checkFirstCharacterMinLength
  ) {
    const firstCharacter = value[0];
    const leftStr = value.slice(1);
    isCheckSuccess = legalFirstCharacter.includes(firstCharacter) && /^[0-9]*$/.test(leftStr);
  }
  // 长度等于10
  if (policyNoLength === numberCharacterLength) {
    isCheckSuccess = /^[0-9]*$/.test(value);
  }

  return isCheckSuccess;
};
export const VLD_000036 = () => (rule: any, value: any, callback: Function) => {
  if (value && !VLD_000036Rule(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000058' }));
  }
  callback();
};

/**
 *
 * @param value 保单号
 * @param policyNoArray 所有的保单号
 */
export const VLD_000071Rule = (value, policyNoArray) => {
  const duplicateItem = lodash.filter(policyNoArray, (item) => item === value);
  const isCheckSuccess = duplicateItem.length < 2;

  return isCheckSuccess;
};

export const VLD_000071 = (policyNoArray) => (rule: any, value: any, callback: Function) => {
  if (!VLD_000071Rule(value, policyNoArray)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000064' }, value));
  }
  callback();
};

export const VLD_000116 = (hasGetInsured: boolean, insuredList: any[], value: string) => {
  if (!hasGetInsured) return false;
  const size = lodash.size(insuredList);
  if (size === 0) return formatMessageApi({ Label_COM_WarningMessage: 'ERR_000125' }, value);
  if (size > 1) return formatMessageApi({ Label_COM_WarningMessage: 'ERR_000126' }, value);
  return false;
};

/**
 * 验证 value 是否匹配 validValues.item.validField
 * @param validValues 为函数时表示 validValues 需要通过 validValues([ value ]) 获取
 * @param validField 字段
 * @param isRequired 是否为 required
 */
export const VLD_000197 =
  (validValues: Function | any[], validField?: string, isRequired?: boolean) =>
  async (rule: any, value: any, callback: Function) => {
    const response: any = lodash.isFunction(validValues) ? await validValues([value]) : null;
    if (lodash.isFunction(validValues) && (!response || !response.success)) {
      // 这里最好还应该有一个提示 “验证失败 - 获取数据失败”
      return callback();
    }

    const values: any[] = response ? response.resultData : validValues;
    if (!lodash.isArray(values)) {
      // 这里最好还应该有一个提示 “验证失败 - 数据格式有误”
      return callback();
    }

    if (lodash.isEmpty(value) && !isRequired) {
      return callback();
    }

    if (values.findIndex((item) => item[validField as string] === value) !== -1) {
      return callback();
    }

    return callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000194' }));
  };

export const vld000190 =
  (contrastFn: Function, incidentId: string) =>
  async (rule: any, value: any, callback: Function) => {
    const contrast = await contrastFn();
    lodash.forEach(contrast, (item) => {
      if (
        moment(value).isSame(formUtils.queryValue(item.dateOfAdmission), 'day') ||
        moment(value).isSame(formUtils.queryValue(item.dateOfDischarge), 'day')
      ) {
        if (incidentId === item.incidentId) {
          callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000188' }, item.treatmentNo));
        } else {
          callback(
            formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000189' },
              item.treatmentNo,
              item.incidentNo
            )
          );
        }
      }
      if (
        moment(value).isBetween(
          formUtils.queryValue(item.dateOfAdmission),
          formUtils.queryValue(item.dateOfDischarge),
          'day'
        )
      ) {
        if (incidentId === item.incidentId) {
          callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000200' }, item.treatmentNo));
        } else {
          callback(
            formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000201' },
              item.treatmentNo,
              item.incidentNo
            )
          );
        }
      }
    });
    callback();
  };

export const VLD000190 =
  (contrastFn: Function, incidentId: string) =>
  async (rule: any, value: any, callback: Function) => {
    if (lodash.isEmpty(value)) {
      callback();
    }
    const linkageTreatmentList = await contrastFn();
    let admissionMessage = '';
    lodash.forEach(linkageTreatmentList, (item) => {
      const { incidentNo, treatmentNo } = item;
      const admissionDate = formUtils.queryValue(item.dateOfAdmission);
      const dischargeDate = formUtils.queryValue(item.dateOfDischarge);
      // 入院日等于入院日 1,3,6 || 入院日等于退院日 7
      if (
        moment(value).isSame(formUtils.queryValue(admissionDate), UNIT) ||
        moment(value).isSame(formUtils.queryValue(dischargeDate), UNIT)
      ) {
        if (incidentId === item.incidentId) {
          admissionMessage += `${formatMessageApi(
            { Label_COM_WarningMessage: 'ERR_000188' },
            treatmentNo
          )},`;
        } else {
          admissionMessage += `${formatMessageApi(
            { message: 'ERR_000189' },
            treatmentNo,
            incidentNo
          )},`;
        }
      }

      // 入院日在期间 8，9，11
      if (moment(value).isBetween(admissionDate, dischargeDate, UNIT)) {
        if (incidentId === item.incidentId) {
          admissionMessage += `${formatMessageApi(
            { Label_COM_WarningMessage: 'ERR_000200' },
            treatmentNo
          )},`;
        } else {
          admissionMessage += `${formatMessageApi(
            { message: 'ERR_000201' },
            treatmentNo,
            incidentNo
          )},`;
        }
      }
    });
    if (!lodash.isEmpty(admissionMessage)) {
      admissionMessage = admissionMessage.slice(0, -1);
      callback(admissionMessage);
    }
    callback();
  };

export const VLD000191 =
  (contrastFn: Function, incidentId: string) =>
  async (rule: any, value: any, callback: Function) => {
    if (lodash.isEmpty(value)) {
      callback();
    }
    const linkageTreatmentList = await contrastFn();
    let dischargeMessage = '';
    lodash.forEach(linkageTreatmentList, (item) => {
      const { incidentNo, treatmentNo } = item;
      const admissionDate = formUtils.queryValue(item.dateOfAdmission);
      const dischargeDate = formUtils.queryValue(item.dateOfDischarge);
      // 退院日等于退院日 2，3，5 || 退院日等于入院日 4
      if (
        moment(value).isSame(formUtils.queryValue(dischargeDate), UNIT) ||
        moment(value).isSame(formUtils.queryValue(admissionDate), UNIT)
      ) {
        if (incidentId === item.incidentId) {
          dischargeMessage += `${formatMessageApi(
            { Label_COM_WarningMessage: 'ERR_000188' },
            treatmentNo
          )},`;
        } else {
          dischargeMessage += `${formatMessageApi(
            { message: 'ERR_000189' },
            treatmentNo,
            incidentNo
          )},`;
        }
      }

      // 退院日在期间 9
      if (moment(value).isBetween(admissionDate, dischargeDate, UNIT)) {
        if (incidentId === item.incidentId) {
          dischargeMessage += `${formatMessageApi(
            { Label_COM_WarningMessage: 'ERR_000200' },
            treatmentNo
          )},`;
        } else {
          dischargeMessage += `${formatMessageApi(
            { message: 'ERR_000201' },
            treatmentNo,
            incidentNo
          )},`;
        }
      }
    });
    if (!lodash.isEmpty(dischargeMessage)) {
      dischargeMessage = dischargeMessage.slice(0, -1);
      callback(dischargeMessage);
    }
    callback();
  };

export const vld000191 =
  (contrastFn: Function, incidentId: string) =>
  async (rule: any, value: any, callback: Function) => {
    const contrast = await contrastFn();
    lodash.forEach(contrast, (item) => {
      if (
        moment(value).isBetween(
          formUtils.queryValue(item.dateOfAdmission),
          formUtils.queryValue(item.dateOfDischarge),
          'day'
        )
      ) {
        if (incidentId === item.incidentId) {
          callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000200' }, item.treatmentNo));
        } else {
          callback(
            formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000201' },
              item.treatmentNo,
              item.incidentNo
            )
          );
        }
      }
    });
    callback();
  };

/**
 * 验证 accidentBenefitItem 是4.31,4.32时，check whether the accumulated payable days has reach to the limit value
 * @param benefitItemList 所有可选benefitItemList
 */
export const VLD_000200 =
  (listPolicy: any[], payableDaysList: any[], payableDays: number) =>
  (rule: any, value: any, callback: Function) => {
    if (isSkipCalculate(listPolicy, value)) return callback();
    if (value === '4.31' || value === '4.32') {
      const target = lodash.find(listPolicy, { benefitItemCode: value });
      const benefitItemName = lodash.get(target, 'benefitItemName');
      const accumulateLimitList = lodash.get(target, 'accidentBenefit.accumulateLimitList', []);
      const limitItem = lodash.find(accumulateLimitList, {
        limitCode: 'weeks_per_disability_limit',
      });
      const shareLimitItem = lodash.find(accumulateLimitList, {
        limitCode: 'share_weeks_per_disability_limit',
      });
      if (limitItem) {
        const shareItems = [value];
        const currentAccumulatorValue = targetAccumulatorValue({ shareItems, payableDaysList });

        if (
          add(add(limitItem?.accumulateValue, currentAccumulatorValue), payableDays) >
          limitItem?.limitValue * 7
        ) {
          return callback(
            formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000197' },
              `${value}-${benefitItemName}`
            )
          );
        }
      }
      if (shareLimitItem) {
        const shareItems = lodash.split(shareLimitItem?.shareItems || '', ';');
        const shareAccumulatorValue = targetAccumulatorValue({ shareItems, payableDaysList });

        if (
          add(add(shareLimitItem?.accumulateValue, shareAccumulatorValue), payableDays) >
          shareLimitItem?.limitValue * 7
        ) {
          return callback(
            formatMessageApi(
              { Label_COM_WarningMessage: 'ERR_000197' },
              `${value}-${benefitItemName}`
            )
          );
        }
      }
    }
    return callback();
  };

const getBenefitItem = (listPolicy: any[], benefitItemCode: string) => {
  const target = lodash.find(listPolicy, { benefitItemCode });
  return `${benefitItemCode}-${lodash.get(target, 'benefitItemName')}`;
};

export const VLD_000201 =
  (listPolicy: any[], payableDaysList: any[]) => (rule: any, value: any, callback: Function) => {
    if (isSkipCalculate(listPolicy, value)) return callback();
    if (value === '4.40') {
      const targetList = lodash
        .chain(listPolicy)
        .map((item: any) => {
          const list = lodash.get(item, 'accidentBenefit.accumulateLimitList', []);
          return lodash.some(list, (target) => target?.rolloverBenefitItemCode === '4.40')
            ? item
            : '';
        })
        .compact()
        .value();
      const rolloverBenefitItemCodes = lodash.map(targetList, (item: any) => {
        const accumulateLimitList = lodash.get(item, 'accidentBenefit.accumulateLimitList', []);
        if (
          lodash.find(accumulateLimitList, { limitCode: 'share_weeks_per_disability_rollover' })
        ) {
          return item?.benefitItemCode;
        }
        return '';
      });
      const rollovers = lodash
        .chain(targetList)
        .map((item: any) => {
          const accumulateLimitList = lodash.get(item, 'accidentBenefit.accumulateLimitList', []);
          if (lodash.find(accumulateLimitList, { limitCode: 'weeks_per_disability_rollover' })) {
            return item;
          }
          return '';
        })
        .value();

      const singerRollover = lodash.every(rollovers, (item: any) => {
        const accumulateLimitList = lodash.get(item, 'accidentBenefit.accumulateLimitList', []);
        const limitItem = lodash.find(accumulateLimitList, {
          limitCode: 'weeks_per_disability_rollover',
        });

        const { benefitItemCode = '' } = limitItem ? item : {};
        const currentRolloverBenefitItemCodes = [benefitItemCode];
        const currentAccumulatorValue = targetAccumulatorValue({
          shareItems: currentRolloverBenefitItemCodes,
          payableDaysList,
        });
        if (
          limitItem &&
          add(limitItem?.accumulateValue, currentAccumulatorValue) < limitItem?.limitValue * 7
        ) {
          return true;
        }
        return false;
      });
      const shareLimitItem: any = lodash.reduce(
        targetList,
        (result: any, item: any) =>
          lodash.find(item?.accidentBenefit?.accumulateLimitList, {
            limitCode: 'share_weeks_per_disability_rollover',
          }),
        {}
      );

      if (singerRollover && !shareLimitItem) {
        callback(
          formatMessageApi(
            { Label_COM_WarningMessage: 'ERR_000198' },
            getBenefitItem(listPolicy, '4.40'),
            getBenefitItem(listPolicy, '4.31'),
            getBenefitItem(listPolicy, '4.32')
          )
        );
      }

      const currentShareAccumulatorValue = targetAccumulatorValue({
        shareItems: lodash.compact(rolloverBenefitItemCodes),
        payableDaysList,
      });

      if (
        shareLimitItem &&
        add(shareLimitItem?.accumulateValue, currentShareAccumulatorValue) <
          shareLimitItem?.limitValue * 7
      ) {
        return callback(
          formatMessageApi(
            { Label_COM_WarningMessage: 'ERR_000198' },
            getBenefitItem(listPolicy, '4.40'),
            getBenefitItem(listPolicy, '4.31'),
            getBenefitItem(listPolicy, '4.32')
          )
        );
      }
    }
    return callback();
  };

export const VLD_000246 = (limitItem: any) => (rule: any, value: any, callback: Function) => {
  if (limitItem && !isNumber(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000230' }));
  }
  callback();
};

export const VLD_000230 =
  (payableAmount: number) => (rule: any, value: any, callback: Function) => {
    if (payableAmount > value) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000216' }));
    }
    callback();
  };

/**
 *
 * @param array 已存在的procedurecode
 */
export const VLD_000251 =
  (operationDate: any, existProcedure: any) => (rule: any, value: any, callback: Function) => {
    let codeDuplicate = false;
    lodash.some(existProcedure, (item) => {
      if (item.procedureCode === value && moment(item.operationDate).isSame(operationDate, UNIT)) {
        codeDuplicate = true;
      }
    });

    if (codeDuplicate) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000091' }));
    }
    callback();
  };

export const VLD_000269 = (digitsLength: number) => (rule: any, value: any, callback: Function) => {
  if (value && value.length !== digitsLength) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000250' }, digitsLength));
  }
  callback();
};
/**
 * 校验claimpayable的policyNo值的重复性
 * @param claimPayableListMap 所有claim payable
 * @param incidentPayable 当前修改的claim payable
 */
export const VLD_000011PolicyNo =
  (claimPayableListMap: any, incidentPayable: any) =>
  (rule: any, value: any, callback: Function) => {
    if (checkPolicyNoDuplicate(claimPayableListMap, { ...incidentPayable, policyNo: value })) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000021' }));
    }
    callback();
  };

/**
 * 校验claimpayable的productCode值的重复性
 * @param claimPayableListMap 所有claim payable
 * @param incidentPayable 当前修改的claim payable
 */
export const VLD_000011ProductCode =
  (claimPayableListMap: any, incidentPayable: any, listPolicy: any[]) =>
  (rule: any, value: any, callback: Function) => {
    const payableTem = { ...incidentPayable, productCode: value };
    const mappedPolicy = getMappingPolicyByProduct(listPolicy, payableTem);
    if (isPlainObject(mappedPolicy)) {
      const { policySetupStatus } = mappedPolicy;
      payableTem.policySetupStatus = policySetupStatus;
    }

    if (
      formUtils.queryValue(payableTem.policySetupStatus) === PolicySetupStatus.NoImplement &&
      checkClaimPayableDuplicate(claimPayableListMap, { ...payableTem, productCode: value })
    ) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000021' }));
    }
    callback();
  };

/**
 * 校验claimpayable的benefitTypeCode值的重复性
 * @param claimPayableListMap 所有claim payable
 * @param incidentPayable 当前修改的claim payable
 */
export const VLD_000011BenefitTypeCode =
  (claimPayableListMap: any, incidentPayable: any) =>
  (rule: any, value: any, callback: Function) => {
    if (
      formUtils.queryValue(incidentPayable.policySetupStatus) === PolicySetupStatus.Standard &&
      checkClaimPayableDuplicate(claimPayableListMap, {
        ...incidentPayable,
        benefitTypeCode: value,
      })
    ) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000021' }));
    }
    callback();
  };

export const VLD_000271 = (medicalProvider: any) => (rule: any, value: any, callback: Function) => {
  if (value === eClaimDecision.approve && medicalProvider === '00001') {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000252' }));
  }
  callback();
};

export const VLD_000272 =
  (dateOfAdmission: any, dateOfDischarge: any) => (rule: any, value: any, callback: Function) => {
    if (!dateOfAdmission || !dateOfDischarge) return callback();
    let milliseconds = Number(moment(dateOfDischarge).diff(moment(dateOfAdmission)));
    milliseconds = milliseconds > 0 ? milliseconds : 0;
    const constant = 3600000;
    const days: number =
      Math.floor(milliseconds / constant / 24) + ((milliseconds / constant) % 24 > 6 ? 1 : 0);
    if (lodash.isNumber(value) && value > days) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000253' }));
    }
    callback();
  };

/**
 * 校验life payable的benefitItemCode值的重复性
 * @param claimPayableListMap 所有claim payable
 * @param incidentPayable 当前修改的claim payable
 */
export const VLD_000059 =
  (claimPayableListMap: any, incidentPayable: any) =>
  (rule: any, value: any, callback: Function) => {
    if (
      checkLifePayableDuplicate(claimPayableListMap, {
        ...incidentPayable,
        lifePayable: { ...incidentPayable.lifePayable, benefitItemCode: value },
      })
    ) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
    }
    callback();
  };

/**
 * 校验other procedure的procedure code值的重复性
 * @param treatmentListMap
 * @param otherProcedureListMap
 * @param otherProcedureItem
 */
export const VLD_000060OtherProcedure =
  (treatmentListMap: any, otherProcedureListMap: any, otherProcedureItem: any) =>
  (rule: any, value: any, callback: Function) => {
    if (
      checkOtherProcedureDuplicate(treatmentListMap, otherProcedureListMap, {
        ...otherProcedureItem,
        procedureCode: value,
      })
    ) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000090' }));
    }
    callback();
  };

/**
 * 校验treatment payable的benefitItemCode值的重复性
 * @param treatmentPayableListMap 所有treatment Payable
 * @param treatmentPayableItem 当前修改的treatment payable
 */
export const VLD_000060BenefitItemCode =
  (treatmentPayableListMap: any, treatmentPayableItem: any) =>
  (rule: any, value: any, callback: Function) => {
    if (
      checkTreatmentPayableDuplicate(treatmentPayableListMap, {
        ...treatmentPayableItem,
        benefitItemCode: value,
      })
    ) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000088' }));
    }
    callback();
  };

export const VLD_000274 = (targetTime: any) => (rule: any, value: any, callback: Function) => {
  const valueFormat = moment(value).format();
  const targetTimeFormat = moment(targetTime).format();
  if (moment(valueFormat).isAfter(moment(targetTimeFormat), 'day')) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000256' }));
  }
  callback();
};

export const VLD_000283 =
  (payableAmount: number) => (rule: any, value: any, callback: Function) => {
    if (payableAmount === 0 && value === eClaimDecision.approve) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000266' }));
    }
    callback();
  };

export const VLD_000284 =
  (percentage: number, policyNo: string, payablesType: string, vPercentage: boolean) =>
  (rule: any, value: number, callback: Function) => {
    if (!lodash.isNumber(value)) {
      callback();
    }
    if (value + percentage !== 100 && vPercentage) {
      callback(
        formatMessageApi({ Label_COM_WarningMessage: 'ERR_000268' }, policyNo, payablesType)
      );
    }
    callback();
  };

export const VLD_000195 =
  ({ noOfIpdInvoice, noOfOpdInvoice, noOfGebInvoice }: any) =>
  (rule: any, value: any, callback: Function) => {
    const sum = add(add(noOfIpdInvoice, noOfOpdInvoice), noOfGebInvoice);
    if (!lodash.isEqual(value, sum)) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000193' }));
    }
    callback();
  };

export const VLD_000418 =
  ({ ipdInvoiceAmount, opdInvoiceAmount, gebInvoiceAmount }: any) =>
  (rule: any, value: number, callback: Function) => {
    const sum = add(add(ipdInvoiceAmount, opdInvoiceAmount), gebInvoiceAmount);
    if (!lodash.isEqual(value, sum)) {
      callback(formatMessageApi({ Label_COM_Message: 'MSG_000444' }));
    }
    callback();
  };

export const VLD_000425 = {
  pattern: /^[A-Za-z0-9]+$/,
  message: formatMessageApi({ Label_COM_Message: 'MSG_000455' }),
};

// To date should not be earlier than from date

export const VLD_000095 = (rule: any, value: any, callback: Function, fromDateValue: any) => {
  if (compareCurrentTimeTargetTime(value, fromDateValue)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000110' }));
  }
  callback();
};

export const VLD_000930 =
  (existedFullNames, policyNo) => (rule: any, value: any, callback: Function) => {
    if (existedFullNames.includes(value)) {
      callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000944' }, policyNo));
    }
    callback();
  };

export const VLD_000929 = (sumPercentage, policyNo) => (_, value, callback) => {
  if (sumPercentage + value > 100) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_000943' }, policyNo));
  }
  callback();
};

export const VLD_001114 = () => (rule: any, value: any, callback: Function) => {
  const pattern = /\[|\]/gi;

  if (pattern.test(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001261' }));
  }
  callback();
};

export const VLD_001118 = (requiredFlag: boolean) => (_: any, value: any, callback: Function) => {
  if (!!requiredFlag && !lodash.isNumber(value)) {
    callback(formatMessageApi({ Label_COM_WarningMessage: 'MSG_001264' }));
  } else {
    callback();
  }
};
