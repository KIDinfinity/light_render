import React from 'react';
import classNames from 'classnames';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getDictionaryByTypeCode, getLanguage } from '@/utils/dictionary';
import Application from './application';
import styles from './item.less';

const getActivityName = ({ selectedActivity, selectedCaseCategory }: any) => {
  const language = getLanguage();
  const category = getDictionaryByTypeCode(selectedCaseCategory);
  return lodash.get(category, `${selectedActivity}.${language}`);
};

export default ({ item, attachList, handleAttach, unknownDocList }) => {
  const currentCaseAttachList = lodash
    .filter(attachList, (attachItem) => attachItem?.relatedCaseNo === item?.selectedCaseNo)
    ?.map((attachItem) => attachItem?.udDocId);

  const attachDocDetailList = lodash.filter(unknownDocList, (docItem) =>
    lodash.includes(currentCaseAttachList, docItem?.docId)
  );

  const activityName = getActivityName(item);

  return item?.selectedCaseNo !== '' ? (
    <div
      className={styles.itemWrap}
      key={item?.id}
      onClick={() => {
        handleAttach(item, !lodash.isEmpty(currentCaseAttachList));
      }}
    >
      <div className={styles.item}>
        <div className={styles.leftItem}>
          <span
            className={classNames(
              styles.title,
              !lodash.isEmpty(currentCaseAttachList) ? styles.active : ''
            )}
          >
            <span>{item?.selectedCaseNo}</span>
          </span>
        </div>
        <div className={styles.middleItem}>
          <div className={styles.field}>
            <span>{activityName}</span>
            <br />
            <span className={styles.state}>{item?.status}</span>
          </div>
          <div className={styles.field}>
            <span>
              {formatMessageApi({
                Label_BIZ_Claim: 'venus_claim.label.insuredName',
              })}
            </span>
            <br />
            <span>{item?.insuredName}</span>
          </div>
          <div className={styles.field}>
            <span>
              {formatMessageApi({
                Label_BIZ_Claim: 'venus_claim.label.policyNo',
              })}
            </span>
            <br />
            <span className={styles.policies} title={item?.policyNo}>
              {item?.policyNo}
            </span>
          </div>
        </div>
        <div className={styles.rightItem}>
          <Application list={item?.selectedDocInfoList} />
          {!lodash.isEmpty(attachDocDetailList) && <Application list={attachDocDetailList} />}
        </div>
      </div>
    </div>
  ) : (
    // 需要判断已经存在的不再显示
    <></>
  );
};
