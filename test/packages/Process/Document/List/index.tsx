import React from 'react';
import lodash from 'lodash';
import { useGetDocumentList } from '../Hooks';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import DocumentItem from './DocumentItem';
import CaseInfo from '../CaseInfo';
import { ETypeCodes } from '../enums';

import styles from './index.less';

export default () => {
  const list = useGetDocumentList();

  return (
    <div className={styles.documentList}>
      <div className={styles.header}>Related Case</div>
      <div className={styles.content}>
        <div className={styles.caseinfo}>
          <CaseInfo />
        </div>
        <div className={styles.List}>
          {lodash
            .chain(list)

            .map(({ documentList, formCategory }) => {
              return (
                <div className={styles.documentGroup} key={formCategory}>
                  <div className={styles.documentGroupTitle}>
                    {formatMessageApi({
                      [ETypeCodes.FormCategory]: formCategory,
                    })}
                  </div>
                  {lodash
                    .chain(documentList)
                    .map((item: any) => <DocumentItem documentItem={item} key={item.id} />)
                    .value()}
                </div>
              );
            })
            .value()}
        </div>
      </div>
    </div>
  );
};
