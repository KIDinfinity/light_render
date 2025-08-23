import React from 'react';
import lodash from 'lodash';

import { connect } from 'dva';
import { Form } from 'antd';
import { formUtils } from 'basic/components/Form';
import { FormItemTextArea } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import findObj from 'bpm/pages/Envoy/_utils/findObj';

import styles from './MemoTextAreaForm.less';
import RequiredIcon from './RequiredIcon';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';

const MemoTextAreaForm = ({
  form,
  idx,
  disabled,
  showMemoRemark,
  errorInfo,
  data,
  fieldsRequired,
}: any) => {
  const memoDescErrorMessage = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_memoDesc`
  );
  const memoRemarkErrorMessage = lodash.get(
    findObj(errorInfo, data?.id),
    `pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_memoRemark`
  );

  return (
    <>
      <Form.Item
        className={styles.inside}
        label={
          <div className={styles.label}>
            {memoDescErrorMessage?.length ? <LabelTip title={memoDescErrorMessage} /> : null}
            <RequiredIcon visible={fieldsRequired?.memoDesc} />
          </div>
        }
      >
        <FormItemTextArea
          inside={true}
          form={form}
          placeholder={formatMessageApi({
            Label_Sider_Envoy: 'MemoDetailPromptText',
          })}
          formName={`pendingMemoList{${idx}}_memoDesc`}
          maxLength={2048}
          disabled={disabled}
        />
      </Form.Item>
      {showMemoRemark && (
        <Form.Item
          className={styles.inside}
          label={
            <div className={styles.label}>
              {memoRemarkErrorMessage?.length ? <LabelTip title={memoRemarkErrorMessage} /> : null}
              <RequiredIcon visible={fieldsRequired?.memoRemark} />
            </div>
          }
        >
          <FormItemTextArea
            inside={true}
            form={form}
            placeholder={'Memo Remark'}
            formName={`pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subRemark`}
            maxLength={2048}
            disabled={disabled}
          />
        </Form.Item>
      )}
    </>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { data, dispatch } = props;
      const name = lodash.keys(changedFields)?.[0];
      const value = formUtils.queryValue(changedFields[name]);
      const action = name.includes('memoDesc') ? 'saveReasonMemoDesc' : 'saveReasonMemoRemark';

      dispatch({
        type: `envoyController/${action}`,
        payload: {
          groupId: data?.groupId,
          dataId: data?.id,
          name,
          value,
        },
      });

      dispatch({
        type: 'envoyController/validateFields',
        payload: {
          dataId: data?.groupId,
        },
      });
    },

    mapPropsToFields(props: any) {
      const { idx, data } = props;
      const pendingMemoList = lodash.get(data, 'pendingMemoList', []);
      const obj = formUtils.mapObjectToFields({
        [`pendingMemoList{${idx}}_memoDesc`]: formatMessageApi({
          DropDown_ENV_PendingMemoDescription: pendingMemoList[`${idx}`]?.memoDesc,
        }),
        [`pendingMemoList{${idx}}_pendingMemoSubInfoList{0}_subRemark`]:
          pendingMemoList[`${idx}`]?.memoRemark,
      });

      return obj;
    },
  })(MemoTextAreaForm)
);
