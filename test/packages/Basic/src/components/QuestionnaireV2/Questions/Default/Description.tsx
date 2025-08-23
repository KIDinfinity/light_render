import React from 'react';
import ErrorTip from '../../components/ErrorTip';
import styles from './index.less';
import classnames from 'classnames';

interface IProps {
  text: string;
  required: 0 | 1;
  error: boolean;
  subText: string;
}

const Description = ({ text, subText, error }: IProps) => {
  return (
    <div className={styles.box}>
      <div className={styles.error}>{error ? <ErrorTip /> : null}</div>
      <div
        className={classnames(styles.questionDescription, { [styles.required]: false })}
        dangerouslySetInnerHTML={{ __html: text }}
      />

      <div
        className={classnames(styles.questionDescription, styles.subText, {
          [styles.required]: false,
        })}
        dangerouslySetInnerHTML={{
          __html: subText,
        }}
      />
    </div>
  );
};

Description.displayName = 'description';

export default Description;
