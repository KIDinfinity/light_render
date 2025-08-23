import React from 'react';
import style from '../index.less';

const transFields = {
  inquiryBusinessNo: (v: any, fn: any) => {
    return !!v ? (
      <span onClick={() => fn()} className={style.link} title={v}>
        {v}
      </span>
    ) : (
      '-'
    );
  },
  transactionNumber: (v: any) => {
    return !!v ? v.toString().padStart(5, '0') : '-';
  },
};

const inlineFields = [
  'transactionNumber',
  'transactionCode',
  'transactionCodeLA',
  'inquiryBusinessNo',
  'caseStatus',
];

const transConfigs = {
  transactionCodeLA: 'transactionCode',
  submissionTime: 'submissionDate',
};

export { transFields, inlineFields, transConfigs };
