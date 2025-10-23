import React from 'react';
import { useDispatch } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  FormItemSelectPlus,
  Rule,
} from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

import { getPropsValue } from 'claim/pages/utils/fnObject';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';

import { localFieldConfig } from './DiagnosisName.config';

export { localFieldConfig } from './DiagnosisName.config';

const seachDropDown = new SearchDropDown();
const { handleDiagnosisName } = seachDropDown;

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();

  const onSelect = (value: any, typeCode: any, exProps: any = []) => {
    const diagnosisCode = getPropsValue(exProps, 'icdTenthCode');
    const diagnosisNo = getPropsValue(exProps, 'diagnosisNo');
    const icdTenthCode = getPropsValue(exProps, 'icdTenthCode');
    const relationshipCode = getPropsValue(exProps, 'reasonCode');
    const diagnosisKey = getPropsValue(exProps, 'standandDiagnosisCode');
    const specificWomenDisease = getPropsValue(exProps, 'specificWomenDisease');
    const specificInfectiousDisease = getPropsValue(exProps, 'specificInfectiousDisease');
    const specificThreeMajorDisease = getPropsValue(exProps, 'specificThreeMajorDisease');
    const wop2Flag = getPropsValue(exProps, 'wop2Flag');
    const adultDiseases = getPropsValue(exProps, 'adultDiseases');

    dispatch({
      type: `${NAMESPACE}/claimEstimateIncidentUpdate`,
      payload: {
        changedFields: {
          diagnosisCode,
          diagnosisNo,
          icdTenthCode,
          relationshipCode,
          diagnosisKey,
          specificWomenDisease,
          specificInfectiousDisease,
          specificThreeMajorDisease,
          wop2Flag,
          adultDiseases,
        },
      },
    });
  };

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || localFieldConfig.field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config?.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          searchCustom={(postData: any) => handleDiagnosisName(postData)}
          onSelectCallback={onSelect}
          optionShowType="code"
          selectCallbackExProp={[
            'icdTenthCode',
            'diagnosisNo',
            'reasonCode',
            'standandDiagnosisCode',
            'specificWomenDisease',
            'specificInfectiousDisease',
            'specificThreeMajorDisease',
            'wop2Flag',
            'adultDiseases',
          ]}
        />
      </Col>
    )
  );
};

const DiagnosisName = ({ field, config, isShow, layout, form, editable }: any) => (
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

DiagnosisName.displayName = localFieldConfig.field;

export default DiagnosisName;
