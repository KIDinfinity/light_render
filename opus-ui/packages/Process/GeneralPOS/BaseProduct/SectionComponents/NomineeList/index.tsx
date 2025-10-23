import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Button } from 'antd';
import { FormAntCard } from 'basic/components/Form';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import useLoadCountrys from 'process/GeneralPOS/BaseProduct/_hooks/useLoadCountrys';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { EditSectionCodeEnum, OperationTypeEnum } from 'process/GeneralPOS/common/Enum';
import React from 'react';
import Edit from './Edit';
import EditDecision from './EditDecision';
import styles from './index.less';
import Modal from './Modal';

const NomineeList = ({ transactionId }: any) => {
  useLoadCountrys();
  const isDataCaptureProcess = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.isDataCapture
  );

  const isDecisionProcess = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.isDecision
  );

  const editable = useSectionEditable(EditSectionCodeEnum.CommonNominee);
  const dispatch = useDispatch();

  const addHandle = () => {
    dispatch({
      type: `${NAMESPACE}/nomineeUpdate`,
      payload: {
        changedFields: {},
        transactionId,
        type: OperationTypeEnum.ADD,
        validating: false,
      },
    });
  };

  return (
    <div className={classnames(styles.container, 'CommonNominee')}>
      <FormAntCard
        title={formatMessageApi({
          Label_BIZ_Policy: 'beneficiaryList',
        })}
      >
        {isDataCaptureProcess ? (
          <Edit transactionId={transactionId} />
        ) : (
          <EditDecision transactionId={transactionId} />
        )}
      </FormAntCard>
      {isDecisionProcess && editable && (
        <Button onClick={addHandle} className={styles.addBtn}>
          Add New Client
        </Button>
      )}
      <Modal transactionId={transactionId} />
    </div>
  );
};

export default NomineeList;
