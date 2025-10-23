import React from 'react';
import lodash from 'lodash';
import Basic from './Basic';
import { Icon } from 'antd';
import { FormLayoutContext } from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import DiagnosisList from '../Diagnosis/List';
import styles from './Item.less';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';

const Expand = ({ incidentId, incidentItem, index, disableDelete }: any) => {
  const hasTreatment = !lodash.isEmpty(incidentItem.treatmentList);
  const editable = !useSelector(({ claimEditable }: any) => claimEditable?.taskNotEditable);
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch({
      type: 'opusClaimDataCapture/incidentAdd',
      payload: {
        changedValues: {},
      },
    });
  };

  const handleDelete = () => {
    dispatch({
      type: 'opusClaimDataCapture/incidentDelete',
      payload: {
        incidentId,
      },
    });
  };
  return (
    <div className={styles.incidentItem}>
      <FormLayoutContext.ExpandProvider>
        <div className={styles.titleRow}>
          {`${formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.title.incident',
          })} No. ${index + 1}`}
          <div className={styles.gap} />
          {editable && <Icon component={AddIcon} onClick={onAdd} />}
          {editable && !disableDelete && (
            <DeleteButton handleDelete={handleDelete} disabled={!editable || disableDelete} />
          )}
          <FormLayoutContext.ExpandIcon className={styles.icon} />
        </div>
        <div className={styles.innerCard}>
          <Basic {...{ incidentItem, incidentId }} />
          <div style={{ height: 10 }} />
          <DiagnosisList incidentId={incidentId} hasTreatment={hasTreatment} />
        </div>
      </FormLayoutContext.ExpandProvider>
    </div>
  );
};

export default Expand;
