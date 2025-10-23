import React from 'react';
import { Form } from 'antd';
import lodash from 'lodash';
import { connect, useSelector } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from '../../../../_section/FatcaInfoField';
import styles from './index.less';
import useShowFatcaInfo from 'opus/NewBusiness/ManualUnderwriting/_hooks/useShowFatcaInfo';

const FatcaInfo = ({ clientId, form }: any) => {
  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const isShow = useShowFatcaInfo({ mode: 'edit' });

  return (
    isShow && (
      <div className={styles.container}>
        <Section
          form={form}
          editable={editable}
          clientId={clientId}
          readOnly={false}
          condition="proposal"
        />
      </div>
    )
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace, login }: any, { clientId }: any) => ({
  newFatca: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.newFatca,
  countryWorkPlace: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.countryWorkPlace,
  provinceWorkPlace: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.provinceWorkPlace,
  nationality2:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.nationalityInfo?.nationality2,
  nationality3:
    modelnamepsace.modalData.entities?.clientMap?.[clientId]?.nationalityInfo?.nationality3,
  signDate: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.signDate,
  usFatcaPerson: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.usFatcaPerson,
  expandedClientId: modelnamepsace.expandedClientId, // 用于折叠后重新更新form的数据,
  firstRegisterDate: modelnamepsace.modalData.entities?.clientMap?.[clientId]?.firstRegisterDate,
  greenCardItemId: (() => {
    const crtInfoMap = modelnamepsace?.modalData?.entities?.crtInfoMap;

    const crtInfoList = lodash
      .chain(modelnamepsace.modalData.entities?.clientMap?.[clientId])
      .get('crtInfoList')
      .value();

    const id = lodash
      .chain(crtInfoMap)
      .pick(crtInfoList)
      .values()
      .find((item: any) => item?.ctfType === 'GC')
      .get('id')
      .value();
    return id;
    // ctfType
  })(),
  itemId: (() => {
    const crtInfoMap = modelnamepsace?.modalData?.entities?.crtInfoMap;
    const crtInfoList = lodash
      .chain(modelnamepsace?.modalData?.entities?.clientMap?.[clientId])
      .get('crtInfoList')
      .value();
    const itemId = lodash
      .chain(crtInfoMap)
      .pick(crtInfoList)
      .values()
      .find((item: any) => item?.ctfType === 'TN' && item?.ctfCountryCode === 'USA')
      .get('id')
      .value();
    return itemId;
  })(),
  loadingStatus: login.loadingStatus,
  fatcaInfo: modelnamepsace.modalData?.entities?.clientMap?.[clientId]?.fatcaInfo,
}))(
  Form.create({
    onFieldsChange(props: any, changedFields: any) {
      const { dispatch, clientId, loadingStatus, greenCardItemId, itemId } = props;
      if (formUtils.shouldUpdateState(changedFields)) {
        if (loadingStatus) {
          const noErrors = lodash.every(changedFields, (field: any) => !field.errors);
          if (noErrors) return;
        }
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'saveFatcaInfo',
          payload: {
            changedFields,
            id: clientId,
            errorId: clientId,
            greenCardItemId,
            itemId,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const {
        countryWorkPlace,
        nationality2,
        nationality3,
        provinceWorkPlace,
        signDate,
        usFatcaPerson,
        newFatca,
        firstRegisterDate,
        fatcaInfo,
      } = props;

      return formUtils.mapObjectToFields({
        countryWorkPlace,
        nationality2,
        nationality3,
        provinceWorkPlace,
        signDate,
        usFatcaPerson,
        newFatca,
        firstRegisterDate,
        ...fatcaInfo,
      });
    },
  })(FatcaInfo)
);
