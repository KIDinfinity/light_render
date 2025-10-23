import React from 'react';
import classnames from 'classnames';
import { Icon } from 'antd';
import { setTranslate, setWidth } from '../../Utils/Action';
import styles from './index.less';

export default ({
  swiper,
  lock,
  setLock,
  showSearch,
  setShowSearch,
  SearchRef,
  setChartWidth,
}: any) => {
  let timer: any = null;

  const onClick = async () => {
    await setLock(!lock);
    await setShowSearch(!lock);
    !lock && setTranslate({ swiper, SearchRef });
    setWidth({ swiper, SearchRef, setChartWidth, lock });
  };

  // 悬浮时延迟500ms展开搜索
  const onMouseEnter = () => {
    timer = setTimeout(() => {
      if (!showSearch) {
        setShowSearch(true);
        setTranslate({ swiper, SearchRef });
      }
    }, 500);
  };

  const onMouseLeave = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    !lock && showSearch && setShowSearch(false);
  };

  return (
    <div
      className={classnames({
        [styles.expand]: true,
      })}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {lock && <Icon type="lock" theme="filled" className={styles.iconLock} />}
      {!lock && showSearch && <Icon type="left" />}
      {!lock && !showSearch && <Icon type="right" />}
    </div>
  );
};
