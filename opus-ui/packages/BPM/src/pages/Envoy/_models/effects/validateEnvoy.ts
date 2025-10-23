import lodash from 'lodash';

interface IAction {
  payload: {
    reasonGroup: any;
  };
}

function* validateEnvoy({ payload }: IAction, { select, call, put }: any) {
  const { reasonGroup } = payload;
  const newReasonGroup = lodash.cloneDeep(reasonGroup);
  const hasError = yield put.resolve({
    type: 'validateFields',
    payload: {
      type: 'reason',
      sendDataId: newReasonGroup?.id,
      dataId: newReasonGroup?.id,
    },
  });
  if (hasError) {
    return true;
  }

  return false;
}

export default validateEnvoy;
