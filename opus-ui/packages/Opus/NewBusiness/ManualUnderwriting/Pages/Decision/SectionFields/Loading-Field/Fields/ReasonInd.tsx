import React, { useEffect, useRef } from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  RuleByForm,
  Visible,
} from 'basic/components/Form';
import { fieldConfig } from './LoadingFlatMortality.config';

export { fieldConfig } from './LoadingFlatMortality.config';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import useJudgeIsCopyLoading from 'decision/components/Benefit/components/CoverageList/components/CoverageItem/components/Expander/components/Loading/_hooks/useJudgeIsCopyLoading';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import useGetCompanyCode from 'opus/NewBusiness/ManualUnderwriting/_hooks/useGetCompanyCode';
import lodash from 'lodash';

const FormItem = ({ isShow, layout, form, editable, field, config, coverageId, id }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = fieldConfig['field-props'];
  const dicts: any = getDrowDownList({ config });
  const formValue = form.getFieldValue('reasonInd');
  const hasChanged = useRef(false);

  const visibleConditions = RuleByForm(config?.['visible-condition'], form);
  const editableConditions = !RuleByForm(config?.['editable-condition'], form);
  const companyCode = useGetCompanyCode();

  const required = RuleByForm(config?.['required-condition'], form);

  const formName = config.name || field;

  const isCopyLoading = useJudgeIsCopyLoading({ loadingId: id, coverageId });

  useEffect(() => {
    if (lodash.isEmpty(formValue) && companyCode === '3' && !hasChanged.current) {
      dispatch({
        type: `${NAMESPACE}/saveLoading`,
        payload: {
          changedFields: { reasonInd: '3' },
          coverageId,
          id,
        },
      });
    }
  }, [companyCode, formValue, hasChanged.current]);

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No) ||
            isCopyLoading
          }
          dicts={dicts}
          form={form}
          formName={formName}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config?.required || fieldProps.required) === Required.Conditions
              ? required
              : (config?.required || fieldProps.required) === Required.Yes
          }
          labelType="inline"
          hiddenPrefix
          precision={0}
          placeholder=" "
          getPopupContainer={() => document.getElementById('coverageListArea') || document.body}
          onChange={() => {
            hasChanged.current = true;
          }}
        />
      </Col>
    )
  );
};

const ReasonInd = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  feAllowIndicator,
  coverageId,
  id,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      feAllowIndicator={feAllowIndicator}
      coverageId={coverageId}
      id={id}
    />
  </Authority>
);

ReasonInd.displayName = 'reasonInd';

export default ReasonInd;
