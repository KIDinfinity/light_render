import React from 'react';
import lodash from 'lodash';
import Bank from './Bank';
import Post from './Post';
import premium from './Premium';

const PayType = {
  銀行送金: Bank,
  '01': Bank,
  郵便振替: Post,
  '02': Post,
  保険料振替口座: premium,
  '03': premium,
  default: premium,
};

export default (type: string, props: any) => {
  const PayForm = PayType[type] || PayType.default;
  if (PayForm) {
    return lodash.map(PayForm(props), (item: any, idx: number) => <span key={idx}>{item}</span>);
  }
};
