import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import CommonEmpty from '@/components/Empty';
import styles from './index.less';

const QuestionnaireTitles = ({ questionnaireList, selectFn }) => {
  return (
    <div className={styles.list}>
      {lodash.isEmpty(questionnaireList) ? (
        <CommonEmpty />
      ) : (
        questionnaireList?.map((item) => (
          <div
            key={item.questionnaireCode}
            className={classnames(styles.questionItem, {
              [styles.active]: item?.selected,
              [styles.error]: item?.error,
            })}
            onClick={() => selectFn(item.questionnaireCode)}
          >
            <div className={styles.beam} />
            {/* <Icon
              type="check-circle"
              theme="filled"
              className={classnames(styles.icon, {
                [styles.iconActive]: selectQuestionnaire === item.questionnaireCode,
              })}
            /> */}
            <div className={classnames(styles.name)}>{item?.questionnaireLabel}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default QuestionnaireTitles;
