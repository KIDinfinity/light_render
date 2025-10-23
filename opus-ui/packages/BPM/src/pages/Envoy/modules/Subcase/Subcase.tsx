import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import useHandleClickSubCaseNo from 'bpm/pages/Envoy/hooks/useHandleClickSubCaseNo';
import CaseCategory from 'enum/CaseCategory';
import styles from './index.less';

export default function Subcase({ data }: any) {
  const { subCaseCategory, subCaseNo } = data;

  const handleClick = useHandleClickSubCaseNo({ reasonDetail: data });

  return (
    <>
      {subCaseCategory === CaseCategory.KH_ME_CTG001 ? (
        subCaseNo && (
          <div className={styles.medicalCheckUp}>
            Sub Case Medical Check Up
            <a onClick={handleClick}> {subCaseNo}</a>
          </div>
        )
      ) : (
        <a onClick={handleClick}>
          {subCaseNo && (
            <span>
              {formatMessageApi({
                Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-no',
              })}
              : {subCaseNo}
            </span>
          )}
        </a>
      )}
    </>
  );
}
