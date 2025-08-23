import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getExistDiagnosisList } from 'claim/pages/utils/selector';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ClaimTypeArray } from 'claim/enum/claimTypeArray';
import moment from 'moment';
import { EPolicySource } from 'claim/enum/EPolicySource';
import { ProductType } from 'claim/enum/ProductType';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';
import {
  ClaimDecision as enumClaimDecision,
  BenefitCategory as enumBenefitCategory,
} from '../Thailand/ProcessOfDA/DAOfAssessment/_models/dto';

export const existList = (map: any, keyCode: any, message: string) => {
  const errors: string[] = [];
  lodash.forEach(map, (item) => {
    if (lodash.isEmpty(item[keyCode])) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000011' }, message));
    }
  });
  return errors;
};

export const existMainBenefit = (claimEntities: any) => {
  const treatmentListMap = lodash.get(claimEntities, 'treatmentListMap', []);
  return existList(treatmentListMap, 'mainBenefitList', 'MainBenefit item');
};
// 验证事故受付confirmed证券番号是否存在请求书中
export const VLD_000038 = (policyNoList, existPolicyNoList) => {
  const noIncludeList = [];
  const allPolicyNo = lodash.map(policyNoList, (item) => item.policyNo);
  if (lodash.isArray(policyNoList) && lodash.isArray(existPolicyNoList)) {
    let selectedPolicyNo = [];
    lodash.map(existPolicyNoList, (item) => {
      if (lodash.isArray(item.policyNoArray)) {
        selectedPolicyNo = [...selectedPolicyNo, ...item.policyNoArray];
      }
    });
    lodash.map(allPolicyNo, (item) => {
      if (!selectedPolicyNo.includes(item)) {
        noIncludeList.push(item);
      }
    });
  }

  return noIncludeList;
};

export const existDiagnosis = (claimEntities: any) => {
  const incidentListMap = lodash.get(claimEntities, 'incidentListMap', []);
  return existList(incidentListMap, 'diagnosisList', 'Diagnosis item');
};

export const getDiagnosisSectionError = (existDiagnosisList: any[]) => {
  let message = '';
  if (lodash.isEmpty(existDiagnosisList)) {
    message = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000011' }, 'Diagnosis');
  } else if (
    !lodash.isEmpty(existDiagnosisList) &&
    existDiagnosisList.every((item: any) => item.diagnosisType !== 'P')
  ) {
    message = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000183' });
  }
  return message;
};

/**
 *
 * @param claimEntities
 * Mandantory section has no record when submit
 */
export const VLD_000006 = (claimEntities: any, section?: string) => {
  let result: string[] = [];
  switch (section) {
    case 'mainBenefit':
      result = existMainBenefit(claimEntities);
      break;
    default:
      result = existDiagnosis(claimEntities);
      break;
  }
  return result;
};

