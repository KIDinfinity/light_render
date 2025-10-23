import React from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import moment from 'moment';
import InfoItem from './InfoItem';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useSelector } from 'dva';

export default React.memo(
  ({ children, className }: any) => {
    const { businessData = {} } = useSelector((state: any) => state.newBusinessManualUnderwriting);

    const { caseCategory, inquiryApplicationNo, submissionDate, submissionChannel, policyId } =
      businessData;

    if (React.Children.count(children)) {
      return (
        <div
          className={classnames({
            [styles.wrap]: true,
            [className]: className,
          })}
        >
          <div className={styles.info}>{children}</div>
        </div>
      );
    }

    return (
      <div
        className={classnames({
          [styles.wrap]: true,
          [className]: className,
        })}
      >
        <div className={styles.info}>
          <InfoItem
            keyName="policyId"
            title={formatMessageApi({
              Label_BIZ_Policy: 'PolicyNo',
            })}
            value={policyId}
          />
          <InfoItem
            keyName="caseCategory"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.case-category',
            })}
            value={caseCategory}
            renderValue={(value: any) => formatMessageApi({ Label_BPM_CaseCategory: value })}
          />
          <InfoItem
            keyName="businessNo"
            title={formatMessageApi({
              Label_BIZ_Claim: 'BusinessNo',
            })}
            value={inquiryApplicationNo}
          />
          <InfoItem
            keyName="submissionDate"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-date',
            })}
            value={submissionDate}
            renderValue={(value: any) => value && moment(value).format('L')}
          />
          <InfoItem
            keyName="submissionTime"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-time',
            })}
            value={submissionDate}
            renderValue={(value: any) => value && moment(value).format('LT')}
          />
          <InfoItem
            keyName="submissionChannel"
            title={formatMessageApi({
              Label_BIZ_Claim: 'app.navigator.task-detail-of-data-capture.label.submission-channel',
            })}
            value={submissionChannel}
            renderValue={(value: any) =>
              formatMessageApi({
                Dropdown_COM_SubmissionChannel: value,
              })
            }
          />
        </div>
      </div>
    );
  },
  (prevProps, nextProps) => lodash.isEqual(prevProps, nextProps)
);
