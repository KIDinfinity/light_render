import React from 'react'
import lodash from 'lodash'
import BenefitTitle from './BenefitTitle'
import styles from './index.less'

const BenifitsItemLayout = ({ children }: any) => {

  let title = null;
  const item: any[] = []

  React.Children.map(children, (child) => {
    if (child.type.displayName === 'title') {
      title = child.props.children
    }
    if (child.type.displayName === 'item') {
      item.push(child.props.children)
    }
  })

  return (
    <div className={styles.clounm}>
      <BenefitTitle key={title}>{title}</BenefitTitle>
      <div className={styles.benefitLimit}>
        {lodash.map(item, (value, key): any => (
          <div className={styles.box} key={key}>
            {lodash.map(value, (valueItem, index) => (
              <div key={index} className={styles.item}>{valueItem}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

BenifitsItemLayout.displayName = 'BenifitsItemLayout';

BenifitsItemLayout.Title = ({ children }: any) => <>{children}</>;
(BenifitsItemLayout.Title as any).displayName = 'title'

BenifitsItemLayout.Item = ({ children }: any) => <>{children}</>;
(BenifitsItemLayout.Item as any).displayName = 'item'

export default BenifitsItemLayout
