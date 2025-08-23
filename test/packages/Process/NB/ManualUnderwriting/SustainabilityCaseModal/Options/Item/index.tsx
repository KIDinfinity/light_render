import React from 'react';
import classnames from 'classnames';
import useGetButtonSustainabilityOperatorTitle from 'process/NB/ManualUnderwriting/_hooks/useGetButtonSustainabilityOperatorTitle';
import useHandleSelectSustainabilityCheckingOption from 'process/NB/ManualUnderwriting/_hooks/useHandleSelectSustainabilityCheckingOption';
import useGetSustainabilityCheckingSelected from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingSelected';
import Ellipsis from '@/components/Ellipsis';
import styles from './index.less';

export default ({ item }: any) => {
  const title = useGetButtonSustainabilityOperatorTitle({ optionName: item.optionName });
  const selectedIOption = useGetSustainabilityCheckingSelected();
  const handleSelect = useHandleSelectSustainabilityCheckingOption({ optionName: item.optionName, title });

  return (
    <div
      className={classnames(styles.button, {
        [styles.active]: selectedIOption === item.optionName,
      })}
      onClick={handleSelect}
    >
      <span
        style={{
          width: '70%',
        }}
      >
        <Ellipsis lines={3} tooltip forceTooltip>
          {title}
        </Ellipsis>
      </span>
    </div>
  );
};
