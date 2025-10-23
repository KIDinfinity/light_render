/* eslint-disable no-param-reassign */
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';

function* refreshProcessPremium({ payload }: any, { put, select }: any) {
  const taskDetail = yield select((state: any) => state.premiumSettlement.taskDetail);
  const activityKey = yield select((state: any) => state.envoyController.activityKey);

  const { businessNo, caseNo } = lodash.pick(taskDetail, ['caseNo', 'businessNo']);

  if (tenant.isTH() && payload?.groupCode == 'P_BP_PND_CreditCardRefund') {
    switch (activityKey) {
      case 'BP_NB_ACT004': {
        yield put({
          type: `newBusinessManualUnderwriting/getRefreshPaymentAmount`,
          payload: {
            init: true,
          },
        });
        break;
      }
      case 'BP_NB_ACT006': {
        yield put({
          type: `premiumSettlement/refreshPremium`,
          payload: {
            businessNo,
            caseNo,
          },
        });
        break;
      }
      default: {
        return;
      }
    }
  }
}

export default refreshProcessPremium;
