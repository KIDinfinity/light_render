import lodash from 'lodash';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import { assembleDefaultDataForSave } from 'basic/utils/SnapshotTool';
import { handleMessageModal } from '@/utils/commonMessage';
import { EOptionType } from 'basic/enum/EOptionType';
import { taskGoBack } from '@/utils/task';
import { getSubmitData } from '@/utils/modelUtils/claimUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { requestHandleType } from 'bpm/enum/requestHandleType';
import { wholeEntities } from '../ManualAssessment/_models/dto/EntriesModel';
import { getReAssessmentWarn } from 'process/Utils';
import { eBenefitCategory } from 'claim/enum/BenefitCategory';

interface configItem {
  name: string;
  validator: () => any;
  weight: number;
}

const holdPromise = (dispatch: any, category: string, taskDetail: any) => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: `newBusinessManualUnderwriting/setInformationModalShow`,
      payload: {
        category,
        taskDetail,
        resolve: resolve,
        reject: reject,
      },
    });
  });
};

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
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
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
          name: 'VLD_000737',
          validator: async () => {
            const dataForSubmit = await dispatch({
              type: `${NAMESPACE}/getDataForSubmit`,
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
          name: 'formValidator',
          validator: async () => {
            const dataForSubmit = await dispatch({
              type: `${NAMESPACE}/getDataForSubmit`,
            });
            await dispatch({
              type: 'formCommonController/handleSubmited',
            });
            const errors: any = await dispatch({
              type: `${NAMESPACE}/validateFields`,
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
                type: `${NAMESPACE}/savePaymentAllocation`,
                payload: output,
              });
            }
            return [...errors, ...allocationErrors];
          },
          weight: 0,
        },
      ];
      const result = loop(validateConfig);
      return result;
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
        type: `${NAMESPACE}/getDataForSubmit`,
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
      const updateOpusParam = lodash.pick(taskDetail, ['taskId', 'caseNo']);
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      const dataForSave = await assembleDefaultDataForSave({
        taskDetail,
        optionType: isAuto ? EOptionType.AutoSave : EOptionType.Save,
        dataForSubmit,
        syncData: true,
      });
      return {
        1: dataForSave,
        2: updateOpusParam,
      };
    },
  },
  reject: {
    validate: async ({ taskDetail, dispatch }) => {
      try {
        await holdPromise(dispatch, 'Reject', taskDetail);
      } catch (err) {
        return requestHandleType.break;
      }
    },
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
        type: `${NAMESPACE}/getDataForSubmit`,
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
      taskGoBack();
    },
  },
  split: {
    isShowNotice: false,
    validate: async ({ dispatch }: any) => {
      const claimData = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });
      dispatch({
        type: 'caseSplitController/splitModalOpen',
        payload: { claimData, wholeEntities },
      });
      return requestHandleType.break;
    },
  },
  escalate: {
    validate: async ({ taskDetail, dispatch }) => {
      try {
        await holdPromise(dispatch, 'EscalateReason', taskDetail);
      } catch (err) {
        return requestHandleType.break;
      }
    },
  },
  nameScreening: {
    validate: ({ dispatch }: any) => {
      dispatch({
        type: `${NAMESPACE}/setNameScreeningVisible`,
        payload: {
          nameScreeningVisible: true,
        },
      });
      return requestHandleType.break;
    },
  },
  reAssessment: {
    validate: ({ dispatch }: any) => {
      getReAssessmentWarn({ nameSpace: NAMESPACE, dispatch });
      return requestHandleType.break;
    },
  },
  claimReversal: {
    validate: ({ dispatch, taskDetail }: any) => {
      return requestHandleType.break;
    },
  },
  changeHospitalizationNumber: {
    validate: ({ dispatch }: any) => {
      // dispatch({
      //   type: `${NAMESPACE}/BOchangeHosNo`,
      // });
      return requestHandleType.break;
    },
  },
};
