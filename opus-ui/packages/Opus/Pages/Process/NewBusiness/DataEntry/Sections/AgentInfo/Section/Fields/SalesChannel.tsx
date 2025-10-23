import React from 'react';
import { Col } from 'antd';
import {
  Authority,
  Editable,
  FormItemRadioGroup,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import { useDispatch } from "dva";

const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const fieldProps: any = config;
  const dispatch = useDispatch();
  const dicts = getDrowDownList(config['x-dict']?.dictTypeCode);
  const visibleConditions = true;
  const editableConditions = !Rule(config['editable-condition'], form, NAMESPACE);

  const requiredConditions = true;
  const disableList = ['PD', 'BD']; //这两个暂时不给选

  const handleChange = (e:any) => {
    dispatch({
      type : `${NAMESPACE}/getProductList`,
      payload : {
        salesChannel : e.target.value
      }
    })
  }

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemRadioGroup
          onChange={handleChange}
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? editableConditions
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
          disableList={disableList}
        />
      </Col>
    )
  );
};
const field = 'salesChannel';

const SalesChannel = ({ config, form, editable, layout, isShow }: any) => (
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

SalesChannel.displayName = field;

export default SalesChannel;
