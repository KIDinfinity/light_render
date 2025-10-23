import lodash from 'lodash';

export default (state: any, action: any) => {
  const { documentDatas, documentEntities } = action.payload;

  const defaultTab = documentDatas[0] || '';
  const defaultDocumentId = lodash.get(
    documentEntities,
    `applicationMap.${defaultTab}.pendDocumentInfoList[0]`,
    ''
  );
  const defaultDocument = lodash.get(documentEntities, `documentMap.${defaultDocumentId}`, {});

  return {
    ...state,
    documentDatas,
    documentEntities,
    currentDocument: defaultDocument,
    currentTab: defaultTab,
  };
};
