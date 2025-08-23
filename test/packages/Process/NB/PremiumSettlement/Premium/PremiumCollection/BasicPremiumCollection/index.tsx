import React from 'react';
import { Steps, Icon } from 'antd';
import lodash from 'lodash';
import useSetCurrentIndex from 'process/NB/PremiumSettlement/_hooks/useSetCurrentIndex';
import styles from './index.less';
import useGetCollectionSteps from 'process/NB/PremiumSettlement/_hooks/useGetCollectionSteps.ts';
const BasicPremiumCollectionProcess = () => {
  const { Step } = Steps;
  const index = useSetCurrentIndex();
  const StepGroup = useGetCollectionSteps();

  return (
    <div className={styles.wrap}>
      <Steps current={index} labelPlacement="vertical">
        {StepGroup.map((item) => {
          const StepIcon = (() => {
            if (lodash.isString(item?.icon)) {
              return <Icon type={item?.icon} />;
            }
            return null;
          })();
          return (
            <Step
              key={item?.title}
              title={<span className={styles.stepTitle}>{item.title}</span>}
              description={item?.description}
              icon={StepIcon}
              status={item?.status}
            />
          );
        })}
      </Steps>
    </div>
  );
};

export default BasicPremiumCollectionProcess;
