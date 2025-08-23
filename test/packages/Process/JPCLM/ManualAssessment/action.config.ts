import lodash from 'lodash';
import { NAMESPACE } from './activity.config';
import { notification } from 'antd';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { handleMessageModal } from '@/utils/commonMessage';
import { EOptionType } from 'basic/enum/EOptionType';
import { Action } from '@/components/AuditLog/Enum';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { errorMessageModal } from 'claim/pages/utils/popModel';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { wholeEntities } from './_models/dto/EntriesModel';
import { validateSubmit } from 'process/Utils';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

interface configItem {
  name: string;
  validator: () => any;
  weight: number;
}

/**
 * 执行校验配置function
 * @param {Array} validateConfig 校验配置
 */
const loop = async (validateConfig: configItem[]) => {
  const validators = lodash
    .chain(validateConfig)
    .orderBy('weight', 'desc')
    .filter((item: any) => {
      if (lodash.isFunction(item.filterFn)) {
        item.filterFn() && lodash.isFunction(item.validator);
      }
      return lodash.isFunction(item.validator);
    })
    .map((item) => item?.validator)
    .value();

  let result: any = [];

  for (let i = 0; i < validators.length; i++) {
    result = await validators[i]();
    if (result === requestHandleType.break) break;
  }
  return result;
};

