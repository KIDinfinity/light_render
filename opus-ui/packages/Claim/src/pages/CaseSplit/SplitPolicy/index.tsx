import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import memorizeOne from 'memoize-one';
import type { FormComponentProps } from 'antd/es/form';
import { Row, Col, Form, Card } from 'antd';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';
import { ESplitTypes } from 'claim/pages/CaseSplit/_models/dto/splitTypes';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { groupByPolicyNo } from 'claim/pages/CaseSplit/_models/functions';
import FormRegist from '@/components/FormRegistComponent';
import { formUtils } from 'basic/components/Form';
import { Provider, withContextData } from '@/components/_store';

import ClaimRadio from '../_components/radio/ClaimRadio';
import PolicyList from './Policy';
import styles from '../caseSplit.less';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  originPolicyList: string[];
  targetPolicyList: string[];
  originPolicyLength: number;
  originClaimProcessData: any;
  withData?: any;
  caseRemark: any;
  config: any;
  originClaimEntities?: any;
  targetClaimEntities?: any;
}

const groupByPolicyNoMemorized = memorizeOne(groupByPolicyNo);
class CaseSplit extends PureComponent<IProps> {
  componentDidMount = () => {
    this.updatePolicyLength();

    const { dispatch, withData, caseRemark }: any = this.props;
    const { splitType, taskDetail } = withData || {};
    const isDiffIncidentNo = splitType === ESplitTypes.DifferentIncidentNo;
    const isTH = tenant.isTH();

    const { processInstanceId } = taskDetail || {};
    const remarkTemp = {
      newRemark: lodash.replace(
        formatMessageApi({
          Label_COM_WarningMessage: 'venus-split_split-from-case',
        }),
        '{0}',
        processInstanceId
      ),
      originalRemark: '',
    };

    if (isTH && isDiffIncidentNo) {
      remarkTemp.newRemark = 'Pay to Hospital';
      remarkTemp.originalRemark = 'Pay to Customer';
    }

    if (!lodash.get(caseRemark, 'newRemark') || (isTH && isDiffIncidentNo)) {
      dispatch({
        type: 'caseSplitPolicyController/saveRemark',
        payload: {
          changedFields: {
            newRemark: remarkTemp.newRemark,
          },
        },
      });
    }

    if (!lodash.get(caseRemark, 'originalRemark') && isTH && isDiffIncidentNo) {
      dispatch({
        type: 'caseSplitPolicyController/saveRemark',
        payload: {
          changedFields: {
            originalRemark: remarkTemp.originalRemark,
          },
        },
      });
    }
  };

  componentDidUpdate(prevProps: any) {
    const { originClaimEntities } = this.props;
    const prevOriginPolicyList = groupByPolicyNoMemorized(prevProps.originClaimEntities);
    const originPolicyList = groupByPolicyNoMemorized(originClaimEntities);
    if (!lodash.isEqual(prevOriginPolicyList, originPolicyList)) {
      this.updatePolicyLength();
    }
  }

  updatePolicyLength = () => {
    const { dispatch, originClaimEntities } = this.props;

    const originPolicyList = groupByPolicyNoMemorized(originClaimEntities);

    dispatch({
      type: 'caseSplitPolicyController/originPolicyLength',
      payload: {
        originPolicyLength: Object.keys(originPolicyList).length,
      },
    });
  };

  render() {
    const { originClaimEntities, targetClaimEntities, form, config } = this.props;
    const {
      case: { original, current },
    } = config;
    const isShow = (original ? original.isOption : false) || (current ? current.isOption : false);

    const originPolicyList: any = groupByPolicyNoMemorized(originClaimEntities);
    const targetPolicyList: any = groupByPolicyNoMemorized(targetClaimEntities);
    const titleContent1 = formatMessageApi({
      Label_BIZ_Claim: 'venus-split_current-case',
    });
    const titleContent2 = formatMessageApi({
      Label_BIZ_Claim: 'venus-split_new-case',
    });

    return (
      <div className="split_content">
        <Row type="flex" gutter={32} justify="space-between">
          <Col className="split_content_lf" span={12}>
            <div className={styles.split_content_lf_container}>
              <Card
                style={{ borderRadius: '6px' }}
                className={styles.splitCard}
                title={<div className={styles.titleStyle}>{titleContent1}</div>}
              >
                <Form layout="vertical">
                  <FormItemInput
                    form={form}
                    required
                    formName="originalRemark"
                    maxLength={240}
                    labelId="splitRemark"
                  />
                </Form>
              </Card>
              <div className="scroll_container scroll_lt">
                <Provider
                  data={{
                    isOrigin: true,
                    incidentListMap: originClaimEntities?.incidentListMap,
                    treatmentListMap: originClaimEntities?.treatmentListMap,
                  }}
                >
                  <PolicyList className="lf" policyList={originPolicyList} />
                </Provider>
              </div>
            </div>
          </Col>
          <Col className="split_content_rt" span={12}>
            <div className={styles.split_content_rt_container}>
              <Card
                style={{ borderRadius: '6px' }}
                className={styles.splitCard}
                title={<div className={styles.titleStyle}>{titleContent2}</div>}
              >
                <Form layout="vertical">
                  <FormItemInput
                    form={form}
                    required
                    formName="newRemark"
                    maxLength={240}
                    labelId="splitRemark"
                  />
                </Form>
              </Card>
              <ClaimRadio />
              <div className="scroll_container">
                <Provider
                  data={{
                    isOrigin: false,
                    incidentListMap: targetClaimEntities?.incidentListMap,
                    treatmentListMap: targetClaimEntities?.treatmentListMap,
                  }}
                >
                  <PolicyList className="rt" policyList={targetPolicyList} />
                </Provider>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const FormWraped = Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch } = props;

    dispatch({
      type: 'caseSplitPolicyController/saveRemark',
      payload: {
        changedFields,
      },
    });
  },
  mapPropsToFields(props: any) {
    const { caseRemark } = props;

    return formUtils.mapObjectToFields(caseRemark, {
      originalRemark: (value: any) => value,
      newRemark: (value: any) => value,
    });
  },
})(FormRegist({ nameSpace: 'caseSplitController' })(withContextData(CaseSplit)));

export default connect(({ caseSplitController, caseSplitPolicyController, loading }: any) => ({
  originClaimEntities: caseSplitPolicyController.originClaimEntities,
  targetClaimEntities: caseSplitPolicyController.targetClaimEntities,
  modalShow: caseSplitPolicyController.modalShow,
  caseRemark: caseSplitPolicyController.caseRemark,
  config: caseSplitController.config,
  loadingConfirm: loading.effects['caseSplitPolicyController/splitConfirm'],
}))(FormWraped);
