import { formatMessageApi } from '@/utils/dictFormatMessage';
import React from 'react';
import lodash from 'lodash';
import { Form, Row, Col, InputNumber } from 'antd';
import ChartPie from 'claim/components/ChartPie';
import { withContextData } from '@/components/_store';
import { fnPrecisionFormat, fnPrecisionParser, precision } from '@/utils/precisionUtils';
import { ECaseType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import FormLabel from './FormLabel';

import styles from './index.less';

const FormItem = Form.Item;

const SummaryPayableAmount = ({ params, withData = {} }) => {
  const layout = {
    xs: { span: 12 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 12 },
  };

  const { caseType }: any = withData || {};

  return (
    <div className={styles.content}>
      <Form layout="vertical">
        <Row gutter={24}>
          <Col {...layout}>
            <ChartPie
              height={120}
              width={120}
              percentValue={
                (caseType || lodash.isUndefined(caseType)
                  ? params?.percentValue
                  : params?.percentValueAdjustment) || 0
              }
            />
          </Col>
          <Col {...layout}>
            {(ECaseType.originCase === caseType || lodash.isUndefined(caseType)) && (
              <FormItem
                label={formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.label.payable-amount',
                })}
              >
                <InputNumber
                  disabled
                  value={params?.totalPayableAmount || 0}
                  formatter={fnPrecisionFormat}
                  parser={fnPrecisionParser}
                  precision={precision}
                />
              </FormItem>
            )}
            {!lodash.isUndefined(caseType) && ECaseType.originCase !== caseType && (
              <FormItem
                label={
                  <FormLabel
                    labelText={formatMessageApi({
                      Label_BIZ_Claim: 'venus_claim.label.totalClaimAdjustment',
                    })}
                    labelIconText={formatMessageApi({
                      Label_BPM_Button: 'document.update',
                    })}
                    show={(params?.totalClaimAdjustment || 0) !== 0}
                  />
                }
              >
                <InputNumber
                  value={params?.totalClaimAdjustment || 0}
                  formatter={fnPrecisionFormat}
                  parser={fnPrecisionParser}
                  precision={precision}
                  disabled
                />
              </FormItem>
            )}

            {lodash.isNumber(params?.totalExpense) && (
              <FormItem
                label={formatMessageApi({
                  Label_BIZ_Claim:
                    'app.navigator.task-detail-of-claim-assessment.label.total-expense',
                })}
              >
                <InputNumber
                  disabled
                  value={params?.totalExpense || 0}
                  formatter={fnPrecisionFormat}
                  parser={fnPrecisionParser}
                  precision={precision}
                />
              </FormItem>
            )}
            {lodash.isNumber(params?.uncoverAmount) && (
              <FormItem
                label={formatMessageApi({
                  Label_BIZ_Claim: 'app.claim.label.uncover-amount',
                })}
              >
                <InputNumber
                  disabled
                  value={params?.uncoverAmount || 0}
                  formatter={fnPrecisionFormat}
                  parser={fnPrecisionParser}
                  precision={precision}
                />
              </FormItem>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default withContextData(SummaryPayableAmount);
