import React, { PureComponent } from 'react';
import { Input, Icon } from 'antd';
import lodash from 'lodash';
import { connect } from 'dva';
import classnames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import SearchFrame from './SearchFrame';
import { getUserInfo } from '@/utils/utils';
import styles from './Search.less';

const userInfo = getUserInfo();

@connect(
  ({
    advancedQueryController,
    chatController,
    userContactController,
    contactsAssigneeList,
    loading,
  }) => ({
    advancedQueryController,
    chatController,
    showSearchVisible: chatController.showSearchVisible,
    userContactController,
    isAssigneeListVisible: contactsAssigneeList.isAssigneeListVisible,
    taskDetail: contactsAssigneeList.taskDetail,
    loading,
  })
)
class ASearch extends PureComponent {
  handleChange = (value: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'chatController/resetSearchShowComp',
    });
    dispatch({
      type: 'chatController/saveKeywordOfSearch',
      payload: {
        keyword: value,
      },
    });

    this.search(value);
  };

  search = (keyword) => {
    const { dispatch, isAssigneeListVisible, taskDetail } = this.props;

    dispatch({
      type: 'advancedQueryController/advancedQuery',
      payload: {
        currentPage: 1,
        firstResult: 0,
        offset: 0,
        pageSize: 10,
        keyword,
        showSeachBox: true,
        params: { kw: keyword, creator: userInfo?.userId },
      },
    });

    dispatch({
      type: 'chatController/saveSearch',
      payload: {
        keyword,
        showSeachBox: true,
      },
    });

  };

  handlePressEnter = (evt) => {
    this.search(evt.target.value);
  };

  render() {
    const {
      children,
      rest,
      advancedQueryController,
      userContactController,
      chatController,
      isAssigneeListVisible,
      showSearchVisible,
    } = this.props;
    const contactFilterData = userContactController?.getByName; // 点击more时的数据
    let childEle;
    if (lodash.isFunction(children)) {
      childEle = children();
    } else {
      childEle = React.Children.map(children, (child) => React.cloneElement(child, { ...rest }));
    }

    const filterData = lodash.get(advancedQueryController, 'advancedQuery.list.0', {});
    let SearchWrap = childEle;
    if (chatController?.keyword && !isAssigneeListVisible) {
      SearchWrap = (
        <SearchFrame
          contactFilterData={contactFilterData}
          data={filterData}
          keyword={chatController.keyword}
          userInfo={userInfo}
        />
      );
    }
    return (
      <div
        className={chatController.keyword ? classnames(styles.wrap, styles.active) : styles.wrap}
      >
        {showSearchVisible && (
          <Input
            onChange={(e) => {
              this.handleChange(e.target.value);
            }}
            onBlur={(e) => {
              this.handleChange(lodash.trim(e.target.value));
            }}
            onPressEnter={this.handlePressEnter}
            style={{ width: '88%', margin: '0 auto', display: 'block' }}
            placeholder={formatMessageApi({
              Label_COM_WarningMessage: 'app.navigator.drawer.messager.input.search',
            })}
            value={chatController.keyword || ''}
            allowClear
            suffix={chatController.keyword ? '' : <Icon type="search" />}
          />
        )}
        {SearchWrap}
      </div>
    );
  }
}

export default ASearch;
