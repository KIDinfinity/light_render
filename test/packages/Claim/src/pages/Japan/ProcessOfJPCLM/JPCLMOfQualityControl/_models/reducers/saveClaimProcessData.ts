import lodash from 'lodash';

export default (state: any, action: any) => {
  const { applicationList = [], claimProcessData } = action.payload;
  const { claimDatas, claimEntities } = claimProcessData;
  const defaultTab = lodash.get(applicationList, '[0].applicationNo', '');
  const defaultDocumentId = lodash.get(applicationList, `[0].documentList[0]`, {});
  const defaultDocument = lodash.get(claimEntities, `bpoFormDataList.${defaultDocumentId}`, {});

  return {
    ...state,
    applicationList,
    claimProcessData,
    currentDocument: defaultDocument,
    currentTab: defaultTab,
  };
};
