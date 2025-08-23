import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';

import lodash from 'lodash';
import { TherapiesType as TherapiesTypeEnum } from 'claim/pages/Enum';
import { TherapiesHandler } from 'process/MYCLM/DataCapture/_models/functions';
import styles from './ProcedureList.less';
import Section, { Fields } from './Section';

const ListItemICU = ({ form, treatmentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeICUItem`,
      payload: {
        treatmentId,
      },
    });
  };
  return (
    <FormBorderCard
      marginBottom
      className={styles.itemCard}
      button={{ visiable: editable, callback: handleDelete }}
    >
      <Section form={form} editable={editable} section="Procedure">
        <Fields.TherapiesType treatmentId={treatmentId} />
        <Fields.IcuFromDate treatmentId={treatmentId} />
        <Fields.IcuToDate treatmentId={treatmentId} />
        <Fields.IcuDays treatmentId={treatmentId} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace }: any, { treatmentId }: any) => ({
    treatmentItem: modelnamepsace.claimEntities.treatmentListMap[treatmentId],
    claimNo: modelnamepsace.claimProcessData?.claimNo,
  })
)(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, incidentId, treatmentId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveTreatmentItem',
          payload: {
            changedFields,
            incidentId,
            treatmentId,
          },
        });
        if(lodash.size(changedFields) === 1) {
          TherapiesHandler({
            previousType: TherapiesTypeEnum.ICU,
            treatmentId,
            dispatch,
            changedFields,
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;
      const therapiesTypeValue = treatmentItem.icu ? 'ICU' : '';
      const therapiesType = lodash.has(treatmentItem, 'therapiesType')
        ? treatmentItem.therapiesType
        : therapiesTypeValue;
      return formUtils.mapObjectToFields({ ...treatmentItem, therapiesType });
    },
  })(ListItemICU)
);
