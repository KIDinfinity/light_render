import React from 'react';
import Decision from '../../BaseProduct/index';
import { NAMESPACE } from '../../BaseProduct/activity.config';
import { useSelector } from 'dva';
import { get, isEmpty } from 'lodash';

const Content = () => {
  const dataList = useSelector((state: any) => get(state, `${NAMESPACE}.ewsData`, []));
  const currentIndex = useSelector((state: any) =>
    get(state, `${NAMESPACE}.currentEwsDataIndex`, {})
  );
  const data = dataList?.[currentIndex] || {};

  return (
    <>
      {!isEmpty(data) ? (
        <Decision
          index={currentIndex}
          businessData={data?.businessData}
          taskDetail={data?.businessData}
        />
      ) : null}
    </>
  );
};

Content.displayName = 'content';

export default Content;
