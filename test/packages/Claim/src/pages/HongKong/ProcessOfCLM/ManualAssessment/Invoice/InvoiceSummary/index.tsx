import React, { PureComponent } from 'react';
import { Form, Row, Col } from 'antd';
import ChartPie from 'claim/components/ChartPie';
import { connect } from 'dva';
import { calculatPayableProportionInvoiceLevel } from '../../_models/functions/calculatePayoutAmount';
import InvoiceSummaryBasicInfo from './InvoiceSummaryBasicInfo';

import styles from './index.less';

interface ComponentProps {
  params?: any;
  invoiceId?: string;
}

const mapStateToProps = ({ HKCLMOfClaimAssessmentController }: any, { invoiceId }: any) => {
  const { claimEntities } = HKCLMOfClaimAssessmentController;
  const percentValue = calculatPayableProportionInvoiceLevel(claimEntities, invoiceId);
  return {
    percentValue,
  };
};

@connect(mapStateToProps)
class SummaryCurrencyPayableAmount extends PureComponent<ComponentProps> {
  render() {
    const { percentValue, invoiceId } = this.props;
    const layout = {
      xs: { span: 12 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 12 },
    };

    return (
      <div className={styles.content}>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col {...layout}>
              <ChartPie height={120} percentValue={percentValue || 0} />
            </Col>
            <Col {...layout}>
              <InvoiceSummaryBasicInfo invoiceId={invoiceId} />
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default SummaryCurrencyPayableAmount;
