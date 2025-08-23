import React from 'react';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';
import { SectionDafault, Fields } from './Section';
import { Form } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { StateSectionEnum } from 'process/GeneralPOS/common/Enum';

const FundSwitch = ({ form }: any) => {
  return (
    <div className={styles.totalWrap}>
      <SectionDafault
        form={form}
        layout="horizontal"
        editable={false}
        section="FundAllocation"
        tableCollect={() => {}}
      >
        <Fields.Total />
      </SectionDafault>
    </div>
  );
};

export default connect(
  ({ [NAMESPACE]: modelnamepsace, processTask, formCommonController }: any) => ({
    total: modelnamepsace.extraField?.[StateSectionEnum.FUNDALLOCATIONFUNDLIST]?.total || 0,
    task: processTask?.getTask,
  })
)(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch }: any = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'extraFieldUpdate',
          payload: {
            changedFields,
            section: StateSectionEnum.FUNDALLOCATIONFUNDLIST,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { total, task } = props;

      return formUtils.mapObjectToFields({
        total: task?.taskStatus === 'completed' ? formUtils.queryValue(total) : total,
      });
    },
  })(FundSwitch)
);
