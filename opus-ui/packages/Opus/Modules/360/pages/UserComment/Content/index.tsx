import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';

export default function Content({ comments }: any) {
  return comments.map((comment: any, index: number) => {
    const { author, caseCategory, content, createdDate, procActivityKey } = comment;

    return (
      <div className={styles.content} key={index}>
        <div>
          <span className={styles.underwriter}>{author}</span>
          <span className={styles.date}>{createdDate}</span>
        </div>
        <div className={styles.comment}>
          <div className={styles.commentText} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
        <div>
          <span className={styles.category}>
            {formatMessageApi({ Label_BPM_CaseCategory: caseCategory })}
          </span>
          {caseCategory&& procActivityKey && <span className={styles.divider}>/</span>}
          <span className={styles.activity}>{formatMessageApi({ activity: procActivityKey })}</span>
        </div>
      </div>
    );
  });
}
