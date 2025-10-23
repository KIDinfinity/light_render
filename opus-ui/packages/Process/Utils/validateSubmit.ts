/**
 * 弹窗校验(目前只支持payable修改校验)
 */

import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal, handleMessageModal } from '@/utils/commonMessage';
import { tenant, Region } from '@/components/Tenant';

/**
 * 校验类型
 * TypePayable - payable
 */
enum ValidatorType {
  TypePayable = 'TypePayable',
}

/**
 * 基础配置
 * warn - 弹窗类型
 */
const basicConfigs = {
  warn: {
    MSG_000541: ({ showWarn }: any) => {
      return new Promise((resolve) => {
        if (showWarn) {
          handleWarnMessageModal(
            [{ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000541' }) }],
            {
              okFn: () => {
                resolve(true);
              },
              cancelFn: () => {
                resolve(false);
              },
            }
          );
        } else {
          resolve(true);
        }
      });
    },
  },
  error: {
    MSG_001012: () => {
      handleMessageModal([
        {
          code: 'VLD_000969',
          content: formatMessageApi({ Label_COM_ErrorMessage: 'MSG_001012' }),
        },
      ]);
      return false;
    },
  },
};

export default ({ dispatch, nameSpace, validatorType }: any) => {
  const configs = {
    [ValidatorType.TypePayable]: async () => {
      const expectDecisionList = await dispatch({
        type: 'commonClaimAssessmentController/getExpectDecisionList',
        payload: {
          nameSpace,
          ignorePreExpectDecision: true,
        },
      });
      return tenant.region({
        [Region.HK]: async () => {
          const hasAddDeductiblAmount = await dispatch({
            type: `${nameSpace}/getDeductiblAmountError`,
          });

          if (!!hasAddDeductiblAmount) {
            return basicConfigs?.error?.MSG_001012();
          }
          const changeAdjustmentFactorList = await dispatch({
            type: `${nameSpace}/getChangeAdjustmentFactorList`,
          });

          return await basicConfigs.warn.MSG_000541({
            showWarn: lodash.size(expectDecisionList) > 0 || changeAdjustmentFactorList,
          });
        },
        notMatch: async () => {
          return await basicConfigs.warn.MSG_000541({
            showWarn: lodash.size(expectDecisionList) > 0,
          });
        },
      });
    },
  };

  if (lodash.isFunction(configs[validatorType])) {
    return configs[validatorType]();
  }
};
