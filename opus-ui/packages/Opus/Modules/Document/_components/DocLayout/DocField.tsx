import type { FunctionComponent, ReactNode} from 'react';
import React, { isValidElement } from 'react';
import classNames from 'classnames';
import { formUtils } from 'basic/components/Form';

import styles from './styles.less';

export interface IDocField {
  className?: string;
  children?: ReactNode;
}

const DocField: FunctionComponent<IDocField> = ({ className, children }) => (
  <div className={classNames(styles.documentField, className)}>
    {isValidElement(children) ? children : formUtils.queryValue(children)}
  </div>
);

export default DocField;
