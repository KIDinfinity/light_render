import lodash from 'lodash';
import {
  validateTime,
  validateTime2,
  validateEmptyAndSubmited,
  validateDuplication,
  validateIncludes,
} from '@/utils/validationsUtil';
import { formUtils } from 'basic/components/Form';
import { ClaimType, ServiceItem } from 'claim/enum';
import { IncidentCode } from 'claim/pages/Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EProcedureType } from 'process/Enum';

// 退院日 Shouldn't be earlier than Date of Admission
export const VLD_000018 = (treatmentItem, earlyDateName, lateDateName, finalChangedFields) =>
  validateTime(treatmentItem, earlyDateName, lateDateName, finalChangedFields, 'ERR_000035');

// Operation day must be during hospitalization.
export const VLD_000058 = (
  treatmentItem,
  procedureItem,
  earlyDateName,
  middleDateName,
  lateDateName,
  finalChangedFields
) =>
  validateTime2(
    treatmentItem,
    procedureItem,
    earlyDateName,
    middleDateName,
    lateDateName,
    finalChangedFields,
    'ERR_000086'
  );

// Require at least one incident record for each claim case.
export const VLD_000051 = (incidentList, submited) =>
  validateEmptyAndSubmited(incidentList, submited);
// Require at least one diagnosis record for each  claim case when claim type is not death.
export const VLD_000052 = (diagnosisList, submited) =>
  validateEmptyAndSubmited(diagnosisList, submited);

// Require at least one treatment record when claim type is not death
export const VLD_000054 = (claimTypeArray, treatmentList) =>
  !claimTypeArray?.includes?.('DTH') && lodash.isEmpty(treatmentList);

// 当报告者为 その他时，申出者可编辑，并且为必须填写项目。
export const VLD_000080 = (form) => form.getFieldValue('claimant') === '99';
// 当报告者为非被保险者时，为必须填写项目。
export const VLD_000081 = (form) => !form.getFieldValue('claimant') === '02';

// 当受付事案为P免时，保険料免除の事由可编辑并且为必须录入项目。
export const VLD_000082 = validateIncludes();
// 受付事案为死亡时，死因field可编辑,并且必须录入。
export const VLD_000084 = validateIncludes();
// 受付事案为死亡时，死亡日時field可编辑,并且必须录入。
export const VLD_000085 = VLD_000084;

// 病理組織学的検査为‘有’时，診断確定日field可编辑，并且必须录入。
export const VLD_000086 = (form) => form.getFieldValue('diagnosticPathology') === true;
// 病理組織学的検査为‘有’时，病理組織診断名field可编辑，并且必须录入。
export const VLD_000087 = VLD_000086;

// 当治療タイプ为01 入院 时，入院日field可编辑，并且必须录入。
export const VLD_000088 = (form) => form.getFieldValue('treatmentType') === 'IP';
// 当治療タイプ为01 入院 时，退院日field可编辑，并且必须录入。
export const VLD_000089 = VLD_000088;

// 当集中治疗为‘有’时，開始日field可编辑，并且必须录入。
export const VLD_000090 = (form) => form.getFieldValue('icu') === true;
// 当集中治疗为‘有’时，終了日field可编辑，并且必须录入。
export const VLD_000091 = VLD_000090;

// 開始日 should not be earlier than admission date.
export const VLD_000056 = (treatmentItem, earlyDateName, lateDateName, finalChangedFields) =>
  validateTime(treatmentItem, earlyDateName, lateDateName, finalChangedFields, 'ERR_000082');

// 終了日 should not be earlier than the begining date of ICU.
export const VLD_000057 = (treatmentItem, earlyDateName, lateDateName, finalChangedFields) =>
  validateTime(treatmentItem, earlyDateName, lateDateName, finalChangedFields, 'ERR_000084');

// To date should not be earlier than from date
export const VLD_000095 = (treatmentItem, earlyDateName, lateDateName, finalChangedFields) =>
  validateTime(treatmentItem, earlyDateName, lateDateName, finalChangedFields, 'ERR_000110');

