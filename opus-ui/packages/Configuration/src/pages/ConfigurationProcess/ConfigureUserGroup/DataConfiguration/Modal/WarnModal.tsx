import React from 'react';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import { connect, useSelector, useDispatch } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormSection, { FormItemDatePicker } from 'basic/components/Form/FormSection';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
import bpm from 'bpm/pages/OWBEntrance';
import styles from './index.less';

function WarnModal(props: any) {
  const ref: any = React.createRef();
  const dispatch: Dispatch = useDispatch();
  const taskNotEditable: any = useSelector((state: any) => state.claimEditable.taskNotEditable);
  const isAdd: any = useSelector((state: any) => state.configureUserGroupController?.isAdd);
  const { form } = props;
  const expiryDate = form.getFieldValue('expiryDate');
  const effectiveDate = form.getFieldValue('effectiveDate');
  const onCancel = () => {
    dispatch({
      type: 'configureUserGroupController/hideWarnModal',
    });
    dispatch({
      type: 'configureUserGroupController/saveConfirm',
      payload: { confirm: false },
    });
  };

  const onOk = () => {
    form.validateFields({ force: true }, async (err: any) => {
      if (err && ref?.current) {
        ref.current.hideLoading();
      } else {
        dispatch({
          type: 'configureUserGroupController/hideWarnModal',
        });
        dispatch({
          type: 'configureUserGroupController/saveConfirm',
          payload: { confirm: true },
        });
        bpm.buttonAction('submit');
      }
    });
  };
  return (
    <ModalWarnMessage
      visible
      ref={ref}
      className={styles.warnModal}
      // @ts-ignore
      afterClose={onCancel}
      onCancel={onCancel}
      onOk={onOk}
      zIndex={1000}
      hiddenExtraText
      labelId="app.navigator.task-detail-policy-information-warn.msg.title"
      okText={formatMessageApi({
        Label_BPM_Button: 'app.navigator.taskDetail.inquireForm.button.confirmAndContinue',
      })}
      cancelText={formatMessageApi({
        Label_BPM_Button: 'app.navigator.taskDetail.inquireForm.button.cancel',
      })}
      modalDetailText={formatMessageApi({
        Label_COM_Message: 'MSG_000345',
      })}
    >
      {form && (
        <FormSection
          layConf={{
            default: 8,
            arrows: 2,
          }}
          isMargin={false}
          isPadding={false}
          isHideBgColor
        >
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="effectiveDate"
            partner="expiryDate"
            // @ts-ignore
            allowFreeSelect
            labelId="venus_claim.ruleEngine.effectiveDate"
            format="L"
            rules={[
              {
                validator: (rule: any, value: any, callback: Function) => {
                  if (
                    moment(value).startOf('day').valueOf() >
                    moment(expiryDate).startOf('day').valueOf()
                  ) {
                    callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000279' }));
                  } else {
                    callback();
                  }
                },
              },
            ]}
          />
          {!isAdd && (
            // @ts-ignore
            <div name="arrows" className={styles.arrows}>
              -
            </div>
          )}
          {!isAdd && (
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              formName="expiryDate"
              partner="effectiveDate"
              // @ts-ignore
              allowFreeSelect
              labelId="venus_claim.ruleEngine.expiredDate"
              format="L"
              rules={[
                {
                  validator: (rule: any, value: any, callback: Function) => {
                    if (
                      moment(value).startOf('day').valueOf() <
                      moment(effectiveDate).startOf('day').valueOf()
                    ) {
                      callback(formatMessageApi({ Label_COM_WarningMessage: 'ERR_000279' }));
                    } else {
                      callback();
                    }
                  },
                },
              ]}
            />
          )}
        </FormSection>
      )}
    </ModalWarnMessage>
  );
}
export default connect(({ configureUserGroupController }: any) => ({
  headerData: configureUserGroupController?.headerData,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch } = props;
      dispatch({
        type: 'configureUserGroupController/saveHeaderData',
        payload: {
          changedFields,
        },
      });
    },
    mapPropsToFields(props) {
      const { headerData } = props;
      return formUtils.mapObjectToFields(headerData);
    },
  })(WarnModal)
);
