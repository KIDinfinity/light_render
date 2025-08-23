import React from 'react';
import { Tooltip, Icon } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import { ReactComponent as WarningIcon } from 'claim/assets/warning.svg';
import { ReactComponent as ErrorSvg } from 'claim/assets/error.svg';
import { MessageType } from 'claim/enum/medicalSearchMessageType';
import { filterMessage, hasSomeTypeMessage } from '@/utils/medicalSearch';
import { connect } from 'dva';
import Label from './Label';
import formatLabel from './formatLabel';
import styles from './index.less';

interface IProps {
  labelId: string;
  title?: string;
  visible?: boolean;
  style?: Object;
  tagText?: string;
  warningMessage?: any[];
  errors?: string[];
  labelTypeCode?: any;
  reminder?: string;
  reload?: string;
  form: any;
  formName: any;
  className?: any;
  taskNotEditable?: boolean;
  useError?: boolean;
  fieldIndex?: any;
  refreshStyle?: boolean;
  tipMsg?: any;
  errorTake?: number;
  disabled?: boolean;
  reloadSpin?: boolean;
  specifyPlacement?: string;
  defaultVisible?: boolean;
}
interface IState {
  imbueState: boolean;
}

export { Label, formatLabel };

@connect(({ claimEditable }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
}))
export default class ErrorTooltip extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      imbueState: false,
    };
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    const {
      labelId: nextLabelId,
      title: nextTitle,
      style: nextStyle,
      tagText: nextTagText,
      warningMessage: nextWarningMessage,
      visible: nextVisible,
      errors: nextErrors,
      taskNotEditable: nextTaskNotEditable,
      refreshStyle: nextRefreshStyle,
      tipMsg: nextTipMsg,
      labelTypeCode: nextLabelTypeCode,
      disabled: nextDisabled,
      reloadSpin: nextReloadSpin,
    } = nextProps;

    const { imbueState: nexImbueState } = nextState;
    const {
      labelId,
      title,
      style,
      tagText,
      warningMessage,
      visible,
      errors,
      taskNotEditable,
      refreshStyle,
      tipMsg,
      labelTypeCode,
      disabled,
      reloadSpin,
    } = this.props;
    const { imbueState } = this.state;
    return (
      !lodash.isEqual(nextLabelId, labelId) ||
      !lodash.isEqual(nextTitle, title) ||
      !lodash.isEqual(nextStyle, style) ||
      !lodash.isEqual(nextTagText, tagText) ||
      !lodash.isEqual(nextWarningMessage, warningMessage) ||
      !lodash.isEqual(nextVisible, visible) ||
      !lodash.isEqual(nexImbueState, imbueState) ||
      !lodash.isEqual(nextErrors, errors) ||
      !lodash.isEqual(nextTaskNotEditable, taskNotEditable) ||
      !lodash.isEqual(nextRefreshStyle, refreshStyle) ||
      !lodash.isEqual(nextTipMsg, tipMsg) ||
      !lodash.isEqual(nextLabelTypeCode, labelTypeCode) ||
      !lodash.isEqual(nextDisabled, disabled) ||
      !lodash.isEqual(nextReloadSpin, reloadSpin)
    );
  }

  onMouseEnterFn = () => {
    const { visible } = this.props;
    if (visible) return;
    this.setState({
      imbueState: true,
    });
  };

  onMouseLeaveFn = () => {
    const { visible } = this.props;
    if (visible) return;
    this.setState({
      imbueState: false,
    });
  };

  findParentNode = (node: any, targetId: string): any => {
    if (node?.id === targetId) {
      return node;
    }
    if (node?.parentNode) {
      return this.findParentNode(node?.parentNode, targetId);
    }
    return null;
  };

  getPopupContainer = (triggerNode: any) => {
    // TODO：这里应该优化写法
    const firshMuch =
      triggerNode.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode
        ?.parentNode;
    const twoMuch =
      triggerNode.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode
        ?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode?.parentNode
        ?.parentNode?.parentNode?.parentNode;

    const layoutContent = this.findParentNode(triggerNode, 'layoutContent');

    if (layoutContent) {
      return layoutContent;
    }

    if (!!twoMuch) {
      return twoMuch;
    }

    if (firshMuch) {
      return firshMuch;
    }

    return document.body;
  };

  getPopupContainerTipMsg = (triggerNode: any) => {
    const formItemDom = triggerNode.parentNode?.parentNode?.parentNode?.parentNode?.parentNode;
    return formItemDom || document.body;
  };

  formatTipMsg = () => {
    let { tipMsg } = this.props;
    if (tipMsg === 0) {
      tipMsg = '0';
    }
    return tipMsg;
  };

  render() {
    const {
      labelId,
      labelTypeCode,
      title = '',
      style,
      triggertagText,
      warningMessage,
      visible,
      errors = [],
      reminder,
      reload,
      useError = true,
      tagText,
      taskNotEditable,
      refreshStyle,
      tipMsg,
      errorTake,
      disabled,
      reloadSpin,
      specifyPlacement = null,
      defaultVisible = false,
    } = this.props;
    const { imbueState } = this.state;
    const imbue = 'visible' in this.props ? { visible: visible || imbueState } : {};
    const hasError =
      (lodash.isArray(errors) && errors.length) ||
      hasSomeTypeMessage({ warningMessage, messageType: MessageType.Error });

    const serviceValidateErrors = filterMessage({
      warningMessage,
      messageType: MessageType.Error,
      toString: false,
    });
    const collectErrorMessage = [...errors, ...serviceValidateErrors];
    const errorSize = errorTake || lodash.size(collectErrorMessage);
    const collectErrorMessagecompact = lodash
      .chain(collectErrorMessage)
      .pull(' ')
      .take(errorSize)
      .value();
    const reloadStyle = refreshStyle ? styles.serviceAgentReload : styles.reload;
    const disableReloadStyle = refreshStyle
      ? classNames(styles.serviceAgentReload, styles.disabledReload)
      : classNames(styles.NoReload, styles.disabledReload);
    return (
      <div className={classNames(styles.ErrorTooltip, 'errorTooltipWrapper')}>
        <span onMouseEnter={this.onMouseEnterFn} onMouseLeave={this.onMouseLeaveFn}>
          {hasError && useError && (
            // @ts-ignore
            <Tooltip
              getPopupContainer={this.getPopupContainer}
              arrowPointAtCenter
              placement={specifyPlacement ?? 'top'}
              overflow="auto"
              overlayClassName={styles.myErrorTooltip}
              {...imbue}
              title={collectErrorMessagecompact?.join?.(', ')}
              defaultVisible={defaultVisible}
            >
              <Icon className={styles.errorIcon} component={ErrorSvg} />
            </Tooltip>
          )}
          {((lodash.isArray(errors) && errors.length === 0) || !errors) &&
            hasSomeTypeMessage({ warningMessage, messageType: MessageType.Information }) && (
              // @ts-ignore
              <Tooltip
                // getPopupContainer={this.getPopupContainer}
                arrowPointAtCenter
                placement="top"
                overlayClassName={styles.warningTooltip}
                {...imbue}
                // @ts-ignore
                title={filterMessage({ warningMessage, messageType: MessageType.Information })}
                defaultVisible={defaultVisible}
              >
                <Icon className={styles.warning} component={WarningIcon} />
              </Tooltip>
            )}
          {reminder && (
            <Tooltip
              getPopupContainer={this.getPopupContainer}
              arrowPointAtCenter
              placement="top"
              overlayClassName={styles.reminderTooltip}
              title={reminder}
              defaultVisible={defaultVisible}
            >
              <Icon type="question-circle" className={styles.reminder} />
            </Tooltip>
          )}
        </span>
        <Label labelId={labelId} labelTypeCode={labelTypeCode} title={title} style={style} />
        {reload && (
          <Icon
            type="sync"
            onClick={() => {
              if (lodash.isFunction(reload)) {
                reload();
              }
            }}
            spin={reloadSpin}
            className={!taskNotEditable && !disabled ? reloadStyle : disableReloadStyle}
          />
        )}
        {tagText ? <span className={styles.toolTip}>{tagText}</span> : ''}
        {tipMsg && (
          // @ts-ignore
          <Tooltip
            getPopupContainer={this.getPopupContainerTipMsg}
            arrowPointAtCenter
            placement="top"
            overlayClassName={styles.tipMsg}
            {...imbue}
            title={tipMsg}
            defaultVisible={defaultVisible}
          />
        )}
      </div>
    );
  }
}
