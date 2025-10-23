import React from 'react';
import { Row, Col } from 'antd';
import styles from './TreatmentLayout.less';

const TreatmentLayout = ({ children }: any) => {

  let [left, right, bottom] = [null, null, null]

  React.Children.map(children, (child) => {
    if (child.type.displayName === 'Left') {
      left = child.props.children
    }
    if (child.type.displayName === 'Right') {
      right = child.props.children
    }
    if (child.type.displayName === 'Bottom') {
      bottom = child.props.children
    }
  })

  return (
    <>
      <div className={styles.box}>
        <Row type="flex" gutter={16}>
          <Col span={12}>
            <div className={styles.basic}>
              {left}
            </div>
          </Col>
          <Col span={12}>
            <div className={styles.procedure}>
              {right}
            </div>
          </Col>
        </Row>
        <div className={styles.invoice}>
          {bottom}
        </div>
      </div>
    </>
  )
}

TreatmentLayout.displayName = 'TreatmentLayout';

TreatmentLayout.Left = ({ children }: any) => <>{children}</>;
(TreatmentLayout.Left as any).displayName = 'Left'

TreatmentLayout.Right = ({ children }: any) => <>{children}</>;
(TreatmentLayout.Right as any).displayName = 'Right'

TreatmentLayout.Bottom = ({ children }: any) => <>{children}</>;
(TreatmentLayout.Bottom as any).displayName = 'Bottom'

export default TreatmentLayout
