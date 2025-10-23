import React, { useState, useEffect } from 'react';
import { useDispatch } from 'dva';
import { Col } from 'antd';
import {
  Authority,
  ElementConfig,
  Visible,
  Editable,
  Required,
  FormItemSelectPlus,
  Rule,
} from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { getPropsValue } from 'claim/pages/utils/fnObject';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import { localConfig } from '../../index';

const seachDropDown = new SearchDropDown();
const { handleDiagnosisName } = seachDropDown;

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Incident.Payable.AdjBasic',
  field: 'diagnosisName',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'N',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.diagnosis-code-name',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
    'no-treatment-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 14,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  incidentId,
  diagnosisId,
}: // isAdd,
any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();

  const [warnDiagnosisCode, setWarnDiagnosisCode]: any = useState([]);
  const onSelect = (value: any, typeCode: any, exProps: any = []) => {
    const diagnosisCode = getPropsValue(exProps, 'icdTenthCode');
    const diagnosisNo = getPropsValue(exProps, 'diagnosisNo');
    const relationshipCode = getPropsValue(exProps, 'reasonCode');
    const diagnosisKey = getPropsValue(exProps, 'standandDiagnosisCode');
    const specificWomenDisease = getPropsValue(exProps, 'specificWomenDisease');
    const specificInfectiousDisease = getPropsValue(exProps, 'specificInfectiousDisease');
    const specificThreeMajorDisease = getPropsValue(exProps, 'specificThreeMajorDisease');
    const wop2Flg = getPropsValue(exProps, 'wop2Flg');

    dispatch({
      type: 'JPCLMOfClaimAssessment/saveDiagnosisItem',
      payload: {
        changedFields: {
          diagnosisCode,
          diagnosisNo,
          relationshipCode,
          diagnosisKey,
          specificWomenDisease,
          specificInfectiousDisease,
          specificThreeMajorDisease,
          wop2Flg,
        },
        incidentId,
        diagnosisId,
      },
    });
  };

  const specificInfectiousDiseaseValue = form.getFieldValue('specificInfectiousDisease');
  useEffect(() => {
    if (specificInfectiousDiseaseValue === '1' || specificInfectiousDiseaseValue === '2') {
      setWarnDiagnosisCode([
        {
          messageType: MessageType.Information,
          message: formatMessageApi({ Label_COM_WarningMessage: 'WRN_000042' }),
        },
      ]);
    } else {
      setWarnDiagnosisCode([]);
    }
  }, [specificInfectiousDiseaseValue]);

  const visibleConditions = true;
  const editableConditions = !Rule(
    fieldProps['editable-condition'],
    form,
    'JPCLMOfClaimAssessment'
  );
  const requiredConditions = true;

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
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          searchCustom={(postData: any) => handleDiagnosisName(postData)}
          onSelectCallback={onSelect}
          warningMessage={warnDiagnosisCode}
          optionShowType="code"
          selectCallbackExProp={[
            'icdTenthCode',
            'diagnosisNo',
            'reasonCode',
            'standandDiagnosisCode',
            'specificWomenDisease',
            'specificInfectiousDisease',
            'specificThreeMajorDisease',
            'wop2Flg',
          ]}
        />
      </Col>
    )
  );
};

const DiagnosisName = ({
  isShow,
  layout,
  form,
  editable,
  section,
  incidentId,
  diagnosisId,
}: any) => (
  <Authority>
    <ElementConfig.Field config={localConfig} section={section} field="diagnosisName">
      <FormItem
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        incidentId={incidentId}
        diagnosisId={diagnosisId}
      />
    </ElementConfig.Field>
  </Authority>
);

DiagnosisName.displayName = 'DiagnosisName';

export default DiagnosisName;
