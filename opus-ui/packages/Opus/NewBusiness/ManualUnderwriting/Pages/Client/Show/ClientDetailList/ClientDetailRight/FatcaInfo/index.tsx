import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import Section from '../../../../_section/FatcaInfoField';
import styles from './index.less';
import useShowFatcaInfo from 'opus/NewBusiness/ManualUnderwriting/_hooks/useShowFatcaInfo';

const FatcaInfo = ({ clientId, form }: any) => {
  const isShow = useShowFatcaInfo({ mode: 'show' });

  return (
    isShow && (
      <div className={styles.container}>
        <Section form={form} editable={false} clientId={clientId} spanMode="double" readOnly />
      </div>
    )
  );
};

export default connect(({ [NAMESPACE]: modelnamepsace }: any, { clientId }: any) => ({
  fatcaInfo: modelnamepsace.entities.clientMap?.[clientId]?.fatcaInfo,
  newFatca: modelnamepsace.entities.clientMap?.[clientId]?.newFatca,
  countryWorkPlace: modelnamepsace.entities.clientMap?.[clientId]?.countryWorkPlace,
  provinceWorkPlace: modelnamepsace.entities.clientMap?.[clientId]?.provinceWorkPlace,
  nationality2: modelnamepsace.entities.clientMap?.[clientId]?.nationalityInfo?.nationality2,
  nationality3: modelnamepsace.entities.clientMap?.[clientId]?.nationalityInfo?.nationality3,
  firstRegisterDate: modelnamepsace.entities.clientMap?.[clientId]?.firstRegisterDate,
  signDate: modelnamepsace.entities.clientMap?.[clientId]?.signDate,
  usFatcaPerson: modelnamepsace.entities.clientMap?.[clientId]?.usFatcaPerson,
  expandedClientId: modelnamepsace.expandedClientId, // 用于折叠后重新更新form的数据,
}))(
  Form.create({
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
