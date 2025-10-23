import React from 'react';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { StateSectionEnum } from 'process/GeneralPOS/common/Enum';
import lodash from 'lodash';

const FundSwitch = ({ form }: any) => {
  return (
    <div className={styles.totalWrap}>
      <SectionDafault form={form} layout="horizontal" editable={false} section="Nominee">
        <Fields.Total />
      </SectionDafault>
    </div>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  total: modelnamepsace.extraField?.[StateSectionEnum.NOMINEE]?.total,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating }: any = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'extraFieldUpdate',
              payload: {
                changedFields,
                section: StateSectionEnum.FUNDSWITCHING,
              },
            });
          }, 0);
        }
      }
    },
    mapPropsToFields(props: any) {
      const { total } = props;

      return formUtils.mapObjectToFields({
        total,
      });
    },
  })(FundSwitch)
);
