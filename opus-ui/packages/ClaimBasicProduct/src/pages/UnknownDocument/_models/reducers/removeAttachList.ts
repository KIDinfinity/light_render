/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { docId, type, caseNo } = payload;

    if (type === 'doc') {
      draftState.attachList = draftState.attachList.filter(
        (attachItem: any) => attachItem?.udDocId !== docId
      );
    }

    if (type === 'case') {
      draftState.attachList = draftState.attachList.map((item) =>
        item?.relatedCaseNo === caseNo ? { udDocId: item?.udDocId } : item
      );
    }
  });
