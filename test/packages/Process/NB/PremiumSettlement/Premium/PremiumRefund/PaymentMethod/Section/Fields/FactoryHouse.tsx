import React from 'react';
import { Col } from 'antd';
import { Authority, Editable, FormItemSelect, Visible, Rule } from 'basic/components/Form';
import lodash from 'lodash';
import useHandleGetBankInfoRequired from 'process/NB/PremiumSettlement/_hooks/useHandleGetBankInfoRequired';
import { fieldConfig } from './FactoryHouse.config';
import useGetFactoringHouseList from 'process/NB/PremiumSettlement/_hooks/useGetFactoringHouseList';

export { fieldConfig } from './FactoryHouse.config';

const FormItem = ({ isShow, layout, form, editable, field, config, required }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = useGetFactoringHouseList();
  const factoryHouseList = lodash.map(dicts, (item: any) => ({
    dictCode: item?.factoringHouseCode,
    dictName: item?.factoringHouseName,
  }));
  const factoryHouseUniqList = lodash.uniqBy(factoryHouseList, 'dictCode');

  const visibleConditions = true;
  const editableConditions = !Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = useHandleGetBankInfoRequired();
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={factoryHouseUniqList}
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
          required={required && requiredConditions}
          hiddenPrefix
          precision={0}
        />
      </Col>
    )
  );
};

const FactoryHouse = ({ field, config, form, editable, layout, isShow, required }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      required={required}
    />
  </Authority>
);

FactoryHouse.displayName = 'bankAcctFactoryHouse';

export default FactoryHouse;
