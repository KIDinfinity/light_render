import React, { useState, useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Steps as AntdSteps, Icon } from 'antd';
import useSetTaskDetail from 'process/NB/ManualUnderwriting/_hooks/useSetTaskDetail';
import useStepsChangeCallback from 'process/NB/ManualUnderwriting/_hooks/useStepsChangeCallback';
import useResetStepChange from 'process/NB/ManualUnderwriting/_hooks/useResetStepChange';
import Switch from './Switch';
import ClientInfo from './ClientInfo';
import OtherInfo from './OtherInfo';
import PlanInfo from './PlanInfo';
import useClientChangedMessage from 'process/NB/ManualUnderwriting/_hooks/useClientChangedMessage';
const { Step } = AntdSteps;

const Steps: React.FC<any> = ({ businessData, taskDetail }: any) => {
  useSetTaskDetail({ taskDetail });
  useResetStepChange();
  const stepsChange = useSelector(
    (state: any) => state?.manualUnderwriting?.stepsChange,
    shallowEqual
  );
  const [currentStep, set] = useState(0);
  const selectedOption = useMemo(() => {
    const mapping = {
      0: 'ClientInfo',
      1: 'planInfo',
      2: 'OtherInfo',
    };
    return mapping[currentStep];
  }, [currentStep]);
  // useDataChange({ selectedOption })
  const setCurrentStep = useStepsChangeCallback({ currentStep, set, selectedOption });
  useClientChangedMessage({ setCurrentStep });

  return (
    <>
      <div>
        <AntdSteps current={currentStep} onChange={setCurrentStep as any}>
          {stepsChange.ClientInfo === false && currentStep > 0 ? (
            <Step title="Client Information" icon={<Icon type="fast-forward" />} />
          ) : (
            <Step title="Client Information" />
          )}
          {stepsChange.PlanInfo === false && currentStep > 1 ? (
              <Step title="Plan Information" icon={<Icon type="fast-forward" />} />
          ) : (
            <Step title="Plan Information" />
          )}
          <Step title="Other Information" />
        </AntdSteps>
      </div>
      <Switch selected={selectedOption}>
        <ClientInfo />
        <PlanInfo />
        <OtherInfo />
      </Switch>
    </>
  );
};

export default Steps;
