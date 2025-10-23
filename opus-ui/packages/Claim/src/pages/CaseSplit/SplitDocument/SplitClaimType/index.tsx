import React, { Component } from 'react';
import { Radio } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { SplitClaimTypes } from 'claim/pages/CaseSplit/_models/splitDocument/dto';
import styles from './styles.less';

const options = [
  {
    label: formatMessageApi({
      Label_BIZ_Claim: SplitClaimTypes.NewClaim,
    }),
    value: SplitClaimTypes.NewClaim,
  },
  {
    label: formatMessageApi({
      Label_BIZ_Claim: SplitClaimTypes.OriginalClaim,
    }),
    value: SplitClaimTypes.OriginalClaim,
  },
];

interface IProps {
  config: any;
  currentClaimType: any;
  onChange: any;
}

interface iStates {
  isShow: boolean;
}

export default class extends Component<IProps, iStates> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      isShow: false,
    };
  }

  componentDidMount() {
    const {
      config: { original, current },
      onChange,
    } = this.props;

    // '有 original 配置' 且 'original 是默认选项'
    // 并且
    // '无 current 配置' 或 'current 不是默认选项'
    // 则表示默认选择为 original
    const isOriginalClaimNo = original && original.isDefault && (!current || !current.isDefault);

    // 只要 original 或者 current 的 isOption 为 true，则表示需要展示 UI 以供选择
    const isShow = (original ? original.isOption : false) || (current ? current.isOption : false);

    onChange(isOriginalClaimNo ? SplitClaimTypes.OriginalClaim : SplitClaimTypes.NewClaim);

    this.setState({ isShow });
  }

  render() {
    const { currentClaimType, onChange } = this.props;
    const { isShow } = this.state;
    const handlerChange = (e: any) => onChange(e.target.value);

    return (
      <div className={styles.claim_split} style={{ display: isShow ? 'block' : 'none' }}>
        <Radio.Group options={options} value={currentClaimType} onChange={handlerChange} />
      </div>
    );
  }
}
