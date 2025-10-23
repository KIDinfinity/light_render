import React from 'react';
import { Card, Form, Row, Col, Select, Input, Button, Alert } from 'antd';
import { history } from 'umi';
import { connect } from 'dva';
import lodash from 'lodash';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import ErrorTooltip from '@/components/ErrorTooltip';
import { formatMessageApi } from '@/utils/dictFormatMessage';

@connect(({ loading, commonCaseCreate }) => ({
  loading: loading.effects['commonCaseCreate/save'],
  processInstanceId: commonCaseCreate.processInstanceId,
  claimNo: commonCaseCreate.claimNo,
  taskId: commonCaseCreate.taskId,
  caseCategoryOptions: commonCaseCreate.caseCategoryOptions,
}))
@Form.create()
class CommonCreateCase extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'commonCaseCreate/loadCasaeCategory',
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll(async (error, values) => {
      if (!error) {
        dispatch({
          type: 'commonCaseCreate/save',
          payload: {
            caseCategory: values.caseCategory,
            variables: {
              applicant: values.insured.applicant,
            },
          },
        });
      }
    });
  };

  goToDetail = () => {
    const { taskId } = this.props;
    history.push(`/navigator/common/detail/${taskId}`);
  };

  render() {
    const { form, loading, caseCategoryOptions, processInstanceId } = this.props;
    const layout = {
      xs: { span: 24 },
      sm: { span: 11, offset: 1 },
      md: { span: 5, offset: 1 },
      lg: { span: 5, offset: 1 },
    };
    const { getFieldDecorator } = form;
    return (
      <PageHeaderWrapper
        title={formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.drawer.aiCircle.create-case.title',
        })}
      >
        <Card>
          <Form layout="vertical" onSubmit={this.handleSubmit}>
            <Row type="flex">
              <Col {...layout}>
                <Form.Item
                  label={
                    <ErrorTooltip
                      form={form}
                      formName="caseCategory"
                      title={formatMessageApi({
                        Label_BIZ_Claim:
                          'app.navigator.task-detail-of-data-capture.label.case-category',
                      })}
                    />
                  }
                >
                  {getFieldDecorator('caseCategory', {
                    rules: [{ required: true }],
                    initialValue: 'Claim Request',
                  })(
                    <Select>
                      {lodash.map(caseCategoryOptions, (item) => (
                        <Select.Option key={item.dictCode} value={item.dictCode}>
                          {item.dictName}
                        </Select.Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col {...layout}>
                <Form.Item
                  label={
                    <ErrorTooltip
                      form={form}
                      formName="insured.applicant"
                      title={formatMessageApi({
                        Label_BIZ_Claim:
                          'app.navigator.task-detail-of-data-capture.label.applicant',
                      })}
                    />
                  }
                >
                  {getFieldDecorator('insured.applicant', {
                    rules: [],
                    initialValue: '',
                  })(<Input autoComplete="disable-chrome-autofill-mark" />)}
                </Form.Item>
              </Col>
              <Col {...layout} style={{ display: 'flex', alignItems: 'center' }}>
                <Button loading={loading} onClick={this.handleSubmit} type="primary">
                  {formatMessageApi({
                    Label_BPM_Button: 'app.navigator.task-detail-of-data-capture.button.submit',
                  })}
                </Button>
              </Col>
            </Row>
            {processInstanceId && (
              <Alert
                message={<span>Case No.: {processInstanceId}</span>}
                type="success"
                style={{ marginBottom: 12 }}
              />
            )}
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}
export default CommonCreateCase;
