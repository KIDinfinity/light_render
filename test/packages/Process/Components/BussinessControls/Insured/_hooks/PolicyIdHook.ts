import { useDispatch, useSelector } from 'dva';
import { useState } from 'react';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { Region, tenant } from '@/components/Tenant';
import TaskDefKey from 'enum/TaskDefKey';

export default ({ NAMESPACE, form }: any) => {
  return tenant.region({
    [Region.HK]: () => {
      const taskDetail = useSelector(({ processTask }: any) => processTask.getTask);
      const insured = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
        lodash.get(modelnamepsace, 'claimProcessData.insured')
      );
      const dispatch = useDispatch();
      const [keyDownStatus, setKeyDownStatus] = useState(false);

      if (
        taskDetail?.taskDefKey === TaskDefKey.HK_CLM_ACT001 ||
        taskDetail?.taskDefKey === TaskDefKey.BP_CLM_AS_ACT001
      ) {
        const handlePolicyNo = () => {
          if (formUtils.queryValue(insured?.policyId) !== form.getFieldValue('policyId')) {
            dispatch({
              type: `${NAMESPACE}/saveSearchInsuredInfo`,
              payload: {
                changedFields: { policyId: form.getFieldValue('policyId') },
              },
            });
            dispatch({
              type: `${NAMESPACE}/getInsuredInfo`,
              payload: { searchByPolicyId: true },
            });
          }
        };
        const handleOnBlur = async () => {
          if (!keyDownStatus) {
            handlePolicyNo();
          }
        };
        const handleOnFocus = () => {
          setKeyDownStatus(false);
        };
        const handleKeyDown = (e: { keyCode: number }) => {
          if (e.keyCode === 13) {
            setKeyDownStatus(true);
            handlePolicyNo();
          }
        };

        return {
          onBlur: handleOnBlur,
          onFocus: handleOnFocus,
          onKeyDown: handleKeyDown,
        };
      }

      return {};
    },
    [Region.PH]: () => {
      const insured = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
        lodash.get(modelnamepsace, 'claimProcessData.insured')
      );
      const dispatch = useDispatch();
      const [keyDownStatus, setKeyDownStatus] = useState(false);

      const handlePolicyNo = () => {
        if (!form.getFieldValue('policyId')) {
          dispatch({
            type: `${NAMESPACE}/cleanSubmitParam`,
            payload: {
              policyNo: form.getFieldValue('policyId'),
              searchByPolicyId: true,
            },
          });
        }
        if (formUtils.queryValue(insured?.policyId) !== form.getFieldValue('policyId')) {
          dispatch({
            type: `${NAMESPACE}/saveSearchInsuredInfo`,
            payload: {
              changedFields: { policyId: form.getFieldValue('policyId') },
            },
          });
          dispatch({
            type: `${NAMESPACE}/getInsuredInfo`,
            payload: { searchByPolicyId: true },
          });
        }
      };
      const handleOnBlur = async () => {
        if (!keyDownStatus) {
          handlePolicyNo();
        }
      };
      const handleOnFocus = () => {
        setKeyDownStatus(false);
      };
      const handleKeyDown = (e: { keyCode: number }) => {
        if (e.keyCode === 13) {
          setKeyDownStatus(true);
          handlePolicyNo();
        }
      };

      return {
        onBlur: handleOnBlur,
        onFocus: handleOnFocus,
        onKeyDown: handleKeyDown,
      };
    },
    [Region.MY]: () => {
      const insured = useSelector(({ [NAMESPACE]: modelnamepsace }: any) =>
        lodash.get(modelnamepsace, 'claimProcessData.insured')
      );
      const dispatch = useDispatch();
      const [keyDownStatus, setKeyDownStatus] = useState(false);

      const handlePolicyNo = () => {
        if (!form.getFieldValue('policyId')) {
          dispatch({
            type: `${NAMESPACE}/cleanSubmitParam`,
            payload: {
              policyNo: form.getFieldValue('policyId'),
              searchByPolicyId: true,
            },
          });
        }
        if (formUtils.queryValue(insured?.policyId) !== form.getFieldValue('policyId')) {
          dispatch({
            type: `${NAMESPACE}/saveSearchInsuredInfo`,
            payload: {
              changedFields: { policyId: form.getFieldValue('policyId') },
            },
          });
          dispatch({
            type: `${NAMESPACE}/getInsuredInfo`,
            payload: { searchByPolicyId: true },
          });
        }
      };
      const handleOnBlur = async () => {
        if (!keyDownStatus) {
          handlePolicyNo();
        }
      };
      const handleOnFocus = () => {
        setKeyDownStatus(false);
      };
      const handleKeyDown = (e: { keyCode: number }) => {
        if (e.keyCode === 13) {
          setKeyDownStatus(true);
          handlePolicyNo();
        }
      };

      return {
        onBlur: handleOnBlur,
        onFocus: handleOnFocus,
        onKeyDown: handleKeyDown,
      };
    },
    [Region.TH]: () => {
      const taskDetail = useSelector(({ processTask }: any) => processTask.getTask);
      const dispatch = useDispatch();
      const [keyDownStatus, setKeyDownStatus] = useState(false);
      const searchArray = [TaskDefKey.TH_CLM_ACT001, TaskDefKey.BP_PAPER_ACT001];
      if (lodash.includes(searchArray, taskDetail?.taskDefKey)) {
        const handlePolicyNo = () => {
          dispatch({
            type: `${NAMESPACE}/saveSearchInsuredInfo`,
            payload: {
              changedFields: {
                policyId: form.getFieldValue('policyId'),
                identityType: null,
                identityNo: null,
              },
            },
          });
          dispatch({
            type: `${NAMESPACE}/getInsuredInfo`,
            payload: {
              searchByPolicyId: true,
              caseCategory: taskDetail?.caseCategory,
              searchByPolicyId2: true,
            },
          });
        };
        const handleOnBlur = async () => {
          if (!keyDownStatus) {
            handlePolicyNo();
          }
        };
        const handleOnFocus = () => {
          setKeyDownStatus(false);
        };
        const handleKeyDown = (e: { keyCode: number }) => {
          if (e.keyCode === 13) {
            setKeyDownStatus(true);
            handlePolicyNo();
          }
        };

        return {
          onBlur: handleOnBlur,
          onFocus: handleOnFocus,
          onKeyDown: handleKeyDown,
        };
      }

      return {};
    },
    notMatch: () => ({}),
  });
};
