import React from 'react';
import lodash from 'lodash'
import styles from './BenefitTitle.less'

export default function BenefitTitle({ children }: any) {
  return (
    <>
      <div className={styles.title}>
        {lodash.map(children, (item, key) => (<div key={key} className={styles.item}>{item}</div>))}
      </div>
    </>
  )
}
