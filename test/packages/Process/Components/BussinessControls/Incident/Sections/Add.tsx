import React, { useEffect } from 'react';

import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import {v4 as uuidv4 } from 'uuid';

import { INCIDENTITEM } from '@/utils/claimConstant';

import Incident, { FieldsAdd as Fields } from 'process/Components/BussinessControls/Incident';

interface IProps {
  NAMESPACE?: string;
  editable: boolean;
  form: any;
}

const Add = ({ form, editable, NAMESPACE }: IProps) => {
  useEffect(() => {
    form.resetFields();
  }, [form]);

  return (
    <Incident.Section form={form} editable={editable} section="Add.Incident" register={false} NAMESPACE={NAMESPACE}>
      <Fields.ClaimTypeArray />
    </Incident.Section>
  );
};

export default connect((state: any, { NAMESPACE }: any) => ({
  claimNo: state?.[NAMESPACE]?.claimProcessData?.claimNo,
  incidentList: state?.[NAMESPACE]?.claimProcessData?.incidentList || [],
}))(
  Form.create<any>({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, NAMESPACE, claimNo, incidentList }: any = props;
      const incidentId = uuidv4();

      // 新增incident
      dispatch({
        type: `${NAMESPACE}/addIncidentItem`,
        payload: {
          addIncidentItem: {
            ...INCIDENTITEM,
            claimNo,
            diagnosisList: [],
            id: incidentId,
            incidentNo: incidentList.length + 1,
            isManualAdd: true,
            ...changedValues,
          },
        },
      });

      // 新增treatment
      dispatch({
        type: `${NAMESPACE}/addTreatmentItem`,
        payload: {
          incidentId,
          changedValues,
        },
      });
    },

    mapPropsToFields() {
      return formUtils.mapObjectToFields({});
    },
  })(Add)
);
