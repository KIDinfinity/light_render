import React from 'react';
import { Col } from 'antd';

import { Authority, Editable, FormItemSelect, RuleByForm } from 'basic/components/Form';
import useGetVisibleByConfigUseFormRule from 'basic/hooks/useGetVisibleByConfigUseFormRule';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import useJudgeIsTargetRelationOfInsured from '../../../_hooks/useJudgeIsTargetRelationOfInsured';
import { fieldConfig } from './Gender.config';
import useGetHierarchyDicts from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetHierarchyDicts';
export { fieldConfig } from './Gender.config';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const title = form.getFieldValue('title');
  const dicts = useGetHierarchyDicts({
    parentType: 'Dropdown_IND_Title',
    parentCode: title,
    subType: config?.['x-dict']?.dictTypeCode,
    onlyOnParentCodeChanged: true,
    callback: (hierarchyDicts: any[]) => {
      if (readOnly || !editable) {
        return;
      }
      const defaultValueDict = lodash.find(hierarchyDicts, { defaultValue: 'Y' });
      const defaultValue = defaultValueDict?.dictCode;
      if (defaultValue) {
        dispatch({
          type: `${NAMESPACE}/savePersonalInfo`,
          payload: {
            changedFields: { gender: defaultValue },
            id,
            errorId: id,
          },
        });
      }
    },
  });
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });
  const isTargetRelationOfInsured = useJudgeIsTargetRelationOfInsured({ form });
  const visible = useGetVisibleByConfigUseFormRule({ config, fieldConfig });
  const genderVisible = isTargetRelationOfInsured ? false : visible;

  return (
    isShow &&
    genderVisible && (
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

const Gender = ({ form, editable, layout, isShow, config, id, readOnly }: any) => {
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
        readOnly={readOnly}
      />
    </Authority>
  );
};

Gender.displayName = 'gender';

export default Gender;
