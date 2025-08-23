import React from 'react';
import TakeOverField from './TakeOver-Field';
import TakeOverTable from './TakeOver-Table';
import styles from './index.less';
import classnames from 'classnames';
import { Icon } from 'antd';
import { FormAntCard, formUtils } from 'basic/components/Form';
import ExpandableContainer from 'basic/components/ExpandableContainer';
import {  useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

const TakeOverContent = ({ expendStatus, setExpendStatus }: any) => {

  const titleRender = (
    <div className={styles.titleWrap}>
      <span className={styles.title}>Take Over</span>
      <span className={styles.actions}>
        <Icon type={!expendStatus ? 'down' : 'up'} onClick={() => setExpendStatus(!expendStatus)} />
      </span>
    </div>
  );

  const takeOverFlag = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      formUtils.queryValue(modelnamespace.businessData?.takeOverFlag),
    shallowEqual
  );
  const display = takeOverFlag === 'Y';

  return (
    <FormAntCard
      title={titleRender}
      className={classnames(styles.detail, {
        [styles.hidden]: !expendStatus,
      })}
    >
      {expendStatus && (
        <div className={styles.content}>
          <div className={styles.takeOverField}>
            <TakeOverField />
          </div>
          {display && (
            <div className={styles.takeOverTable}>
              <TakeOverTable />
            </div>
          )}
        </div>
      )}
    </FormAntCard>
  );
};

const TakeOver = () => {
  return (
    <ExpandableContainer sectionId="takeOver">
      <TakeOverContent />
    </ExpandableContainer>
  );
};

TakeOver.displayName = 'takeOver';

export default TakeOver;
