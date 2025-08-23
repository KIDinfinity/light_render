import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { NAMESPACE } from '../../activity.config';
import styles from './index.less';
import { EditSectionCodeEnum } from 'process/GeneralPOS/common/Enum';
import useSectionEditable from 'process/GeneralPOS/BaseProduct/_hooks/useSectionEditable';

const Item = ({ form, transactionId, id: index, tableCollect, section }: any) => {
  const editable = useSectionEditable(EditSectionCodeEnum.Transaction);

  return (
    <div className={styles.box}>
      <Section form={form} editable={editable} section={section} tableCollect={tableCollect}>
        <Fields.Eventcode transactionId={transactionId} />
        <Fields.Occurrencedate transactionId={transactionId} />
      </Section>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask }: any, { transactionId }: any) => ({
    task: processTask?.getTask,

    eventHistoryList:
      modelnamepsace.entities?.transactionTypesMap?.[transactionId]?.maturityBooster
        ?.eventHistoryList,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, transactionId, id: index }: any = props;
    },
    mapPropsToFields(props: any) {
      const { task, id: index, section, eventHistoryList } = props;

      const item = eventHistoryList?.[index];

      return formUtils.mapObjectToFields(
        task?.taskStatus === 'completed' ? formUtils.cleanValidateData(item) : item
      );
    },
  })(Item)
);
