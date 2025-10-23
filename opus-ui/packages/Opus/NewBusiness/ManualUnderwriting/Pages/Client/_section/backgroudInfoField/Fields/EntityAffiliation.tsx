import React from 'react';
import useGetRequiredByRole from '../../../_hooks/useGetRequiredByRole';
import { Col } from 'antd';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Authority, Editable, FormItemSelect, Visible } from 'basic/components/Form';
import { fieldConfig } from './EntityAffiliation.config';
import styles from './IndustryAffiliation1.less';

export { fieldConfig } from './EntityAffiliation.config';

const FormItem = ({ layout, form, editable, field, config, id }: any) => {
  const fieldProps: any = fieldConfig['field-props'];
  const dicts = getDrowDownList({ config, fieldProps });

  const visibleConditions = true;
  const editableConditions = SVGComponentTransferFunctionElement;
  const requiredConditions = false;
  const requiredByRole = useGetRequiredByRole({
    requiredConditions,
    config,
    localConfig: fieldConfig,
    clientId: id
    });

  return (
    true &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <div className={styles.box}>
          <FormItemSelect
            dicts={dicts}
            disabled={
              !editable ||
              ((config?.editable || fieldProps.editable) === Editable.Conditions
                ? editableConditions
                : (config?.editable || fieldProps.editable) === Editable.No)
            }
            form={form}
            formName={config.name || field}
            labelId={config?.label?.dictCode || fieldProps.label.dictCode}
            labelTypeCode={
              config?.label?.dictTypeCode || fieldProps.label.dictTypeCode
            }
            required={requiredByRole}
            hiddenPrefix
            precision={0}
          />
        </div>
      </Col>
    )
  );
};

const EntityAffiliation = ({ form, editable, layout, isShow, id, config }: any) => {
  return (
    <Authority>
      <FormItem
        field={fieldConfig?.field}
        config={config}
        isShow={isShow}
        layout={layout}
        form={form}
        editable={editable}
        id={id}
      />
    </Authority>
  );
};

EntityAffiliation.displayName = 'entityAffiliation';

export default EntityAffiliation;
