import React, { useState, useEffect } from 'react';
import { useDispatch } from 'dva';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import Search from './Search';
import Table from './Table';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { findProcessRelationship } from '@/services/bpmProcessRelationshipService';
import styles from './index.less';

export default ({ value, hideTitle }: any) => {
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [searchParams, setSearchParams] = useState({});

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setList([]);
    if (!value) return;
    setLoading(true);
    const promise = findProcessRelationship({
      pageSize: 100,
      currentPage: 1,
      params: {
        procInstId: value,
      },
    });

    promise.then((response) => {
      setLoading(false);
      if (response?.success) {
        setList(response?.resultData?.rows || []);
      }
    });
  }, [value]);

  return (
    <>
      {!hideTitle && (
        <div className={styles.label}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
          })}
        </div>
      )}
      <div
        className={styles.text}
        id="caseno"
        onClick={() => {
          setShow(true);
        }}
      >
        {value}
      </div>
      <CommonResizeModal
        confirmAuth={false}
        visible={show}
        title={formatMessageApi({
          Label_CLM_Opus: 'relationship',
        })}
        onReturn={() => {
          setShow(false);
        }}
        onCancel={() => {
          setShow(false);
        }}
        returnAuth
        width="70%"
        height={400}
        authHeight
        iconVisible={false}
      >
        <div className={styles.SerialClaim}>
          <Search updateSearchParams={setSearchParams} list={list} />
          <Table searchParams={searchParams} list={list} loading={loading} />
        </div>
      </CommonResizeModal>
    </>
  );
};
