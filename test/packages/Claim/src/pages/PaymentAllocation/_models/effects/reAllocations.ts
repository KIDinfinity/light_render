import lodash from 'lodash';
import { v2 as reAllocation } from '@/services/claimBeneficiaryControllerService';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { eClaimDecision } from 'claim/enum/claimDecision';
import {
  getPolicyBenefits,
  benefitAmountMatch,
  beneficiaryPayeeMatch,
  getPayeeDicts,
  supplementClaimData,
} from '../../_function';
type PayloadType = {
  claimData: any;
  originClaimProcessData: any;
};
// const delay = (timeout: number) => new Promise((resolve) => setTimeout(resolve, timeout));
export default function* reAllocations(
  { payload }: { payload: PayloadType },
  { call, put, select }: any
) {
  let { claimData = {} } = payload;
  const { originClaimProcessData } = payload;
  const { taskNotEditable, taskDetail, submited } = yield select(
    ({ claimEditable, processTask, formCommonController }: any) => ({
      taskNotEditable: claimEditable.taskNotEditable,
      taskDetail: processTask.getTask,
      submited: formCommonController.submited,
    })
  );

  const paymentAllocationErrors = yield select(
    ({ paymentAllocation }: any) => paymentAllocation.errors
  );

  const regionCode = tenant.region();

  const isDeny =
    formUtils.queryValue(claimData?.claimDecision?.assessmentDecision) === eClaimDecision.deny;

  // 若页面可编辑且total claim decision非deny的情况下，执行re-allocation相关的逻辑
  if (!taskNotEditable && !isDeny) {
    //@ts-ignore
    const noReAllocation: any = yield put.resolve({
      type: 'getIfReAllocation',
      payload: {
        claimData,
        originClaimProcessData,
      },
    });

    yield put.resolve({
      type: 'saveClaimData',
      payload: {
        claimData: {},
        reset: true,
        taskNotEditable,
      },
    });
    // 此处对旧的claim data补数据
    const claimDataOld: any = supplementClaimData(claimData, submited);
    if (noReAllocation) {
      // 若policy benefit 不存在，则根据claim data生成基础数据，以供manual分配
      if (lodash.isEmpty(claimDataOld.policyBenefitList)) {
        lodash.set(claimDataOld, 'policyBenefitList', getPolicyBenefits(claimData));
      }
      const { policyBenefitList } = claimDataOld;

      claimData = beneficiaryPayeeMatch(claimDataOld, policyBenefitList);
    }

    if (!!paymentAllocationErrors?.length || !!claimData.claimNo) {
      if (!noReAllocation || (!!noReAllocation && !claimData.callV2)) {
        lodash.set(claimData, 'regionCode', regionCode);
        lodash.set(claimDataOld, 'regionCode', regionCode);
        lodash.forEach(claimDataOld?.claimPayableList, (item) =>
          lodash.set(item, 'claimDecision', formUtils.queryValue(item?.claimDecision))
        );
        //@ts-ignore
        const response = yield call(reAllocation, claimDataOld);
        const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
        claimData.callV2 = true;

        if (success && resultData) {
          // 此处对新的claim data补数据
          const supplemented = supplementClaimData(resultData);
          const {
            policyBenefitList: policyBenefitListN,
            c360BeneficiaryInfo: c360BeneficiaryInfoN,
            payeeList: payeeListN,
          } = supplemented;

          lodash.set(claimData, 'c360BeneficiaryInfo', c360BeneficiaryInfoN);
          lodash.set(claimData, 'payeeList', payeeListN);
          lodash.set(claimData, 'policyBenefitList', policyBenefitListN);
        }

        if (!success || !resultData) {
          // 若policy benefit 不存在，则根据claim data生成基础数据，以供manual分配
          if (lodash.isEmpty(claimData?.policyBenefitList)) {
            lodash.set(claimData, 'policyBenefitList', getPolicyBenefits(claimData));
          }
          // 此处对新的claim data补数据
          const supplemented = supplementClaimData(claimData);
          const { policyBenefitList, c360BeneficiaryInfo, payeeList } = supplemented;
          const { policyBenefitList: policyBenefitListO } = claimDataOld;
          lodash.set(claimData, 'c360BeneficiaryInfo', c360BeneficiaryInfo);
          lodash.set(claimDataOld, 'payeeList', payeeList);

          if (!lodash.isEmpty(policyBenefitList) && !lodash.isEmpty(policyBenefitListO)) {
            const policyBenefitListTemp = benefitAmountMatch(policyBenefitList, policyBenefitListO);
            const result = beneficiaryPayeeMatch(claimDataOld, policyBenefitListTemp);
            lodash.set(claimData, 'policyBenefitList', result.policyBenefitList);
            lodash.set(claimData, 'payeeList', result.payeeList);
          }
        }
      }
    }
  }

  if (isDeny || !formUtils.queryValue(claimData?.claimDecision?.totalPayableAmount)) {
    lodash.set(claimData, 'policyBenefitList', []);
  }
  let errors = [];
  // 可编辑的情况下需要做的
  if (!taskNotEditable) {
    //@ts-ignore
    const claimDataTemp = yield put.resolve({
      type: 'getBankAccountDicts',
      payload: {
        claimData,
      },
    });

    yield put({
      type: 'saveClaimData',
      payload: {
        claimData: claimDataTemp,
        taskDetail,
        taskNotEditable,
      },
    });

    claimData = claimDataTemp;

    errors = yield put.resolve({
      type: 'updateErrors',
    });
  } else {
    yield put({
      type: 'saveClaimData',
      payload: {
        claimData,
        taskNotEditable,
      },
    });
  }

  yield put({
    type: 'savePayeeDicts',
    payload: {
      payeeDicts: getPayeeDicts(claimData?.payeeList),
    },
  });
  return { output: claimData, errors };
}
