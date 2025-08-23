import React from 'react'
import styles from './SectionCard.less'

export default ({ children, title }) => {
  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionTitle}>
        {title}
      </div>
      {children}
    </div>
  )
}
