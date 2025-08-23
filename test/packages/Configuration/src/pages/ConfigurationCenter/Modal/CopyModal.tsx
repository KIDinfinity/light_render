import React from 'react';
import { connect } from 'dva';
import { Modal as AntModal, Form, Button, notification } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import mapprops from '@/utils/mapprops';
import { formUtils } from 'basic/components/Form';
import { getFieldItem } from '../Utils/FormUtils';
import { tranferResult } from '../Utils/Transfer';
import styles from './index.less';

function CopyModal({ form, dataFieldList, current, showCopyModal, dispatch }: any) {
  const onCancel = () => {
    dispatch({
      type: 'configurationCenter/saveCopyModal',
      payload: { showCopyModal: false },
    });
  };

  const onOk = async () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', JSON.stringify(current));
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
    }
    document.body.removeChild(input);
    notification.success({ message: 'Copy Success' });
  };

  const footer = (
    <div className={styles.copyFooter}>
      <Button onClick={onOk} className={styles.btnGreen}>
        Copy
      </Button>
      <Button type="primary" onClick={onCancel}>
        {formatMessageApi({
          Label_BIZ_Claim: 'form.cancel',
        })}
      </Button>
    </div>
  );

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
      visible={showCopyModal}
      width={800}
      footer={footer}
      onCancel={onCancel}
      maskStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.65)' }}
    >
      <Form {...formItemLayout}>
        {mapprops(getFieldItem(dataFieldList?.map((item) => ({ ...item, editable: false }))), {
          form,
        })}
      </Form>
    </AntModal>
  );
}

export default connect(({ configurationCenter }: any) => ({
  dataFieldList: configurationCenter.functionData.dataFieldList,
  current: configurationCenter.current,
  showCopyModal: configurationCenter.showCopyModal,
}))(
  Form.create({
    mapPropsToFields(props) {
      const { current, dataFieldList } = props;
      const result = tranferResult(dataFieldList, current);
      return formUtils.mapObjectToFields({ ...result }, {});
    },
  })(CopyModal)
);
