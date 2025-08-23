import React, { PureComponent } from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'dva';
import { replace, get } from 'lodash';
import { Row, Col, Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import { formUtils } from 'basic/components/Form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import {
  SplitClaimTypes,
  SplitDocumentType,
} from 'claim/pages/CaseSplit/_models/splitDocument/dto';
import FormRegist from '@/components/FormRegistComponent';
import { withContextData } from '@/components/_store';
import SplitClaimType from './SplitClaimType';
import ApplicationList from './Application';

const { create: FormCreate } = Form;

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  taskDetail: any;
  splitConfig: any;
  caseRemark: any;
  isNewClaimNo: any;
  documentEntities: any;
  claimEntities: any;
  withData?: any;
}

class SplitDocument extends PureComponent<IProps> {
  componentDidMount = () => {
    const { dispatch, withData, caseRemark } = this.props;

    if (!caseRemark.newRemark) {
      dispatch({
        type: 'caseSplitDocumentController/saveRemark',
        payload: {
          changedFields: {
            newRemark: replace(
              formatMessageApi({
                Label_COM_WarningMessage: 'venus-split_split-from-case',
              }),
              '{0}',
              withData?.taskDetail?.processInstanceId
            ),
          },
        },
      });
    }
  };

  changeSplitClaimType = (splitClaimType: any) => {
    this.props.dispatch({
      type: 'caseSplitDocumentController/changeSplitClaimType',
      payload: { isNewClaimNo: splitClaimType === SplitClaimTypes.NewClaim },
    });
  };

  render() {
    const { form, splitConfig, isNewClaimNo } = this.props;

    // 对后台返回的配置（splitConfig）有点疑问，根据 VENUSJP-1667 要求暂时写死
    const config = { original: { isDefault: true, isOption: false } } || splitConfig.case;

    const currentClaimType = isNewClaimNo
      ? SplitClaimTypes.NewClaim
      : SplitClaimTypes.OriginalClaim;

    return (
      <div className="split_content">
        <Row type="flex" gutter={32} justify="space-between">
          <Col className="split_content_lf" span={12}>
            <div className="modal_split_case_title">
              {/* current case title */}
              <div className="title_case">
                {formatMessageApi({
                  Label_BIZ_Claim: 'venus-split_current-case',
                })}
              </div>
              {/* current case remark */}
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
              <ApplicationList
                className="lf"
                splitDocumentType={SplitDocumentType.OriginalDocument}
              />
            </div>
          </Col>
          <Col className="split_content_rt" span={12}>
            <div className="modal_split_case_title">
              {/* new case title */}
              <div className="title_case">
                {formatMessageApi({
                  Label_BIZ_Claim: 'venus-split_new-case',
                })}
              </div>
              {/* new case remark */}
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
            <div className="scroll_container scroll_rt">
              <ApplicationList className="rt" splitDocumentType={SplitDocumentType.NewDocument} />
            </div>
            <SplitClaimType
              config={config}
              currentClaimType={currentClaimType}
              onChange={this.changeSplitClaimType}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const MappedSplitDocument = FormCreate({
  mapPropsToFields: (props: any) => {
    return formUtils.mapObjectToFields(props.caseRemark, {
      originalRemark: (value: any) => value,
      newRemark: (value: any) => value,
    });
  },
  onFieldsChange: (props, changedFields) => {
    props.dispatch({
      type: 'caseSplitDocumentController/saveRemark',
      payload: {
        changedFields,
      },
    });
  },
})(FormRegist({ nameSpace: 'caseSplitController' })(SplitDocument));

export default connect((state: any) => ({
  splitConfig: get(state, `caseSplitController.config`),
  caseRemark: get(state, `caseSplitDocumentController.caseRemark`),
  isNewClaimNo: get(state, `caseSplitDocumentController.isNewClaimNo`),
}))(withContextData(MappedSplitDocument));
