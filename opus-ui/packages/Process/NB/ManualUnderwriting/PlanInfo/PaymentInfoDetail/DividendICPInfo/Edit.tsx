import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { NAMESPACE } from '../../../activity.config';
import { Fields, localConfig } from './Section';
import styles from './index.less';

const DividendICPInfo = ({ form }: any) => {
  return (
    <div className={styles.editWrap}>
      <div className={styles.title}>
        {formatMessageApi({
          Label_BIZ_Policy: 'DividendandICPInfo',
        })}
      </div>
      <Section section="DividendandICPInfo-Field" form={form} localConfig={localConfig}>
        <Fields.IcpDividendPayType />

        <Fields.BankAcctName />

        <Fields.BankAccountNo />

        <Fields.BankCode />

        <Fields.BranchName />
      </Section>
    </div>
  );
};

export default connect(({ formCommonController, [NAMESPACE]: modelnamepsace }: any) => ({
  validating: formCommonController.validating,
  factoringHousesList: lodash.get(modelnamepsace, 'factoringHousesList', []),
}))(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, factoringHousesList, bankInfoIndex } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (lodash.has(changedFields, 'icpDividendPayType') && lodash.size(changedFields) === 1) {
          if (validating) {
            setTimeout(() => {
              dispatch({
                type: `${NAMESPACE}/saveEntry`,
                target: 'setPlanFieldData',
                payload: {
                  changedFields,
                },
              });
            }, 0);
          } else {
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
              target: 'setPlanFieldData',
              payload: {
                changedFields,
              },
            });
          }
        } else {
          if (validating) {
            setTimeout(() => {
              dispatch({
                type: `${NAMESPACE}/saveEntry`,
                target: 'setBankInfoFieldData',
                payload: {
                  bankInfoIndex,
                  changedFields,
                  factoringHousesList,
                  bankInfoType: 'ID',
                },
              });
            }, 0);
          } else {
            dispatch({
              type: `${NAMESPACE}/saveFormData`,
              target: 'setBankInfoFieldData',
              payload: {
                bankInfoIndex,
                changedFields,
                factoringHousesList,
                bankInfoType: 'ID',
              },
            });
          }
        }
      }
    },
    mapPropsToFields(props) {
      const { icpDividendBankInfoData } = props;
      return formUtils.mapObjectToFields(icpDividendBankInfoData);
    },
  })(DividendICPInfo)
);
