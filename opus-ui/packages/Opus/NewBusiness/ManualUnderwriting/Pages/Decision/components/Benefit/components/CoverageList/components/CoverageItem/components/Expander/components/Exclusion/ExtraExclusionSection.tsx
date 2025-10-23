import React from 'react';
import { Form } from 'antd';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import useGetDisabledByCoverageField from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/_hooks/useGetDisabledByCoverageField';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section, {
  Fields,
} from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Exclusion-Field/ExtraSection';
import lodash from 'lodash';

import { fieldConfig as remarkConfig } from 'opus/NewBusiness/ManualUnderwriting/Pages/Decision/SectionFields/Exclusion-Field/Fields/Remark.config';

const ExtraExclusionSection = ({
  exclusionList,
  form,
  coverageId,
  editable = true,
  sectionClassName,
}: any) => {
  const sectionEditable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && editable;
  const disabled = useGetDisabledByCoverageField({
    id: coverageId,
    dataBasicField: 'exclusionEditInd',
    dataBasicFieldValue: 'N',
  });

  return (
    <Section
      form={form}
      editable={sectionEditable && !disabled}
      section="ExtraExclusion-Field"
      className={sectionClassName}
    >
      <Fields.Remark exclusionList={exclusionList} labelType="inline" />
    </Section>
  );
};

function onFieldsChange(props: any, changedFields: any) {
  const { dispatch, validating, coverageId }: any = props;
  if (formUtils.shouldUpdateState(changedFields)) {
    if (validating) {
      setTimeout(() => {
        dispatch({
          type: `${NAMESPACE}/saveEntry`,
          target: 'saveExtraExclusion',
          payload: {
            changedFields,
            coverageId,
          },
        });
      }, 0);
    } else {
      dispatch({
        type: `${NAMESPACE}/saveFormData`,
        target: 'saveExtraExclusion',
        payload: {
          changedFields,
          coverageId,
        },
      });
    }
  }
}

function mapPropsToFields(props: any) {
  const { exclusionList } = props;
  const length = remarkConfig['field-props'].maxLength;

  /**
   * exclusion item 里面的reason有3种情况
   * 1. 【旧数据】每一个exclusion item都有自己的reason, reason有可能有值
   * 2. 【旧数据】 exclusion list 里面只有一个exclusion item 有reason,这个reason最大长度是234
   * 3. 【新需求】 添加reason1，reason2，reason3，每个reason的最大长度为78，旧数据的reason值要拼接然后按78的长度切割
   */

  const firstExclusion = exclusionList.find(
    (item: any) =>
      !lodash.isNil(item?.reason1) || !lodash.isNil(item?.reason2) || !lodash.isNil(item?.reason3)
  );
  if (firstExclusion) {
    return formUtils.mapObjectToFields(firstExclusion);
  } else {
    const resultReason = lodash.reduce(
      exclusionList ?? [],
      (acc, ex) => {
        if (lodash.isString(ex.reason) && ex.reason.length > 0) {
          return acc + ex.reason;
        }
        return acc;
      },
      ''
    );
    const reasonList = [];
    for (let i = 0; i < resultReason.length; i += length) {
      reasonList.push(resultReason.slice(i, i + length));
    }
    return formUtils.mapObjectToFields({
      reason1: lodash.get(reasonList, [0], undefined),
      reason2: lodash.get(reasonList, [1], undefined),
      reason3: lodash.get(reasonList, [2], undefined),
    });
  }
}

export default connect(({ formCommonController }: any) => ({
  validating: formCommonController.validating,
}))(
  Form.create<any>({
    onFieldsChange,
    mapPropsToFields,
  })(ExtraExclusionSection)
);
