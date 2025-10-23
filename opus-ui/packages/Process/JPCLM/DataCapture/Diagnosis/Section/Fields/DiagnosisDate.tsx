import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemDatePicker, Required, Rule } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { useSelector } from 'dva';
import { useGetInputLimitDate } from 'process/HKCLM/_hooks';
const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'diagnosis',
  field: 'diagnosisDate',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'diagnosisDate',
    },
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        {
          left: { domain: 'field', field: 'specificInfectiousDisease' },
          operator: '===',
          right: '1',
        },
        {
          left: { domain: 'field', field: 'specificInfectiousDisease' },
          operator: '===',
          right: '2',
        },
      ],
    },
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
    'no-treatment-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 6,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const allowFreeSelect = useGetInputLimitDate();
  const fieldProps: any = localFieldConfig['field-props'];
  const diagnosisId = form.getFieldValue('id');
  const diagnosis = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.claimEntities.diagnosisListMap[diagnosisId]
  );
  const [warningCode, setWaringCode] = useState([]);

  const requiredConditions = Rule(fieldProps['required-condition'], form, 'JPCLMOfDataCapture');

  const diagnosisCode = form.getFieldValue('diagnosisCode');
  const diagnosisDate = form.getFieldValue('diagnosisDate');

  useEffect(() => {
    if (
      diagnosisCode &&
      diagnosis.specificWomenDisease &&
      (Number(diagnosis.specificWomenDisease) === 2 ||
        Number(diagnosis.specificWomenDisease) === 3) &&
      !diagnosisDate
    ) {
      const fields = formatMessageApi({ Label_BIZ_Claim: 'DiagnosisDate' });
      setWaringCode([
        {
          messageType: MessageType.Information,
          message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000712' }, fields),
        },
      ]);
    } else setWaringCode([]);
  }, [diagnosisCode, diagnosisDate, diagnosis.specificWomenDisease]);

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemDatePicker
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={
          config?.required === Required.Conditions
            ? requiredConditions
            : (config.required || fieldProps.required) === Required.Yes
        }
        warningMessage={warningCode}
        allowFreeSelect={allowFreeSelect}
      />
    </Col>
  );
};

const DiagnosisDate = ({ field, config, form, editable, layout, isShow }: any) => (
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

DiagnosisDate.displayName = 'DiagnosisDate';

export default DiagnosisDate;
