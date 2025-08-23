import { Spin, Steps } from 'antd';
import { chain } from 'lodash';
import { useCallback, useState } from 'react';
import styles from './index.less';
import Screen1 from './Screen/Screen1';
import { NavigatorContext } from './_context';
import Screen2 from './Screen/Screen2';
import Screen3 from './Screen/Screen3';
import Screen4 from './Screen/Screen4';
import Screen5 from './Screen/Screen5';
import Screen6 from './Screen/Screen6';

const { Step } = Steps;

const VNBCalculator = () => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const navItems = [
    { step: 1, title: 'Step1' },
    { step: 2, title: 'Step2' },
    { step: 3, title: 'Step3' },
    { step: 4, title: 'Step4' },
    { step: 5, title: 'Step5' },
    { step: 6, title: 'Summary' },
  ];

  const onStepClick = useCallback(
    (step: number) => () => {
      if (step <= maxStep) {
        setCurrentStep(step);
      }
    },
    [maxStep]
  );

  const setStep = (step: number) => {
    if (step > maxStep) {
      setMaxStep(step);
    }
    setCurrentStep(step);
  };

  return (
    <div className={styles.container}>
      <Steps current={currentStep - 1} className={styles.steps}>
        {chain(navItems)
          .map((item: { step: number }) => (
            <Step key={item.step} {...item} onClick={onStepClick(item.step)} />
          ))
          .value()}
      </Steps>
      <NavigatorContext.Provider
        value={{
          currentStep,
          setCurrentStep: setStep,
        }}
      >
        {currentStep === 1 && <Screen1 loading={loading} setLoading={setLoading} />}
        {currentStep === 2 && <Screen2 loading={loading} setLoading={setLoading} />}
        {currentStep === 3 && <Screen3 loading={loading} setLoading={setLoading} />}
        {currentStep === 4 && <Screen4 loading={loading} setLoading={setLoading} />}
        {currentStep === 5 && <Screen5 loading={loading} setLoading={setLoading} />}
        {currentStep === 6 && <Screen6 loading={loading} setLoading={setLoading} />}
      </NavigatorContext.Provider>
      {loading && <Spin className={styles.spin} />}
    </div>
  );
};

export default VNBCalculator;
