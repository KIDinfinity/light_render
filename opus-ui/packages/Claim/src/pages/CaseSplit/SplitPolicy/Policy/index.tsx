import React, { useEffect, useMemo, useState } from 'react';
import lodash from 'lodash';
import { Button } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import classNames from 'classnames';
import PolicyItem from './PolicyItem';
import styles from './index.less';

interface IProps {
  className: string;
  policyList?: string[];
}

const PolicyList = ({ policyList, className }: IProps) => {
  const [currentPolicyNo, setCurrentPolicyNo] = useState(policyList?.[0]?.policyNo || '');

  useEffect(() => {
    setCurrentPolicyNo(policyList?.[0]?.policyNo);
  }, [lodash.size(policyList)]);

  const currentPolicyList = useMemo(() => {
    return lodash.find(policyList, (item: any) => item.policyNo === currentPolicyNo);
  }, [currentPolicyNo, policyList]);

  return (
    <div className={classNames('split_list', className)}>
      <div className={styles.btn_wrap}>
        {lodash.map(policyList, (item: any) => {
          const policyNo = item?.policyNo;
          return (
            policyNo && (
              <Button
                type="link"
                style={{ display: 'inline-block' }}
                className={classNames(
                  styles.btn_item,
                  currentPolicyNo === policyNo ? styles.selected : ''
                )}
                onClick={() => {
                  setCurrentPolicyNo(policyNo);
                }}
              >
                {`${formatMessageApi({
                  Label_BIZ_Claim: 'venus_claim.label.policyNo',
                })} ${policyNo}`}
              </Button>
            )
          );
        })}
      </div>

      {currentPolicyList && (
        <PolicyItem
          key={`${currentPolicyList?.policyNo}-${0}`}
          policyNo={currentPolicyList?.policyNo}
          treatmentPayables={currentPolicyList?.payables}
        />
      )}
    </div>
  );
};

export default PolicyList;
