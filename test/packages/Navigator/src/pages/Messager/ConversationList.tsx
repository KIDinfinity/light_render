import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import { List } from 'antd';
import lodash from 'lodash';
import Empty from '@/components/Empty';
import MCSubscribeUserState from '@mc/MCSubscribe/MCSubscribeUserState';
import ConversationListItem from './ConversationListItem';
import styles from './ConversationList.less';

export default () => {
  const dispatch = useDispatch();
  const conversationList = useSelector((state: any) => state.converseController.conversationList);
  const contactList = useSelector((state: any) => state.userContactController.contactList);
  const [statusConversationList, setStatusConversationListList] = useState<any[]>([]);

  useEffect(() => {
    // 在这里拿到所有用户状态
    dispatch({
      type: 'userContactController/get',
      payload: {
        contacts: 'contacts',
      },
    })
    dispatch({
      type: 'converseController/conversationList',
    });

    dispatch({
      type: 'chatController/changeSearchVisibleReducer',
      payload: {
        showSearchVisible: true,
      },
    });
  }, []);

  const showConversationList = [...conversationList];

  if (!showConversationList?.[0]?.lcontent) {
    showConversationList.shift();
  }

  // conversationList，匹配contactList的状态
  useEffect(() => {
    if (
      lodash.isArray(conversationList) &&
      lodash.size(conversationList) &&
      lodash.isArray(contactList) &&
      lodash.size(contactList)
    ) {
      const list: any[] = lodash.map(conversationList, (item: any) => {
        const matchItem = lodash.find(contactList, (el: any) => el.userId === item.sessionPeer);
        return !lodash.isEmpty(matchItem)
          ? {
              ...item,
              status: matchItem.status,
            }
          : item;
      });
      setStatusConversationListList(list);
    }
  }, [conversationList, contactList]);

  return (
    <div className={`${styles.list} ${styles['black-scroll']} ${styles['black-scroll-small']}`}>
      {statusConversationList?.length > 0 ? (
        <>
          <List
            itemLayout="horizontal"
            dataSource={statusConversationList}
            className={statusConversationList.length < 8 ? styles.scrollControl : ''}
            renderItem={(item) => <ConversationListItem item={item} />}
          />
          {!lodash.isEmpty(statusConversationList) && <MCSubscribeUserState />}
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};
