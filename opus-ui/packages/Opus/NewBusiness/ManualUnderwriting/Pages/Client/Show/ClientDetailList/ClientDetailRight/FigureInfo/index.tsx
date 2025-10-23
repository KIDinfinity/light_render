import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from '../../../../_section/figureInfoField';

const FigureInfo = ({ clientId, form }: any) => {
  return <Section form={form} editable={false} clientId={clientId} spanMode="double" />;
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { clientId }: any) => ({
  personalInfoData: modelnamepsace.entities.clientMap?.[clientId]?.personalInfo,
  mibCodeList: modelnamepsace.entities.clientMap?.[clientId]?.otherInfo?.mibCodeList,
  expandedClientId: modelnamepsace.expandedClientId, // 用于折叠后重新更新form的数据
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, loadingStatus , crtInfoItemId} = props;
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
            crtInfoItemId
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { personalInfoData, mibCodeList } = props;
      return formUtils.mapObjectToFields({ ...personalInfoData, mibCodeList });
    },
  })(FigureInfo)
);
