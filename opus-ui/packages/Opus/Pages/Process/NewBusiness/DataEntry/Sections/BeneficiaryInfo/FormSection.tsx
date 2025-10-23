import React, { useContext } from 'react';
import { Form, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import sectionContext from 'opus/Components/SectionComponents/Context';
import { ReactComponent as DeleteIcon } from 'packages/Opus/Assets/icon-delete.svg';
import { ReactComponent as AddIcon } from 'packages/Opus/Assets/icon-plus.svg';
import styles from './index.less';
import Section, { Fields } from './Section';

const ActionComponent = ({ editable, keyIndex, form }: any) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.flex}>
      <Icon
        component={AddIcon}
        disable={!editable}
        className={styles.deleteIcon}
        onClick={() => dispatch({ type: `${NAMESPACE}/addBeneficiary` })}
      />
      {keyIndex !== 0 && (
        <Icon
          component={DeleteIcon}
          disable={!editable}
          className={styles.deleteIcon}
          onClick={() =>
            dispatch({
              type: `${NAMESPACE}/removeBeneficiary`,
              payload: { id: form.getFieldValue('id') },
            })
          }
        />
      )}
    </div>
  );
};

const BeneficiaryInfomation = ({ form, editable, keyIndex }: any) => {
  const { sectionId } = useContext<any>(sectionContext);

  return (
    <Section
      form={form}
      editable={editable}
      sectionId={sectionId}
      actionComponent={<ActionComponent editable={editable} keyIndex={keyIndex} form={form} />}
    >
      <Fields.BeneficiaryRelationship />
      <Fields.Beneficiaryproportion />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, data } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveBeneficiary',
          payload: {
            changedFields,
            id: data.id,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { data } = props;
      return formUtils.mapObjectToFields(data);
    },
  })(BeneficiaryInfomation)
) as React.ComponentType<any>;
