import lodash from 'lodash';
import { createFormData } from './normalize';
import transferFormData from './transferFormData';
import getApplicationDate from './getApplicationDate';
import { DocumentCategory, enumContentType, DocumentStatus } from '../Enum';

const getDocumentList = (applicationMapList: any) => {
  const contentTypeGroup = lodash.groupBy(applicationMapList, (item) => {
    if (item.formData.contentType === enumContentType.imageOnly) {
      return 'imageOnly';
    }
    return 'default';
  });
  const defaultIds = lodash.map(contentTypeGroup.default, (item) => item.documentId);
  const documentStatus = lodash.groupBy(
    contentTypeGroup.imageOnly,
    (item) => item.formData.documentStatus
  );

  const documentStatusP = lodash.compact(documentStatus[lodash.toUpper(DocumentStatus.P)]);
  const documentStatusRD = lodash
    .chain(documentStatus[lodash.toUpper(DocumentStatus.R)])
    .concat(documentStatus[lodash.toUpper(DocumentStatus.D)])
    .compact()
    .value();
  const docuemntStatusGroupRD = lodash.groupBy(
    documentStatusRD,
    (item) => `${item.formData.documentTypeCode}_${item.formData.batchNo}`
  );
  const docuemntStatusGroupP = lodash.groupBy(
    documentStatusP,
    (item) => item.formData.documentTypeCode
  );
  const group = { ...docuemntStatusGroupRD, ...docuemntStatusGroupP };
  const imageOnlyIds = lodash.map(group, (item) => {
    if (lodash.isArray(item)) {
      if (item.length === 1) {
        return item[0].formData.documentId;
      }
      if (item.length > 1) {
        return lodash.map(item, (el) => el.formData.documentId).sort();
      }
    }
    return '';
  });
  return lodash.compact([...defaultIds, ...imageOnlyIds]);
};

// 获取请求书结构
const getApplicationList = (bpoFormDataList: any) => {
  const applicationMap = lodash.groupBy(
    lodash.values(bpoFormDataList),
    (el) => el.formData.applicationNo
  );
  return lodash
    .chain(applicationMap)
    .keys()
    .map((applicationNo) => ({
      applicationNo,
      // documentList: lodash.map(lodash.sortBy(applicationMap[applicationNo], 'formData.documentTypeCode'), el => el.documentId)
      documentList: getDocumentList(
        lodash.sortBy(applicationMap[applicationNo], 'formData.bpmDocumentId')
      ),
    }))
    .sortBy('applicationNo')
    .value();
};

// 获取书类表单
const getBpoFormDataList = (
  bpoFormDataList: any,
  bpoFormDataList_snapShot: any,
  isCompleteTask: boolean,
  isEmptySnapShot: boolean
) =>
  lodash.values(bpoFormDataList).reduce((formDataMap, current) => {
    const { documentId, formData: currentData = {} } = current;
    const currentSnapshot = lodash.get(bpoFormDataList_snapShot, `${documentId}`, {});
    const { formData: snapShotData, isChangeStausByUser } = currentSnapshot;
    return {
      ...formDataMap,
      [documentId]: {
        ...current,
        isChangeStausByUser,
        formCategory: lodash.camelCase(DocumentCategory[currentData.documentTypeCode]),
        formData: transferFormData({ currentData, snapShotData, isCompleteTask, isEmptySnapShot }),
      },
    };
  }, {});

// 获取请求书内容
const getClaimApplicationDocList = (
  claimApplicationDocList: any,
  applicationList: any,
  bpoFormDataList: any
) =>
  lodash.values(claimApplicationDocList).reduce((applicationMap, current) => {
    const { applicationNo } = current;
    const documentList =
      (lodash.chain(applicationList) as any).find({ applicationNo }).get('documentList').value() ||
      [];
    return {
      ...applicationMap,
      [applicationNo]: {
        ...current,
        ...getApplicationDate({
          documentList,
          applicationNo,
          bpoFormDataList,
          applicationItem: current,
        }),
      },
    };
  }, {});

// claimApplicationDocList 为空生成对象
const createClaimApplicationDocList = (
  applicationList: any,
  parentClaimNo: string,
  claimNo: string
) =>
  lodash.map(applicationList, (item) => ({
    id: null,
    creator: null,
    gmtCreate: null,
    modifier: null,
    gmtModified: null,
    deleted: null,
    transId: null,
    parentClaimNo,
    claimNo,
    applicationNo: item.applicationNo,
    firstFormReceiveDate: '',
    lastFormReceiveDate: '',
    firstMcReceiveDate: null,
    applicationType: null,
  }));

const getUniqClaim = (claimData: any) => {
  const newClaimData = lodash.cloneDeep(claimData);
  const bpoFormDataList = lodash.get(
    claimData,
    'bpoBatchDataVO.bpoDocumentDataList[0].bpoFormDataList',
    []
  );
  const newBpoFormDataList = lodash.uniqBy(bpoFormDataList, 'documentId');
  lodash.set(
    newClaimData,
    'bpoBatchDataVO.bpoDocumentDataList[0].bpoFormDataList',
    newBpoFormDataList
  );
  return newClaimData;
};

export default ({
  snapShotData,
  claimData: oldClaimData,
  isCompleteTask,
  isEmptySnapShot,
  parentClaimNo,
}: any) => {
  const claimData = getUniqClaim(oldClaimData);
  const { claimNo } = claimData;
  const snapShotForm = createFormData(snapShotData, parentClaimNo);
  const claimForm = createFormData(claimData, parentClaimNo);
  const {
    claimEntities: { bpoFormDataList: bpoFormDataList_snapShot },
  } = snapShotForm;
  const {
    claimEntities: { bpoFormDataList },
  } = claimForm;
  let {
    claimEntities: { claimApplicationDocList },
  } = claimForm;
  const applicationList = getApplicationList(bpoFormDataList);
  if (lodash.isEmpty(claimApplicationDocList)) {
    claimApplicationDocList = createClaimApplicationDocList(
      applicationList,
      parentClaimNo,
      claimNo
    );
  }
  const newBpoFormDataList = getBpoFormDataList(
    bpoFormDataList,
    bpoFormDataList_snapShot,
    isCompleteTask,
    isEmptySnapShot
  );
  const newClaimApplicationDocList = getClaimApplicationDocList(
    claimApplicationDocList,
    applicationList,
    newBpoFormDataList
  );

  return {
    applicationList,
    claimProcessData: {
      ...claimForm,
      claimDatas: {
        ...claimForm.claimDatas,
        claimApplicationDocList: lodash.map(applicationList, (item) => item.applicationNo),
      },
      claimEntities: {
        ...claimForm.claimEntities,
        claimApplicationDocList: newClaimApplicationDocList,
        bpoFormDataList: newBpoFormDataList,
      },
    },
  };
};
