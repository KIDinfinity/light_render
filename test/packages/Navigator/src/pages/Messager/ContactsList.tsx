import React, { Component } from 'react';
import { connect } from 'dva';
import { List } from 'antd';
import lodash from 'lodash';
import { getUserInfo } from '@/utils/utils';
import MCSubscribeUserState from '@mc/MCSubscribe/MCSubscribeUserState';
import CharList from './components/CharList';
import ListItem from './ContactsListItem';
import styles from './ContactsList.less';

@connect(({ user, userContactController, chatController, converseController, loading }: any) => ({
  currentUserId: user.currentUser?.userId,
  userContactController,
  contactsInfoList: userContactController?.contactList,
  chatController,
  converseController,
  loading,
}))
class DirectoryAlphabet extends Component {
  wrapperDom: any;

  state = {
    lastChar: 'A', // 当前的排序字母
    contactsList: [], // 通讯录列表
    offsetTopList: [], // 通讯录列表字母第一个的距离
    charStr: [], // 排序字母列表
  };

  componentDidMount = async () => {
    const userInfo: any = getUserInfo();
    const { contactsInfoList }: any = this.props;

    // 筛选人物的排行第一个
    const contactCharList = contactsInfoList.filter((item: any) => userInfo.userId !== item.userId);

    const arr = lodash.map(contactCharList, (item: any) => {
      const en = item.userName.toUpperCase();
      let first = false;
      if (contactCharList[en.slice(0, 1)]) {
        first = false;
      } else {
        first = true;
        contactCharList[en.slice(0, 1)] = true;
      }

      return { ...item, first };
    });

    this.setState({
      contactsList: arr,
    });

    await this.initState();
    this.initCodeTop();
  };

  initState = () => {
    const { contactsInfoList }: any = this.props;

    const charObj: any = [];

    lodash.forEach(contactsInfoList, (item: any) => {
      const toUpperCase = item.userName.toUpperCase();
      charObj.push(toUpperCase.slice(0, 1));
    });

    const newArr: any = [];
    lodash.forEach(charObj, (value, key) => {
      value.toUpperCase();
      if (charObj.indexOf(charObj[key]) === key) {
        newArr.push(charObj[key]);
      }
    });

    this.setState({
      charStr: newArr,
    });
  };

  initCodeTop = () => {
    const { charStr } = this.state;
    const arrList: any = [];
    lodash.forEach(charStr, (value) => {
      const target: any = document.querySelector(`[data-en="${value}"]`);
      if (target !== null) {
        const top = target.parentNode.offsetTop;
        arrList.push(top);
      }
    });
    this.setState({
      offsetTopList: arrList,
    });
  };

  gotoChar = (index: any, char: any) => {
    if (char === this.state.lastChar) {
      return false;
    }

    const target = document.querySelector(`[data-en="${char}"]`);
    if (target) {
      target.scrollIntoView();
    }

    return null;
  };

  onScrollEvent = () => {
    const scrollY = this.wrapperDom.scrollTop;
    const { charStr, offsetTopList } = this.state;
    const letterHeight = 21;
    const startScrollIdx = 24;
    lodash.forEach(offsetTopList, (val, idx) => {
      const currenTop = offsetTopList[idx];
      const nextTop = offsetTopList[idx + 1];
      if (currenTop < scrollY && nextTop > scrollY) {
        this.setState({
          lastChar: charStr[idx + 1],
        });
        this.ulDom.scrollTop = letterHeight * (idx - startScrollIdx);
      }
    });
  };

  render() {
    const { charStr, contactsList, lastChar } = this.state;
    const { loading }: any = this.props;

    return (
      <div className={styles.wrap}>
        <div className={styles.content}>
          <div
            className={styles.list}
            ref={(c) => {
              this.wrapperDom = c;
            }}
            onScrollCapture={() => this.onScrollEvent()}
          >
            <List
              itemLayout="horizontal"
              dataSource={contactsList}
              loading={loading.models.userContactController}
              renderItem={(item) => <ListItem item={item} />}
            />
            <CharList
              charStr={charStr}
              lastChar={lastChar}
              gotoChar={this.gotoChar}
              getRef={(c) => {
                this.ulDom = c;
              }}
            />
            {!lodash.isEmpty(contactsList) && <MCSubscribeUserState />}
          </div>
        </div>
      </div>
    );
  }
}

export default DirectoryAlphabet;
