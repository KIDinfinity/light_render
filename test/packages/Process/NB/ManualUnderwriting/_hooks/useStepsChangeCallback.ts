import { useCallback } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetTotalFundList from 'process/NB/ManualUnderwriting/_hooks/useGetTotalFundList';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import handleMessageModal, { handleWarnMessageModal } from '@/utils/commonMessage';
import { NAMESPACE } from '../activity.config';
import InsertSpin, { removeLoading } from 'process/NB/ManualUnderwriting/Proposal/Loading';


export default ({ currentStep, set, selectedOption }: any) => {
  const totalFundInfoList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      modelnamespace.businessData?.policyList?.[0]?.fundInfo?.totalFundInfoList,
    shallowEqual
  ) || [];
  const dispatch = useDispatch();
  const stepsChange = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.stepsChange,
    shallowEqual
  );

  const totalFundAllocationList = useGetTotalFundList();
  const isRaneTotalFundAllocation = lodash.every(
    totalFundAllocationList,
    (item) => item?.total === 100
  );

  return useCallback(
    async (index, flag) => {
      const isChange = lodash.get(stepsChange, selectedOption, false);
      if (isChange) {
        if (currentStep < index) {
          const container = InsertSpin();
          setTimeout(async () => {
            const errors = await dispatch({
              type: 'manualUnderwriting/validateFields',
              payload: {
                data: totalFundInfoList,
                isRaneTotalFundAllocation,
                index,
              },
            });
            if (errors?.length) {
              const messageSet = new Set();
              lodash.forEach(errors, (fieldItem: any) => {
                lodash.forEach(fieldItem, (item: any) => {
                  messageSet.add({
                    content: `${item.field} ${item.message}`,
                  });
                });
              });
              handleMessageModal(Array.from(messageSet));
              removeLoading(container);
              return false;
            }
            // 切换到下一个tab或者直接点击confirm都会触发以下校验：
            // 前端必填校验->VLD_000650
            if (lodash.isUndefined(flag)) {
              const validatePerposal = await dispatch({
                type: 'manualUnderwriting/validatePerposal',
                payload: {
                  isPlanInfo: index === 1,
                },
              });
              if (!validatePerposal) {
                removeLoading(container);
                return false;
              }
            };
            removeLoading(container);
            set(index);
          }, 0);
        }
        if (currentStep > index) {
          handleWarnMessageModal(
            [
              {
                content: formatMessageApi(
                  {
                    Label_COM_WarningMessage: 'MSG_000554',
                  },
                  selectedOption
                ),
              },
            ],
            {
              okFn: async () => {
                if (currentStep === 1) {
                  await dispatch({
                    type: 'manualUnderwriting/resetStepSecondData',
                  });
                }
                if (currentStep === 2) {
                  await dispatch({
                    type: 'manualUnderwriting/resetStepSecondData',
                  });
                  await dispatch({
                    type: 'manualUnderwriting/resetThirdStepData',
                  });
                }
                await dispatch({
                  type: `${NAMESPACE}/setProposalLoading`,
                  payload: { isLoading: false },
                });
                set(index);
              },
            }
          );
        }
      } else {
        await dispatch({ type: `${NAMESPACE}/setProposalLoading`, payload: { isLoading: false } });
        set(index);
      }
    },
    [stepsChange, selectedOption, currentStep, dispatch, totalFundInfoList, isRaneTotalFundAllocation, set]
  );
};
