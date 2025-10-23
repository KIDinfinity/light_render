import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelect,
  FormItemInput,
  formUtils,
} from 'basic/components/Form';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Procedure',
  field: 'partOfBody',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'C',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'surgicalSite',
    },
    'x-dict': { dictTypeCode: 'Dropdown_CLM_surgicalSite' },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 8,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );

  const { womenSurgeryFlg, nnmWomenSurgeryFlg } = useSelector(
    ({ opusClaimAssessment }: any) =>
      formUtils.cleanValidateData(
        opusClaimAssessment.claimEntities.procedureListMap[form.getFieldValue('id')]
      ) || {}
  );

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions =
    lodash.includes(['1', '2', '3'], womenSurgeryFlg) ||
    lodash.includes(['1', '2', '3'], nnmWomenSurgeryFlg);

  const maps: any = {
    1: ['LB', 'RB', 'UT', 'OVL', 'OVR'],
    2: ['OTH1', 'OTH', 'OTH2'],
    3: ['LB01', 'RB01'],
  };

  const list = lodash
    .chain(dicts || [])
    .filter((el: any) => {
      if (lodash.isArray(maps[womenSurgeryFlg]) || lodash.isArray(maps[nnmWomenSurgeryFlg])) {
        return (
          lodash.includes(maps[womenSurgeryFlg], el.dictCode) ||
          lodash.includes(maps[nnmWomenSurgeryFlg], el.dictCode)
        );
      }
      return true;
    })
    .value();

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {womenSurgeryFlg === '0' && nnmWomenSurgeryFlg === '0' ? (
          <FormItemInput
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              config?.required === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? !editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
          />
        ) : null}
        {(womenSurgeryFlg !== '0' || nnmWomenSurgeryFlg !== '0') && (
          <FormItemSelect
            dicts={list}
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
          />
        )}
      </Col>
    )
  );
};

const SurgicalSite = ({ field, config, isShow, layout, form, editable }: any) => (
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

SurgicalSite.displayName = localFieldConfig.field;

export default SurgicalSite;
