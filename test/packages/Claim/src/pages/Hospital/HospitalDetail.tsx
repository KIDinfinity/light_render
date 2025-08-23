import React from 'react';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import BackButton from '@/components/BackButton/SiderBarBackButton';
import DetailHeader from 'navigator/components/DetailHeader';
import DetailSider from 'navigator/components/DetailSider';
import DetailContent from './DetailContent/DetailContent';
import styles from './HospitalDetail.less';

const HospitalDetail = (props) => (
  <>
    <DetailHeader
      title={formatMessageApi({
        Label_BIZ_Claim: 'app.navigator.hospitalDetail.title',
      })}
    />
    <div className={styles.container}>
      <DetailSider>
        <BackButton  />
      </DetailSider>
      <div className={`${styles.content} ${styles['black-scroll']}`}>
        <DetailContent {...props} />
      </div>
    </div>
  </>
);

export default React.memo(HospitalDetail);
