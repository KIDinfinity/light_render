import React from 'react';
import { NAMESPACE } from '../../../../activity.config';
import { Col } from 'antd';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import CaseCategory from 'enum/CaseCategory';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Visible,
  Rule,
  formUtils,
} from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { localFieldConfig } from './ExpressClaim.config';

export { localFieldConfig } from './ExpressClaim.config';

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const { caseCategory } = useSelector(({ processTask }: any) => processTask?.getTask);
  const visibleConditions = caseCategory === CaseCategory.BP_CLM_CTG008;
  const editableConditions = Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    ''
  );
  const requiredConditions = true;
  const dispatch = useDispatch();
  const dicts = getDrowDownList({ config, fieldProps });
  const beneficiaryList = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.paymentModal?.datas?.policyBenefitList?.[0]?.beneficiaryList
  );
  const advancedPayoutAmountEditFlag = lodash.some(
    beneficiaryList,
    (item) => Number(formUtils.queryValue(item?.advancedPayoutAmount)) > 0
  );
  const handleExpressClaimChange = (e) => {
    if (String(e) === '0' && advancedPayoutAmountEditFlag) {
      handleWarnMessageModal([{ content: formatMessageApi({ Label_COM_Message: 'MSG_001195' }) }], {
        okFn: () => {
          dispatch({
            type: `${NAMESPACE}/paymentPayeeAllocationUpdateAdvancePayoutAmount`,
          });
        },
      });
    }
  };
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
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onChange={(e) => handleExpressClaimChange(e)}
        />
      </Col>
    )
  );
};

const CauseOfIncident = ({ field, config, isShow, layout, form, editable }: any) => (
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

CauseOfIncident.displayName = localFieldConfig.field;

export default CauseOfIncident;
