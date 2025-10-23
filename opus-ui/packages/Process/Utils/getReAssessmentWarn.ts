import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import getSelectionTreatmentUnormalized from './getSelectionTreatmentUnormalized';
import { tenant, Region } from '@/components/Tenant';
import { Action } from '@/components/AuditLog/Enum';
const configs = {
  warn: {
    MSG_000539: (dispatch) => {
      return new Promise((resolve) => {
        handleWarnMessageModal(
          [{ content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000539' }) }],
          {
            cancelFn: (_e: any, isTopRight: boolean) => {
              if (!isTopRight) {
                resolve(false);
              }
            },
            okFn: () => {
              dispatch({
                type: 'auditLogController/logTask',
                payload: {
                  action: Action.Recalculate,
                },
              });
              resolve(true);
            },
            leftCancelFn: () => {
              resolve(false);
            },
            cancelClassName: 'active',
            ...(tenant.region() === Region.JP
              ? {
                  cancelText: formatMessageApi({ Label_BIZ_Claim: 'ReAssessment' }),
                  okText: formatMessageApi({ Label_BIZ_Claim: 'ReCalculation' }),
                }
              : {}),
          }
        );
      });
    },
    MSG_000490: ({ showWarn }: any) => {
      return new Promise((resolve) => {
        if (showWarn) {
          handleWarnMessageModal(
            [{ content: formatMessageApi({ Label_COM_Message: 'MSG_000490' }) }],
            {
              okFn: () => {
                resolve(true);
              },
            }
          );
        } else {
          resolve(true);
        }
      });
    },
  },
};

export default async ({ dispatch, nameSpace }: any) => {
  const expectDecisionList = await dispatch({
    type: 'commonClaimAssessmentController/getExpectDecisionList',
    payload: {
      nameSpace,
    },
  });

  const deleteAdjustmentList = await dispatch({
    type: 'commonClaimAssessmentController/getDeleteAdjustmentList',
    payload: {
      nameSpace,
    },
  });
  const result = await tenant.region({
    [Region.HK]: async () => {
      const dataForSubmit = await dispatch({
        type: `${nameSpace}/getDataForSubmit`,
      });

      const isConfirm = await configs.warn.MSG_000490({
        showWarn: !lodash.isEmpty(dataForSubmit) && getSelectionTreatmentUnormalized(dataForSubmit),
      });
      if (isConfirm) {
        dispatch({
          type: `${nameSpace}/packAdjustmentFactorForSubmit`,
        });
        const hasManualFactor = await dispatch({
          type: `${nameSpace}/getChangeAdjustmentFactorList`,
        });
        if (lodash.size(expectDecisionList) > 0 || hasManualFactor) {
          const confirm = await configs.warn.MSG_000539(dispatch);
          return {
            expectDecisionList: confirm ? expectDecisionList : [],
            clearClaimAdjustmentFactor: !confirm,
            isNeedReAssessmentLog: confirm ? false : true,
          };
        } else {
          return { expectDecisionList: [] };
        }
      }
    },
    notMatch: async () => {
      if (lodash.size(expectDecisionList) > 0) {
        const isConfirm = await configs.warn.MSG_000539(dispatch);

        return isConfirm
          ? {
              expectDecisionList,
              isConfirm,
              isNeedReAssessmentLog: false,
            }
          : { expectDecisionList: [] };
      } else {
        return { expectDecisionList: [] };
      }
    },
  });

  await dispatch({
    type: 'commonClaimAssessmentController/reAssessment',
    payload: {
      nameSpace,
      deleteAdjustmentList,
      ...result,
    },
  });
};
