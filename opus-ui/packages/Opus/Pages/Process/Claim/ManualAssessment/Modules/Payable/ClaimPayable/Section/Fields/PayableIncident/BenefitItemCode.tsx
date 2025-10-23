import React, { useState, useEffect, useMemo } from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';
import { checkPayableList } from 'claimBasicProduct/pages/validators';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Incident.Payable',
  field: 'benefitItemCode',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
    },
    'x-dict': { dictCode: 'benefitItemCode', dictName: 'benefitItemName' },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config, sectionId }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const [dicts, setDicts] = useState([]);
  const listPolicy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.listPolicy
  );
  const claimIncidentPayableListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimEntities?.claimIncidentPayableListMap
  );

  useEffect(() => {
    const data = lodash
      .chain(listPolicy)
      .filter(
        (item: any) =>
          item.policyNo === form.getFieldValue('policyNo') &&
          item.coreProductCode === form.getFieldValue('productCode') &&
          item.benefitTypeCode === form.getFieldValue('benefitTypeCode')
      )
      .value();

    setDicts(data as any);
  }, [form, listPolicy]);

  const { payableList, payableItem } = useMemo(() => {
    const payableItem = claimIncidentPayableListMap?.[sectionId];
    const payableList = lodash.filter(
      claimIncidentPayableListMap,
      (item) => item?.payableId === payableItem?.payableId
    );
    return { payableItem, payableList };
  }, [claimIncidentPayableListMap, sectionId]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          rules={[
            {
              validator: (rule: any, value: any, callback: Function) =>
                checkPayableList(rule, value, callback, payableList, payableItem, 'serviceItemId'),
            },
          ]}
          dictTypeCode="Dropdown_PRD_BenefitItem"
        />
      </Col>
    )
  );
};

const BenefitItemCode = ({ field, config, isShow, layout, form, editable, sectionId }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      sectionId={sectionId}
    />
  </Authority>
);

BenefitItemCode.displayName = 'BenefitItemCode';

export default BenefitItemCode;
