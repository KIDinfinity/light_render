import React, { useContext } from 'react';
import { Form, Icon } from 'antd';

import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/Pages/Process/NewBusiness/DataEntry/activity.config';
import sectionContext from 'opus/Components/SectionComponents/Context';
import { connect, useDispatch } from 'dva';
import { ReactComponent as AddIcon } from 'packages/Opus/Assets/icon-plus.svg';
import styles from './index.less';
import { ReactComponent as DeleteIcon } from 'packages/Opus/Assets/icon-delete.svg';
import Section, { Fields } from './NonThSection';

const Insured = ({ form, editable, keyIndex, nonThCrsListLength }: any) => {
  const dispatch = useDispatch();
  const { sectionId } = useContext<any>(sectionContext);

  return (
    <Section
      form={form}
      editable={editable}
      sectionId={sectionId}
      actionComponent={
        <div className={styles.flex}>
          {nonThCrsListLength < 3 && (
            <Icon
              component={AddIcon}
              disable={!editable}
              className={styles.deleteIcon}
              onClick={() => dispatch({ type: `${NAMESPACE}/addPayorNoneThCrs` })}
            />
          )}
          {keyIndex !== 0 && (
            <Icon
              component={DeleteIcon}
              disable={!editable}
              className={styles.deleteIcon}
              onClick={() =>
                dispatch({
                  type: `${NAMESPACE}/removePayorNoneThCrs`,
                  payload: { id: form.getFieldValue('id') },
                })
              }
            />
          )}
        </div>
      }
    >
      <Fields.NonThTaxCountry />
      <Fields.NonThTin />
      <Fields.NoTinExplanation />
      <Fields.NoTinReasonCode />
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
          target: 'savePayorNoneThCrs',
          payload: {
            id: data.id,
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
