import React, { useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'dva';
import FormSection, { FormItemInput, formUtils } from 'basic/components/Form';
import { Form, Icon } from 'antd';
import { NAMESPACE } from '../../BaseProduct/activity.config';
import lodash from 'lodash';
import { handleMessageModal } from '@/utils/commonMessage';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { LS, LSKey } from '@/utils/cache';

const FORMID = 'dataCaptureInquiryBusinessNo';

let prevAbortController: any = null;
let timer = null;
let retryTimer = null;

function InquiryBusinessNo(props: any) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [loopTime, setLoopTime] = useState(false);
  const { form }: any = props;
  const { taskStatus, assignee } = useSelector(({ processTask }: any) => processTask?.getTask);
  const currentUser = LS.getItem(LSKey.CURRENTUSER);
  const userId = lodash.get(currentUser, 'userId', '');

  const registeForm = () => {
    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  const unRegisterForm = () => {
    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  useEffect(() => {
    registeForm();
    return () => {
      unRegisterForm();
    };
  }, []);

  const loopRequest = async (asyncId, resolve) => {
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
      type: `${NAMESPACE}/getLiteDataAsyncLoop`,
      signal: abortController.signal,
      payload: {
        asyncId,
        loopTime,
      },
    });
    if (result.status === 'inProgress') {
      setTimeout(() => {
        loopRequest(asyncId, resolve);
      }, 5000);
    } else {
      retryTimer = null;
      resolve(result);
    }
  };

  const getLiteData = async () => {
    setLoading(true);
    const inquiryBusinessNo = form.getFieldValue('inquiryBusinessNo');
    let errors = {};
    try {
      await form.validateFields(['inquiryBusinessNo']);
    } catch (error) {
      errors = error;
    }
    if (!lodash.isEmpty(errors)) {
      setLoading(false);
      return;
    }

    const abortController = new AbortController();

    prevAbortController = abortController;

    const startResult = await dispatch({
      type: `${NAMESPACE}/liteDataRemoteAsyncStart`,
      payload: {
        inquiryBusinessNo,
      },
    });

    if (!startResult.result) {
      setLoading(false);
      return;
    }
    setLoopTime(true);
    const result = await new Promise((resolve: any) => {
      timer = loopRequest(startResult?.data, resolve);
    });

    if (result?.status === 'finish') {
      await dispatch({
        type: `${NAMESPACE}/liteDataRemoteAsyncEnd`,
        payload: result?.data,
      });
      await dispatch({
        type: `${NAMESPACE}/saveSnapshot`,
      });
    }
    setLoopTime(false);
    setLoading(false);
  };

  return (
    <div className={styles.inquiryBusinessNo}>
      <FormSection
        form={form}
        formId="DataCapture_InquiryBusinessNo"
        isMargin={false}
        isPadding={false}
        title=""
        isHideBgColor
        layConf={24}
      >
        <FormItemInput
          form={form}
          formName="inquiryBusinessNo"
          disabled={!lodash.includes(['todo'], taskStatus) || assignee !== userId}
          required
          labelId={formatMessageApi({
            Label_COM_General: 'BusinessNo',
          })}
          onBlur={getLiteData}
          suffix={loading && <Icon type="loading" className={styles.loadingIcon} />}
        />
      </FormSection>
    </div>
  );
}

export default connect(({ claimEditable, [NAMESPACE]: modelnamepsace }: any) => ({
  inquiryBusinessNo: modelnamepsace.processData.inquiryBusinessNo,
  inquirySrvNo: modelnamepsace.processData.inquirySrvNo,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          pe: `${NAMESPACE}/saveFormData`,
          trget: 'inquiryBusinessNoUpdate',
          payload: {
            angedFields,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { inquiryBusinessNo, inquirySrvNo } = props;
      return formUtils.mapObjectToFields({ inquiryBusinessNo: inquiryBusinessNo || inquirySrvNo });
    },
  })(InquiryBusinessNo)
);
