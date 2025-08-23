import React, { useEffect } from 'react';
import {v4 as uuidv4 } from 'uuid';
import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import ServiceItem, {
  FieldsBasic as Fields,
} from 'process/Components/BussinessControls/ServiceItem';
import { SERVICEITEM } from '@/utils/claimConstant';

interface IProps {
  form: any;
  NAMESPACE: string;
  incidentId: string;
  invoiceId: string;
  incidentItem: any;
  editable: boolean;
}

const Add = ({ form, NAMESPACE, editable, incidentId, invoiceId, incidentItem }: IProps) => {
  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <ServiceItem.Section
      form={form}
      editable={editable}
      section="Add.ServiceItem"
      NAMESPACE={NAMESPACE}
      register={false}
    >
      <Fields.ServiceItem
        invoiceId={invoiceId}
        incidentId={incidentId}
        claimTypeList={formUtils.queryValue(incidentItem?.claimTypeArray) || []}
      />
    </ServiceItem.Section>
  );
};

export default connect((state: any, { NAMESPACE, incidentId }: any) => ({
  claimNo: state?.[NAMESPACE].claimProcessData?.claimNo,
  incidentItem: state?.[NAMESPACE]?.claimEntities?.incidentListMap?.[incidentId] || {},
}))(
  Form.create({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, claimNo, invoiceId, NAMESPACE } = props;

      dispatch({
        type: `${NAMESPACE}/addServiceItem`,
        payload: {
          invoiceId,
          addServiceItem: {
            ...SERVICEITEM,
            claimNo,
            id: uuidv4(),
            invoiceId,
            ...changedValues,
          },
        },
      });
    },
  })(Add)
);
