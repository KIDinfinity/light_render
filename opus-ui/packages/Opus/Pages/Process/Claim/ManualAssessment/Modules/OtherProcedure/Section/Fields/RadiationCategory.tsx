import React from 'react';
import { useDispatch } from 'dva';
import { Col, Icon } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelectPlus,
  Visible,
  Required,
  Rule,
} from 'basic/components/Form';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'packages/Opus/Pages/Process/Claim/ManualAssessment/activity.config.ts';
import { ReactComponent as IconSearch } from 'packages/BPM/src/assets/search.svg';
import styles from 'packages/Opus/Pages/Process/Claim/ManualAssessment/Modules/OtherProcedure/item.less';

const seachDropDown = new SearchDropDown();
const { handleProcedureName } = seachDropDown;

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'otherProcedure',
  field: 'radiationCategory',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'RadiationCategory',
    },
    required: 'N',
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'procedureType',
          },
          operator: '===',
          right: 'S',
        },
        {
          left: {
            domain: 'field',
            field: 'procedureType',
          },
          operator: '===',
          right: 'RT',
        },
      ],
    },
    'x-dict': {
      dictTypeCode: 'Dropdown_CLM_RadiationCategory',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 576px
      sm: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 768px
      md: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 992px
      lg: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1200px
      xl: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
      // 1600px
      xxl: {
        span: 18,
        offset: 0,
        pull: 0,
        order: 4,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config, otherProcedureItem }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['require-condition'], form, '');
  const treatmentId = form.getFieldValue('treatmentId');
  const otherProcedureId = formUtils.queryValue(otherProcedureItem?.id);
  const dispatch = useDispatch();
  const onSelect = ({ item }: any) => {
    dispatch({
      type: 'opusClaimAssessment/saveOtherProcedureItem',
      payload: {
        changedFields: {
          ...lodash.pick(item, [
            'procedureCode',
            'womenSurgeryFlg',
            'nnmWomenSurgeryFlg',
            'highReimbPct',
            'transplantationSurgeryFlg',
            'bornMarrowFlg',
            'cancerRadiationAppFlg',
          ]),
          kjCode: `${item.kjCode}${item.branchNo}${item.itemNo}`,
        },
        otherProcedureId,
        treatmentId,
      },
    });
  };
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
                if (lodash.isEmpty(form.getFieldValue('radiationCategory'))) {
                  dispatch({
                    type: `${NAMESPACE}/otherProcedureModalShow`,
                    payload: {
                      show: true,
                      treatmentId: treatmentId,
                      otherProcedureId: otherProcedureId,
                    },
                  });
                } else {
                  await dispatch({
                    type: `${NAMESPACE}/getotherProcedureList`,
                    payload: {
                      searchContent: form.getFieldValue('radiationCategory'),
                    },
                  });
                  await dispatch({
                    type: `${NAMESPACE}/otherProcedureModalUpdate`,
                    payload: {
                      searchContent: form.getFieldValue('radiationCategory'),
                    },
                  });
                  await dispatch({
                    type: `${NAMESPACE}/otherProcedureModalShow`,
                    payload: {
                      show: true,
                      treatmentId: treatmentId,
                      otherProcedureId: otherProcedureId,
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
            handleProcedureName(lodash.set(postData, 'params.searchKJCode', 'M%'))
          }
          onSelectCallback={onSelect}
          optionShowType="code"
          selectCallbackItem
        />
      </Col>
    )
  );
};

const RadiationCategory = ({
  field,
  config,
  form,
  editable,
  layout,
  isShow,
  otherProcedureItem,
}: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      otherProcedureItem={otherProcedureItem}
    />
  </Authority>
);

RadiationCategory.displayName = 'RadiationCategory';

export default RadiationCategory;
