import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import type { Dispatch } from 'redux';
import { get, filter } from 'lodash';
import type { FormComponentProps } from 'antd/es/form';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import { SplitDocumentType } from 'claim/pages/CaseSplit/_models/splitDocument/dto';
import Fence from '../../_components/Fence';
import styles from './styles.less';

const { create: FormCreate } = Form;
const policyInfoLayout = {
  fieldLayout: {
    xs: { span: 12 },
    sm: { span: 12 },
    md: { span: 12 },
    lg: { span: 12 },
  },
};

interface IProps extends FormComponentProps {
  splitDocumentType: SplitDocumentType;
  docListData: any;
  applicationNo: string;
  dispatch: Dispatch;
}

interface Ipolicy {
  isSelected: boolean;
  barId: string;
  barName: string;
  bpmDocumentId: string;
}

type IpolicyList = Record<number, Ipolicy>;

class SplitDocumentDocBaseInfo extends PureComponent<IProps> {
  get activedBars() {
    const { form } = this.props;
    const policy: IpolicyList = form.getFieldValue('policy');
    return filter(policy, (item: Ipolicy) => item.isSelected);
  }

  handleFenceClick = (barId: string) => {
    const { splitDocumentType, applicationNo, dispatch } = this.props;
    if (splitDocumentType === SplitDocumentType.OriginalDocument) {
      dispatch({
        type: 'caseSplitDocumentController/selectPolicy',
        payload: {
          splitDocumentType,
          applicationNo,
          barId,
        },
      });
    }
  };

  render() {
    const { form, splitDocumentType } = this.props;
    return (
      <Form layout="horizontal" className={styles.split_form}>
        <FormLayout json={policyInfoLayout}>
          <Form.Item label={formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.policyNo' })}>
            <Fence
              disabled={splitDocumentType === SplitDocumentType.NewDocument}
              bars={form.getFieldValue('policy')}
              activedBars={this.activedBars}
              onClick={this.handleFenceClick}
            />
          </Form.Item>
          <Form.Item label={formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.claimType' })}>
            <span>{form.getFieldValue('claimType')}</span>
          </Form.Item>
        </FormLayout>
      </Form>
    );
  }
}

const MappedSplitDocumentDocBaseInfo = FormCreate({
  mapPropsToFields: (props: any) => {
    return formUtils.mapObjectToFields(
      {
        claimType: props.claimData.claimType,
        policy: props.claimData.policy,
      },
      {
        claimType: (value: any) => value,
        policy: (value: any) => value,
      }
    );
  },
})(SplitDocumentDocBaseInfo);

export default connect((state: any, { splitDocumentType, applicationNo }: any) => ({
  claimData: get(
    state,
    `caseSplitDocumentController.${splitDocumentType}.${applicationNo}.claimData`
  ),
}))(MappedSplitDocumentDocBaseInfo);
