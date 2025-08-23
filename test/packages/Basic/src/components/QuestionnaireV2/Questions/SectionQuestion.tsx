import React from 'react';
import lodash from 'lodash';
import classNames from 'classnames';
import Item from './Item';
import styles from './index.less';

const Questions = ({
  allSectionQuestionList,
  sectionLabel,
  sectionQuestionList,
  disabled,
  sectionQuestionListMap,
  error,
  key,
}: any) => {
  return (
    <div className={styles.sectionwrap} key={key}>
      <div className={classNames(styles.sectionName)}>{sectionLabel}</div>
      {lodash.map(sectionQuestionList, (question: any, questionIndex: number) => {
        return (
          <div key={`${question}${questionIndex}`}>
            <Item
              key={`${question}${questionIndex}`}
              maping={question}
              allSectionQuestionList={allSectionQuestionList}
              sectionQuestionList={sectionQuestionList}
              disabled={disabled}
              sectionQuestionListMap={sectionQuestionListMap}
              error={error}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Questions;
