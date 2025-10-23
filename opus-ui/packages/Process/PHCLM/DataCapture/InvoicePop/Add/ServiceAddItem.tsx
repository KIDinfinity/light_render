import React from 'react';
import { NAMESPACE } from '../../activity.config';

import { Form } from 'antd';
import { connect, useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils, FormBorderCard } from 'basic/components/Form';
import { getNotRepeatableCodes } from 'claim/pages/utils/getNotRepeatableCodes';
import styles from '../style.less';
import Section, { ServiceFields as Fields } from '../Section';

const ServiceAddItem = ({ form, invoiceId, serviceId, incidentId }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const addInvoiceItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.popUpAddInvoiceItem
  );
  const { serviceAddItem, serviceItemList }: any = lodash.pick(addInvoiceItem, [
    'serviceAddItem',
    'serviceItemList',
  ]);
  const hasEmptyItem = !lodash.isEmpty(serviceAddItem);

  const repeatableServiceItemList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.repeatableServiceItemList
  );
  const notRepeatableCodeList = getNotRepeatableCodes({
    repeatableServiceItemList,
    invoiceId,
    serviceItemListMap: serviceItemList,
  });
  const onSelect = (value: any) => {
    dispatch({
      type: `${NAMESPACE}/getRepeatableByServiceCode`,
      payload: {
        codes: [value],
        invoiceId,
        serviceItemList,
        incidentId,
      },
    });
  };
  const removePopUpService = () => {
    dispatch({
      type: `${NAMESPACE}/removePopUpAddInvoiceService`,
      payload: {
        invoiceId,
        serviceId,
      },
    });
  };
  return (
    <div className={styles.serviceItem}>
      <FormBorderCard
        type="weight"
        button={{ visiable: editable && hasEmptyItem, callback: removePopUpService }}
      >
        <Section form={form} editable={editable} section="InvoicePopUp.Service" register={false}>
          <Fields.ServiceItem
            invoiceId={invoiceId}
            notRepeatableCodeList={notRepeatableCodeList}
            onSelect={onSelect}
          />
          <Fields.Expense />
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
      const { dispatch, validating, serviceId, invoiceId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'savePopUpAddInvoiceServiceItem',
              payload: {
                changedFields,
                serviceId,
                invoiceId,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'savePopUpAddInvoiceServiceItem',
            payload: {
              changedFields,
              serviceId,
              invoiceId,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { serviceItem } = props;
      return formUtils.mapObjectToFields(serviceItem);
    },
  })(ServiceAddItem)
);
