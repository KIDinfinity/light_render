import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { Modal as AntModal, Form, notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import mapprops from '@/utils/mapprops';
import { LS, LSKey } from '@/utils/cache';
import type { Dispatch } from 'redux';
import type { FormComponentProps, WrappedFormUtils } from 'antd/es/form/Form';
import moment from 'moment';
import { getFieldItem } from '../Utils/FormUtils';
import { getDataImageIdList } from '../Utils/Handle';
import { showErrors } from '../Utils/Common';

const configField =
  [
    {
      functionId: Date.now(),
      componentType: 'textarea',
      defaultValue: null,
      description: null,
      editable: true,
      required: true,
      columnSeq: null,
      fieldCaption: 'Applied  Comment',
      fieldName: 'appliedComment',
      visible: true,
    },
  ];

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

interface ComponentProps extends FormComponentProps {
  form: WrappedFormUtils;
  TableSearch: any;
}

function SubmitModal({ form, TableSearch }: ComponentProps) {
  const dispatch: Dispatch = useDispatch();
  const submitLoading: boolean = useSelector((state: any) => state.loading.effects['configurationOperation/submit']);
  const showSubmitModal: boolean = useSelector((state: any) => state.configurationDataImage.showSubmitModal);
  const submitRow: any[] = useSelector((state: any) => state.configurationDataImage.submitRow);

  const onCancel = () => {
    dispatch({
      type: 'configurationDataImage/hideSubmitModal',
    });
  };

  const onOk = async () => {
    const { userId } = LS.getItem(LSKey.CURRENTUSER) || {};
    form.validateFields(async (err: any, fieldsValue: any) => {
      if (err) {
        return;
      }
      const { appliedComment } = fieldsValue;
      const response: any = await dispatch({
        type: `configurationOperation/submit`,
        payload: {
          appliedComment,
          dataImageIdList: getDataImageIdList(submitRow),
          operateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
          operator: userId,
        },
      });

      if (response && response.success) {
        notification.success({
          message: formatMessageApi({
            Label_COM_WarningMessage: 'configurationcenter.message.submit.success',
          }),
        });
        dispatch({
          type: 'configurationDataImage/hideSubmitModal',
        });
        dispatch({
          type: 'configurationDataImage/refreshResult',
        });
        TableSearch.setSelectedRows?.([]);
        form.resetFields();
      } else {
        showErrors(response.promptMessages);
      }
    });
  };


  return (
    <AntModal
      title={formatMessageApi({
        Label_BPM_Button: 'configurationcenter.button.submit',
      })}
      visible={showSubmitModal}
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
      confirmLoading={submitLoading}
    >
      <Form {...formItemLayout}>{mapprops(getFieldItem(configField), { form })}</Form>
    </AntModal>
  );

}
export default Form.create()(
  SubmitModal
);
