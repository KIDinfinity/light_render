import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { getLoginUsers } from '@/services/loginLogoutControllerService';

export default function* getPublishServiceDownNotice(_: any, { put }: any) {
  // @ts-ignore
  const response = yield getLoginUsers();

  if (lodash.isPlainObject(response) && response?.success && lodash.isArray(response.resultData)) {
    yield put({
      type: 'saveOnlineUserList',
      payload: {
        // 加这个是因为前端tabale需要一个唯一标识
        onlineUserList: response.resultData.map((el: any) => ({
          ...el,
          id: uuidv4(),
        })),
      },
    });
  }
}
