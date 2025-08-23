import React, { useEffect, useState } from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import { Icon, Popover } from 'antd';
import styles from './TableTitle.less';

interface IProps {
  title: string;
  paramsKey: string;
  value: string;
  list: any;
  handleChange: Function;
  getPopupContainer: any;
  isMultiple?: boolean;
  multipleBlackList?: any[];
}

export default ({
  title,
  paramsKey,
  value,
  list = [],
  handleChange,
  getPopupContainer,
  isMultiple,
  multipleBlackList = [],
}: IProps) => {
  const [show, setShow] = useState(false);
  const isMultipleFlag = multipleBlackList.includes(paramsKey) ? false : isMultiple;
  const listenerClick = (e) => {
    if (
      ((!e.target?.classList?.contains('noHidden') && isMultipleFlag) || !isMultipleFlag) &&
      show
    ) {
      setShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', listenerClick);
    return () => {
      window.removeEventListener('click', listenerClick);
    };
  }, [show]);

  return (
    <Popover
      getPopupContainer={getPopupContainer || (() => document.body)}
      overlayClassName={styles.templatePopover}
      content={
        <div className={classNames(styles.content, 'noHidden')}>
          {lodash.map(list, (item: any, index: number) => (
            <p
              key={`${item.dictCode}${index}`}
              className={classNames('noHidden', styles.option, {
                [styles.active]: lodash.isArray(value)
                  ? value.includes(item.dictCode)
                  : item.dictCode === value,
              })}
              onClick={() => {
                if (item !== value || isMultipleFlag) {
                  handleChange({ [paramsKey]: item.dictCode });
                }
                if (!isMultipleFlag) {
                  setShow(false);
                }
              }}
            >
              {item.dictName}
            </p>
          ))}
        </div>
      }
      trigger="click"
      visible={show}
      placement="bottom"
    >
      <div
        className={styles.templateTitle}
        onClick={() => {
          setTimeout(() => {
            setShow(!show);
          }, 10);
        }}
      >
        <span>{title}</span>

        <span className={styles.iconWrap}>
          {!lodash.isEmpty(value) ? (
            <Icon
              type="close-circle"
              onClick={(e) => {
                e.stopPropagation();
                handleChange({ [paramsKey]: '' });
                setShow(false);
              }}
            />
          ) : (
            <Icon type={show ? 'down-circle' : 'up-circle'} />
          )}
        </span>
      </div>
    </Popover>
    // </div>
  );
};
