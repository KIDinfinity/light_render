import React, { useContext } from 'react';
import OpusCard from 'opus/Components/OpusCard';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import FormSection from './FormSection';
import useRule from 'opus/Components/OpusCard/useRule';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from '../../activity.config';
import { useDispatch, useSelector, connect } from 'dva';
import Button from '../../components/Button';
import styles from './index.less';
import useGetPolicyNo from 'opus/Pages/Process/NewBusiness/DataEntry/_hooks/useGetPolicyNo';
import context from 'bpm/pages/OWBEntrance/Context/context';

const Index = (props: any) => {
  const { data, form, config } = props;
  const isShow = useRule({ NAMESPACE, config });
  const dispatch = useDispatch();
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const salesChannel = formUtils.queryValue(data?.salesChannel);
  const policyNo = useGetPolicyNo();
  const createButtonDisabled = !salesChannel || !!policyNo;
  const { dispatch: globalDispatch } = useContext(context);
  return (
    isShow && (
      <OpusCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })}>
        <div className={styles.sectionCard}>
          <FormSection editable={editable} form={form} />
          {editable && (
            <Button
              disabled={createButtonDisabled}
              onClick={() => {
                dispatch({
                  type: `${NAMESPACE}/generateNo`,
                  payload: {
                    salesChannel,
                    globalDispatch,
                  },
                });
              }}
            >
              Confirm to create Application No/Policy No
            </Button>
          )}
        </div>
      </OpusCard>
    )
  );
};

export default connect(({ [NAMESPACE]: modelnamespace }: any) => ({
  data: modelnamespace.processData?.agentInfo,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveAgentInfo',
          payload: {
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { data }: any = props;
      return formUtils.mapObjectToFields(data);
    },
  })(Index)
) as React.ComponentType<any>;
