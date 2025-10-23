import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Icon } from 'antd';
import { FormLayoutContext } from 'basic/components/Form';
import Basic from './Basic';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import ProcedureList from '../Procedure/List';
import { v4 as uuidv4 } from 'uuid';
import { TREATMENTITEM } from '@/utils/claimConstant';
import styles from './Item.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const TreatmentItem = ({ treatmentId, incidentId, total }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const treatmentNo = useSelector(
    ({ opusClaimDataCapture }: any) =>
      opusClaimDataCapture.claimEntities.treatmentListMap[treatmentId].treatmentNo
  );

  const dispatch = useDispatch();

  const handleAdd = async () => {
    const state: any = await dispatch({ type: 'global/accessStore' });

    const treatmentAdd = {
      ...TREATMENTITEM,
      claimNo: state.opusClaimDataCapture?.claimProcessData?.claimNo,
      id: uuidv4(),
      incidentId,
      treatmentNo: total + 1,
    };

    dispatch({
      type: 'opusClaimDataCapture/treatmentAdd',
      payload: {
        incidentId,
        treatmentAdd,
      },
    });
  };
  const handleDelete = () => {
    dispatch({
      type: 'opusClaimDataCapture/treatmentDelete',
      payload: {
        incidentId,
        treatmentId,
      },
    });
  };

  return (
    <div className={styles.treatmentItem}>
      <FormLayoutContext.ExpandProvider>
        <div className={styles.titleRow}>
          {`${formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.treatment',
          })} No. ${treatmentNo}`}
          <div className={styles.gap} />
          {editable && <Icon component={AddIcon} onClick={handleAdd} />}
          {editable && <DeleteButton handleDelete={handleDelete} />}
          <FormLayoutContext.ExpandIcon className={styles.icon} />
        </div>
        <div className={styles.innerCard}>
          <Basic incidentId={incidentId} treatmentId={treatmentId} />
          <ProcedureList incidentId={incidentId} treatmentId={treatmentId} />
        </div>
      </FormLayoutContext.ExpandProvider>
    </div>
  );
};

export default TreatmentItem;
