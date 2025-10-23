import React from 'react';
import { Col, Icon } from 'antd';
import {
  Authority,
  ElementConfig,
  Editable,
  FormItemSelectPlus,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { localConfig as localSectionConfig } from '../index';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import styles from './index.less';
import { useDispatch } from 'dva';

const localFieldConfig = {
  section: 'PainCareTherapy',
  field: 'therapeuticDrugs',
  'field-props': {
    editable: 'Y',
    required: 'Y',
    visible: 'C',
    'visible-condition': {
      combine: '||',
      conditions: [
        {
          left: {
            domain: 'field',
            field: 'treatmentType',
          },
          operator: '===',
          right: 'OP',
        },
      ],
    },
    label: {
      dictTypeCode: 'Label_CLM_Opus',
      dictCode: 'painCareDrugName',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 23,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 23,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 23,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 23,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 23,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 23,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

const seachDropDown = new SearchDropDown();
const { handleTherapeuticDrug } = seachDropDown;

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];
  const dispatch = useDispatch();

  const showModal = (currentCode: any) => {
    const { id } = form.getFieldsValue(['id']);

    dispatch({
      type: `opusClaimAssessment/showDrugsDetailList`,
      payload: {
        show: true,
        id,
        currentCodeBeforeOpenModal: currentCode,
      },
    });
  };

  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
        <FormItemSelectPlus
          mode="multiple"
          allowClear
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          optionShowType="name"
          searchCustom={(postData: any) => {
            const data = {
              ...postData,
              params: {
                ...postData.params,
                therapyType: 'PC',
              },
            };

            return handleTherapeuticDrug(
              data,
              form.getFieldValue('therapeuticDrugs'),
              form.getFieldValue('procedureType')
            );
          }}
        />
        <Icon
          type="search"
          onClick={() => showModal(form.getFieldValue('therapeuticDrugs'))}
          className={styles.extraIcon}
        />
      </Col>
    )
  );
};

const TherapeuticDrugs = ({ form, field, editable, section, layout, isShow }: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={field}>
      <FormItem isShow={isShow} layout={layout} form={form} field={field} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

TherapeuticDrugs.displayName = localFieldConfig.field;

export default TherapeuticDrugs;
