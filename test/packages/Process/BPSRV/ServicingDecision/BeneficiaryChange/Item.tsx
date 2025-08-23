import React from 'react';
import { Form, Icon } from 'antd';
import { connect, useSelector, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../activity.config';
import styles from './index.less';
import classNames from 'classnames';

const Item = ({ form, transactionId, id, tableCollect }: any) => {
  const dispatch = useDispatch();
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const remove = () => {
    dispatch({
      type: `${NAMESPACE}/beneficiaryChangeInfoDelete`,
      payload: {
        transactionId,
        id,
      },
    });
  };
  return (
    <div className={styles.box}>
      <Section
        form={form}
        editable={editable}
        section="BeneficiaryChange"
        tableCollect={tableCollect}
      >
        <Fields.Relationship />
        <Fields.FirstName />
        <Fields.MiddleName />
        <Fields.Surname id={transactionId} />
        <Fields.IdentityType id={transactionId} />
        <Fields.IdentityNumber id={transactionId} />
        <Fields.DateofBirth />
        <Fields.BenefitPercentage transactionId={transactionId} id={id} />
        <Fields.Gender />
        <Fields.ClientID />
      </Section>
      {editable && (
        <div className={classNames(styles.btn)}>
          <div className={styles.icon} onClick={remove}>
            <Icon type="close" />
          </div>
        </div>
      )}
    </div>
  );
};

export default connect(
  ({ formCommonController, [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
    validating: formCommonController.validating,
    beneficiaryList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.beneficiaryChange
        ?.beneficiaryList,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, transactionId, id }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'beneficiaryChangeInfoUpdate',
              payload: {
                changedFields,
                transactionId,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'beneficiaryChangeInfoUpdate',
            payload: {
              changedFields,
              transactionId,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props: any) {
      const { beneficiaryList, id } = props;
      return formUtils.mapObjectToFields(
        beneficiaryList?.find((item: any) => item?.id === id) || {}
      );
    },
  })(Item)
);
