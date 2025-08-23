import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import memorizeOne from 'memoize-one';
import type { FormComponentProps } from 'antd/es/form';
import { Row, Col, Form } from 'antd';
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
    const { originClaimEntities, targetClaimEntities, form, config, withData = {} } = this.props;
    const {
      case: { original, current },
    } = config;
    const isShow = (original ? original.isOption : false) || (current ? current.isOption : false);

    const originPolicyList: any = groupByPolicyNoMemorized(originClaimEntities);
    const targetPolicyList: any = groupByPolicyNoMemorized(targetClaimEntities);

    return (
      <div className="split_content">
        <Row type="flex" gutter={32} justify="space-between">
          <Col className="split_content_lf" span={12}>
            <div className="modal_split_case_title">
              <div className="title_case">
                {formatMessageApi({
                  Label_BIZ_Claim: 'venus-split_current-case',
                })}
              </div>
              <div className="case_remark">
                <Form layout="vertical">
                  <FormItemInput
                    form={form}
                    required
                    formName="originalRemark"
                    maxLength={240}
                    labelId="venus-split_split-remark"
                  />
                </Form>
              </div>
            </div>
            <div className="scroll_container scroll_lt">
              <Provider
                data={{
                  isOrigin: true,
                  incidentListMap: originClaimEntities?.incidentListMap,
                  treatmentListMap: originClaimEntities?.treatmentListMap,
                  ...withData,
                }}
              >
                <PolicyList className="lf" policyList={originPolicyList} />
              </Provider>
            </div>
          </Col>
          <Col className="split_content_rt" span={12}>
            <div className="modal_split_case_title">
              <div className="title_case">
                {formatMessageApi({
                  Label_BIZ_Claim: 'venus-split_new-case',
                })}
              </div>
              <div className="case_remark">
                <Form layout="vertical">
                  <FormItemInput
                    form={form}
                    required
                    formName="newRemark"
                    maxLength={240}
                    labelId="venus-split_split-remark"
                  />
                </Form>
              </div>
            </div>
            <ClaimRadio />
            <div
              className="scroll_container scroll_rt"
              style={{ height: isShow ? '415px' : '455px' }}
            >
              <Provider
                data={{
                  isOrigin: false,
                  incidentListMap: targetClaimEntities?.incidentListMap,
                  treatmentListMap: targetClaimEntities?.treatmentListMap,
                  ...withData
                }}
              >
                <PolicyList className="rt" policyList={targetPolicyList} />
              </Provider>
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
