import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import type { FormComponentProps } from 'antd/es/form';
import { Row, Col, Form } from 'antd';
import lodash from 'lodash';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormRegist from '@/components/FormRegistComponent';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Provider, withContextData } from '@/components/_store';
import ClaimRadio from '../_components/radio/ClaimRadio';
import IncidentList from './Incident';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  seriesNoOrigin: any[];
  seriesNoTarget: any[];
  originIncidentList: string[];
  targetIncidentList: string[];
  withData?: any;
  caseRemark: any;
  config: any;
  originClaimEntities?: any;
  targetClaimEntities?: any;
}

class IncidentSplit extends PureComponent<IProps> {
  seriesNoOrigin = {
    incidentList: [],
  };

  seriesNoTarget = {
    incidentList: [],
  };

  componentDidMount = () => {
    const { dispatch, withData, caseRemark } = this.props;
    const { processInstanceId } = withData?.taskDetail || {};
    if (!lodash.get(caseRemark, 'newRemark') && processInstanceId) {
      dispatch({
        type: 'caseSplitIncidentController/saveRemark',
        payload: {
          changedFields: {
            newRemark: lodash.replace(
              formatMessageApi({
                Label_COM_WarningMessage: 'venus-split_split-from-case',
              }),
              '{0}',
              processInstanceId
            ),
          },
        },
      });
    }
  };

  componentDidUpdate() {
    const { dispatch, seriesNoOrigin, seriesNoTarget } = this.props;
    if (!lodash.isEqual(this.seriesNoOrigin, seriesNoOrigin)) {
      dispatch({
        type: 'caseSplitIncidentController/saveSeriesNoOriginData',
        payload: {
          seriesNoOrigin: this.seriesNoOrigin,
        },
      });
    }
    if (!lodash.isEqual(this.seriesNoTarget, seriesNoTarget)) {
      dispatch({
        type: 'caseSplitIncidentController/saveSeriesNoTargetData',
        payload: {
          seriesNoTarget: this.seriesNoTarget,
        },
      });
    }
  }

  render() {
    const {
      originIncidentList,
      targetIncidentList,
      form,
      config,
      originClaimEntities,
      targetClaimEntities,
    } = this.props;
    const {
      case: { original, current },
    } = config;
    const isShow = (original ? original.isOption : false) || (current ? current.isOption : false);

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
                }}
              >
                <IncidentList
                  className="lf"
                  incidentList={originIncidentList}
                  seriesNoData={this.seriesNoOrigin}
                />
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
                }}
              >
                <IncidentList
                  className="rt"
                  incidentList={targetIncidentList}
                  seriesNoData={this.seriesNoTarget}
                />
              </Provider>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const FormWrap = Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch } = props;
    dispatch({
      type: 'caseSplitIncidentController/saveRemark',
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
})(FormRegist({ nameSpace: 'caseSplitController' })(IncidentSplit));

export default connect(({ caseSplitController, caseSplitIncidentController, loading }: any) => ({
  originIncidentList: caseSplitIncidentController.originClaimProcessData.incidentList,
  targetIncidentList: caseSplitIncidentController.targetClaimProcessData.incidentList,
  originClaimEntities: caseSplitIncidentController?.originClaimEntities,
  targetClaimEntities: caseSplitIncidentController?.targetClaimEntities,
  seriesNoOrigin: caseSplitIncidentController.seriesNoOrigin,
  seriesNoTarget: caseSplitIncidentController.seriesNoTarget,
  modalShow: caseSplitIncidentController.modalShow,
  caseRemark: caseSplitIncidentController.caseRemark,
  config: caseSplitController.config,
  loadingConfirm: loading.effects['caseSplitIncidentController/splitConfirm'],
}))(withContextData(FormWrap));
