import lodash from 'lodash';

type ActionType = 'all' | 'single' | 'mutiple' | 'clear';

export default function* (
  _: { payload: { type: ActionType; documentItem?: any; soureData?: any[]; isCheckbox?: boolean } },
  { put, select }: any
) {
  const { selectedDocs: preSelectedDocs } = yield select(
    ({ documentManagement }: any) => documentManagement.selectedData
  );
  const { type, documentItem, soureData, isCheckbox = false } = _.payload;

  let data: { selectedDocs: any; isClickSelectAll: boolean } = {};

  switch (type) {
    // 全选
    case 'all': {
      data.selectedDocs = lodash
        .chain(soureData)
        .reduce((res, cur): any => res.concat(cur.documents), [])
        .reduce((obj, cur) => {
          // 不要失败状态的文件 && void的文件
          if (lodash.toLower(cur.imageUploadStatus) !== 'fail' && !cur.voidFlag) {
            obj[cur.docId] = { ...cur };
          }
          return obj;
        }, {})
        .value();
      data.isClickSelectAll = lodash.values(data.selectedDocs).length > 0;
      break;
    }
    // 单选
    case 'single': {
      const { docId } = documentItem;
      let temp = { ...preSelectedDocs };
      if (preSelectedDocs[docId]) {
        delete temp[docId];
      } else {
        temp = { [docId]: documentItem };
      }
      data = {
        isClickSelectAll: false,
        selectedDocs: temp,
      };
      break;
    }
    // 多选
    case 'mutiple': {
      const { docId } = documentItem;
      const temp = { ...preSelectedDocs };
      if (preSelectedDocs[docId]) {
        delete temp[docId];
        data.selectedDocs = temp;
      } else if (
        !preSelectedDocs[docId] &&
        lodash.toLower(documentItem.imageUploadStatus) !== 'fail'
      ) {
        data.selectedDocs = { ...preSelectedDocs, [docId]: documentItem };
      } else {
        data.selectedDocs = temp;
      }
      if (isCheckbox) {
        break;
      }
      data.isClickSelectAll = lodash.values(data.selectedDocs).length > 0;
      break;
    }
    // 清空
    case 'clear': {
      data = {
        isClickSelectAll: false,
        selectedDocs: {},
      };
      break;
    }
  }

  yield put({
    type: 'saveSelectedData',
    payload: { data },
  });
}
