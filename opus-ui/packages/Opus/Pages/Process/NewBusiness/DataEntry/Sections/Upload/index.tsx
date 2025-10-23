import React from 'react';
import OpusCard from 'opus/Components/OpusCard';
import useRule from 'opus/Components/OpusCard/useRule';
import { ReactComponent as uploadSVG } from 'opus/Pages/Process/NewBusiness/Assets/upload.svg';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from '../../activity.config';
import FormSection from './FormSection';
import UploadList from './UploadList';
import UploadModal from './UploadModal';
import styles from './index.less';

export default ({ config }: any) => {
  const isShow = useRule({ NAMESPACE, config });

  return (
    isShow && (
      <OpusCard title={formatMessageApi({ [config?.typeCode]: config?.dictCode })} icon={uploadSVG}>
        <div className={styles.sectionCard}>
          <FormSection />
          <UploadList />
          <UploadModal />
        </div>
      </OpusCard>
    )
  );
};
