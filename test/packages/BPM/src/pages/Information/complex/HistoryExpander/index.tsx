import React, { useMemo } from 'react';
import { connect, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import moment from 'moment';
import lodash from 'lodash';
import { FormatMessageHTML } from '@/utils/dictFormatMessage';
import useExpanderController from 'navigator/hooks/useExpanderController';
import Empty from '@/components/Empty';
import AuditLog from '../InformationHistory/AuditLog';
import HandlePack from './HandlePack';

import styles from './index.less';

const HistoryExpander = (props: any) => {
  const {
    allCategoryHistory,
    categoryList,
    allCategoryTypeCode,
    activityHistoryItem,
    readData,
    isAssinee,
  } = props;
  const { isExpanderSwitchOn } = useExpanderController();
  const expanderList = useMemo(() => {
    return activityHistoryItem === 'auditLog'
      ? [{}]
      : lodash
          .chain(allCategoryHistory)
          .find((item) => item.categoryCode === activityHistoryItem)
          .get('informationList')
          .value();
  }, [allCategoryHistory, activityHistoryItem]);
  const auditList = useSelector(
    (state: any) => state.navigatorInformationController.auditList || [],
    shallowEqual
  );
  const isEmpty = useMemo(() => {
    return lodash.isEmpty(allCategoryHistory) && lodash.isEmpty(auditList);
  }, [allCategoryHistory, auditList]);

  const list = !lodash.isEmpty(categoryList) ? categoryList : expanderList;
  return isEmpty ? (
    <div className={styles.noData}>
      <Empty />
    </div>
  ) : (
    <div className={styles.wrap}>
      <div className={styles.content}>
        {activityHistoryItem !== 'auditLog' ? (
          lodash.map(list, (item, index) => {
            return (
              <React.Fragment key={index}>
                <div className={styles.record}>
                  <div className={styles.statusWrap}>
                    <div className={styles.status}>
                      <FormatMessageHTML
                        templateId={{ Label_BPM_CaseCategory: item?.caseCategory }}
                      />
                      /
                      <FormatMessageHTML templateId={{ activity: item?.procActivityKey }} />
                    </div>
                    <div className={styles.create}>{item?.creator}</div>
                    <div className={styles.createDate}>
                      {moment(item?.creationDate).format('L LT').replace(/-/g, '/')}
                    </div>
                  </div>
                  {lodash.map(item?.informationDOList, (info: any) => {
                    return (
                      <HandlePack
                        key={info.id}
                        allCategoryTypeCode={allCategoryTypeCode}
                        content={info?.content}
                        effectiveDate={info?.effectiveDate}
                        expiryDate={info?.expiryDate}
                        informationLinkToList={info?.informationLinkToList}
                        defaultDate={info?.defaultDate}
                        reason={info?.reason}
                        reasonType={info?.reasonType}
                        item={info}
                        isAssinee={isAssinee}
                        readData={readData}
                        recordFormatting={item?.recordFormatting}
                      />
                    );
                  })}
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <div className={styles.frameAudit}>
            <AuditLog isExpanderSwitchOn={isExpanderSwitchOn} inExpander={true} />
          </div>
        )}
      </div>
    </div>
  );
};

export default connect(({ navigatorInformationController, solutionRead }: any) => ({
  allCategoryHistory: navigatorInformationController.allCategoryHistory,
  categoryList: navigatorInformationController.categoryList,
  contentIndex: navigatorInformationController.contentIndex,
  allCategoryTypeCode: lodash.get(navigatorInformationController, 'allCategoryTypeCode', {}),
  activityHistoryItem: navigatorInformationController.activityHistoryItem,
  readData: solutionRead?.readData || {},
  isAssinee: solutionRead?.isAssinee || false,
}))(HistoryExpander);
