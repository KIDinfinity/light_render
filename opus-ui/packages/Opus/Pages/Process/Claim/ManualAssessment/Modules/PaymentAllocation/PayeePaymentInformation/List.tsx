import React from 'react';
import lodash from 'lodash';
import { Icon } from 'antd';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import Card from '../Card';
import Item from './Item';

import { ReactComponent as IconPlus } from 'opus/Assets/icon-plus.svg';
import { NAMESPACE } from 'opus/Pages/Process/Claim/ManualAssessment/activity.config';

import styles from './index.less';

const AddPaymentInformation = () => {
  const editable = !useSelector((state: any) => state.claimEditable.taskNotEditable);
  const dispatch = useDispatch();

  const onAdd = () => {
    dispatch({
      type: `${NAMESPACE}/addPayeePaymentInformation`,
    });
  };

  return editable ? <Icon component={IconPlus} onClick={onAdd} /> : null;
};

export default () => {
  const { policyBenefitList, beneficiaryList } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => ({
      policyBenefitList: modelnamespace?.paymentModal?.datas?.policyBenefitList,
      beneficiaryList: modelnamespace?.paymentModal?.datas?.beneficiaryList,
    }),
    shallowEqual
  );
  const totalPolicyBenefit =
    policyBenefitList?.map((item) => item?.beneficiaryList).flat()?.length || 0;
  return (
    <div className={styles.list}>
      <Card title={formatMessageApi({ Label_COM_Opus: 'PayeePaymentInformation' })}>
        {lodash.map(policyBenefitList, (item, index) =>
          lodash.map(item.beneficiaryList, (beneficiary) => (
            <Item
              key={beneficiary?.id}
              item={beneficiary}
              policyBenefitId={item?.id}
              policyNo={item?.policyNo}
              actions={
                policyBenefitList.length - 1 === index &&
                (beneficiaryList === undefined || beneficiaryList.length === 0) ? (
                  <AddPaymentInformation />
                ) : null
              }
              isLastBeneficiary={totalPolicyBenefit === 1 && !beneficiaryList?.length}
            />
          ))
        )}
        {lodash.map(beneficiaryList, (beneficiary, index) => (
          <Item
            key={beneficiary?.id}
            item={beneficiary}
            actions={beneficiaryList.length - 1 === index ? <AddPaymentInformation /> : null}
            isLastBeneficiary={totalPolicyBenefit === 0 && beneficiaryList?.length === 1}
          />
        ))}
      </Card>
    </div>
  );
};
