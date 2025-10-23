//  /api/srv/policy/requestPolicyPmModeChangeVal
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';

type IResponse = Record<string, any>;

const map = {
  A: '01',
  H: '02',
  Q: '04',
  M: '12',
};

export default function* getPolicyPmMode({ payload }: any, { call, put, select }: any) {
  const { id } = payload;
  const paymentMode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.paymentMode
  );
  const policyPaymentModeChangeVal = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.processData?.policyInfo?.policyPaymentModeChangeVal
  );

  if (lodash.isPlainObject(policyPaymentModeChangeVal) && policyPaymentModeChangeVal === null) {
    yield put({
      type: `paymentModeRule`,
      payload: {
        runPaymentModeRule: false,
      },
    });
  }
  if (lodash.isPlainObject(policyPaymentModeChangeVal)) {
    const policyPmMode = lodash
      .chain(policyPaymentModeChangeVal)
      .toPairs()
      .filter(([key]: any) => key.match('modeChangeVal'))
      .map(([key, value]: any) => {
        const modeVal = key.replace('modeChangeVal', '');
        return {
          [`${modeVal}`]: {
            enableChange: value,
            premiumAmt: policyPaymentModeChangeVal[`premiumAmt${modeVal}`],
          },
        };
      })
      .reduce((result: any, value: any) => {
        const key: string = lodash.findKey(value) || '';
        // eslint-disable-next-line no-param-reassign
        result[key] = lodash.find(value);
        return result;
      })
      .value();

    yield put({
      type: 'policyPmModeUpdate',
      payload: {
        policyPmMode,
      },
    });

    if(paymentMode?.nextPremiumAmount === void 0 || paymentMode?.nextPremiumAmount === null) {
      const nextPremiumAmount = policyPmMode?.[map[paymentMode?.nextPaymentMode]]?.premiumAmt;
      yield put({
        type: `paymentModeUpdate`,
        payload: {
          changedFields: {
            nextPremiumAmount,
          },
          id,
        },
      });
    }
  }
}
