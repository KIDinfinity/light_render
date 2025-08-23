import React from 'react';
import { QuestionCode } from '../Enum';
import styles from './index.less';

export default ({ children, questionType }: any) => {
  return (
    <div className={questionType === QuestionCode.FILLING ? styles.average : ''}>
      {React.Children.map(children, (child: any) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        if (child?.type.displayName === 'description') {
          return <div className={styles.description}>{child}</div>;
        }
        if (child?.type.displayName === 'answers' || child?.type.displayName === 'aroupAnswers') {
          return <div className={styles.options}>{child}</div>;
        }
        return { child };
      })}
    </div>
  );
};