export const VLD_000028 = (claimEntities: any) => {
  const incidentListMap = lodash.get(claimEntities, 'incidentListMap', []);
  const errors: string[] = [];
  lodash.forEach(incidentListMap, (item) => {
    if (
      lodash.isArray(item.treatmentList) &&
      item.treatmentList.length === 0 &&
      lodash.get(item, 'claimType') === 'IP'
    ) {
      errors.push(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000011' }, 'Treatment item'));
    }
  });
  return errors;
};

export const VLD_000030 = (claimEntities: any) => {
  const treatmentListMap = lodash.get(claimEntities, 'treatmentListMap', []);
  return existList(treatmentListMap, 'invoiceList', 'Invoice item');
};

export const VLD_000031 = (claimEntities: any) => {
  const invoiceListMap = lodash.get(claimEntities, 'invoiceListMap', []);
  return existList(invoiceListMap, 'serviceItemList', 'Service item');
};

export const VLD_000051 = (claimEntities: any) => {
  const incidentListMap = lodash.get(claimEntities, 'incidentListMap', []);
  const errors =
    lodash.size(incidentListMap) === 0
      ? [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000070' })]
      : [];
  return errors;
};

export const VLD_000185 = (claimEntities: any) => {
  const incidentListMap = lodash.get(claimEntities, 'incidentListMap', []);
  const diagnosisListMap = lodash.get(claimEntities, 'diagnosisListMap', []);

  return lodash
    .chain(lodash.values(incidentListMap))
    .map((item: any) => {
      return getDiagnosisSectionError(getExistDiagnosisList(item.id, diagnosisListMap));
    })
    .compact()
    .value();
};

// 验证事故受付-请求书受付，证券番号是否重复，如果有重复的，将重复的番号返回
export const VLD_000064 = (applicationListMap = {}) => {
  const policyNoRecipientNameArr = [];
  // 遍历，获取所有组合的值，放入数组
  if (applicationListMap) {
    const applicationArray = Object.entries(applicationListMap);
    lodash.forEach(applicationArray, (item) => {
      const policyNoArray = formUtils.queryValue(item[1].policyNoArray);
      const recipientName = formUtils.queryValue(item[1].recipientName);
      lodash.forEach(policyNoArray, (policyNo) => {
        policyNoRecipientNameArr.push(`${policyNo}-${recipientName}`);
      });
    });

    // 遍历数组，统计各个值的数量
    const policyObj = {};
    policyNoRecipientNameArr.forEach((item) => {
      if (policyObj[item]) {
        policyObj[item] += 1;
      } else {
        policyObj[item] = 1;
      }
    });
    // 判断各个值的数量，如果数量大于1，则认为是重复的值
    let formatMessageStr = '';
    lodash.mapKeys(policyObj, (val, key) => {
      if (val > 1) {
        formatMessageStr += `${key},`;
      }
    });
    // 如果有重複的值，返回番號-先宛名，如果沒有返回空字符串，ui會判斷如果為''，不顯示提示
    if (formatMessageStr !== '') {
      // 將重複值字符串轉換為數組，分別獲取番號和先宛名，拼接為新的字符串
      formatMessageStr = formatMessageStr.substr(0, formatMessageStr.length - 1);
      const formatMessageStrArr = formatMessageStr.split(',');
      let formatMessageArg = ` - ${formatMessageApi({
        Label_BIZ_Claim: 'app.claim.recipientName',
      })}`;
      formatMessageStrArr.forEach((item) => {
        const itemArr = item.split('-');
        formatMessageArg += `${itemArr[0]} - ${itemArr[1]}, `;
      });
      formatMessageArg = formatMessageArg.substr(0, formatMessageArg.length - 2);
      return formatMessageArg;
    }
  }
  return '';
};

/**
 *
 * @param policyList 契约情报 section must have at lease one policy
 */
export const VLD_000039 = (policyList = []) => {
  let error;
  if (lodash.isEmpty(policyList)) {
    error = formatMessageApi({ Label_COM_WarningMessage: 'ERR_000101' });
  }

  return error;
};

export const VLD_000071 = (policyList = []) => {
  const duplicateCount = lodash.map(lodash.uniqBy(policyList, 'policyNo'), (item) => ({
    count: 0,
    policyNo: item,
  }));
  policyList.forEach((item) => {
    const index = duplicateCount.findIndex((dupItem) => item === dupItem.policyNo);
    if (index !== -1) {
      duplicateCount[index].count += 1;
    }
  });
  const duplicateNos = lodash.map(
    duplicateCount.filter((item) => item.count > 1),
    (item) => item.policyNo
  );
  return duplicateNos;
};

const enumBenefitCategoryFn = {
  [enumBenefitCategory.aipa]: (source: any) => {
    const { treatmentPayableList, treatmentPayableListMap, policyNo, benefitTypeCode } = source;
    const errors: string[] = [];
    if (
      lodash.some(treatmentPayableList, (id) =>
        lodash
          .chain(treatmentPayableListMap)
          .get(`${id}.accidentBenefitPayableList`)
          .isEmpty()
          .value()
      )
    ) {
      errors.push(
        formatMessageApi({ Label_COM_WarningMessage: 'ERR_000238' }, policyNo, benefitTypeCode)
      );
    }
    return errors;
  },
  [enumBenefitCategory.reimbursement]: (source: any) => {
    const {
      treatmentPayableList,
      treatmentPayableListMap,
      policyNo,
      benefitTypeCode,
      invoicePayableListMap,
    } = source;
    const errors: string[] = [];
    lodash.forEach(treatmentPayableList, (id) => {
      const target = lodash.get(treatmentPayableListMap, id, {});
      const invoicePayableList = lodash.get(target, 'invoicePayableList');
      lodash.forEach(invoicePayableList, (invoicePayableId) => {
        const invoicePayableItem = lodash.get(invoicePayableListMap, invoicePayableId);
        const benefitItemPayableList = lodash.get(invoicePayableItem, 'benefitItemPayableList');
        if (lodash.isEmpty(benefitItemPayableList)) {
          errors.push(
            formatMessageApi({ Label_COM_WarningMessage: 'ERR_000242' }, policyNo, benefitTypeCode)
          );
        }
      });
    });
    return errors;
  },
  [enumBenefitCategory.cashless]: () => [],
  [enumBenefitCategory.life]: () => [],
};

export const VLD_000255 = (claimEntities: any) => {
  let errors: string[] = [];
  const { claimPayableListMap, treatmentPayableListMap, invoicePayableListMap } = claimEntities;
  lodash.forEach(
    claimPayableListMap,
    ({ claimDecision, benefitCategory, treatmentPayableList, policyNo, benefitTypeCode }: any) => {
      if (claimDecision === enumClaimDecision.approve) {
        errors = [
          ...errors,
          ...(enumBenefitCategoryFn?.[benefitCategory]?.({
            treatmentPayableList,
            treatmentPayableListMap,
            policyNo,
            benefitTypeCode,
            invoicePayableListMap,
          }) || []),
        ];
      }
    }
  );
  return errors;
};

export const VLD_000351 = (incidentListMap: any) => {
  const errorMessage = {
    code: 'VLD_000351',
    typeCode: 'Label_COM_ErrorMessage',
    dictCode: 'MSG_000370',
  };
  if (lodash.size(incidentListMap) === 0) return errorMessage;
  return lodash.every(incidentListMap, (incidentItem) =>
    lodash.some(
      formUtils.queryValue(incidentItem?.claimTypeArray),
      (item) => item === ClaimTypeArray.Death
    )
  )
    ? ''
    : errorMessage;
};

export const VLD_000352 = (submissionDate: any) => {
  const fieldName = formatMessageApi({
    Label_BIZ_Claim: 'app.navigator.task-detail-of-jpcr.label.submission-date',
  });
  return moment(formUtils.queryValue(submissionDate)).isValid()
    ? ''
    : {
        code: 'VLD_000352',
        typeCode: 'Label_COM_ErrorMessage',
        dictCode: 'MSG_000371',
        args: [fieldName],
      };
};

export const VLD_000353 = (diagnosisListMap: any) => {
  const fieldName = formatMessageApi({
    Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.diagnosis-code-name',
  });
  const errorMessage = {
    code: 'VLD_000353',
    typeCode: 'Label_COM_ErrorMessage',
    dictCode: 'MSG_000371',
    args: [fieldName],
  };
  if (lodash.size(diagnosisListMap) === 0) return errorMessage;
  return lodash.every(diagnosisListMap, (diagnosis: any) =>
    formUtils.queryValue(diagnosis?.diagnosisCode)
  )
    ? ''
    : errorMessage;
};

export const VLD_000354 = (incidentListMap: any) => {
  const fieldName = formatMessageApi({
    Label_BIZ_Claim: 'DateOfDeath',
  });
  const errorMessage = {
    code: 'VLD_000354',
    typeCode: 'Label_COM_ErrorMessage',
    dictCode: 'MSG_000371',
    args: [fieldName],
  };
  if (lodash.size(incidentListMap) === 0) return errorMessage;
  return lodash.every(incidentListMap, (incident: any) =>
    formUtils.queryValue(incident?.dateTimeOfDeath)
  )
    ? ''
    : errorMessage;
};

export const VLD_000363 = (claimPayableListMap: any) => {
  const fieldName = formatMessageApi({
    Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.beneficiary.label.policy-no',
  });
  const filter = lodash.filter(
    claimPayableListMap,
    (item) => item?.policySource === EPolicySource.Individual
  );
  return lodash.size(filter) > 0
    ? ''
    : {
        code: 'VLD_000363',
        typeCode: 'Label_COM_ErrorMessage',
        dictCode: 'MSG_000371',
        args: [fieldName],
      };
};

export const VLD_000364 = (claimPayableListMap: any) => {
  const fieldName = formatMessageApi({
    Label_BIZ_Claim: 'app.navigator.task-detail-of-claim-assessment.label.product',
  });
  const filter = lodash.filter(
    claimPayableListMap,
    (item) => item?.policySource === EPolicySource.Individual
  );
  const errorMessage = {
    code: 'VLD_000364',
    typeCode: 'Label_COM_ErrorMessage',
    dictCode: 'MSG_000371',
    args: [fieldName],
  };
  if (lodash.size(filter) === 0) return errorMessage;
  return lodash.every(filter, (payable: any) => formUtils.queryValue(payable?.productCode))
    ? ''
    : errorMessage;
};

export const VLD_000365 = (claimPayableListMap: any, policyList: any) => {
  const errorMessage = {
    code: 'VLD_000364',
    typeCode: 'Label_COM_ErrorMessage',
    dictCode: 'MSG_000392',
  };
  const result = lodash.every(claimPayableListMap, (item) =>
    lodash
      .chain(policyList)
      .filter((flip) => flip?.policyNo === formUtils.queryValue(item?.policyNo))
      .some((some) => some.productType === ProductType.Death)
      .value()
  );
  return result ? '' : errorMessage;
};

export const VLD_000366 = (claimPayableListMap: any) => {
  const result = lodash.every(claimPayableListMap, (item) => !item?.registered);
  const noRegistedPolicyNos = lodash
    .chain(claimPayableListMap)
    .reduce(
      (arr, item) =>
        item?.registered
          ? arr
          : lodash.chain(arr).concat(formUtils.queryValue(item.policyNo)).uniq().value(),
      []
    )
    .join(',')
    .value();
  const errorMessage = {
    code: 'VLD_000366',
    content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000383' }, noRegistedPolicyNos),
  };
  return result ? errorMessage : '';
};

export const VLD_000369 = (claimPayableListMap: any) => {
  const registeredPayableListMap = lodash.filter(claimPayableListMap, (item) => item?.registered);
  const result = lodash.inRange(
    lodash.size(registeredPayableListMap),
    1,
    lodash.size(claimPayableListMap)
  );
  const noRegistedPolicyNos = lodash
    .chain(claimPayableListMap)
    .reduce((arr, item) => {
      // 判断相同的policyNo下的productCode是否一样
      const productCode = lodash
        .chain(claimPayableListMap)
        .filter(
          (value) => formUtils.queryValue(value.policyNo) === formUtils.queryValue(item.policyNo)
        )
        .map((value) => formUtils.queryValue(value.productCode))
        .uniq()
        .value();
      const newArr = lodash.chain(arr).concat(formUtils.queryValue(item.policyNo)).uniq().value();
      return lodash.size(formUtils.queryValue(productCode)) > 1 ? newArr : arr;
    }, [])
    .join(',')
    .value();
  const errorMessage = {
    code: 'VLD_000369',
    content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_000386' }, noRegistedPolicyNos),
  };
  return result ? errorMessage : '';
};

export const VLD_000389 = (claimEntities: any) => {
  const claimPayableListMap = lodash.get(claimEntities, 'claimPayableListMap');
  const hasReimbursement = lodash.some(
    claimPayableListMap,
    (item: any) => item?.benefitCategory === eBenefitCategory.Reimbursement
  );

  const target = [
    'invoicePayableListMap',
    'invoiceListMap',
    'treatmentPayableListMap',
    'treatmentListMap',
    'benefitItemPayableListMap',
  ];
  if (!hasReimbursement) return '';
  return lodash.every(target, (item) => lodash.size(claimEntities?.[item]))
    ? ''
    : [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })];
};