export default {
  submit: {
    validate: async ({ dispatch }: any) => {
      //submit前校验配置，按倒叙执行
      const validateConfig = [
        {
          name: 'VLD_000574',
          validator: async () => {
            const isError = await dispatch({ type: 'JPCLMOfClaimAssessment/validatorCase' });
            if (isError) {
              return requestHandleType.break;
            }
            return [];
          },
          weight: 4,
        },
        {
          name: 'VLD_000737',
          validator: async () => {
            const dataForSubmit = await dispatch({
              type: 'JPCLMOfClaimAssessment/getDataForSubmit',
            });

            const emptyCLTreatmentPayalbeList =
              lodash
                .chain(dataForSubmit.claimPayableList || [])
                .filter(
                  (el: any) =>
                    el.benefitCategory === eBenefitCategory.LumpSum &&
                    lodash.isEmpty(el.treatmentPayableList)
                )
                .map((_: any, index: number) => ({
                  code: `error-${index}`,
                  content: formatMessageApi(
                    {
                      Label_COM_Message: 'MSG_000711',
                    },
                    index + 1
                  ),
                }))
                .value() || [];

            if (!lodash.isEmpty(emptyCLTreatmentPayalbeList)) {
              await handleMessageModal(emptyCLTreatmentPayalbeList);
              return requestHandleType.break;
            }
          },
          weight: 4,
        },
        {
          name: 'compareClaimData',
          validator: async () => {
            const isSame = await dispatch({
              type: 'claimCaseController/compareClaimDataV2',
              payload: {
                targetDataPath: 'JPCLMOfClaimAssessment/getDenormalizedData',
              },
            });

            if (!isSame) {
              // eslint-disable-next-line no-return-await
              return await errorMessageModal(
                [{ Label_COM_Message: 'MSG_000350' }],
                requestHandleType.break
              );
            }
            return [];
          },
          weight: 3,
        },
        {
          name: 'checkNumberRefresh',
          validator: async () => {
            const dataForSubmit = await dispatch({
              type: 'JPCLMOfClaimAssessment/getDataForSubmit',
            });
            const { checkNumberRefresh, policyAgent } = lodash.pick(dataForSubmit, [
              'checkNumberRefresh',
              'policyAgent',
            ]);

            // 判断更改agent number是否有点击refresh icon
            if (!checkNumberRefresh && policyAgent?.agentNumber) {
              notification.error({
                message: formatMessageApi({
                  Label_COM_ErrorMessage: 'MSG_000415',
                }),
              });
              return requestHandleType.break;
            }
            return [];
          },
          weight: 2,
        },
        {
          name: 'expecdecision',
          validator: async () => {
            const ignoreExpectDecisionWarn = await validateSubmit({
              dispatch,
              nameSpace: NAMESPACE,
              validatorType: 'TypePayable',
            });

            if (!ignoreExpectDecisionWarn) {
              return requestHandleType.break;
            }
            return [];
          },
          filterFn: async () => {
            const dataForSubmit = await dispatch({
              type: 'JPCLMOfClaimAssessment/getDataForSubmit',
            });
            return !/no_reassessment/.test(dataForSubmit?.flags);
          },
          weight: 1,
        },
        {
          name: 'formValidator',
          validator: async () => {
            const dataForSubmit = await dispatch({
              type: 'JPCLMOfClaimAssessment/getDataForSubmit',
            });
            await dispatch({
              type: 'formCommonController/handleSubmited',
            });
            const errors: any = await dispatch({
              type: 'JPCLMOfClaimAssessment/validateFields',
            });

            // 对接payment allocation
            const backData: any = await dispatch({
              type: 'paymentAllocation/allocationDockings',
              payload: {
                claimData: dataForSubmit,
              },
            });
            const { errors: allocationErrors, output } = backData;

            // 存在错误项则将返回的claim数据同步到主页面
            if (!lodash.isEmpty(output)) {
              dispatch({
                type: 'JPCLMOfClaimAssessment/savePaymentAllocation',
                payload: output,
              });
            }

            return [...errors, ...allocationErrors];
          },
          weight: 0,
        },
      ];
      return loop(validateConfig);
    },
    action: async ({ taskDetail, dispatch, allveriables }: any) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId } = lodash.pick(taskDetail, [
        'taskId',
        'taskStatus',
        'processInstanceId',
        'taskDefKey',
      ]);
      const dataForBaseInfoParam = {
        activityCode: taskDefKey,
        activityStatus: taskStatus,
        caseNo: processInstanceId,
        categoryCode: '',
        creator: '',
        deleted: 0,
        gmtCreate: '',
        gmtModified: '',
        id: '',
        modifier: '',
        taskId,
        transId: '',
      };
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimAssessment/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        dataForSubmit,
        taskDetail,
        optionType: EOptionType.Submit,
      });
      return {
        1: dataForBaseInfoParam,
        2: getSubmitData({ taskDetail, dataForSubmit, variables: allveriables[1] }),
        3: dataForSave,
      };
    },
    after: async () => {
      taskGoBack();
    },
  },
  save: {
    timer: 30000,
    action: async ({ dispatch, taskDetail, isAuto }: any) => {
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimAssessment/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
      });
      return {
        1: dataForSave,
      };
    },
  },
  reject: {
    action: async ({ taskDetail, dispatch }: any) => {
      const { taskDefKey, taskStatus, processInstanceId, taskId } = lodash.pick(taskDetail, [
        'taskId',
        'taskStatus',
        'processInstanceId',
        'taskDefKey',
      ]);
      const dataForBaseInfoParam = {
        activityCode: taskDefKey,
        activityStatus: taskStatus,
        caseNo: processInstanceId,
        categoryCode: '',
        creator: '',
        deleted: 0,
        gmtCreate: '',
        gmtModified: '',
        id: '',
        modifier: '',
        taskId,
        transId: '',
      };
      const dataForSubmit = await dispatch({
        type: 'JPCLMOfClaimAssessment/getDataForSubmit',
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: EOptionType.Reject,
        dataForSubmit,
      });
      return {
        1: dataForBaseInfoParam,
        3: dataForSave,
        4: dataForBaseInfoParam,
      };
    },
    after: async ({ dispatch }: any) => {
      dispatch({
        type: 'auditLogController/logButton',
        payload: {
          action: Action.Reject,
        },
      });
      taskGoBack();
    },
  },
  split: {
    isShowNotice: false,
    action: async ({ dispatch }: any) => {
      const claimData = await dispatch({
        type: 'JPCLMOfClaimAssessment/getDataForSubmit',
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
    },
  },
};
