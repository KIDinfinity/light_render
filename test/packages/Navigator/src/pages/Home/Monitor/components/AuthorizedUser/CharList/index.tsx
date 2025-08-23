import React from 'react';
import classNames from 'classnames/bind';
import lodash from 'lodash';
import useExpanderController from 'navigator/hooks/useExpanderController';
import styles from './index.less';
import { Tooltip } from 'antd';

function CharList({ charStr, gotoChar, lastChar, getRef }) {
  const { isSiderToggleOn } = useExpanderController();
  return (
    <ul
      className={classNames(styles.charList, {
        [styles.close]: !isSiderToggleOn,
      })}
      ref={getRef}
    >
      {lodash.map(charStr, (char, charIdx) => (
        <li
          className={classNames(styles['chat-item'], {
            [styles.active]: lastChar === char.code,
          })}
          key={char.code}
          onClick={() => gotoChar(charIdx, char.code)}
        >
          <Tooltip title={char.name}>{char.acronym}</Tooltip>
        </li>
      ))}
    </ul>
  );
}

export default CharList;
