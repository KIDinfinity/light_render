import React, { useMemo, useContext } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemRadioGroup,
  Required,
  Visible,
  RuleByForm,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useGetDividendICPPaymentOptionList from 'opus/Pages/Process/NewBusiness/DataEntry/_hooks/useGetDividendICPPaymentOptionList';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';

import Context from 'opus/Pages/Process/NewBusiness/DataEntry/_context/Context';
import { useVisibleLinkFn } from 'opus/Pages/Process/NewBusiness/DataEntry/_context/VisibleContainer';

const FormItem = ({ isShow, layout, form, editable, field, config, section }: any) => {
  const fieldProps: any = config;
  const currentInsuredNationality = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.insuredInfo?.nationality,
    shallowEqual
  );
  const currentPayorNationality = useSelector(
    ({ [NAMESPACE]: namespace }) => namespace?.processData?.payorInfo?.nationality,
    shallowEqual
  );
  const dicts = getDrowDownList(config['x-dict']?.dictTypeCode);
  const visibleLinkTriggerConfig =
    useContext(Context)?.visibleLinkTriggerConfig?.[`${section}_${field}`];

  const visibleConditions = RuleByForm(
    config['visible-condition'] || fieldProps['visible-condition'],
    form
  );
  const editableConditions = !RuleByForm(
    config['editable-condition'] || fieldProps['editable-condition'],
    form
  );
  const requiredConditions = RuleByForm(
    config['required-condition'] || fieldProps['required-condition'],
    form
  );
  const onChange = useVisibleLinkFn(visibleLinkTriggerConfig, field);

  const disableList = useGetDividendICPPaymentOptionList();
  return useMemo(
    () =>
      isShow &&
      ((config?.visible || fieldProps.visible) === Visible.Conditions
        ? visibleConditions
        : (config?.visible || fieldProps.visible) === Visible.Yes) && (
        <Col {...layout}>
          <FormItemRadioGroup
            dicts={dicts}
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
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
            disableList={disableList}
            onChange={onChange}
          />
        </Col>
      ),
    [currentInsuredNationality, currentPayorNationality]
  );
};
const field = 'dividendIcpPaymentOption';

const DividendICPPaymentOption = ({ config, form, editable, layout, isShow, section }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      section={section}
    />
  </Authority>
);

DividendICPPaymentOption.displayName = field;

export default DividendICPPaymentOption;
