import React from 'react';
import lodash from 'lodash';
import { useDispatch } from 'dva';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import { Col } from 'antd';
import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';

import { localFieldConfig } from './ProcedureName.config';
import { getApprovalProcedureKjCodeForPage } from '@/services/claimJpPlanStandardControllerService';

export { localFieldConfig } from './ProcedureName.config';

const seachDropDown = new SearchDropDown();
const { handleProcedureName } = seachDropDown;

const FormItem = ({ isShow, layout, form, editable, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();

  const getList = async (searchContent: any) => {
    const list: any = await dispatch({
      type: `${NAMESPACE}/getApprovalProcedure`,
      payload: {
        searchContent,
      },
    });

    if (!lodash.isEmpty(list)) {
      if (lodash.size(list) === 1) {
        dispatch({
          type: `${NAMESPACE}/claimEstimateSurgicalUpdate`,
          payload: {
            item: list?.[0],
            id: form.getFieldValue('id'),
          },
        });
      } else {
        dispatch({
          type: `${NAMESPACE}/claimEstimateSurgicalModaUpdate`,
          payload: {
            show: true,
            surgicalId: form.getFieldValue('id'),
          },
        });

        dispatch({
          type: `${NAMESPACE}/claimEstimateSurgicalModaUpdate`,
          payload: {
            show: true,
            surgicalId: form.getFieldValue('id'),
            list: lodash.map(list, (item: any) => ({
              ...item,
              kjCode: `${list?.[0].kjCode || ''}${list?.[0].branchNo || ''}${list?.[0].kjCode || ''}`,
            })),
          },
        });
      }
    }
  };

  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          form={form}
          formName={config.name || localFieldConfig?.field}
          labelId=""
          dictCode=""
          selectCallbackItem
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          onSelectCallback={({ item }: any) => {
            if (!lodash.isEmpty(item)) {
              getList(item?.approvalProcedureName);
            }
          }}
          optionShowType="code"
          searchCustom={(postData: any) =>
            handleProcedureName(postData, { filterName: 'approvalProcedureName' })
          }
        />
      </Col>
    )
  );
};

const ProcedureName = ({ config, form, editable, layout, isShow }: any) => (
  <Authority>
    <FormItem config={config} isShow={isShow} layout={layout} form={form} editable={editable} />
  </Authority>
);

ProcedureName.displayName = localFieldConfig.field;

export default ProcedureName;
