import React from 'react';
import { NAMESPACE } from '../activity.config';
import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './ListItem.less';

const FeeItem = ({ form, treatmentId, invoiceId, serviceItemId, feeItemId, incidentId }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const handleDelete = () => {
    dispatch({
      type: `${NAMESPACE}/removeFeeItem`,
      payload: {
        serviceItemId,
        feeItemId,
        invoiceId,
      },
    });
  };

  return (
    <FormBorderCard
      backgroundColorName={'bgColor7'}
      marginBottom
      className={styles.itemCard}
      button={{
        visiable: editable,
        callback: handleDelete,
      }}
    >
      <Section form={form} editable={editable} section="FeeItem">
        <Fields.FeeItem serviceItemId={serviceItemId} incidentId={incidentId} />
        <Fields.Expense invoiceId={invoiceId} />
        <Fields.Unit treatmentId={treatmentId} serviceItemId={serviceItemId} />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { feeItemId }: any) => ({
    feeItem: modelnamepsace.claimEntities.feeItemListMap[feeItemId],
    validating: formCommonController.validating,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, feeItemId, serviceItemId, invoiceId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveFeeItem',
              payload: {
                changedFields,
                feeItemId,
                serviceItemId,
                invoiceId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveFeeItem',
            payload: {
              changedFields,
              feeItemId,
              serviceItemId,
              invoiceId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { feeItem }: any = props;

      return formUtils.mapObjectToFields(feeItem);
    },
  })(FeeItem)
);
