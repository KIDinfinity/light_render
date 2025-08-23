import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import { Row, Col, Card, Form, Button } from 'antd';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import ModalWarnMessage from '@/components/ModalWarnMessage';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import styles from './index.less';

const layout = {
  xs: { span: 23 },
  sm: { span: 23 },
  md: { span: 23 },
  lg: { span: 23 },
};

@connect(({ requestWarnMessageController }) => ({
  formData: requestWarnMessageController.formData,
}))
@Form.create({
  onFieldsChange(props, changedFields) {
    const { dispatch } = props;
    dispatch({
      type: 'requestWarnMessageController/saveFormData',
      payload: {
        changedFields,
      },
    });
  },
  mapPropsToFields(props) {
    const { formData } = props;

    return formUtils.mapObjectToFields(formData);
  },
})
class RequestWarnMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowWarnMsg: false,
    };
  }

  // 模拟用的Demo，如果有空值，判定为Error；如果age < 18 || weight > 100，判定为Warn，需要二次确认；如果都正常，则走完流程。
  submitFn = () => {
    const { dispatch, form } = this.props;
    // 校验表单，如果没错误就提交
    form.validateFields({ force: true }, (error) => {
      if (!error) {
        dispatch({
          type: 'requestWarnMessageController/submitFormData',
        });
      }
    });
  };

  // 显示弹窗前先校验是否有error，有的话，不显示弹窗
  handleWarnMsgShow = () => {
    const fieldsError = this.props.form.getFieldsError();
    const errorArr = [];
    lodash.mapValues(fieldsError, (error) => {
      if (error) {
        errorArr.push(error);
      }
    });
    if (errorArr.length <= 0) {
      this.setState({
        isShowWarnMsg: true,
      });
    }
  };

  handleWarnMsgClose = () => {
    this.setState({
      isShowWarnMsg: false,
    });
  };

  // 弹窗按钮，用户确认再提交
  handleWarnMsgConfirm = () => {
    this.setState({
      isShowWarnMsg: false,
    });
    this.submitFn();
  };

  render() {
    const { form } = this.props;
    const { isShowWarnMsg } = this.state;
    return (
      <div className={`${styles.content} ${styles['black-scroll']}`}>
        <Row gutter={24}>
          <Col {...layout}>
            <Card
              title={formatMessageApi({
                Label_BIZ_Claim: 'Request Warn Message',
              })}
            >
              <Form layout="vertical">
                <FormItemInput form={form} formName="name" maxLength={10} labelId="Name" required />
                <FormItemInput form={form} formName="age" maxLength={10} labelId="Age" />
                <FormItemInput form={form} formName="weight" maxLength={10} labelId="Weight" />
                <Button
                  type="primary"
                  style={{ marginTop: '10px' }}
                  onClick={this.handleWarnMsgShow}
                >
                  Submit
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
        <ModalWarnMessage
          visible={isShowWarnMsg}
          onCancel={this.handleWarnMsgClose}
          onOk={this.handleWarnMsgConfirm}
          labelId="app.navigator.task-detail-policy-information-warn.msg.title"
          modalDetailText="是否确认提交?"
          okText={formatMessageApi({
            Label_BPM_Button: 'app.navigator.taskDetail.inquireForm.button.confirmAndContinue',
          })}
          cancelText={formatMessageApi({
            Label_BPM_Button: 'app.navigator.taskDetail.inquireForm.button.cancel',
          })}
        />
      </div>
    );
  }
}

export default RequestWarnMessage;
