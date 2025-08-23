import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { IEffects } from '../interfaces/index';

export default function* chatLink({ payload }: any, { put, select }: IEffects) {
  const archiveList = lodash.get(payload, 'archiveList', {});
  const informationData = yield select(
    (state) => state.navigatorInformationController?.informationData
  );
  // const {} = informationData;
  const caseNo = formUtils.queryValue(informationData.caseNo);
  const activityCode = formUtils.queryValue(informationData.activityCode);
  const archiveListInIt = lodash.get(archiveList, 'archiveListInIt', []);
  const informationDataContactContent = [];
  // 整理按时间顺序传数据到备注管理的显示
  lodash.forEach(archiveListInIt, (obj) => {
    const time = obj.time.substr(0, 10);
    const array = informationDataContactContent[time] || [];
    array.push(obj);
    informationDataContactContent[time] = array;
  });
  yield put({
    type: 'setIsLockInformation',
    payload: {
      lockInformationData: true,
    },
  });
  yield put({
    type: 'setInformationDataContent',
    payload: {
      informationDataContactContent,
    },
  });
  if (caseNo && activityCode) {
    yield put({
      type: 'setInforamtionCasegetoryToRemakWhenChatLink',
      payload: {
        activityCode,
        content: JSON.stringify(archiveListInIt),
      },
    });
  }
}
