import React, { useCallback, useState } from 'react';
import classNames from 'classnames';
import useExpanderController from 'navigator/hooks/useExpanderController';
import Header from './Header';
import Info from './Info';
import styles from './index.less';
import Category from './Category';
import { useGetUserComment } from './_hooks';
import lodash from 'lodash';
import Empty from '@/components/Empty';

const UserComment = () => {
  const { isExpanderSwitchOn } = useExpanderController();
  const userComment = useGetUserComment();

  const [expanded, setExpanded] = useState({});

  const onExpandedChange = useCallback(
    (newExpanded: any) => {
      setExpanded({ ...expanded, ...newExpanded });
    },
    [expanded]
  );

  const getIsExpanded = useCallback(
    (policyId, informationCategories) => {
      const keys = expanded[policyId] || [];

      return keys.length === informationCategories.length;
    },
    [expanded]
  );

  return (
    <div>
      {!lodash.isEmpty(userComment) ? (
        <>
          {userComment.map((item: any) => {
            const { policyId, informationCategories } = item;

            return (
              <div key={policyId} className={styles.card}>
                <Header
                  item={item}
                  expanded={getIsExpanded(policyId, informationCategories)}
                  onExpandedChange={onExpandedChange}
                />
                <div
                  className={classNames(styles.wrap, {
                    [`${styles.wrapFlex}`]: isExpanderSwitchOn,
                  })}
                >
                  <Info item={item} />
                  <Category
                    item={item}
                    expandedKeys={expanded[policyId]}
                    onExpandedChange={onExpandedChange}
                  />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default UserComment;
