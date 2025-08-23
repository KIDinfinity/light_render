import type { FunctionComponent} from 'react';
import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import ClaimHistoryItem from './ClaimHistoryItem';
import TimeLine from '../../_component/TimeLine';
import Empty from '@/components/Empty';
import styles from './style.less';

interface IProps {
  claimHistoryList?: any[];
}

const ClaimHistories: FunctionComponent<IProps> = ({ claimHistoryList, existDocList }: any) => {
  const [activeKey, setActiveKey] = useState(0);
  const dispatch = useDispatch();
  const codes = lodash.map(claimHistoryList, (item) => {
    return lodash.map(item?.incidentList, (incident) => incident?.claimDisease);
  });
  const finalClaimHistorylist =
    lodash
      .chain(claimHistoryList)
      .map((item: any) => ({
        ...item,
        existDoc: lodash.some(existDocList, (docItem) => docItem?.businessNo === item?.claimNo),
        caseNo:
          lodash.filter(existDocList, (docItem) => docItem?.businessNo === item?.claimNo)[0]
            ?.caseNo || null,
      }))
      .value() || [];

  useEffect(() => {
    dispatch({
      type: 'insured360/getDiseaseName',
      payload: {
        codes: lodash.chain(codes).flatten().flatten().value(),
        regionCode: tenant.region(),
      },
    });
  }, []);

  return (
    <div className={styles.claimHistory}>
      {!lodash.isEmpty(finalClaimHistorylist) ? (
        <>
          {lodash
            .chain(finalClaimHistorylist)
            .orderBy('submissionDate', 'desc')
            .map((item: any, key) => (
              <TimeLine
                key={`${item.claimNo}-${key}`}
                activeKey={activeKey}
                index={key}
                callback={setActiveKey}
                title={item?.submissionDate}
              >
                <ClaimHistoryItem claimHistoryItem={item} />
              </TimeLine>
            ))
            .value()}
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default connect(({ insured360 }: any) => ({
  claimHistoryList: insured360?.claimHistoryList,
  existDocList: insured360?.existDocList,
}))(ClaimHistories);
