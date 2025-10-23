import React from 'react';
import lodash from 'lodash';
import Item from './Item';
import styles from './list.less';

const QuestionList = ({ questions }: any) => {
  return (
    <div className={styles.list}>
      {lodash.map(questions, (question: any, index: number) => {
        return <Item key={index} question={question} />;
      })}
    </div>
  );
};

export default React.memo(QuestionList);
