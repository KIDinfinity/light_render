import lodash from 'lodash';

type ActionType = 'all' | 'single' | 'mutiple' | 'clear';

export default function* (
  _: { payload: { type: ActionType; documentItem?: any; soureData?: any[] } },
  { put, select }: any
) {
  const { selectedDocs: preSelectedDocs } = yield select(
    ({ documentManagement }: any) => documentManagement.selectedData
  );
  const { type, documentItem, soureData } = _.payload;

  let data: { selectedDocs: any; isClickSelectAll: boolean } = {};

  switch (type) {
    // 全选
    case 'all': {
      data.selectedDocs = lodash
        .chain(soureData)
        .reduce((res, cur): any => res.concat(cur.documents), [])
        .reduce((obj, cur) => {
          // 不要失败状态的文件
          if (lodash.toLower(cur.imageUploadStatus) !== 'fail') {
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
      data = {
        isClickSelectAll: false,
        selectedDocs: preSelectedDocs[docId] ? {} : { [docId]: documentItem },
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
