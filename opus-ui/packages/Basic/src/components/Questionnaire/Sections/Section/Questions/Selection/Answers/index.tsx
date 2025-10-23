import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import styles from './index.less';

const Answers = ({ options, answers }: any) => {
  return (
    <div className={styles.options}>
      {lodash.map(options, (option: any, index: number) => {
        return (
          <div
            key={index}
            className={classnames(styles.option, {
              [styles.selected]: lodash.includes(answers, option),
            })}
          >
            {option}
          </div>
        );
      })}
    </div>
  );
};

Answers.displayName = 'answers';

export default Answers;
