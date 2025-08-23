import React, { useState } from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import { Icon } from 'antd';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { useDispatch } from 'dva';

import { localFieldConfig } from './IDType.config';
import styles from '../../Claimant.less';
export { localFieldConfig } from './IDType.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, NAMESPACE }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const [loading, setLoading] = useState(false);
  const { taskStatus, assignee } = useSelector(({ processTask }: any) => processTask.getTask);
  const idInfoModifyBy = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.claimProcessData?.claimant?.idInfoModifyBy
  );
  const userId = useSelector(({ user }: any) => user?.currentUser?.userId);
  const dicts = getDrowDownList({ config, fieldProps });
  const dispatch = useDispatch();
  const refreshIDType = () => {
    if (idInfoModifyBy === 'GODP' || lodash.isEmpty(idInfoModifyBy)) {
      setLoading(true);
      dispatch({
        type: `${NAMESPACE}/idTypeRefresh`,
      });
      setLoading(false);
    }
  };
  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemSelect
          dicts={dicts}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label?.dictTypeCode}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          className={styles.idType}
          prefix={
            <div className={styles.icons}>
              {loading && (
                <div>
                  <Icon type="loading" />
                </div>
              )}
              {taskStatus !== 'completed' && assignee === userId && !loading && (
                <Icon type="sync" onClick={refreshIDType} />
              )}
            </div>
          }
        />
      </Col>
    )
  );
};

const IDType = ({ field, config, isShow, layout, form, editable, NAMESPACE, id }: any) => (
  <Authority>
    <FormItem
      field={field}
      config={config}
      isShow={isShow}
      layout={layout}
      form={form}
      editable={editable}
      NAMESPACE={NAMESPACE}
      id={id}
    />
  </Authority>
);

IDType.displayName = localFieldConfig.field;

export default IDType;
