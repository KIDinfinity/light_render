import React from 'react';
import classNames from 'classnames/bind';
import lodash from 'lodash';
import useExpanderController from 'navigator/hooks/useExpanderController';
import styles from './index.less';

function CharList({ charStr, gotoChar, lastChar, getRef }) {
  const { isSiderToggleOn } = useExpanderController();

  return (
    <ul
      className={classNames(styles.charList, {
        [styles.close]: !isSiderToggleOn,
      })}
      ref={(c) => getRef(c)}
    >
      {lodash.map(charStr, (char, charIdx) => (
        <li
          className={classNames(styles['chat-item'], {
            [styles.active]: lastChar === char,
          })}
          key={char}
          onClick={() => gotoChar(charIdx, char)}
        >
          {char}
        </li>
      ))}
    </ul>
  );
}

export default CharList;
