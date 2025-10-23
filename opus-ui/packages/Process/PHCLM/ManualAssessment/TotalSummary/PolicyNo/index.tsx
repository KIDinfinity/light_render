import React from 'react';
import PolicyComponent from './PolicyComponent';
import { SectionColumns } from '../Section';

import styles from './index.less';

const PolicyNode = ({ policyItem, children, isLabel, showPolicy, switchOn }: any) => {
  const { policyNo, policyYear, policyCurrency } = policyItem;

  return (
    <>
      <div className={styles.benefitTypeHeader}>
        <div className={styles.basicItem}>
          <SectionColumns
            showArrow={false}
            expand={switchOn}
            render={{
              claimDecision: {
                render: () => (
                  <>
                    {!(isLabel && !showPolicy) && (
                      <PolicyComponent
                        policyNo={policyNo}
                        policyYear={policyYear}
                        policyCurrency={policyCurrency}
                      />
                    )}
                  </>
                ),
                'x-layout': {
                  //  TODO: 动态layout
                  // 480px
                  xs: {
                    span: 16,
                    offset: 0,
                    pull: 0,
                    order: 1,
                  },
                  // 576px
                  sm: {
                    span: 16,
                    offset: 0,
                    pull: 0,
                    order: 1,
                  },
                  // 768px
                  md: {
                    span: 16,
                    offset: 0,
                    pull: 0,
                    order: 1,
                  },
                  // 992px
                  lg: {
                    span: 16,
                    offset: 0,
                    pull: 0,
                    order: 1,
                  },
                  // 1200px
                  xl: {
                    span: 16,
                    offset: 0,
                    pull: 0,
                    order: 1,
                  },
                  // 1600px
                  xxl: {
                    span: 16,
                    offset: 0,
                    pull: 0,
                    order: 1,
                  },
                },
              },
              benefitTypeCode: {
                visible: 'N',
              },
              boosterAmount: {
                visible: 'N',
              },
              boosterDays: {
                visible: 'N',
              },
              payableAmount: {
                visible: 'Y',
                'x-layout': {
                  //  TODO: 动态layout
                  // 480px
                  xs: {
                    span: 5,
                    offset: 0,
                    pull: 0,
                    order: 3,
                  },
                  // 576px
                  sm: {
                    span: 5,
                    offset: 0,
                    pull: 0,
                    order: 3,
                  },
                  // 768px
                  md: {
                    span: 5,
                    offset: 0,
                    pull: 0,
                    order: 3,
                  },
                  // 992px
                  lg: {
                    span: 5,
                    offset: 0,
                    pull: 0,
                    order: 3,
                  },
                  // 1200px
                  xl: {
                    span: 5,
                    offset: 0,
                    pull: 0,
                    order: 3,
                  },
                  // 1600px
                  xxl: {
                    span: 5,
                    offset: 0,
                    pull: 0,
                    order: 3,
                  },
                },
              },
              payableDays: {
                visible: 'Y',
                'x-layout': {
                  //  TODO: 动态layout
                  // 480px
                  xs: {
                    span: 3,
                    offset: 0,
                    pull: 0,
                    order: 4,
                  },
                  // 576px
                  sm: {
                    span: 3,
                    offset: 0,
                    pull: 0,
                    order: 4,
                  },
                  // 768px
                  md: {
                    span: 3,
                    offset: 0,
                    pull: 0,
                    order: 4,
                  },
                  // 992px
                  lg: {
                    span: 3,
                    offset: 0,
                    pull: 0,
                    order: 4,
                  },
                  // 1200px
                  xl: {
                    span: 3,
                    offset: 0,
                    pull: 0,
                    order: 4,
                  },
                  // 1600px
                  xxl: {
                    span: 3,
                    offset: 0,
                    pull: 0,
                    order: 4,
                  },
                },
              },
              benefitItemCode: {
                visible: 'Y',
              },
              productCode: {
                visible: 'N',
              },
              policyYear: {
                visible: 'N',
              },
              remark: {
                visible: 'N',
              },
              deductibleAmount: {
                visible: 'N',
              },
              deductibleWaived: {
                visible: 'N',
              },
              deductibleOtherInsurerDeduction: {
                visible: 'N',
              },
              contestableClaim: {
                visible: 'N',
              },
              holiday: {
                visible: 'N',
              },
              redFlag: {
                visible: 'N',
              },
              beyondNEL: {
                visible: 'N',
              },
              policyDuration: {
                visible: 'N',
              },
              reimbursementPercentage: {
                visible: 'N',
              },
            }}
          />
        </div>
        <div className={styles.boosterItem}>
          <SectionColumns
            showArrow={false}
            expand={switchOn}
            render={{
              claimDecision: {
                visible: 'N',
              },
              benefitTypeCode: {
                visible: 'N',
              },
              boosterAmount: {
                visible: 'N',
              },
              boosterDays: {
                visible: 'N',
                'x-layout': {
                  //  TODO: 动态layout
                  // 480px
                  xs: {
                    span: 2,
                    offset: 0,
                    pull: 0,
                    order: 6,
                  },
                  // 576px
                  sm: {
                    span: 2,
                    offset: 0,
                    pull: 0,
                    order: 6,
                  },
                  // 768px
                  md: {
                    span: 2,
                    offset: 0,
                    pull: 0,
                    order: 6,
                  },
                  // 992px
                  lg: {
                    span: 2,
                    offset: 0,
                    pull: 0,
                    order: 6,
                  },
                  // 1200px
                  xl: {
                    span: 2,
                    offset: 0,
                    pull: 0,
                    order: 6,
                  },
                  // 1600px
                  xxl: {
                    span: 2,
                    offset: 0,
                    pull: 0,
                    order: 6,
                  },
                },
              },
              payableAmount: {
                visible: 'N',
              },
              payableDays: {
                visible: 'N',
              },
              benefitItemCode: {
                visible: 'N',
              },
              productCode: {
                visible: 'N',
              },
              policyYear: {
                visible: 'N',
              },
              remark: {
                visible: 'N',
              },
              deductibleAmount: {
                visible: 'N',
              },
              deductibleWaived: {
                visible: 'N',
              },
              deductibleOtherInsurerDeduction: {
                visible: 'N',
              },
              contestableClaim: {
                visible: 'N',
              },
              holiday: {
                visible: 'N',
              },
              redFlag: {
                visible: 'N',
              },
              beyondNEL: {
                visible: 'N',
              },
              policyDuration: {
                visible: 'N',
              },
            }}
          />
        </div>
      </div>
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { expand: switchOn })
      )}
    </>
  );
};
export default PolicyNode;
