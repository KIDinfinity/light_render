import React, { memo, useMemo, useState } from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import findObj from 'bpm/pages/Envoy/_utils/findObj';
import LabelTip from 'bpm/pages/Envoy/components/LabelTip/LabelTip';
import styles from './tabBar.less';

const TabBar = (props) => {
  const {
    viewChannel,
    setViewChannel,
    data,
    dataId,
    errorInfo,
    disabled,
    handleChangeChannel,
  } = props;
  const channelOptions = lodash.map(data, (item: any) => ({
    text: formatMessageApi({
      Label_BPM_Button: `app.navigator.drawer.pending.button.${item?.channel}`,
    }),
    value: item?.channel,
  }));
  const initEanbelChannel = lodash
    .chain(data)
    ?.filter((item: any) => item.enable)
    ?.map((item: any) => item.channel)
    .value();

    const [enableChannel, setEnabelChannel] = useState(initEanbelChannel);
  const changeEnableChannel = (ev, channel: string) => {
    ev.stopPropagation();
    if (disabled) {
      return;
    }
    const isEnableChannel = lodash.includes(enableChannel, channel);
    let newArr = [];
    if (isEnableChannel) {
      newArr = lodash.filter(enableChannel, (item: string) => item !== channel);
    } else {
      newArr = [...enableChannel, channel];
    }
    setEnabelChannel(newArr);
    handleChangeChannel(newArr);
  };
  return useMemo(
    () => (
      <div className={styles.tabBar}>
        {lodash.map(channelOptions, (item: any, channelIdx: number) => {
          const { text, value } = item;
          const isEnableChannel = lodash.includes(enableChannel, value);
          const errors = lodash.uniq(
            lodash.get(findObj(errorInfo, dataId), `channelDataList{${channelIdx}}`)
          );
          return (
            <div
              className={classNames(styles.channelBtn, {
                [styles.active]: value === viewChannel,
                [value]: true,
              })}
              onClick={() => setViewChannel(value)}
              key={`${item}_${channelIdx}`}
            >
              {(!disabled || isEnableChannel) && (
                <div
                  className={classNames(styles.icon, {
                    [styles.forbid]: disabled,
                  })}
                  onClick={(ev) => changeEnableChannel(ev, value)}
                >
                  <Icon
                    className={classNames(styles.default, {
                      [styles.active]: isEnableChannel,
                    })}
                    type="check-circle"
                    theme="filled"
                  />
                </div>
              )}
              {errors?.length ? <LabelTip title={errors} /> : null}
              {text}
            </div>
          );
        })}
      </div>
    ),
    [props, enableChannel]
  );
};

export default memo(TabBar);
