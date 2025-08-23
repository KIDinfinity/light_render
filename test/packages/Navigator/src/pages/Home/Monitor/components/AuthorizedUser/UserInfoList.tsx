import React from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { Icon } from 'antd';
import UserInfoListByDefault from './UserInfoListByDefault';
import UserInfoListByTeam from './UserInfoListByTeam';
import classNames from 'classnames';

export default ({ sum, list, name, code, isExpand, isTeam, allCharShow, setAllCharShow }) => {
  return (
    <div className={classnames(styles.list, !isExpand && styles.retractedList)}>
      <div className={classNames(styles.dividerBox, code)}>
        <div className={styles.leftLine} />
        <div className={styles.text}> {`${name} (${sum})`}</div>
        <div className={styles.rightLine} />
        <Icon
          type={allCharShow?.[code] ? 'down' : 'up'}
          onClick={() => {
            setAllCharShow((e) => ({ ...e, [code]: !e?.[code] }));
          }}
          className={styles.icon}
        />
      </div>
      <div className={classnames(styles.userBox, { [styles.hidden]: !allCharShow?.[code] })}>
        {isTeam ? (
          list
            .filter((userItem) => userItem?.teamGroupUserList?.length > 0)
            .map((userItem) => (
              <UserInfoListByTeam
                code={code}
                allCharShow={allCharShow}
                setAllCharShow={setAllCharShow}
                item={userItem}
              />
            ))
        ) : (
          <UserInfoListByDefault list={list} />
        )}
      </div>
    </div>
  );
};
