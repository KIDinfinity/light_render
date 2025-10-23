import lodash from 'lodash';

/**
 *
 * @param reqDocuments 提交的document数据
 * @param resDocsInfo 提交的返回document数据
 */
const supplementDocIds = (reqDocuments: any[], resDocsInfo: any) => {
  if (
    !lodash.isArray(reqDocuments) ||
    !reqDocuments.length ||
    !lodash.isArray(resDocsInfo) ||
    !resDocsInfo.length
  )
    return reqDocuments;

  return lodash
    .chain(reqDocuments)
    .map((reqDocs: any) => {
      const resDocsItem = lodash.find(resDocsInfo, { fileId: reqDocs.fileId });
      return resDocsItem?.fileId === reqDocs.fileId ? resDocsItem : reqDocs;
    })
    .value();
};

export default supplementDocIds;
