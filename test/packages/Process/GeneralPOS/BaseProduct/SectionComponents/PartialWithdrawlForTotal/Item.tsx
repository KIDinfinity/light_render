import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form, transactionId, id, tableCollect }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <div className={styles.box}>
      <Section
        form={form}
        editable={editable}
        section="PartialWithdrawlForTotal"
        tableCollect={tableCollect}
      >
        <Fields.FundCode transactionId={transactionId} />
        <Fields.Currency transactionId={transactionId} />
        <Fields.UnitPrice transactionId={transactionId} />
        <Fields.UnitHolding />
        <Fields.AccountValue />
      </Section>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId, id }: any) => ({
    partialWithdrawalFundList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.partialWithdrawal
        ?.partialWithdrawalFundList,
  })
)(
  Form.create({
    mapPropsToFields(props: any) {
      const { partialWithdrawalFundList, id: fundCode } = props;
      const item =
        lodash.find(
          partialWithdrawalFundList,
          (item) => fundCode === formUtils.queryValue(item.fundCode)
        ) || {};

      return formUtils.mapObjectToFields(item);
    },
  })(Item)
);
