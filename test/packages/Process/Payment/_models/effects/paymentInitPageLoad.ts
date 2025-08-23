import lodash from 'lodash';
import {
  getPayeeDicts,
  supplementPayee,
  supplementClaimData,
  beneficiaryPayeeMatch,
} from '../_function';

export default function* openDataChannel({ payload }: any, { put }: any): Generator<any, any, any> {
  const { wholeEntities } = payload;
  const claimData: any = yield put.resolve({
    type: 'getDenormalizedData',
  });

  let claimDataTemp = { ...claimData };

  if (!lodash.isEmpty(claimDataTemp.payeeList)) {
    // payeeList数据存在的时候补充payee的相关信息
    claimDataTemp.payeeList = supplementPayee(claimDataTemp.payeeList);
  }

  // 此处对入参 claim data补数据
  claimDataTemp = supplementClaimData(claimDataTemp);
  claimDataTemp = beneficiaryPayeeMatch(claimDataTemp, claimDataTemp.policyBenefitList);

  //@ts-ignore
  claimDataTemp = yield put.resolve({
    type: 'paymentGetBankAccountDicts',
    payload: {
      claimData,
    },
  });

  yield put({
    type: 'paymentSaveInitPaymentData',
    payload: {
      claimData: claimDataTemp,
      wholeEntities,
    },
  });

  yield put({
    type: 'paymentSavePaymentPayeeDicts',
    payload: {
      payeeDicts: getPayeeDicts(claimDataTemp?.payeeList),
    },
  });
}
