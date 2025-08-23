import React from 'react';
import lodash from 'lodash';
import CommonEmpty from '@/components/Empty';
import Header from './Header';
import styles from './index.less';
import SectionQuestion from './SectionQuestion';

const Questions = ({
  headerObj,
  allSectionQuestionList,
  disabled,
  sectionQuestionListMap,
  error,
}) => {
  return (
    <div className={styles.container}>
      <Header {...headerObj} />
      {lodash.isEmpty(allSectionQuestionList) ? (
        <CommonEmpty />
      ) : (
        lodash
          .chain(allSectionQuestionList)
          .filter((item) => item?.isDisplay !== 0)
          .map((item: any, index: number) => {
            return (
              <SectionQuestion
                key={`${item.sectionCode}${index}`}
                allSectionQuestionList={allSectionQuestionList}
                sectionQuestionList={item.sectionQuestionList}
                disabled={disabled}
                sectionQuestionListMap={sectionQuestionListMap}
                error={error}
                sectionLabel={item?.sectionLabel}
              />
            );
          })
          .value()
      )}
    </div>
  );
};

export default Questions;
