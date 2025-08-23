import React, { PureComponent } from 'react';
import lodash from 'lodash';
import { Modal, Icon, Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import miscDictionaryControllerService from '@/services/miscDictionaryControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import hotkeys from 'hotkeys-js';
import styles from './index.less';
import Shortcutkey from './shortcutkey';

interface IProps {
  className?: string;
  width?: any;
  labelId?: string;
  modalDetailText?: any;
  visible?: boolean;
  onCancel?: Function;
  onOk?: Function;
  okText?: any;
  cancelText?: any;
  hiddenExtraText?: boolean;
  footer?: any;
  closable?: any;
  maskClosable?: any;
  cancelButtonProps?: any;
  okButtonProps?: any;
  maskStyle?: any;
  confirmLoading?: boolean;
  zIndex?: number;
  hideCancelButton?: any;
}
interface IState {
  loading: boolean;
  tabIndex: string;
  extraText: string;
}

enum ModalFootButton {
  ok = 'ok',
  cancel = 'cancel',
}
class ModalWarnMessage extends PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tabIndex: ModalFootButton.cancel,
      loading: false,
      extraText: '',
    };
  }

  UNSAFE_componentWillUpdate = (nextProps: any, nextState: any) => {
    const { visible: nextVisible } = nextProps;
    const { loading: nextLoading } = nextState;
    const { visible } = this.props;
    const { loading } = this.state;
    if (nextVisible !== visible) {
      this.initData(nextProps);
    }
    if ((nextLoading && nextLoading !== loading) || (!nextVisible && nextVisible !== visible)) {
      this.unRegisterHotkey();
    }
    if (nextVisible !== visible && nextVisible) {
      this.registerHotkey();
    }
  };
  componentDidUpdate(): void {
    const { renderCallback } = this.props;
    if (renderCallback && lodash.isFunction(renderCallback)) {
      renderCallback();
    }
  }

  initData = (props: IProps) => {
    const { visible } = props;
    this.setState((state) => {
      return {
        loading: visible === false ? visible : state.loading,
        tabIndex: state.tabIndex || ModalFootButton.cancel,
      };
    });
  };

  onOk = async (e: any) => {
    const { onOk }: any = this.props;
    const { loading } = this.state;
    if (loading) {
      return false;
    }
    this.setLoading();
    if (lodash.isFunction(onOk)) await onOk(e);
    return true;
  };

  setLoading = () => {
    this.setState({ loading: true });
  };

  hideLoading = () => {
    this.setState({ loading: false });
  };

  onCancel = async (e: any, isTopRight: boolean) => {
    const { onCancel } = this.props;
    const { loading } = this.state;
    if (loading) {
      return false;
    }
    this.setState((state) => ({
      ...state,
      loading: true,
    }));
    if (lodash.isFunction(onCancel)) {
      await onCancel(e, isTopRight);
    }
    return true;
  };

  registerHotkey = () => {
    const { hideOkButton, hideCancelButton } = this.props;
    hotkeys.filter = () => true;
    hotkeys(Shortcutkey.Tab, (event: any) => {
      event.preventDefault();
      this.setState((state) => {
        const { tabIndex } = state;
        let newTabIndex = tabIndex;
        if (!hideOkButton && !hideCancelButton) {
          newTabIndex =
            tabIndex === ModalFootButton.cancel ? ModalFootButton.ok : ModalFootButton.cancel;
        } else if (hideOkButton) {
          newTabIndex = ModalFootButton.cancel;
        } else if (hideCancelButton) {
          newTabIndex = ModalFootButton.ok;
        }
        return {
          ...state,
          tabIndex: newTabIndex,
        };
      });
    });
    const bindEnter = () => {
      hotkeys(Shortcutkey.Enter, (event: any) => {
        event.preventDefault();
        const { loading } = this.state;
        if (loading) {
          return false;
        }
        if (this.state.tabIndex === ModalFootButton.cancel) {
          this.onCancel(event);
        } else {
          this.onOk(event);
        }

        return true;
      });
    };
    bindEnter();
  };

  unRegisterHotkey = () => {
    hotkeys.unbind(Shortcutkey.Enter);
    hotkeys.unbind(Shortcutkey.Tab);
  };

  componentDidMount = () => {
    const { visible } = this.props;
    if (visible) {
      this.registerHotkey();
    }
    this.initData(this.props);

    this.getExtraText();
  };

  getExtraText = async () => {
    const response = await miscDictionaryControllerService.findDictionariesByTypeCode(
      objectToFormData({
        typeCode: 'MSG_COM_WRN',
      }),
      {}
    );
    if (lodash.isPlainObject(response) && response.success && lodash.isArray(response.resultData)) {
      this.setState({
        extraText: response.resultData.length > 0 ? response.resultData[0].dictName : '',
      });
    }
  };

  componentWillUnmount = () => {
    hotkeys.unbind(Shortcutkey.Enter);
    hotkeys.unbind(Shortcutkey.Tab);
  };

  footer = () => {
    const { cancelButtonProps, okButtonProps, hideCancelButton, hideOkButton } = this.props;
    const { tabIndex, loading }: any = this.state;
    const defaultOkText = formatMessageApi({
      Label_BPM_Button: 'app.navigator.drawer.messager.button.yes',
    });
    const defaultCancelText = formatMessageApi({
      Label_BPM_Button: 'app.navigator.drawer.messager.button.no',
    });
    const { okText = defaultOkText, cancelText = defaultCancelText }: any = this.props;
    return (
      <>
        {!hideCancelButton && (
          <Button
            onClick={(e) => this.onCancel(e, false)}
            className={tabIndex === ModalFootButton.cancel ? 'active' : ''}
            {...cancelButtonProps}
          >
            {cancelText}
          </Button>
        )}
        {!hideOkButton && (
          <Button
            loading={loading}
            onClick={(e) => this.onOk(e)}
            className={tabIndex === ModalFootButton.ok ? 'active' : ''}
            {...okButtonProps}
          >
            {okText}
          </Button>
        )}
      </>
    );
  };

  modalDetailTextFn = (modalDetailText: any) => {
    if (lodash.isString(modalDetailText)) {
      return (
        <ul>
          <li>{modalDetailText}</li>
        </ul>
      );
    }
    return modalDetailText;
  };

  render() {
    const {
      className,
      width,
      labelId,
      modalDetailText,
      visible,
      onCancel,
      footer,
      closable,
      maskClosable,
      children,
      hiddenExtraText,
      maskStyle,
      zIndex,
      ...rest
    } = this.props;
    const { extraText }: IState = this.state;
    return (
      <Modal
        className={styles.warnMsg + (className ? ` ${className}` : '')}
        visible={visible}
        width={width || '486px'}
        footer={footer || this.footer()}
        onCancel={(e) => {
          if (lodash.isFunction(onCancel)) {
            onCancel(e, true);
          }
        }}
        zIndex={zIndex || 99999}
        closable={closable}
        maskClosable={maskClosable}
        maskStyle={maskStyle}
        {...rest}
      >
        <div className="modal-main">
          {labelId && (
            <div className="modal-title">
              <Icon type="warning" theme="filled" />
              {formatMessageApi({
                Label_BIZ_Claim: labelId,
              })}
            </div>
          )}
          {((!hiddenExtraText && extraText) || modalDetailText) && (
            <div className="modal-ctn">
              <div className="modal-detail">
                {this.modalDetailTextFn(modalDetailText)}
                <br />
                {!hiddenExtraText && extraText}
              </div>
            </div>
          )}
          {children}
        </div>
      </Modal>
    );
  }
}
export default ModalWarnMessage;
