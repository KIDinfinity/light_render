import React from 'react';
import { Col } from 'antd';
import lodash from 'lodash';
import { Authority, Visible, Editable, Required, FormItemSelect } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/Claim/DocumentScanning/activity.config';
import fieldsGenerator from 'opus/Pages/Process/Claim/DocumentScanning/functions/fieldsGenerator';
import { EToolModules } from 'opus/Pages/Process/Claim/DocumentScanning/_dto/enums';

import { useSelector } from 'dva';

const localFieldConfig = {
  section: 'DocumentItem',
  field: 'documentFileId',
  'field-props': {
    visible: 'Y',
    editable: 'Y',
    required: 'Y',
    label: {
      dictTypeCode: 'Label_COM_Opus',
      dictCode: 'DocumentFormName',
    },
    'x-dict': { dictCode: 'id', dictName: 'docName' },
    'x-layout': {
      // 480px
      xs: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 576px
      sm: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 768px
      md: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 992px
      lg: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1200px
      xl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
      // 1600px
      xxl: {
        span: 9,
        offset: 0,
        pull: 0,
        order: 2,
      },
    },
  },
};

export { localFieldConfig };

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const visibleConditions = true;
  const editableConditions = true;
  const requiredConditions = true;

  const { dropdownConfigure = {}, fieldConfigure = {} } = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => ({
      dropdownConfigure: modelnamepsace?.dropdownConfigure,
      fieldConfigure: modelnamepsace?.fieldConfigure,
    })
  );

  const result = fieldsGenerator(fieldConfigure?.[EToolModules.upload], {
    dropdownConfigure,
    disabled: false,
  });

  const documentFileId = lodash.find(result, (item) => item.formName === 'docTypeCode');

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={documentFileId?.dicts} // TODO: 动态下拉
          dictCode={config?.['x-dict']?.dictCode || fieldProps?.['x-dict']?.dictCode}
          dictName={config?.['x-dict']?.dictName || fieldProps?.['x-dict']?.dictName}
          disabled={
            !editable ||
            ((config?.editable || fieldProps?.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps?.editable) === Editable.No)
          }
          form={form}
          formName={config?.name || field}
          labelId={config?.label?.dictCode || fieldProps?.label?.dictCode}
          labelTypeCode={config?.label?.dictTypeCode || fieldProps?.label?.dictTypeCode}
          required={
            config?.required === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          labelType={'inline'}
        />
      </Col>
    )
  );
};

const PolicyNo = ({ field, config, isShow, layout, form, editable, policyNoList }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      policyNoList={policyNoList}
    />
  </Authority>
);

PolicyNo.displayName = localFieldConfig.field;

export default PolicyNo;
