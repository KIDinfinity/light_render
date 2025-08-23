import { useCallback } from 'react';
import lodash from 'lodash';
import { Modal } from 'antd';
import { tenant, Region } from '@/components/Tenant';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import BenefitLevelDecision from 'process/NewBusiness/Enum/BenefitLevelDecision';
import useGetOriginCoverageList from 'process/NewBusiness/ManualUnderwriting/_hooks/useGetOriginCoverageList';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default () => {
  const dispatch = useDispatch();
  const originCoverageList = useGetOriginCoverageList();

  return useCallback(
    async ({ form, fieldName, dicts = [], uwDecision, previousDecision }) => {
      const validateResult = await tenant.region({
        [Region.PH]: async () => {
          if (previousDecision && uwDecision && previousDecision !== uwDecision) {
            const result = await new Promise((resolve) => {
              Modal.confirm({
                title: formatMessageApi({
                  Label_BPM_Button: 'confirm',
                }),
                content: formatMessageApi(
                  {
                    Label_COM_WarningMessage: 'MSG_001231',
                  },
                  dicts.find((item: any) => item.dictCode === previousDecision)?.dictName,
                  dicts.find((item: any) => item.dictCode === uwDecision)?.dictName
                ),
                centered: true,
                cancelText: formatMessageApi({
                  Label_BPM_Button: 'Cancel',
                }),
                okText: formatMessageApi({
                  Label_BPM_Button: 'Continue',
                }),
                onOk() {
                  resolve(true);
                },
                onCancel() {
                  resolve(false);
                },
              });
            });

            return result;
          }

          return true;
        },
        notMatch: () => true,
      });

      if (!validateResult) {
        form.setFieldsValue({ [fieldName]: previousDecision });
        return;
      }

      if (
        uwDecision === BenefitLevelDecision.Decline ||
        uwDecision === BenefitLevelDecision.Postpone
      ) {
        const newCoverageList = lodash
          .chain(originCoverageList)
          .map((coverage) => {
            const newCoverage = lodash.set(coverage, 'coverageDecision.uwDecision', uwDecision);
            return newCoverage;
          })
          .value();
        dispatch({
          type: `${NAMESPACE}/updateCoverageListWhenHitSustainabilityChecking`,
          payload: {
            coverageList: newCoverageList,
          },
        });
      }
    },
    [originCoverageList]
  );
};
