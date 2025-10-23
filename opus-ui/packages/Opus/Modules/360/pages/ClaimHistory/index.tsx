import type { FunctionComponent} from 'react';
import React, { useEffect } from 'react';
import { connect, useDispatch } from 'dva';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';
import ClaimHistoryItem from './ClaimHistoryItem';
import Empty from '@/components/Empty';
import styles from './style.less';
import moment from 'moment';

interface IProps {
  claimHistoryList?: any[];
}

const ClaimHistories: FunctionComponent<IProps> = ({ claimHistoryList, existDocList }: any) => {
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

  const sortedList = finalClaimHistorylist.sort((itemA, itemB) => {
    const dateA = itemA?.submissionDate;
    const dateB = itemB?.submissionDate;

    if(moment(dateA)?.isSame(dateB, 'day'))
      return itemA?.claimNo > itemB?.claimNo? -1 : 1;

    return moment(dateA)?.isAfter(dateB)? -1 : 1;
  })
  return (
    <div className={styles.claimHistory}>
      {
        !lodash.isEmpty(sortedList) ? (
          sortedList.map((item: any, key) => (
            <ClaimHistoryItem claimHistoryItem={item} key={`${item.claimNo}-${key}`} />
          ))
        ) : (
          <Empty />
        )
      }
    </div>
  );
};

export default connect(({ insured360 }: any) => ({
  claimHistoryList: insured360?.claimHistoryList,
  existDocList: insured360?.existDocList,
}))(ClaimHistories);
