// import ErrorTooltip from '@/components/ErrorTooltip';
import React, { Component } from 'react';
import { Form, Button, Input, InputNumber, Select, Radio, Row, Col, Card } from 'antd';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import AniBtn from '../Motion/MoneyBtn';

const { Option } = Select;
const { Group } = Radio;

@connect(({ workspaceCases }) => ({
  type: workspaceCases.type,
}))
@Form.create()
class Create extends Component {
  state = {};

  validate = () => {
    // this.AniBtn.onStart(1);

    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      const submitData = {
        ...values,
      };
      // submitData.applicant.remainingTime = Number(values.applicant.remainingTime);
      if (!error) {
        // submit the values
        dispatch({
          type: 'workspaceCases/startCase',
          payload: {
            // processDefinitionId: submitData.applicant?.processDefinitionId,
            caseCategory: submitData.applicant?.caseCategory,
            variables: {
              applicant: submitData.applicant?.applicant,
              taskStatus: submitData.applicant?.taskStatus,
              remainingTime: submitData.applicant?.remainingTime,
              caseCategory: submitData.applicant?.caseCategory,
              isUrgent: submitData.applicant?.isUrgent,
              insured: submitData.applicant?.insured,
            },
          },
        });
      }
    });
  };

  onReject = () => {
    // this.AniBtn.onStart(0);
  };

  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 17, offset: 1 },
    };

    return (
      <PageHeaderWrapper
        title={formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.drawer.aiCircle.create-case.title',
        })}
      >
        <Card style={{ position: 'relative' }}>
          <Form hideRequiredMark>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="申请人" colon={false} {...formItemLayout}>
                  {getFieldDecorator('applicant.applicant', {
                    rules: [{ required: true, message: '请输入名字' }],
                  })(
                    <Input placeholder="请输入名字" autoComplete="disable-chrome-autofill-mark" />
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="任务状态" colon={false} {...formItemLayout}>
                  {getFieldDecorator('applicant.taskStatus', {
                    rules: [{ required: true, message: '任务状态' }],
                  })(
                    <Select showSearch placeholder="任务状态">
                      <Option value="todo">TO Do</Option>
                      <Option value="pending">Pending</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="剩余时间" colon={false} {...formItemLayout}>
                  {getFieldDecorator('applicant.remainingTime', {
                    rules: [{ required: true, message: '请输入剩余时间' }],
                  })(<InputNumber placeholder="请输入剩余时间" style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <Form.Item label="申请类型" colon={false} {...formItemLayout}>
                  {getFieldDecorator('applicant.caseCategory', {
                    rules: [{ required: true, message: '请选择申请类型' }],
                  })(
                    <Select showSearch placeholder="请选择申请类型">
                      <Option value="Claim Request">Claim Request</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="紧急程度" colon={false} {...formItemLayout}>
                  {getFieldDecorator('applicant.isUrgent', {
                    rules: [{ required: true, message: '请选择紧急程度' }],
                  })(
                    <Group onChange={this.onChange}>
                      <Radio value={1}>紧急</Radio>
                      <Radio value={0}>不紧急</Radio>
                    </Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="被保险人" colon={false} {...formItemLayout}>
                  {getFieldDecorator('applicant.insured', {
                    rules: [{ required: true, message: '请输入被保险人' }],
                  })(
                    <Input
                      placeholder="请输入被保险人"
                      autoComplete="disable-chrome-autofill-mark"
                    />
                  )}
                </Form.Item>
              </Col>
            </Row>
            {/* <Row gutter={8}>
              <Col span={8}>
                <Form.Item label={
                  <ErrorTooltip
                    form={form} formName="applicant.applicant" title="processDefinitionId" />
                }  colon={false} {...formItemLayout}>
                  {getFieldDecorator('applicant.processDefinitionId', {
                    rules: [{ required: true, message: '请输入processDefinitionId' }],
                  })(<Input placeholder="请输入processDefinitionId"  autoComplete="disable-chrome-autofill-mark" />)}
                </Form.Item>
              </Col>
            </Row> */}
          </Form>
          {/* <AniBtn
            ref={c => {
              this.AniBtn = c;
            }}
            basicToDuration={1200}
            randomToDuration={800}
            amount={5}
          > */}
          <Button type="primary" onClick={this.validate}>
            提交
          </Button>
          {/* </AniBtn> */}
          &emsp;
          {/* <AniBtn
            ref={c => {
              this.AniBtn = c;
            }}
            basicToDuration={1000}
            randomToDuration={400}
            amount={8}
          > */}
          <Button onClick={this.onReject}>拒绝</Button>
          {/* </AniBtn> */}
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Create;