// Duplicate checking of Diagnosis
export const VLD_000009 = (finalChangedFields, claimEntities, incidentId, fieldName) =>
  validateDuplication(
    finalChangedFields,
    claimEntities,
    'incidentListMap',
    'diagnosisListMap',
    incidentId,
    fieldName,
    'ERR_000017',
    'diagnosisList'
  );

// Duplicate checking of Procedure
export const VLD_000061 = (finalChangedFields, claimEntities, treatmentId, fieldName) =>
  validateDuplication(
    finalChangedFields,
    claimEntities,
    'treatmentListMap',
    'procedureListMap',
    treatmentId,
    fieldName,
    'ERR_000091',
    'procedureList'
  );

export const VLD_000110 = (existDiagnosisList) => {
  let diagnosisTypeSelectMain = '';
  lodash.forEach(existDiagnosisList, (item) => {
    if (item.diagnosisType === 'P') {
      diagnosisTypeSelectMain = item.id;
    }
  });
  return diagnosisTypeSelectMain;
};

// 当脳卒中の場合60日後遺症継続为はい时，脳卒中の場合，後遺症を記入为必须填写可编辑项目。
export const VLD_000111 = (form) => form.getFieldValue('sequelaeOfStroke') === '01';

// 薬剤治療種類 is selected，薬剤名 is null

export const VLD_000114 = (publicInsurance) => formUtils.queryValue(publicInsurance) === '01';
// 受付事案 为高障的时候必须录入 体の被害部分
export const VLD_000083 = (claimTypeArray) =>
  lodash.includes(formUtils.queryValue(claimTypeArray), 'TPD');

export const VLD_000038 = ({ policyList, applicationList, submited }) => {
  if (!submited) {
    return [];
  }
  const noIncludeList = [];

  if (lodash.isArray(policyList) && lodash.isArray(applicationList)) {
    const policyNoList = policyList
      .filter((item) => {
        const value = formUtils.queryValue(item.confirmed);
        return !!value;
      })
      .map((item) => formUtils.queryValue(item.policyNo));
    let applicationPolicyNoList = [];
    applicationList.forEach((item) => {
      const array = formUtils.queryValue(item.policyNoArray);
      if (lodash.isArray(array)) {
        const policyNos = array.map((p) => {
          const value = formUtils.queryValue(p);
          return value;
        });
        applicationPolicyNoList = [...applicationPolicyNoList, ...policyNos];
      }
    });
    policyNoList.forEach((item) => {
      if (!applicationPolicyNoList.includes(item)) {
        noIncludeList.push(item);
      }
    });
  }
  return noIncludeList;
};
export const VLD_000039 = (policyList = []) => lodash.isEmpty(policyList);

export const VLD_000045 = (policyList = []) => {
  const list = lodash.compact(policyList).map((item) => ({
    ...item,
    policyNo: formUtils.queryValue(item.policyNo),
  }));
  const duplicateCount = lodash.uniqBy(list, 'policyNo').map((item) => ({
    id: item.id,
    count: 0,
    policyNo: item.policyNo,
  }));
  list.forEach((item) => {
    const index = duplicateCount.findIndex((dupItem) => item.policyNo === dupItem.policyNo);
    if (index !== -1) {
      duplicateCount[index].count += 1;
    }
  });
  const duplicateNos = duplicateCount.filter((item) => item.count > 1).map((item) => item.policyNo);
  return duplicateNos;
};
// 受付事案为高障时，高度障害コードfield可以编辑且必须录入。
export const VLD_000123 = validateIncludes();
// 受付事案为高障时，障害名field可以编辑且必须录入。
export const VLD_000124 = validateIncludes();
// 受付事案为高障时，要介護認定日field可以编辑且必须录入。
export const VLD_000125 = validateIncludes();

// When Claim type= CI, Date of payment is mandatory
export const VLD_000186 = validateIncludes();

