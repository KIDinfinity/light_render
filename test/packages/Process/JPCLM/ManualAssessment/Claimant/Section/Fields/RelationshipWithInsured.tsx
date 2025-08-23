import React from 'react';
import { Col } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Claimant',
  field: 'relationshipWithInsured',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.relationship-width-insured',
    },
    'x-dict': { dictTypeCode: 'Dropdown_POL_RelationshipWithInsured' },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 8,
        offset: 16,
        pull: 16,
        order: 1,
      },
      // 768px
      md: {
        span: 8,
        offset: 16,
        pull: 16,
        order: 1,
      },
      // 992px
      lg: {
        span: 8,
        offset: 16,
        pull: 16,
        order: 1,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 16,
        pull: 16,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 16,
        pull: 16,
        order: 1,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dicts = useSelector(
    ({ dictionaryController }: any) =>
      dictionaryController[
        config['x-dict']?.dictTypeCode ||
          localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
      ]
  );

  const dispatch = useDispatch();
  const policyOwnerList = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.policyOwnerList
  );

  const changeRelationship = (value: any) => {
    if (value === relationshipWithInsuredForHK.policyOwner && lodash.isEmpty(policyOwnerList)) {
      dispatch({
        type: 'JPCLMOfClaimAssessment/getPolicyOwnerList',
        payload: {},
      });
    }
  };

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
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
          onChange={changeRelationship}
        />
      </Col>
    )
  );
};

const RelationshipWithInsured = ({ field, config, isShow, layout, form, editable }: any) => (
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

RelationshipWithInsured.displayName = 'RelationshipWithInsured';

export default RelationshipWithInsured;
