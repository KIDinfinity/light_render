import lodash from 'lodash';

export default function* ({}: any, { select }: any) {
  const { searchCaseList, processData, attachList } = yield select((state: any) => ({
    searchCaseList: state.UnknownDocumentBaseController.searchCaseList,
    attachList: state.UnknownDocumentBaseController.attachList,
    processData: state.UnknownDocumentBaseController.processData,
  }));

  return {
    ...processData,
    udDocCaseRelationList: attachList,
    udSelectedCaseList: lodash.uniqBy(
      [...(processData?.udSelectedCaseList || []), ...searchCaseList]?.filter(
        (caseItem) =>
          attachList.findIndex(
            (attachItem) => attachItem?.relatedCaseNo === caseItem?.selectedCaseNo
          ) > -1
      ),
      'selectedCaseNo'
    ),
  };
}
