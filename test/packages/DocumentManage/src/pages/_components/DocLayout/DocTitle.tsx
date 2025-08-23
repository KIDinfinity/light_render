import type { FunctionComponent, ReactNode} from 'react';
import React, { isValidElement } from 'react';
import { formUtils } from 'basic/components/Form';
import classNames from 'classnames';

import styles from './styles.less';

export interface IDocTitle {
  className?: string;
  children?: ReactNode;
}

const DocTitle: FunctionComponent<IDocTitle> = ({ className, children }) => (
  <div className={classNames(styles.documentTitle, className)}>
    {isValidElement(children) ? children : formUtils.queryValue(children)}
  </div>
);

export default DocTitle;
