import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useDispatch, useSelector } from 'dva';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { getNotRepeatableCodes } from 'claim/pages/utils/getNotRepeatableCodes';
import Section, { ServiceFields as Fields } from '../Section';
import styles from '../style.less';

const InvoiceServiceAddItem = ({ form, invoiceId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const addInvoiceItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpAddInvoiceItem
  );
  const { serviceItemList }: any = lodash.pick(addInvoiceItem, ['serviceItemList']);

  const repeatableServiceItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.repeatableServiceItemList
  );
  const notRepeatableCodeList = getNotRepeatableCodes({
    repeatableServiceItemList,
    invoiceId,
    serviceItemListMap: lodash.flatten(serviceItemList),
  });

  const onSelect = (value: any) => {
    dispatch({
      type: `${NAMESPACE}/getRepeatableByServiceCode`,
      payload: {
        codes: [value],
        invoiceId,
        serviceItemList: lodash.flatten(serviceItemList),
      },
    });
  };
  return (
    <div className={styles.serviceItem}>
      <FormBorderCard type="weight">
        <Section form={form} editable={editable} section="InvoicePopUp.Service" register={false}>
          <Fields.ServiceItem
            invoiceId={invoiceId}
            onSelect={onSelect}
            notRepeatableCodeList={notRepeatableCodeList}
          />
          <Fields.Expense invoiceId={invoiceId} />
          <Fields.Unit />
          <Fields.OtherInsurerPaidAmount />
          <Fields.SurgeryClass />
        </Section>
      </FormBorderCard>
    </div>
  );
};

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, invoiceId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'savePopUpAddInvoiceServiceAddItem',
              payload: {
                changedFields,
                invoiceId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'savePopUpAddInvoiceServiceAddItem',
            payload: {
              changedFields,
              invoiceId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { serviceAddItem } = props;
      return formUtils.mapObjectToFields(serviceAddItem);
    },
  })(InvoiceServiceAddItem)
);
