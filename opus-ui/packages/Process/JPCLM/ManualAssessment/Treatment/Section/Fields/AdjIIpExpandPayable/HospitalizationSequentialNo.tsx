import React, { useMemo } from 'react';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { Col } from 'antd';
import { Authority, Editable, FormItemNumber, Required } from 'basic/components/Form';
import { formatHospitalizatioNo } from 'process/JPCLM/ManualAssessment/_models/functions';
import { NAMESPACE } from '../../../../activity.config';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Treatment.AdjIIpExpandPayable',
  field: 'hospitalizationSequentialNo',
  'field-props': {
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'HospitalizationSequenceNO',
    },
    editable: 'Y',
    required: 'C',
    'required-condition': {
      combine: '||',
      conditions: [
        { left: { domain: 'field', field: 'hospitalizationFlg' }, operator: '===', right: '9' },
      ],
    },
    visible: 'Y',
    max: 99999,
    'x-layout': {
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
    'no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 12,
      },
    },
  },
};
export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const { treatmentConfinementList } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.originClaimProcessData?.claimProcessData?.claimRelation
    ) || [];

  const relaClaimNoList = useMemo(() => {
    return (
      lodash
        .chain(treatmentConfinementList)
        .filter(
          (el: any) => el.payableId === form.getFieldValue('id') && el.relaClaimNo !== el.claimNo
        )
        .value() || []
    );
  }, [treatmentConfinementList]);

  const editableConditions = true;
  const requiredConditions = !lodash.isEmpty(relaClaimNoList);

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemNumber
        disabled={
          !editable ||
          ((config?.editable || fieldProps.editable) === Editable.Conditions
            ? !editableConditions
            : (config?.editable || fieldProps.editable) === Editable.No)
        }
        form={form}
        formName={field || localFieldConfig.field}
        labelId={config?.label?.dictCode || fieldProps.label.dictCode}
        name={config?.name}
        max={config?.max}
        labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        required={
          config?.required === Required.Conditions
            ? requiredConditions
            : (config.required || fieldProps.required) === Required.Yes
        }
        formatter={(value: any) => {
          return formatHospitalizatioNo({
            no: form.getFieldValue('hospitalizationSequentialNo'),
            isFormatter: true,
            value,
          });
        }}
        parser={(value: any) => {
          return formatHospitalizatioNo({
            no: form.getFieldValue('hospitalizationSequentialNo'),
            value,
          });
        }}
        precision={0}
      />
    </Col>
  );
};

const HospitalizationSequentialNo = ({ field, config, form, editable, layout, isShow }: any) => (
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

HospitalizationSequentialNo.displayName = 'HospitalizationSequentialNo';

export default HospitalizationSequentialNo;
