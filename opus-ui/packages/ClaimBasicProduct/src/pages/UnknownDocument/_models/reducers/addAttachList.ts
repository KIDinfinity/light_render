/* eslint-disable no-param-reassign */
import { produce } from 'immer';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { docId, type, caseNo } = payload;

    if (type === 'doc') {
      draftState.attachList.push({ udDocId: docId });
    }

    if (type === 'case') {
      //一对一的写法，移除原来的
      draftState.attachList = [
        { ...draftState.attachList?.[0], relatedCaseType: 'selected', relatedCaseNo: caseNo },
      ];
    }
  });
