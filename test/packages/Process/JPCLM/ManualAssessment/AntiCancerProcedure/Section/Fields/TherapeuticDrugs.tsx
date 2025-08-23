import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  ElementConfig,
  Editable,
  FormItemSelectPlus,
  Required,
} from 'basic/components/Form';
import { useDispatch } from 'dva';
import { localConfig as localSectionConfig } from '../index';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import {Icon} from 'antd';
import styles from './index.less'
const fieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'TherapeuticMonthList',
  field: 'therapeuticDrugs',
  'field-props': {
    editable: 'Y',
    required: 'Y',
    visible: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'therapeuticDrug',
    },
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 1,
      },
    },
  },
};

const seachDropDown = new SearchDropDown();
const { handleTherapeuticDrug } = seachDropDown;

export { fieldConfig };

const FormItem = ({ isShow, layout, form, editable, field, config,therapeuticMonth,idx }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dispatch = useDispatch();
  const showModal = ()=>{
    dispatch({
      type:'JPCLMOfClaimAssessment/showDrugsDetailList',
      payload: {
        show:true,
        month:therapeuticMonth,
        idx:idx
      }
    })
  }
  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelectPlus
        mode="multiple"
        allowClear
        required={(config.required || fieldProps.required) === Required.Yes}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        disabled={!editable || config?.editable === Editable.No}
        optionShowType="name"
        searchCustom={(postData: any) =>
          handleTherapeuticDrug(postData, form.getFieldValue('therapeuticDrugs'))
        }
      />
      <Icon type='search' onClick={showModal} className={styles.extraIcon} />
    </Col>
  );
};

const TherapeuticDrugs = ({ form, field, editable, section, layout, isShow,therapeuticMonth,idx }: any) => (
  <Authority>
    <ElementConfig.Field config={localSectionConfig} section={section} field={field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} therapeuticMonth={therapeuticMonth} idx={idx} />
    </ElementConfig.Field>
  </Authority>
);

TherapeuticDrugs.displayName = fieldConfig.field;

export default TherapeuticDrugs;
