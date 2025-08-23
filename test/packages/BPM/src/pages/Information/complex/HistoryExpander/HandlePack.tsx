import React from 'react';
import lodash from 'lodash';
import moment from 'moment';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import Read from '@/components/SolutionRead';
import { EType, ESubjectType } from '@/components/SolutionRead/Enums';
import styles from './index.less';
import { replaceRecord } from '../../_utils';
import safelySetInnerHTML from 'basic/utils/safelySetInnerHTML';

const HandlePack = ({
  allCategoryTypeCode,
  content,
  effectiveDate,
  expiryDate,
  informationLinkToList,
  defaultDate,
  reason,
  reasonType,
  isAssinee,
  readData,
  item,
  recordFormatting,
}: any) => {
  const policyValueList = [];
  const policyList = lodash.filter(informationLinkToList, (el) => el?.linkToKey === 'policy');
  lodash.map(policyList, (policy) => policyValueList.push(policy?.linkToValue));

  const dateRender = !defaultDate && (
    <>
      <div>
        <span style={{ color: '#d9d9d9' }}>
          {formatMessageApi({
            Label_BIZ_Claim: 'app.usermanagement.basicInfo.avatar.effective-date',
          })}{' '}
          {formatMessageApi({
            Label_BIZ_Claim: 'form.from',
          })}
        </span>{' '}
        <span>{moment(effectiveDate).format('DD/MM/YYYY')}</span>{' '}
        <span style={{ color: '#d9d9d9' }}>
          {formatMessageApi({
            Label_BIZ_Claim: 'form.to',
          })}
        </span>{' '}
        <span>{moment(expiryDate).format('DD/MM/YYYY')}</span>
      </div>
    </>
  );

  const rejectReasonRender = reason ? (
    <div className={styles.policy}>
      <div className={styles.label}>
        {formatMessageApi({
          Label_Sider_Information: reasonType,
        })}
        :
      </div>
      <div>
        {formatMessageApi({
          [lodash.get(allCategoryTypeCode, reasonType)]: reason,
        })}
      </div>
    </div>
  ) : null;

  const policyRender = !lodash.isEmpty(policyValueList) ? (
    <>
      <div className={styles.policy}>
        <div className={styles.label}>
          {formatMessageApi({
            Label_BIZ_Claim: 'venus_claim.label.policyNo',
          })}
          :
        </div>
        <div>{lodash.join(policyValueList, ', ')}</div>
      </div>
    </>
  ) : null;

  const showUnRead = (item: any) => {
    return !!isAssinee && !lodash.includes(readData[ESubjectType.INFORMATION], item.id);
  };

  const replaceContent = replaceRecord(content, recordFormatting);
  return (
    <div className={classNames(styles.frame, !showUnRead(item) && styles.readBorder)}>
      <Read
        type={EType.ITEM}
        subjectType={ESubjectType.INFORMATION}
        id={item.id}
        show={showUnRead(item)}
      >
        {dateRender}
        {rejectReasonRender}
        {policyRender}
        <div className={styles.mainContent}
          dangerouslySetInnerHTML={{ __html: safelySetInnerHTML(replaceContent) }}
        />
      </Read>
    </div>
  );
};

export default HandlePack;
