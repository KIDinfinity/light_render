import React from 'react';
import { connect, useDispatch } from 'dva';
import { Form, Icon } from 'antd';
import { formUtils } from 'basic/components/Form';
import Section, { Fields } from './Section';
import { DeleteButton } from 'opus/Components/Modals/DeleteModal';
import styles from './FollowUpTask.less';
import useGetFollowUpTaskEditable from '../../_models/functions/useGetFollowUpTaskEditable';
import { ReactComponent as AddIcon } from 'opus/Modules/Envoy/Assets/add.svg';
import { NAMESPACE } from '../../activity.config';

const FollowUpTask = ({ form, index }: any) => {
  const dispatch = useDispatch();
  const editable = useGetFollowUpTaskEditable();

  const handleDelete = () => {
    dispatch({
      type: 'opusNonOpusClaimManagement/followUpTaskDelete',
      payload: {
        index,
      },
    });
  };
  const onAdd = () => {
    dispatch({
      type: 'opusNonOpusClaimManagement/followUpTaskAdd',
      payload: {
        changedValues: {},
      },
    });
  };
  return (
    <div className={styles.followUpTask}>
      <Section form={form} editable={editable} section="FollowUpTask" index={index}>
        <Fields.ItemNo />
        <Fields.FollowUpTask />
        <Fields.Remark />
        <Fields.CompletionDate />
      </Section>
      <div className={styles.cardExtra}>
        {editable && <Icon component={AddIcon} onClick={onAdd} />}
        {editable && <DeleteButton handleDelete={handleDelete} disabled={!editable} />}
      </div>
    </div>
  );
};

export default connect()(
  // @ts-ignore
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, index } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'followUpTaskUpdate',
          payload: {
            changedFields,
            index,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { item, index } = props;

      return formUtils.mapObjectToFields({ ...item, itemNo: index + 1 });
    },
  })(FollowUpTask)
);
