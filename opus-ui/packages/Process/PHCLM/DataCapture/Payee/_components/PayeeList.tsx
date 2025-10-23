import React from 'react';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { Icon } from 'antd';
import classnames from 'classnames';

import { NAMESPACE } from '../../activity.config';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';

import styles from './index.less';

const PayeeList = ({ payeeId }: any) => {
  const dispatch = useDispatch();
  const taskNotEditable = useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const payeeList = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      lodash.compact(
        modelnamespace?.claimProcessData?.payeeList?.map(
          (id: any) => modelnamespace?.claimEntities?.payeeListMap?.[id] || {}
        ) || []
      ),
    shallowEqual
  );
  const forms = useSelector(({ formCommonController }: any) => formCommonController.forms) || {};
  const { policyOwnerList = [], policyInsuredList = [], policyBeneficiaryList = [] } = useSelector(
    ({ [NAMESPACE]: modelnamespace }: any) => {
      return {
        policyOwnerList: modelnamespace.c360PolicyInfo?.policyOwnerList,
        policyInsuredList: modelnamespace.c360PolicyInfo?.policyInsuredList,
        policyBeneficiaryList: modelnamespace.c360PolicyInfo?.policyBeneficiaryList,
      };
    },
    shallowEqual
  );

  return (
    <div className={styles.payeeList}>
      {payeeList.map((item: any) => (
        <div
          className={classnames({
            [styles.payeeSideCard]: true,
            [styles.selectedSideCard]: item.id === payeeId,
          })}
          key={item?.id}
          onClick={async () => {
            const NeedCheckForms = lodash.pickBy(forms, (value, key) => {
              return lodash.includes(key, 'bankAccount') || lodash.includes(key, 'payeeBasic');
            });
            const errors = await formUtils.validateFormsAndGetErrors({
              forms: lodash.values(NeedCheckForms),
              force: true,
            });
            if (lodash.isEmpty(errors)) {
              dispatch({
                type: `${NAMESPACE}/selectPayeeId`,
                payload: { id: item?.id },
              });
            }
          }}
        >
          <div className={styles.sideCardTitle}>
            {lodash
              .compact([item?.firstName, item?.middleName, item?.surname])
              .map(formUtils.queryValue)
              .join(' ') ||
              formatMessageApi({
                Label_BIZ_Claim:
                  'app.navigator.task-detail-of-claim-assessment.beneficiary.titel.new-payee',
              })}
          </div>
          {[
            {
              list: policyOwnerList,
              code: 'PolicyOwner',
            },
            {
              list: policyInsuredList,
              code: 'PolicyInsured',
            },
            {
              list: policyBeneficiaryList,
              code: 'Beneficiary',
            },
          ].map(({ list, code }) => {
            const haveRole = list?.some((client: any) => client?.clientId === item?.clientId);
            if (haveRole) {
              return (
                <div className={styles.sideCardContent} key={code}>
                  {formatMessageApi({ Label_BIZ_Policy: code })}
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
      {!taskNotEditable && (
        <div
          className={classnames(styles.payeeSideCard, styles.payeeAddCard)}
          onClick={() => {
            dispatch({
              type: `${NAMESPACE}/addPayeeInfoItem`,
            });
          }}
        >
          <Icon type="plus" style={{ fontSize: 50 }} />
        </div>
      )}
    </div>
  );
};
export default PayeeList;
