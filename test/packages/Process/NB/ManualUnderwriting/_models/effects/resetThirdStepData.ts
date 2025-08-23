import { produce }  from 'immer';
import lodash from 'lodash';

export default function* resetThirdStepData(_: any, { put, select }: any) {
  const businessData = yield select((state: any) => state.manualUnderwriting.businessData);
  const originBizData = yield select((state: any) => state.manualUnderwriting?.originBizData);
  const stepsChange = yield select((state: any) => state.manualUnderwriting);
  const dataSourcePaths = ['agentList'];
  const newData = produce(businessData, (draftData: any) => {
    lodash.forEach(dataSourcePaths, (path: string) => {
      lodash.set(draftData, path, lodash.get(originBizData, path));
    });
  });

  yield put({
    type: 'saveBizData',
    payload: {
      businessData: newData,
    },
  });
  yield put({
    type: 'setStepChange',
    payload: {
      stepsChange: {
        ...stepsChange,
        OtherInfo: false,
      },
    },
  });
}
