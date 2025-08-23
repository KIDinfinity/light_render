import React from 'react';
import useGetRequiredByRole from 'process/NB/ManualUnderwriting/_hooks/useGetRequiredByRole';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import { Col } from 'antd';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import lodash from 'lodash';
import { Authority, FormItemSelect, Visible, formUtils, Editable } from 'basic/components/Form';
import { fieldConfig } from './Kyc.config';
import useJudgeNewClientDisabled from 'process/NB/ManualUnderwriting/_hooks/useJudgeNewClientDisabled';

export { fieldConfig } from './Kyc.config';

const FormItem = ({ isShow, layout, form, field, config, id, editable }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const visibleConditions = true;
  const clientInfoList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.businessData?.policyList[0]?.clientInfoList,
    shallowEqual
  );

  const kyc = lodash.find(clientInfoList, (item: any) => item?.id === id)?.kyc;
  const editableConditions = formUtils.queryValue(kyc) !== 'EXACT';

  const disabled = useJudgeNewClientDisabled({
    config,
    localConfig: {},
    editableConditions,
  });
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
  });
  const filterDicts = lodash.filter(dicts, (item: any) => {
    return item.dictCode !== (formUtils.queryValue(kyc) === 'PARTIAL' ? 'UNIDENTIFIED' : '');
  });
  return (
    isShow &&
    ((config?.['field-props']?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.['field-props']?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={filterDicts}
          disabled={
            !editable ||
            ((config?.['field-props']?.editable || fieldProps.editable) === Editable.Conditions
              ? disabled
              : (config?.['field-props']?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.['field-props']?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={
            config?.['field-props']?.label?.dictTypeCode || fieldProps.label.dictTypeCode
          }
          required={requiredByRole}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const Kyc = ({ form, editable, layout, isShow, id, config }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
      />
    </Authority>
  );
};

Kyc.displayName = 'kyc';

export default Kyc;
