import React, { useMemo } from 'react';
import lodash from 'lodash';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from 'process/NB/ManualUnderwriting/Client/ClientDetail/IdentitySider/Section';
import CCRClientID from './CCRClientID';
import LAClientID from './LAClientID';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import NewClientFlag from 'process/NB/ManualUnderwriting/Enum/NewClientFlag';
import useGetDataBySection from 'process/NB/ManualUnderwriting/_hooks/useGetDataBySection';
import useGetIsShowEnquiryIdButton from 'process/NB/ManualUnderwriting/_hooks/useGetIsShowEnquiryIdButton';
import Mode from 'process/NB/ManualUnderwriting/Enum/Mode';
import { tenant, Region } from '@/components/Tenant';
import CopyEnquiryId from './CopyEnquiryId';

const ReadOnly = ({ id, currentItem, config, mode }: any) => {
  const isShowCopyEnquiryId = useGetIsShowEnquiryIdButton({ clientId: id });
  const regionCode = tenant.region();
  const info = useGetDataBySection({
    id,
    section: 'CommonClientInfo-Field',
    config,
  });
  const isShowCcrClientId = useMemo(() => {
    return lodash.some(info, (item) => item.key === 'ccrClientId');
  }, [info]);
  const ccrClientId = useMemo(() => {
    return lodash
      .chain(info)
      .find((item) => item.key === 'ccrClientId')
      .get('value')
      .value();
  }, [info]);
  const showIsNewClient = useMemo(
    () => regionCode === Region.TH && currentItem?.newClientFlag === NewClientFlag.New,
    [currentItem?.newClientFlag, regionCode]
  );
  const laClientId = useMemo(() => {
    return lodash
      .chain(info)
      .find((item) => item.key === 'laClientId')
      .get('value')
      .value();
  }, [info]);

  return (
    <div className={styles.identityContainer}>
      {showIsNewClient && (
        <span className={styles.status}>
          {formatMessageApi({
            Dropdown_IND_NewClientFlag: currentItem?.newClientFlag,
          })}
        </span>
      )}
      {isShowCcrClientId && <CCRClientID value={ccrClientId} />}
      <LAClientID value={laClientId} />
      {isShowCopyEnquiryId && mode === Mode.Show && <CopyEnquiryId clientId={id} />}
    </div>
  );
};

const ApplicationIdentity = ({ id, item, mode }: any) => {
  const config = useGetSectionAtomConfig({
    section: 'CommonClientInfo-Field',
    localConfig,
  });
  return <ReadOnly id={id} currentItem={item} config={config} mode={mode} />;
};

ApplicationIdentity.displayName = 'applicationIdentity';

export default ApplicationIdentity;
