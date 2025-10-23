import React, { Component } from 'react';
import type { Dispatch } from 'redux';
import { connect } from 'dva';
import { Radio } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './claimRadio.less';
import type { ESplitTypes } from '../../_models/dto/splitTypes';

const options = [
  {
    label: formatMessageApi({
      Label_BIZ_Claim: 'venus-split_split-with-new-claim-no',
    }),
    value: 1,
  },
  {
    label: formatMessageApi({
      Label_BIZ_Claim: 'venus-split_split-with-original-claim-no',
    }),
    value: 2,
  },
];

interface IProps {
  dispatch: Dispatch<any>;
  config: any;
  splitType: ESplitTypes;
  isIncidentNewClaimNo: boolean;
  isPolicyNewClaimNo: boolean;
}

interface IState {
  isShow: boolean;
}

class ClaimAudio extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);

    this.state = {
      isShow: false,
    };
  }

  componentDidMount() {
    const { dispatch, config, splitType } = this.props;
    const {
      case: { original, current },
    } = config;

    // '有 original 配置' 且 'original 是默认选项'
    // 并且
    // '无 current 配置' 或 'current 不是默认选项'
    // 则表示默认选择为 original
    const isOriginalClaimNo = original && original.isDefault && (!current || !current.isDefault);

    // 只要 original 或者 current 的 isOption 为 true，则表示需要展示 UI 以供选择
    const isShow = (original ? original.isOption : false) || (current ? current.isOption : false);

    this.setState({ isShow });

    if (splitType === 0) {
      dispatch({
        type: 'caseSplitPolicyController/determinateClaimNo',
        payload: { isNewClaimNo: !isOriginalClaimNo },
      });
    } else {
      dispatch({
        type: 'caseSplitIncidentController/determinateClaimNo',
        payload: { isNewClaimNo: !isOriginalClaimNo },
      });
    }
  }

  onChange = (e) => {
    const { dispatch, splitType } = this.props;
    const {
      target: { value },
    } = e;

    if (splitType === 0) {
      dispatch({
        type: 'caseSplitPolicyController/determinateClaimNo',
        payload: { isNewClaimNo: value === 1 },
      });
    } else {
      dispatch({
        type: 'caseSplitIncidentController/determinateClaimNo',
        payload: { isNewClaimNo: value === 1 },
      });
    }
  };

  render() {
    const { isIncidentNewClaimNo, isPolicyNewClaimNo, splitType } = this.props;
    const { isShow } = this.state;
    let isNewClaimNo;
    if (splitType === 0) {
      isNewClaimNo = isPolicyNewClaimNo;
    } else {
      isNewClaimNo = isIncidentNewClaimNo;
    }
    const currentValue = isNewClaimNo ? 1 : 2;

    return (
      <div className={styles.claim_split} style={{ display: isShow ? 'block' : 'none' }}>
        <Radio.Group options={options} onChange={this.onChange} value={currentValue} />
      </div>
    );
  }
}

export default connect(
  ({ caseSplitController, caseSplitPolicyController, caseSplitIncidentController }: any) => ({
    splitType: caseSplitController.splitType,
    config: caseSplitController.config,
    isIncidentNewClaimNo: caseSplitIncidentController.isNewClaimNo,
    isPolicyNewClaimNo: caseSplitPolicyController.isNewClaimNo,
  })
)(ClaimAudio);
