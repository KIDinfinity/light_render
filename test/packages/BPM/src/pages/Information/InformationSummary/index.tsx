import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import useLoadInformationHistory from 'bpm/pages/Information/_hooks/useLoadInformationHistory';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import styles from './index.less';
import { FormatMessageHTML } from '@/utils/dictFormatMessage';
import HistoryListItemContent from 'bpm/pages/Information/complex/HistoryListItemContent';
import { FormAntCard } from 'basic/components/Form';
import { Icon } from 'antd';
import ExpandableContainer from 'basic/components/ExpandableContainer';
import useGetSummaryInformation from 'summary/hooks/useGetSummaryInformation';

const Information = ({ expendStatus, setExpendStatus }: any) => {
  useLoadInformationHistory();

  const allCategoryHistory = useGetSummaryInformation();

  const titleRender = (
    <div className={styles.titleWrap}>
      <span className={styles.title}>
        {formatMessageApi({
          Label_BIZ_Claim: 'app.navigator.drawer.remark.title',
        })}
      </span>
      <span className={styles.actions}>
        <Icon type={!expendStatus ? 'down' : 'up'} onClick={() => setExpendStatus(!expendStatus)} />
      </span>
    </div>
  );
  return (
    <FormAntCard
      title={titleRender}
      className={classnames(styles.detail, {
        [styles.hidden]: !expendStatus,
      })}
    >
      {expendStatus ? (
        <div className={styles.container}>
          <div>
            {lodash.map(allCategoryHistory, (item: any) => {
              const title = formatMessageApi({
                category: item.categoryCode,
              });
              return (
                <div id={item.id} className={styles.category} key={item?.id}>
                  <div className={styles.categoryTitle}>{title}</div>
                  <div className={styles.infoList}>
                    {lodash.map(item?.informationList, (informationListItem: any) => {
                      return (
                        <div key={informationListItem.id} className={styles.infoList}>
                          <div className={styles.attachInfo}>
                            <div className={styles.processInfo}>
                              <FormatMessageHTML
                                templateId={{
                                  Label_BPM_CaseCategory: informationListItem.caseCategory,
                                }}
                              />
                              <FormatMessageHTML
                                templateId={{ activity: informationListItem.procActivityKey }}
                              />
                            </div>
                            <div>
                              <span>{informationListItem.creator}</span>
                            </div>
                          </div>
                          <div className={styles.infoListContainer}>
                            {lodash.map(
                              informationListItem.informationDOList,
                              (infoItem: any, key) => {
                                return <HistoryListItemContent item={infoItem} key={key} />;
                              }
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <></>
      )}
    </FormAntCard>
  );
};
const InformationSummary = () => {
  return (
    <ExpandableContainer sectionId="information">
      <Information />
    </ExpandableContainer>
  );
};

InformationSummary.displayName = 'InformationSummary';

export default InformationSummary;
