import React, { useState } from 'react';
import type { Dispatch } from 'dva';
import { useSelector, useDispatch } from 'dva';
import { Input, Icon } from 'antd';
import moment from 'moment';
import _ from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Empty from '@/components/Empty';
import DocumentCard from '../DocumentCard';
import styles from './index.less';

const DocumentList: React.FC = () => {
  const dispatch: Dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const docConfig = useSelector((state: any) => state.policyDocuments.docConfig);
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSelect = (id: string, documentItem: any) => {
    setSelectedId(id);
    dispatch({
      type: 'documentManagement/saveImageUrl',
      payload: {
        documentItem,
      },
    });
  };
  const NBList = docConfig?.NB?.filter((doc: any) => {
    return doc.name?.includes(searchValue);
  });
  const POSList = docConfig?.POS?.filter((doc: any) => {
    return doc.name?.includes(searchValue);
  });
  return (
    <div className={styles.documentList}>
      <Input onChange={onSearch} placeholder="search ..." prefix={<Icon type="search" />} />
      <p className={styles.subtitle}>NB Documents</p>
      {_.isEmpty(NBList) ? (
        <Empty />
      ) : (
        _.map(NBList, (doc: any) => {
          return (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              fileName={doc.name}
              documentType={formatMessageApi({ documentType_i18n: doc.docTypeCode })}
              createDate={doc.creationDate ? moment(doc.creationDate).format('L') : '-'}
              onSelect={(id) => onSelect(id, doc)}
              selected={doc.id === selectedId}
            />
          );
        })
      )}
      <p className={styles.subtitle}>POS Documents</p>
      {_.isEmpty(POSList) ? (
        <Empty />
      ) : (
        _.map(POSList, (doc: any) => {
          return (
            <DocumentCard
              key={doc.id}
              id={doc.id}
              fileName={doc.name}
              createDate={doc.creationDate ? moment(doc.creationDate).format('L') : '-'}
              onSelect={(id) => onSelect(id, doc)}
              selected={doc.id === selectedId}
            />
          );
        })
      )}
    </div>
  );
};

export default DocumentList;
