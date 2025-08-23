import React from 'react';
import { Link } from 'umi';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import PageHeader from '@/components/PageHeader';
import MenuContext from '@/layouts/MenuContext';
import GridContent from './GridContent';
import styles from './index.less';

export default ({ children, contentWidth, wrapperClassName, top, ...restProps }: any) => (
  <div className={wrapperClassName}>
    {top}
    <MenuContext.Consumer>
      {(value) => (
        <PageHeader
          wide={false}
          home={<span>{formatMessageApi({ Label_BIZ_Claim: 'menu.home' })}</span>}
          {...value}
          key="pageheader"
          {...restProps}
          linkElement={Link}
          itemRender={(item: any) => {
            if (item.locale) {
              return <span>{formatMessageApi({ Label_BIZ_Claim: item.locale })}</span>;
            }
            return item.name;
          }}
        />
      )}
    </MenuContext.Consumer>
    {children ? (
      <div className={styles.content}>
        <GridContent>{children}</GridContent>
      </div>
    ) : null}
  </div>
);
