import React, { useState } from 'react';
import useGetSelectedEwsData from 'process/NewBusiness/EWS/_hooks/useGetSelectedEwsData';
import ManualUnderwriting from 'process/NewBusiness/ManualUnderwriting';
import useLoadEWS from 'process/NewBusiness/EWS/_hooks/useLoadEWS';
import { Spin } from 'antd';
import styles from './index.less';
import lodash from 'lodash';

let needUpdate = 0;
const UWContent = React.memo(
  (props) => {
    return <ManualUnderwriting {...props} />;
  },
  (preProps: any, nextProps: any) => {
    if (!lodash.isEqual(preProps?.businessData, nextProps?.businessData)) {
      needUpdate++;
    }
    return lodash.isEqual(preProps?.businessData, nextProps?.businessData);
  }
);

const Content = React.memo(
  ({ applicationNo }: any) => {
    const [loading, setLoading] = useState(true);
    useLoadEWS({ applicationNo, setLoading });
    const data = useGetSelectedEwsData();
    return (
      <div>
        {loading && <Spin className={styles.contentSpin} />}
        {!loading && (
          <UWContent
            businessData={data?.businessData || {}}
            taskDetail={{
              businessNo: data?.applicationNo,
              caseCategory: data?.businessData?.caseCategory,
            }}
            needUpdate={needUpdate}
          />
        )}
      </div>
    );
  },
  (preProps: any, nextProps: any) => {
    return lodash.isEqual(preProps?.applicationNo, nextProps?.applicationNo);
  }
);

Content.displayName = 'content';

export default Content;
