import React, { useRef, useState, useEffect } from 'react';
import lodash from 'lodash';
import styles from './index.less';
import { Icon, List } from 'antd';
import CharList from './CharList';
import UserInfoList from './UserInfoList';
import classNames from 'classnames';

export default ({ list, isExpand }) => {
  const [lastChar, setLastChar] = useState(list[0]?.code);
  const [lastCharData, setLastCharData] = useState({});
  const [offsetTopList, setOffsetTopList] = useState([]);
  const [charStr, setCharStr] = useState([]);
  const [allCharShow, setAllCharShow] = useState(
    list.reduce((r, c) => {
      r[c?.code] = true;
      return r;
    }, {})
  );

  const wrapperDom = useRef(null);
  const ulDom = useRef(null);

  useEffect(() => {
    const resultList = list.map((item) => ({
      code: item.code,
      name: item.name,
      acronym: lodash.map(lodash.words(item.name), (word) => word[0].toUpperCase()).join(''),
    }));
    setCharStr(resultList);
    const arrList: any = [];
    lodash.forEach(resultList, (value) => {
      const target: any = document.querySelector(`.${value.code}`);
      if (target !== null) {
        const top = target.parentNode.offsetTop;
        arrList.push(top);
      }
    });
    setOffsetTopList(arrList);
    onScrollEvent({ arrList });
  }, [list, allCharShow]);

  const onScrollEvent = ({ arrList }) => {
    const newOffsetTopList = arrList || offsetTopList;
    const scrollY = wrapperDom.current.scrollTop;
    const letterHeight = 10;
    const startScrollIdx = 24;
    lodash.forEach(newOffsetTopList, (val, idx) => {
      const currenTop = newOffsetTopList[idx];
      const nextTop = newOffsetTopList[idx + 1];
      if (currenTop < scrollY && nextTop > scrollY) {
        setLastChar(charStr[idx].code);
        ulDom.current.scrollTop = letterHeight * (idx - startScrollIdx);
        if (scrollY > currenTop + 20) {
          setLastCharData(list.find((item) => item.code === charStr[idx].code));
        }
      }
      if (currenTop < scrollY && !nextTop) {
        setLastChar(charStr[idx].code);
        ulDom.current.scrollTop = letterHeight * (idx - startScrollIdx);
        if (scrollY > currenTop + 20) {
          setLastCharData(list.find((item) => item.code === charStr[idx].code));
        }
      }
      if (scrollY < 1 * 20) {
        setLastCharData({});
      }
    });
  };

  const gotoChar = (index: any, char: any) => {
    if (char === lastChar) {
      return false;
    }

    const target = document.querySelector(`.${char}`);
    if (target) {
      target.scrollIntoView();
      setLastCharData({});
    }

    return null;
  };

  return (
    <div>
      <div
        className={classNames(styles.dividerBox, {
          [styles.headerDivider]: lodash.isEmpty(lastCharData),
        })}
      >
        <div className={styles.leftLine} />
        <div className={styles.text}> {`${lastCharData?.name} (${lastCharData?.sum})`}</div>
        <div className={styles.rightLine} />
        <Icon
          type={allCharShow[lastCharData?.code] ? 'down' : 'up'}
          onClick={() => {
            setAllCharShow((e) => ({ ...e, [lastCharData?.code]: !e?.[lastCharData?.code] }));
          }}
          className={styles.icon}
        />
      </div>

      <div className={styles.userListBox} ref={wrapperDom} onScrollCapture={onScrollEvent}>
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <UserInfoList
              isExpand={isExpand}
              allCharShow={allCharShow}
              setAllCharShow={setAllCharShow}
              {...item}
            />
          )}
        />
        <CharList charStr={charStr} lastChar={lastChar} gotoChar={gotoChar} getRef={ulDom} />
      </div>
    </div>
  );
};
