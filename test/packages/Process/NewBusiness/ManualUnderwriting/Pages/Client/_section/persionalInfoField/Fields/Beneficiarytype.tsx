import React from 'react';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col } from 'antd';
import lodash from 'lodash';

import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { fieldConfig } from './Beneficiarytype.config';
export { fieldConfig } from './Beneficiarytype.config';

const useGetExistCodes = ({ readOnly }: any) => {
  const clientMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      readOnly
        ? modelnamepsace?.entities?.clientMap
        : modelnamepsace.modalData?.entities?.clientMap,
    shallowEqual
  );
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      readOnly
        ? modelnamepsace.processData?.clientInfoList
        : modelnamepsace?.modalData?.processData?.clientInfoList,
    shallowEqual
  );
  const beneficiaryTypeList = lodash.map(clientInfoList, (id: string) => {
    return formUtils.queryValue(lodash.get(clientMap, `${id}.personalInfo.beneficiaryType`, ''));
  });
  return lodash.some(beneficiaryTypeList, (beneficiaryType: any) => beneficiaryType === 'TB')
    ? ['TB']
    : [];
};

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const existCodes = useGetExistCodes({ readOnly });

  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id,
  });

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
          existCodes={existCodes}
        />
      </Col>
    )
  );
};

const Beneficiarytype = ({ form, editable, layout, isShow, config, readOnly }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        readOnly={readOnly}
      />
    </Authority>
  );
};

Beneficiarytype.displayName = 'beneficiaryType';

export default Beneficiarytype;
