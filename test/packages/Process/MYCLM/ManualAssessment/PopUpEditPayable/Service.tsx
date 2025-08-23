import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { ServiceFields as Fields } from './Section';

const Invoice = ({ form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  const { incidentId } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.PopUpEditPayable?.data
  );

  const incidentItem = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimEntities.incidentListMap?.[incidentId]
  );
  return (
    <Section form={form} editable={editable} section="PopUpEditPayable.Service">
      <Fields.InvoiceNo />
      <Fields.ServiceItem
        claimTypeList={formUtils.queryValue(incidentItem?.claimTypeArray) || []}
      />
      <Fields.Expense />
      <Fields.Unit />
      <Fields.OtherInsurerPaidAmount />
      <Fields.SurgeryClass />
    </Section>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { serviceId }: any) => ({
    item: modelnamepsace.claimEntities.serviceItemListMap[serviceId],
    validating: formCommonController.validating,
  })
)(
  Form.create<any>({
    mapPropsToFields(props: any) {
      const { item, invoiceNo } = props;
      return formUtils.mapObjectToFields({ ...item, invoiceNo });
    },
  })(Invoice)
);
