import React from 'react';
import moment from 'moment';
import lodash from 'lodash';

import { replaceRecord } from 'bpm/pages/Information/_utils';
import EmptyData from 'opus/Components/EmptyData/Default';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formatMessageApiTypeCodeLabel_CLM_Opus as t } from '@/utils/dictFormatMessage';
import { tenant, Region } from '@/components/Tenant';
import Card from '../Card';
import styles from './index.less';

const InfoHistory = ({ curInfoHistory, className, isShowDropDown }: any) => {
  const formatDate =
    tenant.region() === Region.JP ? 'YYYY/MM/DD [at] hh:mm A' : 'DD/MM//YYYY [at] hh:mm A';

  return (
    <>
      {curInfoHistory.length > 0 ? (
        <div className={`${styles.infoHistoryWrapper} ${className}`}>
          {curInfoHistory.map((item) => {
            const { infoReasons = [], content, id } = item;
            const reason = (infoReasons || []).reduce((txt, idx) => {
              if (idx.reasonCode) {
                txt.push(
                  <div>
                    {`${formatMessageApi({ category: idx.reasonType })}: ${formatMessageApi({
                      [idx.typeCode || idx.reasonCode]: idx.reasonCode,
                    })}`}
                  </div>
                );
              }
              return txt;
            }, []);

            const txt = (
              <>
                {isShowDropDown &&
                  lodash
                    .filter(
                      item?.informationLinkToList,
                      (filterItem) => filterItem.linkToKey === 'policy'
                    )
                    .map((mapItem) => (
                      <div key={mapItem.id} className={styles.link}>
                        <div>
                          {formatMessageApi({
                            Label_BIZ_Claim: 'venus_claim.label.policyNo',
                          })}
                          :
                        </div>
                        <div>{mapItem?.linkToValue}</div>
                      </div>
                    ))}
                {reason}
                <div
                  dangerouslySetInnerHTML={{
                    __html: replaceRecord(content, item?.informationItem?.recordFormatting),
                  }}
                />
              </>
            );

            return (
              <Card
                key={id}
                right={`${t(item?.creatorName || '')}`}
                title={`${formatMessageApi({
                  Label_BPM_CaseCategory: item.caseCategory,
                })}/${formatMessageApi({
                  activity: item.procActivityKey,
                })}`}
                txt={txt}
                bottom={moment(item.gmtCreate).format(formatDate).toLowerCase()}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.empty}>
          <EmptyData type="black" />
        </div>
      )}
    </>
  );
};

export default InfoHistory;
