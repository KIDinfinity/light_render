import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import Section from 'process/NB/ManualUnderwriting/_components/EditableSection';
import useHandleExtraConfigCallback from 'process/NB/ManualUnderwriting/_hooks/useHandleExtraConfigCallback';
import { ReactComponent as WarningIcon } from 'process/assets/warning.svg';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { Fields, localConfig } from './Section';

const Riskindicatorinfo = ({ form, id, isSubCard }: any) => {
  const gateway = useHandleExtraConfigCallback({ id, isSubCard });
  return (
    <Section
      section="RiskIndicatorInfo"
      localConfig={localConfig}
      form={form}
      gateway={gateway}
      icon={<WarningIcon />}
    >
      <Fields.Pepflag />
      <Fields.Pepassoicateflag />
      <Fields.Titleofpep />
      <Fields.Relationshiptopep />
      <Fields.Bankruptcy />
      <Fields.Bankruptcydate />
      <Fields.FatcaDropdownValue />
      <Fields.Fatcadate id={id} />
      <Fields.Kyc id={id} />
    </Section>
  );
};

export default connect()(
  Form.create<any>({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, validating, id } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (validating) {
          setTimeout(() => {
            dispatch({
              type: `${NAMESPACE}/saveEntry`,
              target: 'changeBasicInfoFields',
              payload: {
                changedFields,
                id,
              },
            });
          }, 0);
        } else {
          dispatch({
            type: `${NAMESPACE}/saveFormData`,
            target: 'changeBasicInfoFields',
            payload: {
              changedFields,
              id,
            },
          });
        }
      }
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(Riskindicatorinfo)
);
