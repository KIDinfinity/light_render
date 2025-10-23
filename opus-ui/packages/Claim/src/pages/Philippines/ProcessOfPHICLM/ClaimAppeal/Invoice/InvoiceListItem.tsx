import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Col, Row } from 'antd';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Compare from 'claim/pages/AppealCase/ManualAssessment/_components/Compare';
import { withContextData } from '@/components/_store';
import { ESectionType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import SummaryPayableAmount from './SummaryAmount';
import InvoiceListItemOfBasicInfo from './InvoiceListItemOfBasicInfo';
import InvoicePayableList from './InvoicePayableList';

const mapStateToProps = (
  { PHCLMOfAppealCaseController, MaAppealCaseController }: any,
  { invoiceId }: any
) => {
  const invoiceItem = lodash.get(
    PHCLMOfAppealCaseController,
    `claimEntities.invoiceListMap.${invoiceId}`
  );
  return {
    invoiceNo: formUtils.queryValue(lodash.get(invoiceItem, 'invoiceNo')),
    expense: formUtils.queryValue(lodash.get(invoiceItem, 'expense')),
    invoiceDate: formUtils.queryValue(lodash.get(invoiceItem, 'invoiceDate')),
    appealPage: MaAppealCaseController.appealPage,
  };
};

@connect(mapStateToProps)
class InvoiceListItem extends PureComponent {
  state = {
    expandedInvoice: false,
  };

  handleBtnClick = (open: boolean) => {
    const { withData, dispatch, appealPage } = this.props;
    const { expandedInvoice } = this.state;
    const { expandedIncident, expandedTreatment }: any = withData || {};
    if (lodash.isUndefined(open) && !expandedIncident && !expandedTreatment && appealPage === 0)
      return;
    if (lodash.isUndefined(open) && expandedIncident && expandedTreatment && appealPage === 1)
      return;

    this.setState((preState: any) => {
      return {
        ...preState,
        expandedInvoice: lodash.isBoolean(open) ? open : !preState.expandedInvoice,
      };
    });

    if (
      ((!expandedIncident && !expandedTreatment) || expandedIncident || expandedTreatment) &&
      !expandedInvoice &&
      lodash.isBoolean(open)
    ) {
      dispatch({
        type: 'MaAppealCaseController/saveCurrentPage',
        payload: {
          position: 1,
        },
      });
    }
  };

  render() {
    const {
      incidentId,
      treatmentId,
      invoiceId,
      invoiceDate,
      invoiceNo,
      invoiceListFromEntities,
      appealPage,
      withData,
    }: any = this.props;
    const { expandedIncident, expandedTreatment }: any = withData || {};
    const { expandedInvoice } = this.state;

    let spanInvoice = 24;

    // if (appealPage === 1) {
    //   spanInvoice = 24;
    // }

    if (
      (((!expandedIncident && !expandedTreatment) ||
        (expandedIncident && !expandedTreatment) ||
        (!expandedIncident && expandedTreatment)) &&
        appealPage === 1) ||
      appealPage > 1
    ) {
      spanInvoice = 12;
    }

    if (expandedIncident && expandedTreatment && appealPage === 1) {
      spanInvoice = 24;
    }

    return (
      <Row type="flex" gutter={24}>
        <Compare
          sectionType={ESectionType.Invoice}
          expandOrigin={expandedInvoice}
          handleBtnClick={this.handleBtnClick}
        >
          <Col span={spanInvoice}>
            <Card
              title={`${formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.invoice-no',
              })} ${invoiceNo}`}
              bordered={false}
              extra={<span>{moment(invoiceDate).format('L')}</span>}
            >
              <SummaryPayableAmount invoiceId={invoiceId} />
              <InvoicePayableList
                incidentId={incidentId}
                treatmentId={treatmentId}
                invoiceId={invoiceId}
              />
              <InvoiceListItemOfBasicInfo
                invoiceId={invoiceId}
                invoiceListFromEntities={invoiceListFromEntities}
              />
            </Card>
          </Col>
        </Compare>
      </Row>
    );
  }
}

export default withContextData(InvoiceListItem);
