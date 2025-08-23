import React, { useState, useEffect } from 'react';
import { useDispatch } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelectPlus, Required, Rule } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { getPropsValue } from 'claim/pages/utils/fnObject';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'diagnosis',
  field: 'diagnosisName',
  'field-props': {
    editable: 'C',
    'editable-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'activity',
            field: 'isRegisterMcs',
          },
          operator: '===',
          right: true,
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.diagnosis-code-name',
    },
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
    'no-treatment-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };

const seachDropDown = new SearchDropDown();
const { handleDiagnosisName } = seachDropDown;

const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  diagnosisId,
  incidentId,
  isAdd,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const [warnDiagnosisCode, setWarnDiagnosisCode]: any = useState([]);

  const dispatch = useDispatch();

  const isRegisterMcs = Rule(fieldProps['editable-condition'], form, 'JPCLMOfDataCapture');

  const onSelect = (value: any, typeCode: any, exProps: any = []) => {
    const diagnosisCode = getPropsValue(exProps, 'icdTenthCode');
    const diagnosisNo = getPropsValue(exProps, 'diagnosisNo');
    const relationshipCode = getPropsValue(exProps, 'reasonCode');
    const diagnosisKey = getPropsValue(exProps, 'standandDiagnosisCode');
    const specificWomenDisease = getPropsValue(exProps, 'specificWomenDisease');
    const specificInfectiousDisease = getPropsValue(exProps, 'specificInfectiousDisease');
    const specificThreeMajorDisease = getPropsValue(exProps, 'specificThreeMajorDisease');
    const wop2Flag = getPropsValue(exProps, 'wop2Flag');

    const extra: any = {};

    if (!!value) {
      extra.diagnosisName = value;
    }
    dispatch({
      type: 'JPCLMOfDataCapture/diagnosisUpdate',
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
          ...extra,
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

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelectPlus
        disabled={
          !editable ||
          ((config?.editable || fieldProps.editable) === Editable.Conditions
            ? isRegisterMcs
            : (config?.editable || fieldProps.editable) === Editable.No)
        }
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        onSelectCallback={onSelect}
        warningMessage={warnDiagnosisCode}
        optionShowType="name"
        required={(config.required || fieldProps.required) === Required.Yes}
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
        ]}
      />
    </Col>
  );
};

const DiagnosisName = ({
  field,
  config,
  form,
  editable,
  incidentId,
  diagnosisId,
  layout,
  isShow,
  isAdd,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      diagnosisId={diagnosisId}
      incidentId={incidentId}
      isAdd={isAdd}
    />
  </Authority>
);

DiagnosisName.displayName = 'DiagnosisName';

export default DiagnosisName;
