import React from 'react';
import { Col } from 'antd';
import { Authority, Visible, Editable, Required, FormItemSelectPlus } from 'basic/components/Form';
import { getPropsValue } from 'claim/pages/utils/fnObject';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

import { SearchDropDown } from 'claim/pages/utils/searchDropDown';

import { localFieldConfig } from './DiagnosisName.config';

export { localFieldConfig } from './DiagnosisName.config';

const seachDropDown = new SearchDropDown();
const { handleDiagnosisName } = seachDropDown;

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const onSelect = (value: any, typeCode: any, exProps: any = []) => {
    const diagnosisCode = getPropsValue(exProps, 'icdTenthCode');
    const diagnosisNo = getPropsValue(exProps, 'diagnosisNo');
    const relationshipCode = getPropsValue(exProps, 'reasonCode');
    const diagnosisKey = getPropsValue(exProps, 'standandDiagnosisCode');
    const specificWomenDisease = getPropsValue(exProps, 'specificWomenDisease');
    const specificInfectiousDisease = getPropsValue(exProps, 'specificInfectiousDisease');
    const specificThreeMajorDisease = getPropsValue(exProps, 'specificThreeMajorDisease');
    const wop2Flag = getPropsValue(exProps, 'wop2Flag');
    const nnmSpecificInjuryFlag = getPropsValue(exProps, 'nnmSpecificInjuryFlag');
    const adultDiseases = getPropsValue(exProps, 'adultDiseases');

    dispatch({
      type: `${NAMESPACE}/saveFormData`,
      target: 'saveClaimDecision',
      payload: {
        changedFields: {
          diagnosisCode,
          diagnosisNo,
          relationshipCode,
          diagnosisKey,
          specificWomenDisease,
          specificInfectiousDisease,
          specificThreeMajorDisease,
          wop2Flag,
          nnmSpecificInjuryFlag,
          diagnosisName: !!value ? value : '',
          adultDiseases,
        },
      },
    });
  };

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
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          onSelectCallback={onSelect}
          optionShowType="name"
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          searchCustom={(postData: any) => handleDiagnosisName(postData)}
          selectCallbackExProp={[
            'icdTenthCode',
            'diagnosisNo',
            'reasonCode',
            'standandDiagnosisCode',
            'specificWomenDisease',
            'specificInfectiousDisease',
            'specificThreeMajorDisease',
            'wop2Flag',
            'nnmSpecificInjuryFlag',
            'adultDiseases',
          ]}
        />
      </Col>
    )
  );
};

const DiagnosisName = ({ field, config, isShow, layout, form, editable, targets }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      targets={targets}
    />
  </Authority>
);

DiagnosisName.displayName = localFieldConfig.field;

export default DiagnosisName;
