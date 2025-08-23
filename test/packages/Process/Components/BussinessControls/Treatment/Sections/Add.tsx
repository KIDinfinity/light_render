import React from 'react';

import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import Treatment, { FieldsAdd as Fields } from 'process/Components/BussinessControls/Treatment';

interface IProps {
  NAMESPACE: string;
  form: any;
  incidentId?: string;
}

const Add = ({ NAMESPACE, form }: IProps) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Treatment.Section
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
      section="Add.Treatment"
      register={false}
    >
      <Fields.TreatmentType />
    </Treatment.Section>
  );
};

export default connect()(
  Form.create<any>({
    onValuesChange: (props: any, changedValues: any) => {
      const { dispatch, NAMESPACE, incidentId } = props;
      dispatch({
        type: `${NAMESPACE}/addTreatmentItem`,
        payload: {
          incidentId,
          changedValues,
        },
      });
    },
    mapPropsToFields(props: any) {
      const { treatmentItem } = props;
      return formUtils.mapObjectToFields(treatmentItem);
    },
  })(Add)
);
