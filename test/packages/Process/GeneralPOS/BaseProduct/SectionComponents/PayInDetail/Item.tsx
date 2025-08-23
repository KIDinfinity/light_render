import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form, tableCollect, payInDetailList, id: index }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);
  const item = payInDetailList?.[index] || {};
  return (
    <div className={styles.box}>
      <Section form={form} editable={editable} section="PayInDetail" tableCollect={tableCollect}>
        <Fields.PaymentRefNo />
        <Fields.PaymentMethod />
        <Fields.PaymentDate />
        <Fields.PaymentAmount currency={item?.currency} />
        <Fields.PaymentStatus />
      </Section>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    payInDetailList: modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.payInDetailList,
  })
)(
  Form.create({
    mapPropsToFields(props: any) {
      const { payInDetailList, id: index } = props;
      const item = payInDetailList?.[index] || {};
      return formUtils.mapObjectToFields(item);
    },
  })(Item)
);
