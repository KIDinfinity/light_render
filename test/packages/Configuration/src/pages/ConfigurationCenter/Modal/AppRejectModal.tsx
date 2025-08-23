import React from 'react';
import { useSelector, useDispatch} from 'dva';
import { Modal as AntModal, Form } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import mapprops from '@/utils/mapprops';
import type { Dispatch } from 'redux';
import type { FormComponentProps, WrappedFormUtils } from 'antd/es/form/Form';
import moment from 'moment';
import { LS, LSKey } from '@/utils/cache';
import { getFieldItem } from '../Utils/FormUtils';
import { showErrors, showSuccess } from '../Utils/Common';

interface ComponentProps extends FormComponentProps {
  form: WrappedFormUtils;
}

function AppRejectModal({form}: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const showAppRejectModal: boolean=useSelector((state: any)=>state.configurationDataImage.showAppRejectModal);
  const modalType: string=useSelector((state: any)=>state.configurationDataImage.modalType);
  const approveLoading: boolean=useSelector((state: any)=>state.loading.effects['configurationOperation/approveSubmission']);
  const rejectLoading: boolean=useSelector((state: any)=>state.loading.effects['configurationOperation/rejectSubmission']);
  const appRejectRow: any[]=useSelector((state: any)=>state.configurationDataImage.appRejectRow);
  const isApprove=modalType === 'approve';
  const configField = [
    {
      functionId: Date.now(),
      componentType: 'textarea',
      defaultValue: null,
      description: null,
      editable: true,
      required: true,
      columnSeq: null,
      fieldCaption: 'appliedFeedback',
      fieldName: 'appliedFeedback',
      visible: true,
    },
  ]


  const onCancel = () => {
    dispatch({
      type: 'configurationDataImage/hideAppRejectModal',
    });
  };


  const getBatchNoList = (row: any[] = [], appliedFeedback: string = '') => {
    const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};
    return row.reduce((arr, cur) => {
      arr.push({
        batchNo: cur.batch_no,
        taskId: cur.task_id,
        appliedFeedback,
        operateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
        operator: userId,
      });
      return arr;
    }, []);
  };


  const onOk = async () => {
    form.validateFields(async (err: any, fieldsValue: any) => {
      if (err) {
        return;
      }
      const { appliedFeedback } = fieldsValue;
      const response: any = await dispatch({
        type: `configurationOperation/${isApprove ? 'approveSubmission' : 'rejectSubmission'}`,
        payload: {
          reviewParams: getBatchNoList(appRejectRow, appliedFeedback),
        },
      });

      if (response && response.success) {
        showSuccess(
          formatMessageApi({
            Label_COM_WarningMessage: `configurationcenter.message.${isApprove ? 'approve' : 'reject'
              }.success`,
          })
        );
        dispatch({
          type: 'configurationDataImage/hideAppRejectModal',
        });

        dispatch({
          type: 'configurationCenter/refreshResult',
        });
        form.resetFields();
      } else {
        showErrors(response.promptMessages);
      }
    });
  };
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7, pull: 1 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };
  return (
    <AntModal
      title={formatMessageApi({
        Label_BPM_Button: `configurationcenter.button.${isApprove ? 'approve' : 'reject'}`,
      })}
      visible={showAppRejectModal}
      width={800}
      cancelText={formatMessageApi({
        Label_BIZ_Claim: 'form.cancel',
      })}
      okText={formatMessageApi({
        Label_BIZ_Claim: 'form.confirm',
      })}
      onCancel={onCancel}
      onOk={onOk}
      maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
      confirmLoading={isApprove ? approveLoading : rejectLoading}
    >
      <Form {...formItemLayout}>{mapprops(getFieldItem(configField), { form })}</Form>
    </AntModal>
  );

}
export default Form.create()(AppRejectModal);
