import React, { useEffect }  from 'react';
import { Col } from 'antd';
import { useDispatch } from 'dva'
import { Authority, Editable, FormItemSelect, Visible, RuleByForm } from 'basic/components/Form';
import lodash from 'lodash'
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useGetOccupationGroupDicts from '../../../_hooks/useGetOccupationGroupDicts';
import { fieldConfig } from './Occupationgroup.config';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
export { fieldConfig } from './Occupationgroup.config';


const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly}: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetOccupationGroupDicts({ form, config, fieldConfig });
  const dispatch = useDispatch()
  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

  const currentValue = form.getFieldValue('occupationGroup')
  useEffect(() => {
    const isSingleOption = lodash.chain(dicts).size().isEqual(1).value()
    if (isSingleOption && !currentValue && !readOnly) {
      const occupationGroup = lodash.chain(dicts).first().get('dictCode').value();
      dispatch({
        type: `${NAMESPACE}/saveFormData`,
        target: 'saveBackgroundInfo',
        payload: {
          id,
          changedFields: {
            occupationGroup
          }
        }
      })
    }
  }, [dicts, id, currentValue, readOnly])
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
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Occupationgroup = ({ form, editable, layout, isShow, id, config }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
      />
    </Authority>
  );
};

Occupationgroup.displayName = 'occupationGroup';

export default Occupationgroup;
