import React from 'react';
import { FormAntCard, formUtils } from 'basic/components/Form';
import { connect, useSelector } from 'dva';
import { Form } from 'antd';
import Item from './Item';
import { NAMESPACE } from 'opus/Pages/Process/POS/BaseProduct/activity.config';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import PolicyTitle from './PolicyTitle';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';
import { formatMessageApi } from '@/utils/dictFormatMessage';

const PolicyInfo = ({ form, transactionId, isNotDataCapture }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.PolicyInfo);

  return (
    <>
      <PolicyTitle
        policyForm={form}
        editable={editable}
        transactionId={transactionId}
        isNotDataCapture={isNotDataCapture}
      />
      {/* <FormAntCard
        className={styles.title}
        title={
          <div className={styles.sectionTitle}>
            {formatMessageApi({
              Label_BIZ_Policy: 'PolicyDetails',
            })}
          </div>
        }
      >
        <div className={styles.policyInfo}>
          <Item />
        </div>
      </FormAntCard> */}
    </>
  );
};
export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  mainPolicyId: modelnamepsace.processData?.mainPolicyId,
}))(
  Form.create({
    mapPropsToFields(props) {
      const { mainPolicyId } = props;
      return formUtils.mapObjectToFields({ policyNo: mainPolicyId });
    },
  })(PolicyInfo)
);
