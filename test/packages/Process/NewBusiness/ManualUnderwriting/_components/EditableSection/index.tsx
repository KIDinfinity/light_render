import React, { useMemo } from 'react';
import { Form } from 'antd';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { FormRegister } from 'basic/components/Form';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import getApplicableByDisableCondidtions from 'process/NB/ManualUnderwriting/utils/getApplicableByDisableCondidtions';
import useGetFieldsFieldsDisableConditionConfig from 'process/NB/ManualUnderwriting/_hooks/useGetFieldsFieldsDisableConditionConfig';
import useGetProcessInfo from 'basic/components/Elements/hooks/useGetProcessInfo';
import TaskDefKey from 'enum/TaskDefKey';
import CaseCategory from 'enum/CaseCategory';
import FieldsLayout from './FieldsLayout';

const EditableSection = ({
  editable = true,
  section,
  localConfig = {},
  form,
  children,
  icon,
  disabled,
  className,
  gateway,
  layoutName,
  formId,
  placeholder,
  tableHeaderConfig,
  readOnly = true,
}: any) => {
  const taskNotEditable = !useSelector(
    ({ claimEditable }: any) => claimEditable.taskNotEditable,
    shallowEqual
  );
  const sectionConfig = useGetSectionAtomConfig({ localConfig, section });
  const config = tableHeaderConfig || sectionConfig;
  const disableFieldsConditions = useGetFieldsFieldsDisableConditionConfig();
  const configByDisableCondition = config.map((item: any) => {
    const configItem = getApplicableByDisableCondidtions({
      fieldConfig: item,
      disableFieldsConditions,
      condition: 'proposal',
    });
    return configItem;
  });

  const { caseCategory, activityCode } = useGetProcessInfo();
  const editableResult = useMemo(() => {
    if (caseCategory === CaseCategory.BP_NB_CTG003 && activityCode === TaskDefKey.BP_NB_ACT008) {
      return true;
    }
    return taskNotEditable && editable;
  }, [caseCategory, activityCode, taskNotEditable, editable]);

  return (
    <FormRegister form={form} formId={formId}>
      <Form layout="vertical">
        <FieldsLayout
          icon={icon}
          form={form}
          disabled={disabled}
          className={className}
          gateway={gateway}
          editable={editableResult}
          config={configByDisableCondition}
          layoutName={layoutName}
          section={section}
          placeholder={placeholder}
          readOnly={readOnly}
        >
          {children}
        </FieldsLayout>
      </Form>
    </FormRegister>
  );
};

export default EditableSection;
