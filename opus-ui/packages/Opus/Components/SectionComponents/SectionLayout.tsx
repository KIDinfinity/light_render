import React from 'react';
import { Row } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import Section from './Section';
import styles from './index.less';

type SectionLayoutProps = {
  children: React.ReactNode;
};

const SectionLayout: React.FC<SectionLayoutProps> = ({ children }) => {
  const configs = useSelector((state: any) => state.atomConfig.sections.default, shallowEqual);
  // children 转为数组
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={styles.sectionLayout}>
      <Row gutter={[16, 16]}>
        {lodash
          .orderBy(childrenArray, (child: any) => {
            const config = configs?.find((item: any) => item.sectionId === child?.props?.sectionId);
            return config ? config.order : Infinity; // 如果没有找到对应的 sectionId，则返回 Infinity，确保它排在最后
          })
          .map((child, index) => {
            // 根据 key 找到对应的 child
            const config = configs?.find((item: any) => item.sectionId === child?.props?.sectionId);
            if (!config || config?.visible === 'N') {
              return null; // 如果没有找到对应的 child，则跳过
            }
            return (
              <Section
                sectionId={config.sectionId}
                sectionIndex={index}
                key={config.sectionId}
                config={config}
              >
                {child}
              </Section>
            );
          })}
      </Row>
    </div>
  );
};

export default SectionLayout;
