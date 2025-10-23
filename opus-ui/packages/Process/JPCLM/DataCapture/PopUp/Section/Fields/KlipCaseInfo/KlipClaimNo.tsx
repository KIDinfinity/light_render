import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Col } from 'antd';
import {
  Authority,
  Visible,
  Editable,
  Required,
  Validator,
  Rule,
  FormItemAutoComplete,
} from 'basic/components/Form';

import { localFieldConfig } from './KlipClaimNo.config';

export { localFieldConfig } from './KlipClaimNo.config';

const FormItem = ({ isShow, layout, form, editable, field, config, incidentId, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];

  const claimNo = useSelector(({ processTask }: any) => processTask.getTask?.businessNo);
  const caseNo = useSelector(({ processTask }: any) => processTask.getTask?.caseNo);
  const klipCaseInfoList = useSelector(
    ({ JPCLMOfDataCapture }: any) =>
      JPCLMOfDataCapture?.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList
  );
  const isEditable = Rule(fieldProps['editable-condition'], form, 'JPCLMOfDataCapture');

  const Rules = {
    validateKlipClaimNo: Validator.validateKlipClaimNo(klipCaseInfoList, id, claimNo),
  };

  const KLIPClaimNoList = useSelector(({ JPCLMOfDataCapture }: any) =>
    lodash.map(JPCLMOfDataCapture?.KLIPClaimNoList, 'fieldValue')
  );
  const isRegisterMcs = useSelector(
    ({ JPCLMOfDataCapture }: any) => JPCLMOfDataCapture.isRegisterMcs
  );

  useEffect(() => {
    dispatch({
      type: 'JPCLMOfDataCapture/getKLIPClaimNo',
      payload: {
        caseNo,
      },
    });
  }, [caseNo]);

  const visibleConditions = true;
  const editableConditions = !(isEditable || isRegisterMcs);
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemAutoComplete
          form={form}
          disabled={
            !editable ||
            (config?.editable === Editable.Conditions
              ? !editableConditions
              : config?.editable === Editable.Yes)
          }
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          dataSource={KLIPClaimNoList}
          onSearch={() => KLIPClaimNoList}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          name={config?.name}
          rules={lodash.compact(
            (config?.rules || fieldProps['x-rules'])?.map((rule: string) => Rules[rule])
          )}
        />
      </Col>
    )
  );
};

const KlipClaimNo = ({ field, config, isShow, layout, form, editable }: any) => (
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

KlipClaimNo.displayName = 'KlipClaimNo';

export default KlipClaimNo;
