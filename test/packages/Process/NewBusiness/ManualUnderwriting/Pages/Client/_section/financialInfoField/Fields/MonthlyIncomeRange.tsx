import React from 'react';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Col } from 'antd';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';

import {
  Authority,
  Editable,
  FormItemSelect,
  Visible,
  Rule,
  Required,
} from 'basic/components/Form';

import { fieldConfig } from './MonthlyIncomeRange.config';
import useJudgeIsGBSN from 'basic/components/CaseContainer/hooks/useJudgeIsGBSN';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export { fieldConfig } from './MonthlyIncomeRange.config';

const useGetinsuredRoleByClientId = (id: string) => {
  const coverageList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.coverageList,
    shallowEqual
  );
  const coverageInsuredList = lodash.find(coverageList, { isMain: 'Y' })?.coverageInsuredList;
  const mainCoverageClientIdList = lodash.map(coverageInsuredList, (item) => item?.clientId);
  return lodash.includes(mainCoverageClientIdList, id) ? 'PI' : 'SI';
};

const FormItem = ({ isShow, layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });
  const insuredRole = useGetinsuredRoleByClientId(id);
  const isGBSN = useJudgeIsGBSN();
  const visibleConditions = isGBSN && insuredRole === 'PI';
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = false;
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config?.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config?.required || fieldProps.required) === Required.Yes
          }
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const MonthlyIncomeRange = ({ form, editable, layout, isShow, config, id }: any) => (
  <Authority>
    <FormItem
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      config={config}
      field={fieldConfig?.field}
      id={id}
    />
  </Authority>
);

MonthlyIncomeRange.displayName = 'monthlyIncomeRange';

export default MonthlyIncomeRange;
