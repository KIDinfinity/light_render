import React from 'react';
import { Card } from 'antd';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formatDate } from '../../../../_functions';
import styles from './index.less';

export default function PolicyNotes({ policyNoteList }: any) {
  let policyNote: any[] = [];
  if (lodash.isArray(policyNoteList)) {
    policyNote = policyNoteList.filter((item: any) => {
      return item?.creationDateTime && item?.content;
    });
  }
  return (
    policyNote?.length !== 0 && (
      <Card
        title={formatMessageApi({ Label_BIZ_Policy: 'policyNote' })}
        className={styles.policyNotesCard}
        bordered={false}
      >
        <div className={styles.policyNotesWrap}>
          {lodash.map(policyNote, (item: any) => {
            return (
              <div className={styles.policyNotesItem}>
                <div className={styles.creationDetail}>
                  <div className={styles.creator}>{item?.creator}</div>
                  <div className={styles.creationDate}>{formatDate(item?.creationDateTime)}</div>
                </div>
                <div className={styles.content}>{item?.content}</div>
              </div>
            );
          })}
        </div>
      </Card>
    )
  );
}
