import React, { useState } from 'react';
import { Col } from 'antd';
import { useSelector } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getDrowDownList } from '@/utils/dictFormatMessage';
import {
  Authority,
  Editable,
  FormItemSelect,
  Required,
  Rule,
  Visible,
} from 'basic/components/Form';
import { Icon } from 'antd';
import { useDispatch } from 'dva';
import styles from '../Sections/index.less';
import TaskDefKey from 'basic/enum/TaskDefKey';
import CaseCategory from 'basic/enum/CaseCategory/hk';

import { localFieldConfig } from './IDType.config';

export { localFieldConfig } from './IDType.config';

export const FormItem = ({ isShow, layout, form, editable, field, config, NAMESPACE }: any) => {
  const fieldProps: any = config || localFieldConfig['field-props'];
  const claimant = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.claimant
  );
  const { idInfoModifyBy } = formUtils.objectQueryValue(claimant);
  const visibleConditions = Rule(fieldProps['visible-condition'], form, '');
  const editableConditions = Rule(fieldProps['editable-condition'], form, '');
  const requiredConditions = Rule(fieldProps['required-condition'], form, '');
  const [loading, setLoading] = useState(false);
  const { taskStatus, assignee, activityKey, caseCategory } = useSelector(
    ({ processTask }: any) => processTask.getTask
  );
  const userId = useSelector(({ user }: any) => user?.currentUser?.userId);
  const dispatch = useDispatch();

  const dicts = getDrowDownList({ config, fieldProps });
  const refreshIDType = () => {
    if (idInfoModifyBy === 'GODP' || lodash.isEmpty(idInfoModifyBy)) {
      setLoading(true);
      dispatch({
        type: `${NAMESPACE}/idTypeRefresh`,
      });
      setLoading(false);
    }
  };
  const show =
    activityKey === TaskDefKey.HK_CLM_ACT008 && caseCategory === CaseCategory.HK_CLM_CTG003;
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
              {loading && !show && (
                <div>
                  <Icon type="loading" />
                </div>
              )}
              {taskStatus !== 'completed' && assignee === userId && !loading && !show && (
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
