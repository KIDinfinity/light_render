import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from '../../../../_section/figureInfoField';

const FigureInfo = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  return (
    <Section
      editable={editable}
      form={form}
      clientId={clientId}
      readOnly={false}
      condition="proposal"
    />
  );
};

export default connect(({ [NAMESPACE]: modelNamespace }: any, { clientId }: any) => ({
  personalInfoData: lodash.get(
    modelNamespace,
    `modalData.entities.clientMap.${clientId}.personalInfo`
  ),
  expandedClientId: modelNamespace.expandedClientId, // 用于折叠后重新更新form的数据
  mibCodeList: lodash.get(
    modelNamespace,
    `modalData.entities.clientMap.${clientId}.otherInfo.mibCodeList`
  ),
}))(
  Form.create({
    mapPropsToFields(props: any) {
      const { personalInfoData, mibCodeList } = props;
      return formUtils.mapObjectToFields({ ...personalInfoData, mibCodeList });
    },
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, loadingStatus } = props;

      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }

        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveFigureInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
          },
        });
      }
    },
  })(FigureInfo)
);
