import React, { PureComponent } from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import lodash from 'lodash';
import { Form, Row, Col, Select, InputNumber } from 'antd';
import ChartPie from 'claim/components/ChartPie';
import { ECaseType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import { tenant } from '@/components/Tenant';
import { fnPrecisionFormat, fnPrecisionParser, precision } from '@/utils/precisionUtils';
import CaseCategory from 'enum/CaseCategory';
import styles from './index.less';

const { Option } = Select;
const FormItem = Form.Item;

interface ComponentProps {
  params?: any;
  currencyCode?: string;
  hiddenPrefix?: boolean;
  hiddenSuffix?: boolean;
  hiddenDropDown?: boolean;
  onSuffixChange?: Function;
  suffixEditable?: boolean;
}

class SummaryCurrencyPayableAmount extends PureComponent<ComponentProps> {
  state = {
    defaultCode: '',
    currencyConfig: [],
  };

  componentDidMount() {
    const { currencyCode } = this.props;

    this.setState({
      defaultCode: currencyCode || tenant.currency(),
      currencyConfig: tenant.currencyConfig(),
    });
  }

  get getSuffixCurrency() {
    const { suffixEditable, currencyCode, hiddenDropDown } = this.props;
    const { currencyConfig, defaultCode } = this.state;
    const code = currencyCode || defaultCode;

    return currencyConfig.length === 1 || hiddenDropDown ? (
      <span className={styles.suffix}>{code}</span>
    ) : (
      <span className={styles.suffix}>
        <Select
          value={code}
          style={{ width: 65 }}
          disabled={!suffixEditable}
          onChange={this.suffixChange}
        >
          {lodash.map(currencyConfig, (item: any) => (
            <Option value={item.currencyCode}>{item.currencyName}</Option>
          ))}
        </Select>
      </span>
    );
  }

  suffixChange = (currencyCode: string) => {
    const { onSuffixChange } = this.props;
    const { currencyConfig } = this.state;
    if (onSuffixChange) {
      const currentObject: any = lodash.find(currencyConfig, { currencyCode });
      onSuffixChange(currentObject || {});
    }
    this.setState({
      defaultCode: currencyCode,
    });
  };

  render() {
    const { params, currencyCode, withData = {}, hiddenPrefix, hiddenSuffix }: any = this.props;
    const { defaultCode, currencyConfig } = this.state;
    const { caseType }: any = withData || {};

    const code = currencyCode || defaultCode;

    const layout = {
      xs: { span: 12 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 12 },
    };
    const isForHongKong =
      params?.caseCategory === CaseCategory.HK_CLM_CTG001 ||
      params?.caseCategory === CaseCategory.HK_CLM_CTG002;

    const infoArray = [
      {
        key: isForHongKong
          ? 'IncidentPayoutAmount'
          : 'app.navigator.task-detail-of-claim-assessment.label.payable-amount',
        value: params?.totalPayableAmount || 0,
        isShow: ECaseType.originCase === caseType || lodash.isUndefined(caseType),
      },
      {
        key: 'venus_claim.label.totalClaimAdjustment',
        value: params?.totalClaimAdjustment || 0,
        isShow: !lodash.isUndefined(caseType) && ECaseType.originCase !== caseType,
      },
      {
        key: 'app.navigator.task-detail-of-claim-assessment.label.total-expense',
        value: params?.totalExpense || 0,
        isShow: lodash.isNumber(params.totalExpense),
      },
      {
        key: 'app.claim.label.uncover-amount',
        value: params?.uncoverAmount || 0,
        isShow: lodash.isNumber(params.uncoverAmount),
      },
    ];

    return (
      <div className={styles.content}>
        <Form layout="vertical">
          <Row gutter={24}>
            <Col {...layout}>
              <ChartPie
                // @ts-ignore
                height={120}
                percentValue={params?.percentValue || 0}
              />
            </Col>
            <Col {...layout}>
              {lodash.map(infoArray, (item: any, index: number) => {
                return item.isShow ? (
                  <FormItem
                    label={formatMessageApi({
                      Label_BIZ_Claim: item.key,
                    })}
                    key={`${item.key}-${index}`}
                  >
                    {!lodash.isEmpty(currencyConfig) && !lodash.isEmpty(code) && !hiddenPrefix && (
                      <span className={styles.prefix}>{tenant.getCurrencySymbol(code)}</span>
                    )}
                    <InputNumber
                      disabled
                      value={item.value}
                      formatter={fnPrecisionFormat as any}
                      parser={fnPrecisionParser as any}
                      precision={precision}
                    />
                    {!lodash.isEmpty(currencyConfig) &&
                      !lodash.isEmpty(code) &&
                      !hiddenSuffix &&
                      this.getSuffixCurrency}
                  </FormItem>
                ) : null;
              })}
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

export default SummaryCurrencyPayableAmount;
