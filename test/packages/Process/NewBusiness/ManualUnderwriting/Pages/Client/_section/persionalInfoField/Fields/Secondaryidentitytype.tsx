import React, { useMemo } from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import { getDrowDownList } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  RuleByForm,
  formUtils,
} from 'basic/components/Form';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useRequiredByNationality from '../../../_hooks/useRequiredByNationality';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Secondaryidentitytype.config';
export { fieldConfig } from './Secondaryidentitytype.config';

const useGetSecondaryidentitytypeDicts = ({ config, fieldConfig, nationality }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const defaultDicts = getDrowDownList({ config, fieldProps });

  return useMemo(() => {
    return tenant.region({
      [Region.ID]:
        nationality !== 'RI'
          ? lodash.filter(defaultDicts, (item) => ['KIMS', 'KITAS'].includes(item.dictCode))
          : defaultDicts,
      notMatch: defaultDicts,
    });
  }, [nationality, defaultDicts]);
};

const FormItem = ({ isShow, layout, form, editable, field, config, id, readOnly }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const nationality = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      readOnly
        ? modelnamepsace.entities?.clientMap[id].nationalityInfo.nationality
        : modelnamepsace.modalData.entities.clientMap[id].nationalityInfo.nationality,
    shallowEqual
  );
  const dicts = useGetSecondaryidentitytypeDicts({
    config,
    fieldConfig,
    nationality: formUtils.queryValue(nationality),
  });

  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const requiredConditions = useRequiredByNationality({
    nationality: formUtils.queryValue(nationality),
  });
  const visibleConditions = requiredConditions;

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
        />
      </Col>
    )
  );
};

const Secondaryidentitytype = ({ form, editable, layout, isShow, config, readOnly, id }: any) => {
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
        id={id}
      />
    </Authority>
  );
};

Secondaryidentitytype.displayName = 'SecondaryIdentityType';

export default Secondaryidentitytype;
