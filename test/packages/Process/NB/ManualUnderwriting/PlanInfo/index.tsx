import React from 'react';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import ExcendNTUModal from './ExcendNTUModal';
import PaymentInfoDetail from './PaymentInfoDetail/ReadOnly';
import PolicyInfoDetail from './PolicyInfoDetail/ReadOnly';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Icon } from 'antd';
import styles from './index.less';
import { FormAntCard } from 'basic/components/Form';
import ExpandableContainer from 'basic/components/ExpandableContainer';
import TransferPaymentButton from './TransferPaymentButton';
import useJudgeDisplayGenerateTransferPayment from 'process/NB/ManualUnderwriting/_hooks/useJudgeDisplayGenerateTransferPayment';

const PlanInfoContent = ({ expendStatus, setExpendStatus }: any) => {
  const taskEditable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const displayTransferButton = useJudgeDisplayGenerateTransferPayment();
  const titleRender = (
    <div className={styles.titleWrap}>
      <span className={styles.title}>
        {formatMessageApi({
          Label_BIZ_Policy: 'PlanInfo',
        })}
      </span>
      <span className={styles.actions}>
        <Icon type={!expendStatus ? 'down' : 'up'} onClick={() => setExpendStatus(!expendStatus)} />
      </span>
    </div>
  );
  return (
    <FormAntCard
      title={titleRender}
      className={classnames(styles.detail, {
        [styles.hidden]: !expendStatus,
      })}
      extra={taskEditable && displayTransferButton && <TransferPaymentButton />}
    >
      {expendStatus && (
        <div className={styles.content}>
          <PolicyInfoDetail />
          <PaymentInfoDetail />
        </div>
      )}
      <ExcendNTUModal />
    </FormAntCard>
  );
};
const PlanInfo = () => {
  return (
    <ExpandableContainer sectionId="planInfo">
      <PlanInfoContent />
    </ExpandableContainer>
  );
};

PlanInfo.displayName = 'planInfo';

export default PlanInfo;
