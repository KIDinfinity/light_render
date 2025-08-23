import React, { Component } from 'react';
import { Tooltip, Icon } from 'antd';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import { ReactComponent as WarningIcon } from 'claim/assets/warning.svg';
import { formUtils } from 'basic/components/Form';
import{ v4 as  uuidv4 } from 'uuid';
import { connect } from 'dva';
import styles from './index.less';

@connect()
export default class ErrorTooltipManual extends Component<any> {
  saveErrorRef = false;

  errorRefId = uuidv4();

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    // 创建一个 ref 来存储 nodeRef 的 实例元素
    this.nodeRef = React.createRef();
  }

  componentDidMount() {
    const { error } = this.props;
    formUtils.saveErrorRef.call(this);
  }

  componentWillUnmount() {
    formUtils.removeErrorRef.call(this);
  }

  onMouseEnterFn = () => {
    this.setState({
      visible: true,
    });
  };

  onMouseLeaveFn = () => {
    this.setState({
      visible: false,
    });
  };

  onVisibleFocusFn = () => {
    this.setState({ visible: true });
  };

  render() {
    const { manualErrorMessage, className, style, open, isWarning } = this.props;
    const { visible } = this.state;
    return (
      <div
        className={styles.ErrorTooltip + (className ? ` ${className}` : '')}
        style={style}
        onMouseEnter={this.onMouseEnterFn}
        onMouseLeave={this.onMouseLeaveFn}
      >
        <Tooltip
          arrowPointAtCenter
          placement="topLeft"
          overlayClassName={isWarning ? styles.myWarningTooltip : styles.myErrorTooltip}
          title={manualErrorMessage}
          ref={this.nodeRef}
          visible={!open && visible && Boolean(manualErrorMessage)}
          onVisibleFocus={this.onVisibleFocusFn}
        >
          <Icon className={styles.icon} component={isWarning ? WarningIcon : ErrorSvg} />
        </Tooltip>
      </div>
    );
  }
}
