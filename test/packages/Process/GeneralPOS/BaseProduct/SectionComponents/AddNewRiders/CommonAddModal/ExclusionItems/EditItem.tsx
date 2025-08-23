import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import Section, { Fields } from './Section';
import lodash from 'lodash';

const EditItemSection = ({ form, addData }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);

  return (
    <Section
      form={form}
      formId="Reinstatement-Exclusion-Popup"
      editable={editable}
      section="Reinstatement-Exclusion-Popup"
    >
      <Fields.Code addData={addData} />
      <Fields.ExclusionShortName addData={addData} />
      <Fields.LongDescription />
    </Section>
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any) => ({
  exclusionCodes: modelnamepsace?.dictObject?.exclusionCodes,
}))(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { setAddData, id, exclusionCodes } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        setAddData((e) => ({
          ...e,
          list: lodash.map(e?.list, (item) => {
            if (item?.id === id) {
              const data = { ...item, ...changedFields };
              if (lodash.size(changedFields) === 1 && lodash.has(changedFields, 'code')) {
                const exclusionShortName =
                  lodash
                    .chain(exclusionCodes)
                    .find(
                      (item) =>
                        item?.localExclusionCode === formUtils.queryValue(changedFields.code)
                    )
                    .get('longDesc')
                    .value() || formUtils.queryValue(changedFields.code);

                data.exclusionShortName = exclusionShortName;
              }
              if (
                lodash.size(changedFields) === 1 &&
                lodash.has(changedFields, 'shortName') &&
                lodash.isEmpty(formUtils.queryValue(changedFields.shortName))
              ) {
                data.code = null;
              }
              return data;
            }
            return item;
          }),
        }));
      }

   
    },
    mapPropsToFields(props) {
      const { item } = props;
      return formUtils.mapObjectToFields(item);
    },
  })(EditItemSection)
);
