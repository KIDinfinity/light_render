import React, { useContext } from 'react';
import { Form, Icon } from 'antd';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import sectionContext from 'opus/Components/SectionComponents/Context';
import { connect, useDispatch } from 'dva';
import Section, { Fields } from './Section';
import { ReactComponent as DeleteIcon } from 'packages/Opus/Assets/icon-delete.svg';
import { ReactComponent as AddIcon } from 'packages/Opus/Assets/icon-plus.svg';
import styles from './index.less';

const ActionComponent = ({ editable, keyIndex, form }: any) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.flex}>
      <Icon
        component={AddIcon}
        disable={!editable}
        className={styles.deleteIcon}
        onClick={() => dispatch({ type: `${NAMESPACE}/addProductInfoRider` })}
      />
      {keyIndex !== 0 && (
        <Icon
          component={DeleteIcon}
          disable={!editable}
          className={styles.deleteIcon}
          onClick={() =>
            dispatch({
              type: `${NAMESPACE}/removeProductInfoRider`,
              payload: { id: form.getFieldValue('id') },
            })
          }
        />
      )}
    </div>
  );
};

const Insured = ({ form, editable, keyIndex }: any) => {
  const { sectionId } = useContext<any>(sectionContext);

  return (
    <Section
      form={form}
      editable={editable}
      sectionId={sectionId}
      formId={`productRider_${form.getFieldValue('id')}`}
      actionComponent={<ActionComponent editable={editable} keyIndex={keyIndex} form={form} />}
    >
      <Fields.RiderProductCode keyIndex={keyIndex} />
      <Fields.Classes />
      <Fields.PremiumRider />
      <Fields.SumAssuredRider />
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
          target: 'saveProductInfoRider',
          payload: {
            id: data?.id,
            changedFields,
          },
        });
      }
    },
    mapPropsToFields(props) {
      const { data }: any = props;
      return formUtils.mapObjectToFields(data);
    },
  })(Insured)
) as React.ComponentType<any>;
