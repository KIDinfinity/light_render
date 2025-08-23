import React, { useState } from 'react';
import { Col, Icon } from 'antd';
import {
  Authority,
  Editable,
  ElementConfig,
  FormItemInput,
  Required,
  Visible,
  Rule,
} from 'basic/components/Form';
import { localFieldConfig } from './PolicyNo.config';
import { NAMESPACE } from 'claimBasicProduct/pages/SimplifiedDigital/CaseCreation/activity.config';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import styles from '../../index.less';
export { localFieldConfig } from './PolicyNo.config';
import { handleMessageModal } from '@/utils/commonMessage';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';

let prevAbortController: any = null;
let timer = null;
let retryTimer = null;

export const FormItem = ({ isShow, layout, form, editable, field, config }: any) => {
  const dispatch = useDispatch();
  const fieldProps: any = localFieldConfig['field-props'];
  const [loading, setLoading] = useState(false);
  const visibleConditions = Rule(
    config['visible-condition'] || fieldProps['visible-condition'],
    form,
    ''
  );
  const editableConditions = Rule(
    config['editable-condition'] || fieldProps['editable-condition'],
    form,
    ''
  );
  const requiredConditions = Rule(
    config['required-condition'] || fieldProps['required-condition'],
    form,
    ''
  );
  const originPolicyNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.originPolicyNo
  );

  const loopTime = async (asyncId, policyNo, resolve) => {
    if (lodash.isEmpty(retryTimer)) {
      retryTimer = moment();
    }
    if (moment().diff(retryTimer, 'second') >= 32) {
      retryTimer = null;
      resolve({ status: 'error' });
      handleMessageModal([{ content: formatMessageApi({ Label_COM_Message: 'MSG_000898' }) }]);
      return false;
    }
    const abortController = new AbortController();

    prevAbortController = abortController;

    const result = await dispatch({
      type: `${NAMESPACE}/getPolicyInfoAsyncLoop`,
      signal: abortController.signal,
      payload: {
        asyncId,
        policyNo,
      },
    });
    if (result.status === 'inProgress') {
      setTimeout(() => {
        loopTime(asyncId, policyNo, resolve);
      }, 5000);
    } else {
      retryTimer = null;
      resolve(result);
    }
  };

  const getPolicyNo = async (reload) => {
    if (loading) return;
    await dispatch({
      type: 'claimEditable/setTaskNotEditable',
      payload: { taskNotEditable: true },
    });
    setLoading(true);

    const policyNo = form.getFieldValue('policyNo');
    if ((originPolicyNo === policyNo && !reload) || lodash.isEmpty(lodash.trim(policyNo))) {
      setLoading(false);
      await dispatch({
        type: 'claimEditable/setTaskNotEditable',
        payload: { taskNotEditable: false },
      });
      return;
    }
    let errors = {};
    try {
      await form.validateFields([field]);
    } catch (error) {
      errors = error;
    }
    if (!lodash.isEmpty(errors)) {
      setLoading(false);
      await dispatch({
        type: 'claimEditable/setTaskNotEditable',
        payload: { taskNotEditable: false },
      });
      return;
    }
    const abortController = new AbortController();

    prevAbortController = abortController;

    const asyncId = await dispatch({
      type: `${NAMESPACE}/policyInfoRemoteAsync`,
      signal: abortController.signal,
      payload: {
        policyNo,
      },
    });

    if (asyncId) {
      const result = await new Promise((resolve: any) => {
        timer = loopTime(asyncId, policyNo, resolve);
      });

      if (result?.status === 'finish') {
        await dispatch({
          type: `${NAMESPACE}/policyInfoRemoteAsyncEnd`,
          payload: {
            data: result?.data,
            policyNo,
          },
        });
      }
    }

    setLoading(false);

    await dispatch({
      type: 'claimEditable/setTaskNotEditable',
      payload: { taskNotEditable: false },
    });
  };

  return (
    isShow &&
    ((config?.visible || fieldProps.visible) === Visible.Conditions
      ? visibleConditions
      : (config?.visible || fieldProps.visible) === Visible.Yes) && (
      <Col {...layout}>
        <FormItemInput
          className={styles.policyNo}
          disabled={
            !editable ||
            ((config?.editable || fieldProps.editable) === Editable.Conditions
              ? !editableConditions
              : (config?.editable || fieldProps.editable) === Editable.No)
          }
          form={form}
          formName={config.name || field}
          labelId={config.label?.dictCode || fieldProps.label.dictCode}
          allowClear
          labelTypeCode={config.label?.dictTypeCode || fieldProps.label.dictTypeCode}
          maxLength={config?.maxLength || fieldProps.maxLength}
          required={
            (config.required || fieldProps.required) === Required.Conditions
              ? requiredConditions
              : (config.required || fieldProps.required) === Required.Yes
          }
          onBlur={() => {
            getPolicyNo();
          }}
          suffix={
            <div className={styles.icons}>
              {loading && (
                <div>
                  <Icon type="loading" />
                </div>
              )}
              {editable && !loading && (
                <Icon
                  type="reload"
                  onClick={() => {
                    getPolicyNo(true);
                  }}
                />
              )}
            </div>
          }
          isInline
        />
      </Col>
    )
  );
};

const PolicyNo = ({ isShow, layout, form, editable, section, config }: any) => (
  <Authority>
    <ElementConfig.Field config={config} section={section} field={localFieldConfig.field}>
      <FormItem isShow={isShow} layout={layout} form={form} editable={editable} />
    </ElementConfig.Field>
  </Authority>
);

PolicyNo.displayName = localFieldConfig.field;

export default PolicyNo;
