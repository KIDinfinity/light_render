import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Editable, Required, FormItemSelectPlus } from 'basic/components/Form';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import { useDispatch } from 'dva';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'service',
  field: 'advancedMedicalCN',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'AdvancedMedicalCN',
    },
    maxLength: 240,
    required: 'N',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 24,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
    'treatment-no-invoice-layout': {
      // 480px
      xs: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 16,
        offset: 0,
        pull: 0,
        order: 3,
      },
    },
  },
};

export { localFieldConfig };

const seachDropDown = new SearchDropDown();
const { handleMedia } = seachDropDown;

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();

  const id = form.getFieldValue('id');
  const invoiceId = form.getFieldValue('invoiceId');
  const advancedMedicalCN = form.getFieldValue('advancedMedicalCN');
  const NAMESPACE = form.getFieldValue('NAMESPACE');
  const treatmentProviders = form.getFieldValue('treatmentProviders') || [];

  const handleChange = ({ changedFields }: any) => {
    dispatch({
      type: `${NAMESPACE}/saveEntry`,
      target: 'serviceUpdate',
      payload: {
        changedFields,
        serviceItemId: id,
        invoiceId,
      },
    });
  };

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelectPlus
        disabled={(config.editable || fieldProps.editable) === Editable.No || !editable}
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        onSelectCallback={({ item }: any) => {
          handleChange({
            changedFields: {
              medicalProvider: '',
              treatmentProviders: item.treatmentProviders,
            },
          });
        }}
        searchName="advancedMedicalCn"
        optionShowType="name"
        required={(config.required || fieldProps.required) === Required.Yes}
        searchCustom={(postData: any) => handleMedia(postData)}
        callBackCurrentItem={(list: any) => {
          const item = list?.[0] || {};
          if (advancedMedicalCN === item.dictCode && lodash.isEmpty(treatmentProviders)) {
            handleChange({
              changedFields: {
                treatmentProviders: item.treatmentProviders,
              },
            });
          }
        }}
        selectCallbackItem
      />
    </Col>
  );
};

const AdvancedMedicalCn = ({ field, config, form, editable, layout, isShow }: any) => (
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

AdvancedMedicalCn.displayName = 'AdvancedMedicalCn';

export default AdvancedMedicalCn;
