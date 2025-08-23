import React from 'react';
import lodash from 'lodash';
import { useSelector, useDispatch } from 'dva';
import classNames from 'classnames';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import PayeeItem from './PayeeItem';
import AddButton from './AddButton';
import styles from '../index.less';

// TODO:初始化不应该渲染
export default ({ id, NAMESPACE }: any) => {
  const dispatch = useDispatch();

  const payeeList =
    useSelector(
      ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas?.payeeList
    ) || [];

  const forms = useSelector(({ formCommonController }: any) => formCommonController.forms) || {};

  // TODO:这个逻辑是否真的有必要做？
  const title = ({ firstName, middleName, surname, organization, companyName }: any) => {
    return !!formUtils.queryValue(organization)
      ? formUtils.queryValue(companyName)
      : lodash.compact([firstName, middleName, surname]).map(formUtils.queryValue).join(' ') ||
          formatMessageApi({
            Label_BIZ_Claim:
              'app.navigator.task-detail-of-claim-assessment.beneficiary.titel.new-payee',
          });
  };

  const handleClick = async ({ ClickId }) => {
    const NeedCheckForms = lodash.pickBy(forms, (value, key) => {
      return lodash.includes(key, 'bankAccount') || lodash.includes(key, 'payee.Basic');
    });
    const errors = await formUtils.validateFormsAndGetErrors({
      forms: lodash.values(NeedCheckForms),
      force: true,
    });
    if (lodash.isEmpty(errors)) {
      dispatch({
        type: `${NAMESPACE}/paymentPayeeItemActiveIdUpdate`,
        payload: {
          id: ClickId,
        },
      });
    }
  };

  return (
    <div className={styles.payeeListWrap}>
      {lodash.map(payeeList, (item: any) => (
        <div
          className={classNames(styles.item, id === item.id && styles.activeItem)}
          onClick={() => {
            handleClick({ ClickId: item.id });
          }}
          key={item.id}
        >
          <p className={styles.title}>{title(item)}</p>
          <PayeeItem
            clientId={formUtils.queryValue(item.clientId)}
            id={item.id}
            NAMESPACE={NAMESPACE}
          />
        </div>
      ))}
      <AddButton NAMESPACE={NAMESPACE} />
    </div>
  );
};
