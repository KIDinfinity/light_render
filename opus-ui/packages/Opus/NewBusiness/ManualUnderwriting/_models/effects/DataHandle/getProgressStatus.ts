import lodash from 'lodash';

export default function* ({ payload }: any, { select, call, put }: any): Generator<any, any, any> {
  const {
    response: { success, resultData = {}, warnData },

    progressData,
  } = payload;
  const { businessData } = resultData || {};
  const hasError = lodash.find(progressData, ({ error }: any) => !!error && !lodash.isEmpty(error));

  // 关闭弹窗
  if (
    !success ||
    warnData?.['x-error-nonce'] ||
    warnData?.['x-warn-nonce'] ||
    (!lodash.isEmpty(businessData) && !!success && !hasError)
  ) {
    yield put({
      type: 'clearProgressData',
    });
  }
  // 按钮变为got it
  if (!lodash.isEmpty(businessData) && !!success && !!hasError) {
    yield put({
      type: 'saveProgressDone',
    });
  }
}
