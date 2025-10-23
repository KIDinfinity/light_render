import React, { useState } from 'react';
import classnames from 'classnames';
import lodash from 'lodash';
import { Col, Icon, Checkbox, Button } from 'antd';
import { ReactComponent as AddIcon } from 'bpm/assets/add.svg';
import useGetOptionsByIsSelected from 'process/NB/ManualUnderwriting/_hooks/useGetOptionsByIsSelected';
import useCheckboxOnChangByIsSelected from 'process/NB/ManualUnderwriting/_hooks/useCheckboxOnChangByIsSelected';
import useTrySustainabilityCalculate from 'process/NB/ManualUnderwriting/_hooks/useTrySustainabilityCalculate';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default () => {
  const [selecting, setSeleteing] = useState(false);
  const getOptions = useGetOptionsByIsSelected();
  const checkboxOnChang = useCheckboxOnChangByIsSelected();
  const trySustainabilityCalculate = useTrySustainabilityCalculate(setSeleteing);

  return (
    <>
      <Col span={3} key="optionalRecommendation">
        <div
          className={classnames(styles.button, { [styles.selecting]: selecting })}
          onClick={() => setSeleteing(selecting ? false : true)}
        >
          <Icon className={styles.addIcon} component={AddIcon} />
          optional recommendation
        </div>
        <div
          className={classnames(styles.group, {
            [styles.hide]: !selecting,
            [styles.selecting]: selecting,
          })}
        >
          <Checkbox.Group
            options={lodash
              .chain(getOptions(true))
              .map((option) => {
                return {
                  label: formatMessageApi({ Label_BIZ_policy: option }),
                  value: option,
                };
              })
              .value()}
            value={getOptions(true)}
            onChange={(e) => {
              checkboxOnChang({ e, isSelected: true });
            }}
            className={classnames(styles.checkbox)}
          />
          <Checkbox.Group
            options={lodash
              .chain(getOptions(false))
              .map((option) => {
                return {
                  label: formatMessageApi({ Label_BIZ_policy: option }),
                  value: option,
                };
              })
              .value()}
            value={[]}
            onChange={(e) => {
              checkboxOnChang({ e, isSelected: false });
            }}
            className={classnames(styles.checkbox)}
          />
          <Button onClick={trySustainabilityCalculate} className={styles.confirmButton}>
            Confirm
          </Button>
        </div>
      </Col>
    </>
  );
};
