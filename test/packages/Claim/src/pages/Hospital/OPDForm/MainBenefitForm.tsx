import React, { Component } from 'react';
import { connect } from 'dva';
import lodash from 'lodash';
import DescriptionList from '@/components/DescriptionList';
import OPDFormSection from './OPDFormSection';
import FormItem from '../FormItem/FormItem';
import styles from './index.less';

const { Description } = DescriptionList;

interface IProps {
  idx: number;
  mainBenefitList: any[];
  mainBenefit: string;
}

// @ts-ignore
@connect(({ hospitalDetailController }: any, { idx }: any) => ({
  mainBenefitList: lodash.get(
    hospitalDetailController,
    `invoiceInforData[${idx}].registration.incidentList[0].treatmentList[0].mainBenefitList`,
    []
  ),
  mainBenefit: lodash.get(hospitalDetailController, 'mainBenefit'),
}))
class MainBenefitForm extends Component<IProps> {
  getMainBenefitFn = (dictCode: string) => {
    const { mainBenefit } = this.props;
    const mainBenefitObj = lodash.find(mainBenefit, (item: any) => item.dictCode === dictCode);
    const mainBenefitText = mainBenefitObj ? mainBenefitObj.dictName : dictCode;
    return mainBenefitText;
  };

  render() {
    const { mainBenefitList } = this.props;
    return (
      <OPDFormSection titleText="Main Benefit">
        {lodash.map(mainBenefitList, (_, idx) => (
          <div className={styles.mainBenefitList} key={idx}>
            <FormItem
              labelText="Main Benefit"
              ctnText={this.getMainBenefitFn(mainBenefitList[idx].mainBenefit)}
              style={{ flex: 1 }}
            />
            <FormItem
              labelText="Name of Doctor"
              ctnText={mainBenefitList[idx].doctor}
              style={{ flex: 1 }}
            />
          </div>
        ))}
      </OPDFormSection>
    );
  }
}

export default MainBenefitForm;
