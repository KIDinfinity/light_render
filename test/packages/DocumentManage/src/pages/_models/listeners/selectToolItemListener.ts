import lodash from 'lodash';
import { EToolModules } from '../../_dto/enums';
import type { StateModel } from '../../_dto/model';

export function* selectToolItemListener(_: any, { put, takeEvery, select }: any) {
  yield takeEvery(`documentManagement/selectToolItem`, function* act({ payload }: any) {
    const { toolId, selected } = payload || {};

    if (toolId === EToolModules.void) {
      const { selectedDocId, toolsData = {}, documentList }: StateModel = yield select(
        ({ documentManagement }: any) => ({
          selectedDocId: documentManagement.selectedDocId,
          toolsData: documentManagement.toolsData,
          documentList: documentManagement.documentList,
        })
      );

      const businessNo = lodash
        .chain(documentList || [])
        .find((el: any) => el.docId === selectedDocId)
        .get('businessNo')
        .value();

      yield put({
        type: 'submitVoid',
        payload: {
          docId: selectedDocId,
          voidFlag: selected ? 0 : 1,
          claimNo: businessNo,
        },
      });

      // view为部分可见（过滤voided的document）情况下重置当前选择的document id为空
      const { selected: viewSelected } = lodash.get(toolsData, `[${EToolModules.view}]`, {});
      if (!viewSelected) {
        yield put({
          type: 'selectDocItem',
          payload: {
            selectedDocId: '',
            selectedId: '',
          },
        });
      }
    }
  });
}

export default selectToolItemListener;
