import React, { useState, useMemo } from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Steps as AntdSteps, Icon } from 'antd';
import useProposalBizData from 'process/NB/ManualUnderwriting/_hooks/useProposalBizData';
import useSetTaskDetail from 'process/NB/ManualUnderwriting/_hooks/useSetTaskDetail';
import useResetStepChange from 'process/NB/ManualUnderwriting/_hooks/useResetStepChange';
import useAutoAddFirstClient from 'process/NB/ManualUnderwriting/_hooks/useAutoAddFirstClient';
import useClientChangedMessage from 'process/NB/ManualUnderwriting/_hooks/useClientChangedMessage';
import Switch from './Switch';
import ClientInfo from './ClientInfo';
import OtherInfo from './OtherInfo';
import PlanInfo from './PlanInfo';
import Questionnaire from './Questionnaire';

const { Step } = AntdSteps;

const Steps: React.FC = ({ businessData, taskDetail }: any) => {
  useProposalBizData({ businessData });
  useSetTaskDetail({ taskDetail });
  useResetStepChange();
  useAutoAddFirstClient();
  const stepsChange = useSelector(
    (state: any) => state?.manualUnderwriting?.stepsChange,
    shallowEqual
  );
  const [currentStep, set] = useState(0);
  useClientChangedMessage({ setCurrentStep: set });
  const selectedOption = useMemo(() => {
    const mapping = {
      0: 'ClientInfo',
      1: 'PlanInfo',
      2: 'OtherInfo',
      3: 'Questionnaire',
    };
    return mapping[currentStep];
  }, [currentStep]);

  return (
    <>
      <AntdSteps current={currentStep} onChange={set}>
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
        <Step title="Questionnaire" />
      </AntdSteps>
      <Switch selected={selectedOption}>
        <ClientInfo />
        <PlanInfo />
        <OtherInfo />
        <Questionnaire />
      </Switch>
    </>
  );
};

export default Steps;
