import React, { useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';

import { useSelector } from 'dva';
import {
  Authority,
  Editable,
  FormItemInput,
  Required,
  FormItemSelectPlus,
  Visible,
  Validator,
} from 'basic/components/Form';
import TaskStatus from 'bpm/enum/taskStatus';
import { LS, LSKey } from '@/utils/cache';
import TaskDefKey from 'basic/enum/TaskDefKey';
import CaseCategory from 'basic/enum/CaseCategory/hk';

import { localFieldConfig } from './Doctor.config';
export { localFieldConfig } from './Doctor.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const { activityKey, assignee, taskStatus, caseCategory } =
    useSelector(({ processTask }: any) => processTask.getTask) || {};
  const currentUser = LS.getItem(LSKey.CURRENTUSER);
  const userId = lodash.get(currentUser, 'userId', '');
  const isEdit =
    TaskStatus.todo === taskStatus &&
    assignee === userId &&
    activityKey === TaskDefKey.HK_CLM_ACT008 &&
    caseCategory === CaseCategory.HK_CLM_CTG003;

  const fieldProps: any = localFieldConfig['field-props'];
  const datas: any = form.getFieldsValue([
    'medicalProvider',
    'medicalProviderPlace',
    'hospitalType',
  ]);

  const showSelect: boolean = useMemo(() => {
    const { medicalProvider, medicalProviderPlace, hospitalType } = datas;
    return (medicalProvider === '998' && medicalProviderPlace === 'HK') || hospitalType === 'P';
  }, [datas]);

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const Rules = {
    doctorLength: Validator.doctorLength,
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {showSelect ? (
          <FormItemSelectPlus
            disabled={
              isEdit
                ? !isEdit
                : !editable ||
                  ((config?.editable || fieldProps.editable) === Editable.Conditions
                    ? !editableConditions
                    : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            required={
              isEdit
                ? isEdit
                : (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            searchName="nameOfDoctor"
            dropdownCode="misc_dict032"
            optionShowType="both"
            isPassCodeName={true}
            isFreeText={true}
          />
        ) : (
          <FormItemInput
            disabled={
              isEdit
                ? !isEdit
                : !editable ||
                  ((config?.editable || fieldProps.editable) === Editable.Conditions
                    ? !editableConditions
                    : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
            maxLength={config?.maxLength || fieldProps.maxLength}
            required={
              isEdit
                ? isEdit
                : (config.required || fieldProps.required) === Required.Conditions
                ? requiredConditions
                : (config.required || fieldProps.required) === Required.Yes
            }
            rules={lodash.compact(
              (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
            )}
          />
        )}
      </Col>
    )
  );
};

const Doctor = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  treatmentId,
  incidentId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      incidentId={incidentId}
    />
  </Authority>
);

Doctor.displayName = localFieldConfig.field;

export default Doctor;
