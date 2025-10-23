import React from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col } from 'antd';
import lodash from 'lodash';

import { Authority, Editable, FormItemSelect, Required } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'paymentAllocation.payeePaymentInformation',
  field: 'policyNo',
  'field-props': {
    editable: 'C',
    label: {
      dictTypeCode: 'Label_COM_General',
      dictCode: 'PolicyNo',
    },
    required: 'Y',
    visible: 'Y',
    'x-dict': {},
    'x-layout': {
      // 480px
      xs: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 4,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config, policyBenefitId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const { policyBenefitList } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      policyBenefitList: modelnamespace?.paymentModal?.datas?.policyBenefitList,
    }),
    shallowEqual
  );

  const dicts = lodash
    .chain(policyBenefitList)
    .filter((item) => !policyBenefitId || item.id === policyBenefitId)
    .map((item: any) => ({ dictCode: item?.policyNo, dictName: item?.policyNo }))
    .value();
  const existedCodes = policyBenefitList.filter((item) =>
    item?.beneficiaryList?.length
  ).map(item => item?.policyNo)

  const editableConditions = !form.getFieldValue(config.name || field);

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        disabled={
          !editable ||
          ((config?.editable || fieldProps.editable) === Editable.Conditions
            ? !editableConditions
            : (config?.editable || fieldProps.editable) === Editable.No)
        }
        dicts={dicts}
        existCodes={existedCodes}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={(config.required || fieldProps.required) === Required.Yes}
      />
    </Col>
  );
};

const PolicyNo = ({ field, config, form, editable, layout, isShow, policyBenefitId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      policyBenefitId={policyBenefitId}
    />
  </Authority>
);

PolicyNo.displayName = 'policyNo';

export default PolicyNo;
