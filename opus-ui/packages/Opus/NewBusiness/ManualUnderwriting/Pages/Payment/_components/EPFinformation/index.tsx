/*
 * @Author: Simon
 * @Date: 2024-04-15 09:57:46
 * @LastEditors: LastAuthor
 * @LastEditTime: 2024-04-23 14:29:52
 * @Description:
 */
import lodash from 'lodash';
import React from 'react';
import styles from '../../index.less';
import Basic from './Basic';

interface IParams {
  showOnly: boolean;
  paymentList: any;
}

export default ({ showOnly, paymentList }: IParams) => {
  return (
    <>
      <div className={styles.paymentItemWrap}>
        <div className={styles.content}>
          {lodash.map(paymentList, (item: any) => (
            <Basic item={item} key={item.id} showOnly={showOnly} />
          ))}
        </div>
      </div>
    </>
  );
};
