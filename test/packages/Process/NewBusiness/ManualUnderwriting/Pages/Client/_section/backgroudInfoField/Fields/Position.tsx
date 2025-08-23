import React,{useMemo} from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';

import { tenant, Region } from '@/components/Tenant';
import {
  Authority,
  Editable,
  FormItemSelect,
  FormItemInput,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import useLinkDataWithIndustry from '../../../_hooks/useLinkDataWithIndustry';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';

import { fieldConfig } from './Position.config';
export { fieldConfig } from './Position.config';

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const isRegionKH = tenant.region() === Region.KH;
  const fieldProps: any = fieldConfig['field-props'];
  const natureOfBusiness = useSelector(
    ({ [NAMESPACE]: model }: any) => model.modalData?.entities?.clientMap?.[id]?.backgroundInfo?.natureOfBusiness
  );
  const notMatchDict = getDrowDownList({ config, fieldProps });
  const PositionHeldDicts = useSelector(
    ({ [NAMESPACE]: model }: any) => model?.occupationFullList?.Dropdown_IND_PositionHeld
  );
  const dicts = useMemo(()=>{
    return tenant.region({
      [Region.VN]:PositionHeldDicts,
      notMatch: notMatchDict
    })
  },[PositionHeldDicts,notMatchDict])

  const linkEditable = useLinkDataWithIndustry({
    id,
    monitorValue: natureOfBusiness,
    currentField: field,
    defaultValue: 'NONIE',
  });
  const visibleConditions = true;
  const editableConditions = !RuleByForm(config?.['editable-condition'], form) || linkEditable;
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id
    });

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        {isRegionKH ? (
          <FormItemInput
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={
              config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
            }
            required={requiredByRole}
            hiddenPrefix
            precision={0}
          />
        ) : (
          <FormItemSelect
            dicts={dicts}
            disabled={
              (!editable ||
                ((config?.editable || fieldProps.editable) === Editable.Conditions
                  ? editableConditions
                  : (config?.editable || fieldProps.editable) === Editable.No))
            }
            form={form}
            formName={config.name || field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={
              config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
            }
            required={requiredByRole}
            hiddenPrefix
            precision={0}
          />
        )}
      </Col>
    )
  );
};

const Position = ({ form, editable, layout, isShow, id, config }: any) => {
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

Position.displayName = 'position';

export default Position;
