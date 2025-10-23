import React from 'react';
import { useSelector } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  Rule,
} from 'basic/components/Form';
import { VLD_000332 } from 'process/Payment/_Components/Validators/VLD_000332';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

export const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'paymentAllocation.payeeInformation',
  field: 'firstName',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'FirstName',
    },
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'payeeType',
          },
          operator: '===',
          right: 'S',
        },
        {
          left: {
            domain: 'field',
            field: 'payeeType',
          },
          operator: '===',
          right: 'O',
        },
      ],
    },
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'no-treatment-invoice-layout': {
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = fieldConfig['field-props'];

  const disabledCondition = Rule(fieldProps['editable-condition'], form, '');

  const payeeList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas?.payeeList
    ) || [];
  const id = form.getFieldValue('id');


  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemInput
        form={form}
        required={config?.required === Required.Yes}
        disabled={
          !editable ||
          (config?.editable === Editable.Conditions ? disabledCondition : config?.editable === Editable.No)
        }
        formName={field || fieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        rules={[
          {
            validator: VLD_000332({ payeeList, id, formName: field }),
          },
        ]}
      />
    </Col>
  );
};

const FirstName = ({ field, config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
    />
  </Authority>
);

FirstName.displayName = 'firstName';

export default FirstName;
