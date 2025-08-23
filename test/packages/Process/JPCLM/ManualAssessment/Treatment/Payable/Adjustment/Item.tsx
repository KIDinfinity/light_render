import React from 'react';
import { Form, Button } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { TotalPayableFields as Fields } from '../../Section';
import lodash from 'lodash';
import AdjItem from './AdjItem';
import styles from './index.less';

const Item = ({ form, layoutName, totalItem, treatmentPayableItem }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/removeOPTreatmentPayableItem',
      payload: {
        opTreatmentPayableId: totalItem.id,
        treatmentPayableId: treatmentPayableItem.id,
      },
    });
  };

  return (
    <div className={styles.Item}>
      <div className={styles.buttonWrap}>
        <Button
          className={styles.deleteBtn}
          icon="close"
          size="small"
          type="primary"
          shape="circle"
          disabled={!editable}
          onClick={handleDelete}
        />
      </div>
      <Section
        form={form}
        editable={editable}
        layoutName={layoutName}
        section="Treatment.TotalPayable"
      >
        <Fields.OutpatientDate />
        <Fields.adjustOriginPayableDays />
        <Fields.AdjustOriginPayableAmount />

        {/* <Fields.PayableDays />
        <Fields.PayableAmount /> */}

        <Fields.HospitalizationSequentialNo />
        <Fields.ChangeHospitalizationSequentialNo />
        <Fields.ChangeObjectAmount />
      </Section>
      {lodash.map(totalItem.opTreatmentPayableList || [], (el: any) => (
        <AdjItem
          key={el.id}
          opTreatmentPayableItem={el}
          treatmentPayableItem={treatmentPayableItem}
        />
      ))}
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields) {
      const { dispatch, treatmentPayableItem, totalItem, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: 'JPCLMOfClaimAssessment/saveEntry',
              target: 'saveAdjOpTreatmentPayable',
              payload: {
                changedFields,
                opTreatmentPayableList: totalItem.opTreatmentPayableList,
                treatmentPayableItem,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: 'JPCLMOfClaimAssessment/saveFormData',
            target: 'saveAdjOpTreatmentPayable',
            payload: {
              changedFields,
              opTreatmentPayableList: totalItem.opTreatmentPayableList,
              treatmentPayableItem,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { totalItem }: any = props;
      return formUtils.mapObjectToFields(totalItem);
    },
  })(Item)
);
