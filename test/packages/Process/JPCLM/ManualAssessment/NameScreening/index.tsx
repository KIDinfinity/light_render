import React, { useState, useEffect } from 'react';
import { Button, Icon } from 'antd';

import { useSelector } from 'dva';
import { ReactComponent as WarnSvg } from 'claim/assets/warning.svg';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { Dropdown_CLM_AMLResult } from 'claim/enum/Dropdown_CLM_AMLResult';
import NameScreeningModal from './modal';

import styles from './index.less';

const NameScreening = () => {
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(false);
  const dataSource = useSelector(
    (state: any) => state.JPCLMOfClaimAssessment.claimProcessData?.claimAmlNameScreeningDOList
  );

  useEffect(() => {
    setIcon(lodash.some(dataSource, (item: any) => item?.result === Dropdown_CLM_AMLResult.Hit));
  }, [dataSource]);

  return (
    <>
      <div className={styles.buttonIcon}>
        <Button onClick={() => setOpen(true)}>
          {formatMessageApi({
            Label_BIZ_Claim: 'NameScreening',
          })}
        </Button>
        {icon && <Icon className={styles.icon} component={WarnSvg} />}
      </div>
      <NameScreeningModal open={open} setOpen={setOpen} />
    </>
  );
};

export default NameScreening;
