import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col, Icon, Checkbox, Button } from 'antd';
import classnames from 'classnames';
import lodash from 'lodash';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { formatMessageApi } from '@/utils/dictFormatMessage';
// @ts-ignore
import { ReactComponent as AddIcon } from 'bpm/assets/add.svg';
import styles from './index.less';

export default () => {
  const dispatch = useDispatch();
  const [selecting, setSelecting] = useState(false);

  const possibleSusOptIdAndNameList = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      modelNamespace.sustainabilityModal?.possibleSusOptIdAndNameList,
    shallowEqual
  );
  const customizeSusOptIdList = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      modelNamespace.sustainabilityModal?.customizeSusOptIdList,
    shallowEqual
  );

  const options = useMemo(() => {
    return lodash.map(possibleSusOptIdAndNameList, (label, key) => {
      return {
        label: formatMessageApi({ Label_BIZ_policy: label }),
        value: key,
      };
    });
  }, [possibleSusOptIdAndNameList]);

  const selectedOptions = useMemo(() => {
    return lodash.map(customizeSusOptIdList, (id) => lodash.find(options, { value: id }));
  }, [options, customizeSusOptIdList]);

  const unSelectedOptions = useMemo(() => {
    return lodash.filter(options, (option) => {
      return !lodash.includes(customizeSusOptIdList, option.value);
    });
  }, [options, customizeSusOptIdList]);

  const checkBoxChangeHandler = (value: any[], isSelected: boolean) => {
    dispatch({
      type: `${NAMESPACE}/setPossibleSusOptNamesSelected`,
      payload: {
        value,
        isSelected,
      },
    });
  };
  const confirmHandler = useCallback(() => {
    dispatch({
      type: `${NAMESPACE}/trySustainabilityCalculate`,
    });
    setSelecting(false);
  }, [dispatch]);

  return (
    <>
      <Col span={3} key="optionalRecommendation">
        <div
          className={classnames(styles.button, { [styles.selecting]: selecting })}
          onClick={() => setSelecting(selecting ? false : true)}
        >
          <Icon className={styles.addIcon} component={AddIcon} />
          {formatMessageApi({ Label_BPM_Button: 'optionalRecommendation' })}
        </div>
        <div
          className={classnames(styles.group, {
            [styles.hide]: !selecting,
            [styles.selecting]: selecting,
          })}
        >
          <Checkbox.Group
            options={selectedOptions}
            value={customizeSusOptIdList}
            onChange={(e) => {
              checkBoxChangeHandler(e, true);
            }}
            className={classnames(styles.checkbox)}
          />
          <Checkbox.Group
            options={unSelectedOptions}
            value={[]}
            onChange={(e) => {
              checkBoxChangeHandler(e, false);
            }}
            className={classnames(styles.checkbox)}
          />
          <Button onClick={confirmHandler} className={styles.confirmButton}>
            {formatMessageApi({ Label_BPM_Button: 'confirm' })}
          </Button>
        </div>
      </Col>
    </>
  );
};
