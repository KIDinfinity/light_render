import React from 'react';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
} from 'basic/components/Form';
import { useSelector } from 'dva';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { isExistPrimary } from '../../../../_models/functions';
import { DiagnosisType as EnumDiagnosticType } from 'basic/enum';
import { localFieldConfig } from './DiagnosisCodeAdd.config';

export { localFieldConfig } from './DiagnosisCodeAdd.config';

const FormItem = ({ isShow, layout, form, editable, field, config, incidentId, onChange }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const diagnosisListMap = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.diagnosisListMap
  );
  const existCodes = isExistPrimary({ diagnosisListMap, incidentId })
    ? [EnumDiagnosticType.Primary]
    : [];
  const dicts = getDrowDownList(
    config['x-dict']?.dictTypeCode || localFieldConfig?.['field-props']?.['x-dict']?.dictTypeCode
  );

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        dicts={dicts}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={(config.required || fieldProps.required) === Required.Yes}
        labelType={config.label?.type || fieldProps.label.type}
        existCodes={existCodes}
        onChange={onChange}
      />
    </Col>
  );
};

const DiagnosisTypeAdd = ({
  field,
  config,
  form,
  editable,
  section,
  layout,
  isShow,
  incidentId,
  onChange,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      incidentId={incidentId}
      onChange={onChange}
    />
  </Authority>
);

DiagnosisTypeAdd.displayName = localFieldConfig.field;

export default DiagnosisTypeAdd;
