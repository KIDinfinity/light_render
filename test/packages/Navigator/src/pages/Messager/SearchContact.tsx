import React, { PureComponent } from 'react';
import { Avatar, Divider, List, Button } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import CommonEmpty from '@/components/Empty';
import userDefaultIcon from 'navigator/assets/user-default.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './SearchContact.less';

@connect(({ chatController }) => ({
  chatController,
}))
class Contact extends PureComponent {
  state = {
    more: true,
    showContactMore: false,
  };

  handleClick = () => {
    const { handleShowComp, dispatch, chatController } = this.props;
    handleShowComp({
      isShowContact: true,
      isShowChatHist: false,
    });
    this.setState({
      more: false,
      showContactMore: true,
    });

    // 根据userName去查询 更多 接口
    dispatch({
      type: 'userContactController/getByName',
      payload: {
        userName: chatController?.keyword,
      },
    });
  };

  handleBack = () => {
    const { handleShowComp, dispatch } = this.props;
    handleShowComp({
      isShowContact: true,
      isShowChatHist: true,
      isShowHistMore: true,
    });
    this.setState({
      more: true,
      showContactMore: false,
    });

    // 清空userName查询出来的数据
    dispatch({
      type: 'userContactController/save',
      payload: {
        getByName: {},
      },
    });
  };

  filterList = (list, more, filterData) => {
    let data = [];
    if (more) {
      // 显示更多，首页只显示三条数据
      data = list?.slice(0, 3);
    } else {
      data = filterData?.list || list;
    }

    return data || [];
  };

  renderHighLight = (item, keyword) => {
    const reg = new RegExp(keyword, 'gi');
    const match = item.match(reg);

    return lodash.map(item.split(reg), (v, vIndex, vArr) => {
      if (vIndex < vArr.length - 1) {
        const key = `item${vIndex}`;

        return (
          <span key={key}>
            {v}
            <span style={{ color: '#e97b1d' }}>{match[vIndex]}</span>
          </span>
        );
      }

      return v;
    });
  };

  render() {
    const {
      list,
      contactFilterData,
      onClick,
      chatController: { keyword },
    } = this.props;
    const { more, showContactMore } = this.state;

    const len = list?.length;

    return (
      <div className={styles.searchContact}>
        <Divider className={styles.dividerStyle} orientation="left">
          {formatMessageApi({
            Label_COM_WarningMessage: 'app.navigator.drawer.messager.contact.title',
          })}
        </Divider>
        {len > 0 ? (
          <div className={showContactMore && styles.listWrapper}>
            <List
              className={styles.antList}
              itemLayout="horizontal"
              dataSource={this.filterList(list, more, contactFilterData) || []}
              renderItem={(item) => (
                <div>
                  <List.Item onClick={() => onClick(item)}>
                    <List.Item.Meta
                      avatar={<Avatar src={item?.avatar ? item?.avatar : userDefaultIcon} />}
                      title={this.renderHighLight(item?.userName, keyword)}
                    />
                  </List.Item>
                </div>
              )}
            />
          </div>
        ) : (
          <CommonEmpty />
        )}

        {len > 3 && !more && len > 3 ? (
          <div style={{ textAlign: 'center', paddingTop: '20px' }}>
            {/* style={{
              position: 'fixed',
              bottom: '0',
              right: '17px',
              zIndex: 1,
              background: '#2e2e2e',
              width: '365px',
              textAlign: 'center',
              padding: '10px'
            }} */}
            <Button onClick={this.handleBack}>BACK</Button>
          </div>
        ) : (
          ''
        )}

        {len > 3 && more ? (
          <div className={styles.moreWrapper}>
            <a onClick={this.handleClick}>MORE&raquo;</a>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default Contact;
