import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Editable, Required, FormItemSelectPlus } from 'basic/components/Form';
import { SearchDropDown } from 'claim/pages/utils/searchDropDown';
import { useDispatch, useSelector } from 'dva';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'JPADMED',
  field: 'advancedMedicalCNKey',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'AdvancedMedicalCN',
    },
    maxLength: 240,
    required: 'Y',
    visible: 'Y',
    'x-layout': {
      // 480px
      xs: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 576px
      sm: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 768px
      md: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 992px
      lg: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1200px
      xl: {
        span: 3,
        offset: 0,
        pull: 0,
        order: 3,
      },
      // 1600px
      xxl: {
        span: 3,
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

const FormItem = ({ isShow, layout, form, editable, config, field, NAMESPACE }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const dispatch = useDispatch();

  const id = form.getFieldValue('id');
  const invoiceId = form.getFieldValue('invoiceId');
  const advancedMedicalCN = form.getFieldValue('advancedMedicalCN');
  const advancedMedicalCNName = form.getFieldValue('advancedMedicalCNName');
  const treatmentProviders =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) =>
        modelnamepsace?.dropdownMap?.treatmentProviderMap?.[id]
    ) || [];

  const onTreatmentProvider = ({ treatmentProviderList }: any) => {
    dispatch({
      type: `${NAMESPACE}/saveTreatmentProviders`,
      payload: { serviceItemId: id, treatmentProviders: treatmentProviderList },
    });
  };
  const onServiceExtra = ({ changedFields }: any) => {
    dispatch({
      type: `${NAMESPACE}/saveEntry`,
      target: 'serviceExtraUpdate',
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
          onServiceExtra({
            changedFields: {
              advancedMedicalCN: item.treatmentCode,
              advancedMedicalCNName: item.treatmentName,
            },
          });

          onTreatmentProvider({
            treatmentProviderList: item?.treatmentProviders,
          });
        }}
        searchName="advancedMedicalCn"
        optionShowType="name"
        required={(config.required || fieldProps.required) === Required.Yes}
        searchCustom={(postData: any) => handleMedia(postData)}
        callBackCurrentItem={(list: any) => {
          if (!lodash.isEmpty(treatmentProviders)) {
            return;
          }
          let optionItem = null;
          if (advancedMedicalCNName) {
            optionItem = lodash.find(list, {
              dictCode: `${advancedMedicalCN}-${advancedMedicalCNName}`,
            });
          } else {
            optionItem = lodash.find(list, { treatmentCode: advancedMedicalCN });
          }
          if (optionItem) {
            onTreatmentProvider({
              treatmentProviderList: optionItem?.treatmentProviders,
            });
          }
        }}
        selectCallbackItem
      />
    </Col>
  );
};

const AdvancedMedicalCn = ({ field, config, form, editable, layout, isShow, NAMESPACE }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
    />
  </Authority>
);

AdvancedMedicalCn.displayName = 'advancedMedicalCNKey';

export default AdvancedMedicalCn;
