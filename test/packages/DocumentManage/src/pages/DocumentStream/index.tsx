import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { useLocation } from 'umi';

import DataLayout from '@/components/DataLayout';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { getTypeCode } from '../_functions';
import CaseInfo from '../CaseInfo';
import DocumentViewer from '../Viewer';
import styles from '../styles.less';

const { DataWrap } = DataLayout;

const PrepareData = ({ caseNo, id, inquiryBusinessNo }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const element = document.querySelector('.biger');
    if (element) {
      element.style.padding = '0';
    }

    dispatch({
      type: 'global/changeLayoutHeader',
      payload: {
        isShowMenu: false,
      },
    });

    dispatch({
      type: 'documentManagement/initDocumentStream',
      payload: {
        caseNo,
        id,
        inquiryBusinessNo,
      },
    });
  }, []);
  return <></>;
};

export default () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const caseNo = queryParams.get('caseNo');
  const imageId = queryParams.get('imageId');
  const name = queryParams.get('name');
  const mimeType = queryParams.get('mimeType');
  const id = queryParams.get('id');
  const formCategory = queryParams.get('formCategory');
  const inquiryBusinessNo = queryParams.get('inquiryBusinessNo');

  useEffect(() => {
    document.title = formatMessageApi({
      [getTypeCode('formCategory')]: formCategory,
    });
  }, []);

  return (
    <>
      <PrepareData caseNo={caseNo} id={id} inquiryBusinessNo={inquiryBusinessNo} />
      <DataLayout className={styles.documentManageWrap}>
        <DataWrap className={styles.documentContent} span={24}>
          <div className={styles.documentHeader}>
            <CaseInfo />
          </div>
          <div className={styles.documentViewer}>
            <DocumentViewer imageId={imageId} name={name} mimeType={mimeType} />
          </div>
        </DataWrap>
      </DataLayout>
    </>
  );
};
