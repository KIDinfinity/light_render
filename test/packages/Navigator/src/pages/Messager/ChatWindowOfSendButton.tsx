import React, { PureComponent, Fragment } from 'react';
import { Input, Button, Icon, Row, Col, Form, Alert, Divider } from 'antd';
import { connect } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import { ReactComponent as OffLineSvg } from 'navigator/assets/offline.svg';
import styles from './ChatWindowOfSendButton.less';

@connect(({ user, chatController, converseController, loading }) => ({
  currentUser: user.currentUser,
  chatController,
  webSocket: chatController.webSocket,
  loadingReconnect: chatController.loadingReconnect,
  currentSendingMessage: chatController.currentSendingMessage,
  currentChatInfo: chatController.currentChatInfo,
  currentChatMessages: chatController.currentChatMessages,
  chatOffline: chatController.chatOffline,
  converseController,
  loadingOfText: loading.effects['chatController/sendMessage'],
}))
@Form.create({
  onValuesChange: (props, changedValue) => {
    const { dispatch } = props;
    const { currentSendingMessage } = changedValue;

    dispatch({
      type: 'chatController/saveCurrentSendingMessage',
      payload: {
        currentSendingMessage,
      },
    });
  },
  mapPropsToFields: (props) => {
    const { currentSendingMessage } = props;

    return formUtils.mapObjectToFields({
      currentSendingMessage,
    });
  },
})
class ChatWindowOfSendButton extends PureComponent {
  componentDidMount() {
    this.input.focus();
  }

  componentWillUnmount() {
    this.input.blur();
  }

  handleSendMessage = async () => {
    const { dispatch, currentSendingMessage } = this.props;

    if (!currentSendingMessage) {
      return;
    }
    const response = await dispatch({
      type: 'chatController/sendMessage',
      payload: {
        currentSendingMessage,
      },
    });

    if (response?.success) {
      dispatch({
        type: 'chatController/clearCurrentSendingMessage',
      });
    }
  };

  handleShowChatHist = () => {
    const { dispatch } = this.props;

    dispatch({
      type: 'chatController/openChatWindowHist',
    });
  };

  handleReconnect = () => {
    const { webSocket, dispatch } = this.props;
    if (webSocket.Socket.readyState !== 1) {
      // webSocket.reconnect();
      webSocket.open();
    }
    dispatch({
      type: 'chatController/loadingReconnectReducer',
      payload: { loadingReconnect: true },
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      loadingOfText,
      loadingReconnect,
      chatOffline,
    } = this.props;
    const message = (
      <Fragment>
        <Icon component={OffLineSvg} className="offline_icon" />
        <Divider type="vertical" className="offline_divide" />
        <span>
          {formatMessageApi(
            { message: 'app.navigator.drawer.messager.msg-you-are-offline-please-try-to' },
            ''
          )}
          <Button
            className="btn_reconnect"
            type="primary"
            loading={loadingReconnect}
            onClick={this.handleReconnect}
          >
            {formatMessageApi({
              Label_COM_WarningMessage: 'app.navigator.drawer.messager.msg-reconnect',
            })}
          </Button>
        </span>
      </Fragment>
    );

    return (
      <div className={styles.wrapper}>
        <Alert
          className={styles.hint_chat_offline}
          style={{ display: chatOffline ? 'inline-block' : 'none' }}
          message={message}
        />
        <Form>
          <Form.Item>
            {getFieldDecorator(
              'currentSendingMessage',
              {}
            )(
              <Input
                onPressEnter={this.handleSendMessage}
                autoComplete="off"
                ref={(node) => {
                  this.input = node;
                }}
              />
            )}
          </Form.Item>
        </Form>
        <Row type="flex" justify="space-between" align="middle" className={styles.btn}>
          <Col>
            <a onClick={this.handleShowChatHist}>
              <Icon type="message" />
            </a>
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => {
                this.handleSendMessage();
              }}
              size="small"
              loading={loadingOfText}
              style={{ height: '30px' }}
            >
              {formatMessageApi({ Label_BIZ_Claim: 'app.chat.send' })}
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChatWindowOfSendButton;
