import React from 'react';
import { NAMESPACE } from '../activity.config';

import { Form } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { ServiceFields as Fields } from './Section';

const ServiceItem = ({ form, data, benefitItemId }: any) => {
  const dispatch = useDispatch();

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const { boosterNotEdible } = data;

  const onChooise = () => {
    if (!formUtils.queryValue(data?.chooise)) {
      dispatch({
        type: `${NAMESPACE}/popUpPableUpdateListMap`,
        payload: {
          id: data.id,
          benefitItemId,
          changedFields: {
            chooise: true,
          },
        },
      });

      dispatch({
        type: `${NAMESPACE}/calcuPopPayableTotalVal`,
        payload: { serviceItemId: data.id, benefitItemId, chooise: true },
      });
    }
  };

  return (
    <div onClick={onChooise}>
      <Section form={form} editable={editable} section="PopUpPayable.Service">
        <Fields.Chooise serviceItemId={data.id} />
        <Fields.ServicePayableAmount data={data} />
        <Fields.ServicePayableDays />
        <Fields.BoosterPayableAmount boosterNotEdible={boosterNotEdible} />
        <Fields.BoosterPayableDays boosterNotEdible={boosterNotEdible} />
        <Fields.InvoiceNo />
        {/* <Fields.TreatmentNo /> */}
        <Fields.ServiceItem serviceItemId={data.id} invoiceId={data.invoiceId} />
        <Fields.BillAmount />
        <Fields.CopayAmount />
        <Fields.UncoverAmount />
      </Section>
    </div>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { data, benefitItemId, dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/popUpPableUpdateListMap`,
          payload: {
            id: data.id,
            benefitItemId,
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(ServiceItem)
);
