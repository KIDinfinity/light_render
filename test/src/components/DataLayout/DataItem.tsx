import type { FunctionComponent, ReactNode} from 'react';
import React, { isValidElement } from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './styles.less';

interface IProps {
  title?: ReactNode | string;
  className?: string;
  children?: ReactNode | string;
  styleTitle?: React.CSSProperties;
  style?: React.CSSProperties;
  span?: number;
  typeCode?: string;
}

const transStrVal = (value: any) => (value && lodash.isString(value) ? value : '');

const DataItem: FunctionComponent<IProps> = ({
  title,
  className,
  children,
  styleTitle,
  style,
  typeCode,
}) => {
  const isEle = isValidElement(children);
  const isEleTitle = isValidElement(title);
  const isStr = lodash.isString(children);

  return (
    <dl className={classNames('dataItem', styles.dataItem, className)}>
      <dt className={classNames('dataTitle', styles.dataTitle)} style={styleTitle}>
        {isEleTitle
          ? title
          : transStrVal(formatMessageApi({ [typeCode || 'Label_BIZ_Claim']: title }))}
      </dt>
      <dd
        className={classNames(
          'dataContent',
          styles.dataContent,
          !isEle && isStr && `${styles.dataContent}-ellipsis`
        )}
        style={style}
      >
        {children}
      </dd>
    </dl>
  );
};

export default DataItem;
