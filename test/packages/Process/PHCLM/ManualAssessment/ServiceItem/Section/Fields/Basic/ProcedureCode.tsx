import React from 'react';
import { NAMESPACE } from '../../../../activity.config';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './ProcedureCode.config';
import lodash from 'lodash';
import moment from 'moment';

export { localFieldConfig } from './ProcedureCode.config';

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  procedureId,
  treatmentId,
  isAdjustment,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = true;
  const requiredConditions = true;

  const originServiceItemId = form.getFieldValue('originServiceItemId');


  const procedureListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.procedureListMap
  );
  const serviceItemListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities?.serviceItemListMap
  );
  const searchAdjustSurgeryInfo =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchAdjustSurgeryInfo) ||
    {};

  const surgeryProcedureByRegion = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.surgeryProcedureByRegion
  );
  const getProductName = (item: any) => {
    const procedureCode = formUtils.queryValue(item.procedureCode);
    const operationDate =
      !!item.operationDate && !lodash.isEmpty(item.operationDate)
        ? moment(item.operationDate).format('MM/DD/YYYY')
        : '';

    const surgeryName =
      lodash
        .chain(surgeryProcedureByRegion)
        .find(({ surgeryCode }: any) => surgeryCode === procedureCode)
        .get('surgeryName')
        .value() || '';

    return `${formUtils.queryValue(item.procedureCode)}-${surgeryName}-${operationDate}`;
  };

  const disabledCodes =
    lodash
      .chain(formUtils.cleanValidateData(serviceItemListMap))
      .filter((item: any) => !!item.procedureCode && !lodash.isEmpty(item.procedureCode))
      .map((item: any) => item.procedureCode)
      .value() || [];

  const Options = !!isAdjustment
    ? lodash.map(searchAdjustSurgeryInfo[originServiceItemId] || [], (el: any) => ({
        dictCode: el.id,
        dictName: getProductName(el),
      }))
    : lodash
        .chain(procedureListMap)
        .filter((item: any) => item.treatmentId === treatmentId)
        .map((item: any) => ({ dictCode: item.id, dictName: getProductName(item) }))
        .value();
     

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={Options}
          existCodes={disabledCodes}
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
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType={config.label?.type || fieldProps.label.type}
        />
      </Col>
    )
  );
};

const ProcedureCode = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  procedureId,
  treatmentId,
  isAdjustment,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      procedureId={procedureId}
      treatmentId={treatmentId}
      isAdjustment={isAdjustment}
    />
  </Authority>
);

ProcedureCode.displayName = localFieldConfig.field;

export default ProcedureCode;
