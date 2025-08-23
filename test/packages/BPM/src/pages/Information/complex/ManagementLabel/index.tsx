import React, { useState, memo, useEffect, useContext } from 'react';
import { Input, Form, Row, Col } from 'antd';
import { connect } from 'dva';
import ErrorTooltip from '@/components/ErrorTooltip';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';
import context from 'navigator/components/CaseTaskDetail/Information/Context';

function ManagementLabel(props: any) {
  const [caseNoChanged, setCaseNoChanged] = useState(false);
  const { setLocalProcessInstanceId } = useContext(context);

  const { form, dispatch, informationData } = props;
  useEffect(() => {
    dispatch({
      type: 'navigatorInformationController/changeAddShowButton',
    });
  }, [informationData]);
  const { getFieldDecorator } = form;
  const formItemLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
    },
  };

  const handleBlur = async () => {
    (async () => {
      if (caseNoChanged) {
        await dispatch({
          type: 'informationController/clearInformation',
        });
        dispatch({
          type: 'navigatorInformationController/laterLoadInformationData',
        });
      }
    })();
    const caseNo = form.getFieldsValue()?.caseNo;

    setLocalProcessInstanceId(caseNo);
    setCaseNoChanged(false);
  };
  return (
    <div className={styles.wrap}>
      <Form layout="vertical" hideRequiredMark>
        <Row gutter={16}>
          <Col span={25}>
            <Form.Item
              {...formItemLayout}
              label={
                <ErrorTooltip
                  form={form}
                  formName="caseNo"
                  title={formatMessageApi({
                    Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
                  })}
                />
              }
            >
              {getFieldDecorator('caseNo', {
                rules: [],
              })(
                <Input
                  onBlur={handleBlur}
                  onChange={() => {
                    setCaseNoChanged(true);
                  }}
                  autoComplete="disable-chrome-autofill-mark"
                />
              )}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default memo(
  connect(({ navigatorInformationController }: any) => ({
    informationData: navigatorInformationController.informationData,
  }))(
    Form.create({
      onFieldsChange(props: any, changedFields) {
        const { dispatch } = props;
        dispatch({
          type: 'navigatorInformationController/changeInformationFields',
          payload: {
            changedFields,
          },
        });
      },
      mapPropsToFields(props: any) {
        const { informationData } = props;
        return formUtils.mapObjectToFields(informationData, {});
      },
    })(ManagementLabel)
  )
);
