import React from 'react';
import { Button, Tooltip } from 'antd';
import classNames from 'classnames';
import { useSelector } from 'dva';
import lodash from 'lodash';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

import useLinkToUWMeByEnquiryId from './_hooks/useLinkToUWMeByEnquiryId';
import useGetIsShowEnquiryIdButton from './_hooks/useGetIsShowEnquiryIdButton';
import styles from './index.less';

const IdentityItem = ({ labelId, clientId, field, config }: any) => {
  const value = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.[field]
  );

  return lodash.some(config, (item) => item.field === field) && value ? (
    <div className={classNames(styles.identityItem, styles.container, styles.decollator)}>
      <span className={styles.label}>
        {formatMessageApi({
          Label_BIZ_Individual: labelId,
        })}
      </span>
      <Tooltip title={value} className={styles.info}>
        {value}
      </Tooltip>
    </div>
  ) : null;
};


const LinkToUWMeButton = ({ clientId }: any) => {
  const enquiryId = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace.entities?.clientMap?.[clientId]?.enquiryId
  );
  const handleLink = useLinkToUWMeByEnquiryId({ clientId, enquiryId });
  const isShow = useGetIsShowEnquiryIdButton({ clientId, enquiryId });

  return isShow ? (
    <div className={styles.identityItem}>
      <Button onClick={handleLink} size="small">
        {formatMessageApi({
          Label_BPM_Button: 'LinkToUWMe',
        })}
      </Button>
    </div>
  ) : null
};

export default ({ clientId, config }: any) => {
  return (
    <div className={styles.applicationIdentity}>
      <IdentityItem clientId={clientId} field="ccrClientId" labelId="CCRClientID" config={config} />
      <IdentityItem clientId={clientId} field="laClientId" labelId="LAClientID" config={config} />
      <LinkToUWMeButton clientId={clientId} />
    </div>
  );
};
