import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { getNotRepeatableCodes } from 'claim/pages/utils/getNotRepeatableCodes';
import Section, { ServiceFields as Fields } from '../Section';

const InvoiceServiceAddItem = ({ form, invoiceId }: any) => {
  const dispatch = useDispatch();
  const invoiceList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpInvoiceList
  );
  const serviceItemListMap = lodash.map(invoiceList, (invoice: any) => invoice.serviceItemList);
  const repeatableServiceItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.repeatableServiceItemList
  );
  const notRepeatableCodeList = getNotRepeatableCodes({
    repeatableServiceItemList,
    invoiceId,
    serviceItemListMap: lodash.flatten(serviceItemListMap),
  });

  const onSelect = (value: any) => {
    dispatch({
      type: `${NAMESPACE}/getRepeatableByServiceCode`,
      payload: {
        codes: [value],
        invoiceId,
        serviceItemList: lodash.flatten(serviceItemListMap),
      },
    });
  };
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <>
      {editable && (
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
      )}
    </>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, invoiceId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePopUpServiceAddItem',
          payload: {
            changedFields,
            invoiceId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { serviceAddItem } = props;
      return formUtils.mapObjectToFields(serviceAddItem);
    },
  })(InvoiceServiceAddItem)
);
