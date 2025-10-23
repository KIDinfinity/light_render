import React from 'react';
import { Col, Icon } from 'antd';
import { useDispatch } from 'dva';
import { Authority, Visible, Editable, Required, FormItemSelectPlus } from 'basic/components/Form';
import { getPropsValue } from 'claim/pages/utils/fnObject';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import { ReactComponent as IconSearch } from 'packages/BPM/src/assets/search.svg';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';
import styles from 'packages/Opus/Pages/Process/Claim/ManualAssessment/Modules/Therapies/index.less';
import lodash from 'lodash';

const seachDropDown = new SearchDropDown();
const { handleProcedureName } = seachDropDown;

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT003',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT003',
  section: 'Procedure',
  field: 'procedureName',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'app.navigator.task-detail-of-data-capture.label.procedure-name',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({
  isShow,
  layout,
  form,
  editable,
  field,
  config,
  treatmentId,
  procedureId,
}: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();
  const onSelect = async (value: any, typeCode: any, exProps: any) => {
    await dispatch({
      type: `${NAMESPACE}/procedureModalUpdate`,
      payload: {
        searchContent: form.getFieldValue('procedureName'),
      },
    });
    await dispatch({
      type: 'opusClaimAssessment/saveProcedureItem',
      payload: {
        changedFields: {
          procedureCode: getPropsValue(exProps, 'procedureCode'),
          kjCode: `${getPropsValue(exProps, 'kjCode') || ''}${
            getPropsValue(exProps, 'branchNo') || ''
          }${getPropsValue(exProps, 'itemNo') || ''}`,
          womenSurgeryFlg: getPropsValue(exProps, 'womenSurgeryFlg'),
          nnmWomenSurgeryFlg: getPropsValue(exProps, 'nnmWomenSurgeryFlg'),
          highReimbPct: getPropsValue(exProps, 'highReimbPct'),
          transplantationSurgeryFlg: getPropsValue(exProps, 'transplantationSurgeryFlg'),
          bornMarrowFlg: getPropsValue(exProps, 'bornMarrowFlg'),
          newApprovalFlag: getPropsValue(exProps, 'newApprovalFlag'),
          presentApprovalFlag: getPropsValue(exProps, 'presentApprovalFlag'),
        },
        treatmentId,
        procedureId,
      },
    });
  };
  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelectPlus
          searchIcon={
            <Icon
              component={IconSearch}
              className={styles.search}
              onClick={async () => {
                if (lodash.isEmpty(form.getFieldValue('procedureName'))) {
                  dispatch({
                    type: `${NAMESPACE}/procedureModalShow`,
                    payload: {
                      show: true,
                      treatmentId: treatmentId,
                      procedureId: procedureId,
                    },
                  });
                } else {
                  await dispatch({
                    type: `${NAMESPACE}/getprocedureList`,
                    payload: {
                      searchContent: form.getFieldValue('procedureName'),
                    },
                  });
                  await dispatch({
                    type: `${NAMESPACE}/procedureModalUpdate`,
                    payload: {
                      searchContent: form.getFieldValue('procedureName'),
                    },
                  });
                  await dispatch({
                    type: `${NAMESPACE}/procedureModalShow`,
                    payload: {
                      show: true,
                      treatmentId: treatmentId,
                      procedureId: procedureId,
                    },
                  });
                }
              }}
            />
          }
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
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          searchCustom={(postData: any) =>
            handleProcedureName(postData, { groupBy: 'approvalProcedureName' })
          }
          onSelectCallback={onSelect}
          optionShowType="code"
          selectCallbackExProp={[
            'procedureCode',
            'kjCode',
            'branchNo',
            'highReimbPct',
            'itemNo',
            'bornMarrowFlg',
            'transplantationSurgeryFlg',
            'womenSurgeryFlg',
            'nnmWomenSurgeryFlg',
            'newApprovalFlag',
            'presentApprovalFlag',
          ]}
        />
      </Col>
    )
  );
};

const ProcedureName = ({
  field,
  config,
  isShow,
  layout,
  form,
  editable,
  treatmentId,
  procedureId,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      treatmentId={treatmentId}
      procedureId={procedureId}
    />
  </Authority>
);

ProcedureName.displayName = 'ProcedureName';

export default ProcedureName;
