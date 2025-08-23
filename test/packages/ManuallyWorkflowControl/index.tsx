import React, { useCallback, useMemo } from 'react';
import { Card, Form, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { FormItemInput, FormItemSelect, formUtils } from 'basic/components/Form';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { EFormDataKey } from './enums';
import styles from './index.less';

function ManuallyWorkflowControl({ form, formData, targetActivitiesList, dispatch }: any) {
  const hasRequiredIsEmpty: boolean = lodash
    .chain(formData)
    .pick(lodash.values(EFormDataKey))
    .values()
    .some((item: string) => lodash.isEmpty(item))
    .value();
  const caseNoIsEmpty: boolean = lodash.chain(formData).get('caseNo').isEmpty().value();

  const caseNoFn = useCallback((ev) => {
    dispatch({
      type: 'manuallyWorkflowController/changeCaseNo',
      payload: {
        caseNo: ev?.target?.value,
      },
    });
  }, []);

  const confirmFn = useCallback(() => {
    dispatch({
      type: 'manuallyWorkflowController/confirmData',
    });
  }, []);

  return useMemo(
    () => (
      <Card className={styles.manuallyWorkflowControl}>
        <Form>
          <Row gutter={16}>
            <Col span={12}>
              <FormItemInput
                labelId={formatMessageApi({ Label_BPM_CaseInfo: 'CaseNo' })}
                form={form}
                formName="caseNo"
                trigger="onBlur"
                required
                onBlur={caseNoFn}
              />
            </Col>
            <Col span={12}>
              <FormItemInput
                labelId={formatMessageApi({ Label_BPM_CaseInfo: 'CaseCategory' })}
                form={form}
                formName="caseCategory"
                disabled
              />
            </Col>
            <Col span={12}>
              <FormItemInput
                labelId={formatMessageApi({ Label_BPM_CaseInfo: 'CurrentActivity' })}
                form={form}
                formName="currentActivityKey"
                disabled
              />
            </Col>
            <Col span={12}>
              <FormItemSelect
                labelId={formatMessageApi({ Label_BPM_CaseInfo: 'TargetActivity' })}
                form={form}
                formName="targetActivityKey"
                dicts={targetActivitiesList}
                required={!caseNoIsEmpty}
                disabled={caseNoIsEmpty}
              />
            </Col>
            <Col span={24} className={styles.center}>
              <Button disabled={hasRequiredIsEmpty} onClick={confirmFn}>
                {formatMessageApi({ Label_BPM_CaseInfo: 'Confirm' })}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    ),
    [formData, targetActivitiesList]
  );
}

const FormWrapped = Form.create({
  onValuesChange: (props: any, changedValues: any) => {
    const { dispatch } = props;
    dispatch({
      type: 'manuallyWorkflowController/saveFormData',
      payload: changedValues,
    });
  },
  mapPropsToFields: (props: any) => {
    const { formData } = props;
    return formUtils.mapObjectToFields(formData, {
      caseCategory: () => formatMessageApi({ Label_BPM_CaseCategory: formData?.caseCategory }),
      currentActivityKey: () => formatMessageApi({ activity: formData?.currentActivityKey }),
    });
  },
})(ManuallyWorkflowControl);

export default connect(({ manuallyWorkflowController }: any) => ({
  formData: manuallyWorkflowController?.formData,
  targetActivitiesList: manuallyWorkflowController?.targetActivitiesList,
}))(FormWrapped);
