import React, { useEffect, useState } from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, formUtils, Required } from 'basic/components/Form';
import lodash from 'lodash';
import { VLD_001176 } from 'claim/pages/validators/fieldValidators';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { handleWarnMessageModal } from '@/utils/commonMessage';

const localFieldConfig = {
  atomGroupCode: 'JP_CLM_CTG001.JP_CLM_ACT001',
  caseCategory: 'JP_CLM_CTG001',
  activityCode: 'JP_CLM_ACT001',
  section: 'Diagnosis',
  field: 'relationshipCode',
  'field-props': {
    editable: 'Y',
    label: {
      dictTypeCode: 'Label_BIZ_Claim',
      dictCode: 'RelationshipCode',
    },
    maxLength: 100,
    required: 'N',
    visible: 'Y',
    'x-rules': ['VLD_001176'],
    'x-layout': {
      // 480px
      xs: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 12,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'treatment-no-invoice-layout': {
      xs: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 8,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
    'no-treatment-layout': {
      xs: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 576px
      sm: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 768px
      md: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 992px
      lg: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1200px
      xl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
      // 1600px
      xxl: {
        span: 6,
        offset: 0,
        pull: 0,
        order: 5,
      },
    },
  },
};

export { localFieldConfig };

const FormItem = ({ isShow, layout, form, editable, config, field }: any) => {
  const fieldProps: any = localFieldConfig['field-props'];

  const [dicts, setDicts] = useState([]);
  const value = formUtils.queryValue(form.getFieldValue('relationshipCode'));

  const isCINameEditable = false;
  const isCINameRequired = false;

  const onAddCustomItem = (newCode: string) => {
    if (!/^\d{5}$/.test(newCode)) {
      handleWarnMessageModal([{ content: formatMessageApi({ Label_COM_Message: 'MSG_001349' }) }], {
        type: 'error',
        hideCancelButton: true,
        hiddenExtraText: true,
        okText: formatMessageApi({ Label_BPM_Button: 'Close' }),
      });

      return false;
    }

    if (!lodash.find(dicts, (dict: any) => dict.dictCode === newCode)) {
      setDicts(
        lodash.compact([
          ...dicts,
          {
            dictCode: newCode,
            dictName: newCode,
          },
        ] as any)
      );
    }
  };

  useEffect(() => {
    const split = value ? value.split(',') : [];

    if (
      lodash.some(
        split,
        (item: string) => !lodash.find(dicts, (dict: any) => dict.dictCode === item)
      )
    ) {
      setDicts(
        split.map((item: string) => ({
          dictCode: item,
          dictName: item,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <Col {...layout} style={{ display: isShow ? 'block' : 'none' }}>
      <FormItemSelect
        mode="multiple"
        multipleString
        onAddCustomItem={onAddCustomItem}
        customItemPlaceholder={formatMessageApi({ Label_COM_Message: 'MSG_001349' })}
        disabled={
          !editable ||
          ((config?.editable || fieldProps.editable) === Editable.Conditions
            ? isCINameEditable
            : (config?.editable || fieldProps.editable) === Editable.No)
        }
        form={form}
        formName={config.name || field}
        labelId={config.label?.dictCode || fieldProps.label.dictCode}
        labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
        required={
          config.required === Required.Conditions ||
          localFieldConfig['field-props'].required === Required.Conditions
            ? isCINameRequired
            : (config.required || fieldProps.required) === Required.Yes
        }
        dicts={dicts}
        rules={[
          {
            validator: VLD_001176(),
          },
        ]}
      />
    </Col>
  );
};

const RelationshipCode = ({ field, config, form, editable, layout, isShow }: any) => (
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

RelationshipCode.displayName = 'RelationshipCode';

export default RelationshipCode;
