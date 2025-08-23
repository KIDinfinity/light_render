import { Region, tenant } from '@/components/Tenant';
import TaskDefKey from 'basic/enum/TaskDefKey/hk';
import lodash from 'lodash';
import { supplementPayee } from '../../_function';

export default function* allocationOpen({ payload }: any, { put, select }: any) {
  const { submited, taskNotEditable, taskDefKey } = yield select(
    ({ formCommonController, claimEditable, processTask }: any) => ({
      submited: formCommonController.submited,
      taskNotEditable: claimEditable.taskNotEditable,
      taskDefKey: processTask?.getTask?.taskDefKey,
    })
  );

  const { claimData } = payload;

  // payeeList数据存在的时候补充payee的相关信息
  if (!lodash.isEmpty(claimData.payeeList) && !taskNotEditable) {
    claimData.payeeList = supplementPayee(claimData.payeeList, submited);
  }

  // 如果list policy存在，则保存起来，并做好currency的转化
  if (!lodash.isEmpty(claimData?.listPolicy)) {
    yield put({
      type: 'saveListPolicy',
      payload: {
        listPolicy: claimData?.listPolicy,
      },
    });
    yield put({
      type: 'saveCurrencies',
      payload: {
        listPolicy: claimData?.listPolicy,
      },
    });

    delete claimData.listPolicy;
  }

  // 若c360数据不存在，则通过接口获取
  if (lodash.isEmpty(claimData.c360BeneficiaryInfo)) {
    //@ts-ignore
    const c360BeneficiaryInfo = yield put.resolve({
      type: 'getC360BeneficiaryInfo',
      payload: {
        claimData,
      },
    });

    lodash.set(claimData, 'c360BeneficiaryInfo', c360BeneficiaryInfo);
  }

  // 获取bankAccountList
  tenant.region({
    //@ts-ignore
    [Region.HK]: yield put.resolve({
      type: 'getBankAccountList',
      payload: {
        claimData,
      },
    }),
  });

  // // 获取ownerPolicyList
  if (TaskDefKey.HK_CLM_ACT003 === taskDefKey) {
    tenant.region({
      //@ts-ignore
      [Region.HK]: yield put.resolve({
        type: 'getOwnerPolicyList',
        payload: {
          claimData,
        },
      }),
    });
  }

  yield put({
    type: 'initedAllocation',
    payload: {
      inited: true,
    },
  });

  yield put({
    type: 'toggleModal',
    payload: {
      opened: true,
    },
  });

  yield put({
    type: 'reAllocations',
    payload: {
      claimData,
    },
  });
}
