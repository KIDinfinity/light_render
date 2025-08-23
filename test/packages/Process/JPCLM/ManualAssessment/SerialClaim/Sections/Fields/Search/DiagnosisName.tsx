import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
} from 'basic/components/Form';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';

import { localFieldConfig } from './DiagnosisName.config';

export { localFieldConfig } from './DiagnosisName.config';

const seachDropDown = new SearchDropDown();
const { handleDiagnosisName } = seachDropDown;

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelectPlus
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        optionShowType="name"
        required={(config.required || fieldProps.required) === Required.Yes}
        searchCustom={(postData: any) => handleDiagnosisName(postData)}
        selectCallbackExProp={[
          'icdTenthCode',
          'diagnosisNo',
          'reasonCode',
          'standandDiagnosisCode',
          'specificThreeMajorDisease',
        ]}
      />
    </Col>
  );
};

const DiagnosisName = ({ field, config,
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
      field={field} config={config} isShow={isShow}
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
