import React from 'react';
import { useDispatch, useSelector } from 'dva';
import { Icon } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as incidentSvg } from 'opus/Pages/Process/Claim/Assets/AssessmentTitleIncident.svg';
import styles from './Payee.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';
import Information from './Information';
import ContactInfo from './ContactInfo';
import BankAccountInfo from './BankAccountInfo';

const Payee = ({ payeeItem }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: 'opusClaimDataCapture/payeeDelete',
      payload: {
        payeeId: payeeItem?.id,
      },
    });
  };

  return (
    <div className={styles.incidentHeader}>
      <div className={styles.titleRow}>
        <Icon component={incidentSvg} className={styles.titleIcon} />
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
        })}
        <div className={styles.gap} />
        {editable && <DeleteButton handleDelete={handleDelete} />}
      </div>
      <div className={styles.innerCard}>
        <div className={styles.sectionTitle}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.payee-information',
          })}
        </div>
        <Information payeeItem={payeeItem} />
        <div className={styles.sectionTitle}>
          {formatMessageApi({ Label_CLM_Opus: 'ContactInfo' })}
        </div>
        <ContactInfo payeeItem={payeeItem} />
        <div className={styles.sectionTitle}>
          {formatMessageApi({ Label_CLM_Opus: 'BankAccountInfo' })}
        </div>
        <BankAccountInfo payeeItem={payeeItem} />
      </div>
    </div>
  );
};

export default Payee;
