import type { FunctionComponent } from 'react';
import React from 'react';
import classNames from 'classnames';
import type { IProps as IGrey } from './Grey';
import Grey from './Grey';
import type { IProps as IWhite } from './White';
import White from './White';

import styles from './style.less';

interface IProps {
  style?: React.CSSProperties;
  hasBorder?: boolean;
  className?: string;
}

interface ITextWrap extends FunctionComponent<IProps> {
  Grey: FunctionComponent<IGrey>;
  White: FunctionComponent<IWhite>;
}

const TextWrap: ITextWrap = ({ style, hasBorder, children, className }) => {
  return (
    <span
      className={classNames(styles.textWrap, className, {
        [styles.borderLine]: hasBorder,
      })}
      style={style}
    >
      {children}
    </span>
  );
};

TextWrap.Grey = Grey;
TextWrap.White = White;

export default TextWrap;