export const VLD_000390 = (claimEntities: any) => {
  const claimPayableListMap = lodash.get(claimEntities, 'claimPayableListMap');
  const treatmentListMap = lodash.get(claimEntities, 'treatmentListMap');
  return lodash.every(claimPayableListMap, (item) => {
    if (item.benefitCategory === eBenefitCategory.Cashless && !lodash.size(treatmentListMap)) {
      return false;
    }
    if (
      item.benefitCategory === eBenefitCategory.Cashless &&
      !lodash.size(item.treatmentPayableList)
    ) {
      return false;
    }
    return true;
  })
    ? ''
    : [formatMessageApi({ Label_COM_WarningMessage: 'ERR_000001' })];
};

// Adjustment Amount/ Hospital Bill Amount 必须小于等于Pay To Hospital 的钱
export const VLD_000921 = (dataForSubmit: any) => {
  const {
    claimHospitalBillAdjustVO,
    daClaimAssessmentVO,
    claimHospitalBillingDetailVO,
  } = dataForSubmit;

  const adjustAmount = claimHospitalBillAdjustVO?.adjustAmount;
  const payToHospital = daClaimAssessmentVO?.claimDecision?.payToHospital;

  return lodash.isFinite(adjustAmount)
    ? (payToHospital < adjustAmount)
    : (payToHospital < claimHospitalBillingDetailVO?.amount)
};
