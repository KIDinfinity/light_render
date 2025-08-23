//  /api/srv/policy/requestPolicyPmModeChangeVal
import lodash from 'lodash';
import { requestPolicyPmModeChangeVal } from '@/services/posSrvPolicyRequestControllerService';
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
  const mainPolicyId: string = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData.mainPolicyId
  );
  const sourceSystem: string = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData.sourceSystem
  );
  const srvNo: string = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData.srvNo
  );

  const paymentMode = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.transactionTypesMap?.[id]?.paymentMode
  );

  const response: IResponse = yield call(requestPolicyPmModeChangeVal, {
    policyId: mainPolicyId,
    sourceSystem,
    srvNo,
  });

  // TODO mock
  // const data = {
  //   id: 'test',
  //   creator: 'FWD',
  //   gmtCreate: '2021-06-03T03:09:18.000+0000',
  //   modifier: 'FWD',
  //   gmtModified: '2021-06-03T03:09:18.000+0000',
  //   deleted: 0,
  //   transId: 'TEST',
  //   srvNo: 'S202106030003',
  //   policyId: 'S00338454',
  //   modeChangeVal01: 'Y',
  //   modeChangeVal02: 'Y',
  //   modeChangeVal04: 'Y',
  //   modeChangeVal12: 'Y',
  //   premiumAmt01: 1200,
  //   premiumAmt02: 600,
  //   premiumAmt04: 300,
  //   premiumAmt12: 100,
  // };

  if (lodash.isPlainObject(response) && response.success && response.resultData === null) {
    yield put({
      type: `paymentModeRule`,
      payload: {
        runPaymentModeRule: false,
      },
    });
  }
  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    const policyPmMode = lodash
      .chain(response.resultData)
      .toPairs()
      .filter(([key]: any) => key.match('modeChangeVal'))
      .map(([key, value]: any) => {
        const modeVal = key.replace('modeChangeVal', '');
        return {
          [`${modeVal}`]: {
            enableChange: value,
            premiumAmt: response.resultData[`premiumAmt${modeVal}`],
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

    const premiumAmount = policyPmMode?.[map[paymentMode?.nextPaymentMode]]?.premiumAmt;
    yield put({
      type: `paymentModeUpdate`,
      payload: {
        changedFields: {
          premiumAmount,
        },
        id,
      },
    });
  }
}
