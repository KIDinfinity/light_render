import React from 'react';
import style from '../index.less';
import lodash from 'lodash';

const mapProduct = (codeList: any, posItem) => {
  return (
    <ul>
      {lodash.map(codeList, (item, index: number) => (
        <li key={`${item}-${index}`}>{`${item} ${posItem.applyToProductNameList?.[index] || ''}`}</li>
      ))}
    </ul>
  );
};

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
  applyToProductCodeList: mapProduct,
  assignee: (v, item) => item.assignee || item.userId,
};

const transConfigs = {
  transactionCodeLA: 'transactionCode',
  submissionTime: 'submissionDate',
};

export { transFields, transConfigs };