// 验证事故受付-请求书受付，证券番号是否重复，如果有重复的，将重复的番号返回
export const VLD_000064 = (applicationList = []) => {
  const policyNoRecipientNameArr = [];
  // 遍历，获取所有组合的值，放入数组
  if (applicationList) {
    applicationList.forEach((item) => {
      const policyNoArray = formUtils.queryValue(item?.policyNoArray);
      const recipientName = formUtils.queryValue(item?.recipientName);
      policyNoArray.forEach((policyNo) => {
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

export const VLD_000065 = (arr: any[]): boolean => {
  return lodash.every(arr, (item: any) => item.checked);
};

export const VLD_000324 = (fieldName: string) => {
  const isRequireArr = ['emailAddress', 'subject'];
  return lodash.includes(isRequireArr, fieldName);
};

export const VLD_000325 = (fieldName: string) => {
  const isRequireArr = ['phoneNo'];
  return lodash.includes(isRequireArr, fieldName);
};

export const VLD_000326 = (fieldName: string) => {
  const isRequireArr = ['address'];
  return lodash.includes(isRequireArr, fieldName);
};

const claimTypeIsInclude = ({ claimTypeArray, sectionType, submited }: any) => {
  return lodash.includes(claimTypeArray, sectionType) && submited;
};

export const VLD_000444 = ({ claimTypeArray, sectionList, sectionType, submited }: any) => {
  return (
    claimTypeIsInclude({ claimTypeArray, sectionType, submited }) && lodash.isEmpty(sectionList)
  );
};

export const VLD_000445 = ({ claimTypeArray, sectionList, sectionType, submited }: any) => {
  return !lodash.isEmpty(sectionList) && !lodash.includes(claimTypeArray, sectionType) && submited;
};

const getSectionList = ({ incidentItem, claimEntities, targetVal, listMapVal, idVal }: any) => {
  const { id, claimTypeArray } = lodash.pick(incidentItem, ['id', 'claimTypeArray']);
  const target = idVal || 'incidentId';
  const targetList = lodash
    .chain(claimEntities[listMapVal])
    .filter((item) => item[target] === id)
    .map((item) => item?.[targetVal])
    .value();

  return { targetList: lodash.chain(targetList).compact().flatten().value(), claimTypeArray };
};

const returnValidate = ({ result, sectionType, submited, sectionTitle }: any) => {
  // claimType is includes SG RT AMD validate section whether exist
  const isNotExistSection = VLD_000444({
    claimTypeArray: result?.claimTypeArray,
    sectionList: result?.targetList,
    submited,
    sectionType,
  });
  // section is exist validate claimType whether includes
  const isNotIncludes = VLD_000445({
    claimTypeArray: result?.claimTypeArray,
    sectionList: result?.targetList,
    sectionType,
    submited,
  });
  return {
    validateOne: {
      sectionType,
      value: isNotExistSection,
    },
    validateTwo: {
      value: isNotIncludes,
      sectionTitle,
    },
  };
};

const getItemByIdList = ({ claimEntities, targetList, listMapVal }: any) => {
  return lodash.map(targetList, (id) => {
    return claimEntities[listMapVal][id];
  });
};
const validateValueExists = ({ itemList, targetVal, code }: any) => {
  const hasItem = lodash.some(itemList, (item) =>
    lodash.includes(code, formUtils.queryValue(item?.[targetVal]))
  );
  return hasItem;
};
export const treatmentListValidate = ({ incidentItem, submited, claimEntities }: any) => {
  const result: any = getSectionList({
    incidentItem,
    claimEntities,
    targetVal: 'treatmentList',
    listMapVal: 'incidentListMap',
    idVal: 'id',
  });
  const isInclude = claimTypeIsInclude({
    claimTypeArray: result?.claimTypeArray,
    sectionType: ClaimType.HP,
    submited,
  });
  const treatmentItemList = getItemByIdList({
    claimEntities,
    targetList: result?.targetList,
    listMapVal: 'treatmentListMap',
  });
  const hasItem = validateValueExists({
    itemList: treatmentItemList,
    targetVal: 'treatmentType',
    code: [IncidentCode.InPatient, IncidentCode.OutPatient],
  });

  const validatorResult = isInclude ? !(isInclude && hasItem) : isInclude;
  return {
    validateOne: {
      sectionType: ClaimType.HP,
      value: validatorResult,
    },
  };
};

export const procedureListValidate = ({ incidentItem, submited, claimEntities }: any) => {
  const sectionTitle = formatMessageApi({
    Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.medical-surgical-procedure',
  });
  const result: any = getSectionList({
    incidentItem,
    claimEntities,
    targetVal: 'procedureList',
    listMapVal: 'treatmentListMap',
  });

  return returnValidate({ result, sectionType: ClaimType.SG, submited, sectionTitle });
};

export const otherProcedureListValidate = ({ incidentItem, submited, claimEntities }: any) => {
  const sectionTitle = formatMessageApi({
    Label_BIZ_Claim: 'Radiotherapy',
  });
  const result: any = getSectionList({
    incidentItem,
    claimEntities,
    targetVal: 'otherProcedureList',
    listMapVal: 'treatmentListMap',
  });

  //filter procedureType===EProcedureType.Radiotherapy
  const targetList = lodash
    .chain(result.targetList)
    .filter(
      (id) =>
        formUtils.queryValue(claimEntities?.otherProcedureListMap?.[id]?.procedureType) ===
        EProcedureType.Radiotherapy
    )
    .value();

  return returnValidate({
    result: {
      ...result,
      targetList,
    },
    sectionType: ClaimType.RT,
    submited,
    sectionTitle,
  });
};

export const ServiceListValidate = ({ incidentItem, submited, claimEntities }: any) => {
  const sectionTitle = `${formatMessageApi({
    Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.service-item',
  })}-${ServiceItem.JPADMEDNAME}`;
  const result: any = getSectionList({
    incidentItem,
    claimEntities,
    targetVal: 'invoiceList',
    listMapVal: 'treatmentListMap',
  });
  const invoiceIdList = result?.targetList;
  const invoiceItemList = getItemByIdList({
    claimEntities,
    targetList: invoiceIdList,
    listMapVal: 'invoiceListMap',
  });
  const targetList = lodash
    .chain(invoiceItemList)
    .map((item) => item?.serviceItemList)
    .flatten()
    .value();
  const isNotExistSection = VLD_000444({
    claimTypeArray: result?.claimTypeArray,
    sectionList: targetList,
    submited,
    sectionType: ClaimType.AMD,
  });

  if (!isNotExistSection) {
    const serviceItemList = getItemByIdList({
      claimEntities,
      targetList,
      listMapVal: 'serviceItemListMap',
    });
    const hasItem = validateValueExists({
      itemList: serviceItemList,
      targetVal: 'serviceItem',
      code: [ServiceItem.JPADMED],
    });
    const isInclude = claimTypeIsInclude({
      claimTypeArray: result?.claimTypeArray,
      sectionType: ClaimType.AMD,
      submited,
    });
    const isNotIncludes = VLD_000445({
      claimTypeArray: result?.claimTypeArray,
      sectionList: serviceItemList,
      submited,
      sectionType: ClaimType.AMD,
    });
    // 当claimType包含AMD的时候，仅有serviceItemList存在且有其中一个serviceItem为JPADMED 不需要弹error
    return {
      validateOne: {
        sectionType: ClaimType.AMD,
        value: isInclude ? !(isInclude && !lodash.isEmpty(serviceItemList) && hasItem) : false,
      },
      // 当claimType不包含AMD section不为空且其中一个serviceItem为JPADMED 需要弹error
      validateTwo: {
        value: isNotIncludes && hasItem,
        sectionTitle,
      },
    };
  }
  // 当claimType包含AMD的时候，invoiceList为空，则需要弹出error
  return {
    validateOne: {
      sectionType: ClaimType.AMD,
      value: true,
    },
  };
};
