import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section/CoverageTotalSection';
import styles from './index.less';
import { StateSectionEnum } from 'process/GeneralPOS/common/Enum';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

const Item = ({ form, tableCollect }: any) => {
  const editable = false;
  return (
    <div className={styles.coverageTotalItem}>
      <SectionDafault
        form={form}
        editable={editable}
        section="Reinstatement-Coverage-Total"
        tableCollect={tableCollect}
      >
        <Fields.TotalLabel />
        <Fields.BasePremiumTotal />
        <Fields.LoadingPremiumTotal />
        <Fields.InstalmentPremiumWithTaxTotal />
      </SectionDafault>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  total: modelnamepsace.extraField?.[StateSectionEnum.REINSTATEMENT]?.total,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { total } = props;

      return formUtils.mapObjectToFields(total);
    },
  })(Item)
);
