import React from 'react';
import { NAMESPACE } from '../activity.config';

import type { Dispatch } from 'redux';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { IsAdjustment } from 'claim/enum/IsAdjustment';

import type { FormComponentProps } from 'antd/lib/form';
import { FormBorderCard, formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import styles from './InvoiceList.less';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  incidentId: string;
  procedureId: string;
  treatmentId: string;
  dateTimeOfDeath: Date;
  incidentDate: Date;
}

const ShrinkInvoiceItem = ({ form, invoiceId, item }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const isAdjustMent = item?.isAdjustment === IsAdjustment.Yes;

  return (
    <FormBorderCard className={isAdjustMent && styles.isAdjustment}>
      <Section form={form} editable={editable} section="Invoice">
        <Fields.InvoiceDate />
        <Fields.Expense invoiceId={invoiceId} />
        <Fields.InvoiceNo />
      </Section>
    </FormBorderCard>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { invoiceId }: any) => ({
    item: modelnamepsace.claimEntities.invoiceListMap[invoiceId],
    validating: formCommonController.validating,
  })
)(
  Form.create<IProps>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, invoiceId, treatmentId, validating } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'saveInvoiceItem',
              payload: {
                changedFields,
                treatmentId,
                invoiceId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'saveInvoiceItem',
            payload: {
              changedFields,
              treatmentId,
              invoiceId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(ShrinkInvoiceItem)
);
