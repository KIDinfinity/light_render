import lodash, { toLower, isArray, isEmpty } from 'lodash';
import { CategoryLower } from 'claim/pages/Japan/ProcessOfJPCLM/JPCLMOfQualityControl/Enum';
import { eCategory } from '../dto';

export const initSplitDocumentData = (claimProcessData: any, applicationType: any) => {
  const claimApplicationDocList = lodash.get(claimProcessData, 'claimApplicationDocList', []);
  const bpoFormDataList = lodash.get(
    claimProcessData,
    'bpoBatchDataVO.bpoDocumentDataList[0].bpoFormDataList',
    []
  );

  const data: object = {};

  claimApplicationDocList.forEach((claimApplicationDoc: any) => {
    data[claimApplicationDoc.applicationNo] = {
      claimData: {
        claimType: null,
        policy: [],
      },
      documentData: {},
    };
  });
  bpoFormDataList.forEach((bpoFormData: any) => {
    const { documentId, bpmDocumentId, formCategory, formData } = bpoFormData;
    const {
      applicationNo,
      documentTypeCode,
      claimType,
      firstPolicyId,
      secondPolicyId,
      thirdPolicyId,
    } = formData;
    const policy = lodash
      .chain([firstPolicyId, secondPolicyId, thirdPolicyId])
      .compact()
      .map((po) => ({ barId: po, barName: po, isSelected: true, bpmDocumentId }))
      .value();
    const claimTypeName = lodash.map(
      claimType ? [].concat(lodash.split(claimType, ',')) : [],
      (dictCode: string) => {
        const item = lodash.find(applicationType, { dictCode });
        return item ? item.dictName : dictCode;
      }
    );
    if (toLower(formCategory) === CategoryLower.RequestForm) {
      data[applicationNo].claimData.claimType =
        data[applicationNo].claimData.claimType || claimTypeName.join(' | ');
      data[applicationNo].claimData.policy = [...data[applicationNo].claimData.policy, ...policy];
    }
    data[applicationNo].documentData[bpmDocumentId] = {
      // 因 split by document 按照请求书番号进行拆分，故这里默认选上同一请求书下所有的必要书
      isSelected: true,
      documentTypeCode,
      bpmDocumentId,
      documentId,
      formCategory,
    };
  });

  return data;
};

const mapCase = (data: any, claimProcessData: any) => {
  const claimApplicationDocList = lodash.get(claimProcessData, 'claimApplicationDocList', []);
  const bpoFormDataList = lodash.get(
    claimProcessData,
    'bpoBatchDataVO.bpoDocumentDataList[0].bpoFormDataList',
    []
  );
  const originApplicationNos = lodash.keys(data);
  const newCase: any = { applicationFormDataList: [], claimDocRelationList: [] };
  lodash.forEach(originApplicationNos, (appNo) => {
    const claimApplicationDoc = lodash.find(
      claimApplicationDocList,
      (item) => item.applicationNo === appNo
    );
    const applicationFormData = { ...claimApplicationDoc, formDataList: [] };
    lodash.forEach(data[appNo].documentData, (item) => {
      const policyIds = lodash.map(data[appNo].claimData.policy, (el) => el.barId);
      const bpoFormData = lodash.find(
        bpoFormDataList,
        (el) => el.bpmDocumentId === item.bpmDocumentId
      );
      const { formData } = bpoFormData;
      const { claimType } = formData;
      if (
        bpoFormData.formCategory === eCategory.RequestForm &&
        isArray(claimType) &&
        !isEmpty(claimType)
      ) {
        formData.claimType = claimType.join(',');
      }
      if (bpoFormData.formCategory === eCategory.RequestForm) {
        formData.firstPolicyId = policyIds[0] || '';
        formData.secondPolicyId = policyIds[1] || '';
        formData.thirdPolicyId = policyIds[2] || '';
      }
      applicationFormData.formDataList.push({
        ...formData,
        ...{ formCategory: bpoFormData.formCategory },
      });
    });
    newCase.applicationFormDataList.push(applicationFormData);
    newCase.claimDocRelationList = newCase.claimDocRelationList.concat(
      applicationFormData.formDataList
    );
  });
  return newCase;
};

export const getSpliByDocPostList = (claimProcessData: any, newData: any, originalData: any) => {
  const originalCase = mapCase(originalData, claimProcessData);
  const newCase = mapCase(newData, claimProcessData);
  return { originalCase, newCase };
};
