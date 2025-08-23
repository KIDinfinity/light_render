import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { SectionDafault, Fields } from './Section/CoverageTotalSection';
import styles from './index.less';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';

const Item = ({ form, tableCollect }: any) => {
  const editable = false;
  const sclale = 0.88;

  return (
    <div className={styles.coverageTotalItem}>
      <SectionDafault
        form={form}
        editable={editable}
        section="AddNewRiders-Coverage-Total"
        tableCollect={tableCollect}
      >
        <Fields.TotalLabel sclale={sclale} />
        <Fields.BasePremiumTotal sclale={sclale} />
        <Fields.LoadingPremiumTotal sclale={sclale} />
        <Fields.InstalmentPremiumWithTaxTotal sclale={sclale} />
      </SectionDafault>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { transactionId }: any) => ({
  uwCoverageList:
    modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.uwPolicy?.uwCoverageList,
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { uwCoverageList } = props;
      const cleanValidateUwCoverageList = formUtils.cleanValidateData(uwCoverageList);
      return formUtils.mapObjectToFields({
        basePremiumTotal: lodash.sumBy(cleanValidateUwCoverageList, 'basePremium') || 0,
        loadingPremiumTotal: lodash.sumBy(cleanValidateUwCoverageList, 'loadingPremium') || 0,
        instalmentPremiumWithTaxTotal:
          lodash.sumBy(cleanValidateUwCoverageList, 'instalmentPremiumWithTax') || 0,
      });
    },
  })(Item)
);
