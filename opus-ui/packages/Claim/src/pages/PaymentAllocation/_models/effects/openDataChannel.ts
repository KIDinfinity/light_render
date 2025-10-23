import lodash from 'lodash';
import {
  getPayeeDicts,
  supplementPayee,
  supplementClaimData,
  beneficiaryPayeeMatch,
} from '../../_function';

export default function* openDataChannel({ payload }: any, { put, select }: any) {
  //@ts-ignore
  const taskNotEditable = yield select(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { claimData = {} } = payload;
  let claimDataTemp = { ...claimData };
  // payeeList数据存在的时候补充payee的相关信息
  if (!lodash.isEmpty(claimDataTemp.payeeList) && !taskNotEditable) {
    claimDataTemp.payeeList = supplementPayee(claimDataTemp.payeeList);
  }

  // 如果list policy存在，则保存起来，并做好currency的转化
  if (!lodash.isEmpty(claimDataTemp?.listPolicy)) {
    yield put({
      type: 'saveListPolicy',
      payload: {
        listPolicy: claimDataTemp?.listPolicy,
      },
    });
    yield put({
      type: 'saveCurrencies',
      payload: {
        listPolicy: claimDataTemp?.listPolicy,
      },
    });

    delete claimDataTemp.listPolicy;
  }

  // 此处对入参 claim data补数据
  claimDataTemp = supplementClaimData(claimDataTemp);
  claimDataTemp = beneficiaryPayeeMatch(claimDataTemp, claimDataTemp.policyBenefitList);

  yield put({
    type: 'resetAllocation',
  });

  //@ts-ignore
  claimDataTemp = yield put.resolve({
    type: 'getBankAccountDicts',
    payload: {
      claimData,
    },
  });

  yield put({
    type: 'saveClaimData',
    payload: {
      claimData: claimDataTemp,
      taskNotEditable,
    },
  });

  yield put({
    type: 'savePayeeDicts',
    payload: {
      payeeDicts: getPayeeDicts(claimDataTemp?.payeeList),
    },
  });
}
