import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { useSelector, useDispatch } from 'dva';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../../activity.config';
import { localFieldConfig } from './ChequeCategory.config';

export { localFieldConfig } from './ChequeCategory.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch()

  const isAssurance = useSelector(
    ({ processTask }: any) => processTask.getTask?.companyCode === 'Assurance'
  );
  const dicts = getDrowDownList(isAssurance ? 'Dropdown_CLM_ASRChequeCategory' : 'Dropdown_CLM_BMDChequeCategory');

  const currentCategory = form.getFieldValue('chequeCategory')
  const policyNo = form.getFieldValue('policyNo')

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps['x-dict'].dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps['x-dict'].dictName}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          onChange={(code) => {
            if(currentCategory === 'CDS' && code !== 'CDS' && policyNo) {
              dispatch({
                type: `${NAMESPACE}/getInsuredInfo`,
                payload: {
                  policyIdList: [policyNo],
                  forceFetch: true
                },
              });
            }
          }}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
        />
      </Col>
    )
  );
};

const ChequeCategory = ({ field, config, isShow, layout, form, editable }: any) => (
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

ChequeCategory.displayName = 'ChequeCategory';

export default ChequeCategory;
