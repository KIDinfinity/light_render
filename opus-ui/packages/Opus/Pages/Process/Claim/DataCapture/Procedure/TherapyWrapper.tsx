import React from 'react';
import { connect, useSelector, useDispatch } from 'dva';
import { Icon } from 'antd';
import changeProcedureType from '../_models/functions/changeProcedureType';
import { FormLayoutContext } from 'basic/components/Form';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import styles from './item.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const TherapyWrapper = ({ children, deleteCallback, addEmpty, ...otherProps }: any) => {
  const { incidentId, treatmentId, index, claimNo, procedureList } = otherProps;
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);

  const onAdd = () => {
    changeProcedureType({
      dispatch,
      treatmentId,
      incidentId,
      claimNo,
      procedureList,
    });
  };

  return (
    <FormLayoutContext.ExpandProvider>
      <div className={styles.therapyItem}>
        <div className={styles.titleRow}>
          {formatMessageApi({
            Label_BIZ_Claim: 'Therapies',
          })}
          {` No. ${index + 1}`}
          <div className={styles.gap} />
          {editable && <Icon component={AddIcon} onClick={onAdd} />}
          {editable && <DeleteButton handleDelete={deleteCallback} />}
          <FormLayoutContext.ExpandIcon className={styles.icon} />
        </div>
        <div className={styles.innerCard}>{React.cloneElement(children, otherProps)}</div>
      </div>
    </FormLayoutContext.ExpandProvider>
  );
};

export default connect(
  ({ formCommonController, opusClaimDataCapture }: any, { treatmentId }: any) => ({
    validating: formCommonController.validating,
    procedureList:
      opusClaimDataCapture.claimEntities?.treatmentListMap?.[treatmentId]?.procedureList,
    claimNo: opusClaimDataCapture.claimProcessData?.claimNo,
  })
)(TherapyWrapper);
