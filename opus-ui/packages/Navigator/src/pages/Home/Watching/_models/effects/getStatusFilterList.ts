import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default function* getStatusFilterList(_: any, { put, call, select }: any) {
  // ['toDo', 'pending']
  const selectedList = yield select((state: any) => state.taskFolder.selectedFolder);

  yield put({
    type: 'saveStatusFilterList',
    payload: {
      statusFilterList: lodash
        .chain(selectedList)
        // [{ status: 'todo', name: 'To Do', count: 0 }]
        .map((status: string) => ({
          status: lodash.toLower(status),
          name: formatMessageApi({
            Label_BIZ_Claim: `app.navigator.task-detail-of-data-capture.status.${lodash.toLower(
              status
            )}`,
          }),
          count: 0,
        }))
        .compact()
        .value(),
    },
  });
}
