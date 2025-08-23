import React, { Component } from 'react';
import { connect } from 'dva';
import { Checkbox } from 'antd';
import lodash from 'lodash';
import OPDFormSection from './OPDFormSection';
import FormItem from '../FormItem/FormItem';
import SearchName from './SearchName';
import styles from './index.less';

interface IProps {
  idx: number;
  diagnosisList: any[];
  diagnosisType: any;
}

// @ts-ignore
@connect(({ hospitalDetailController }: any, { idx }: any) => ({
  diagnosisList: lodash.get(
    hospitalDetailController,
    `invoiceInforData[${idx}].registration.incidentList[0].diagnosisList`,
    []
  ),
  diagnosisType: lodash.get(hospitalDetailController, 'diagnosisType'),
}))
class DiagnosisForm extends Component<IProps> {
  getDiagnosisTypeFn = (dictCode: string) => {
    const { diagnosisType } = this.props;
    const diagnosisTypeObj = lodash.find(diagnosisType, (item: any) => item.dictCode === dictCode);
    const diagnosisTypeText = diagnosisTypeObj ? diagnosisTypeObj.dictName : dictCode;
    return diagnosisTypeText;
  };

  render() {
    const { diagnosisList } = this.props;
    return (
      <OPDFormSection titleText="Diagnosis">
        {lodash.map(diagnosisList, (_, idx) => (
          <div className={styles.diagnosisList} key={idx}>
            <FormItem
              labelText="ICD10 Code/Name"
              ctnText={
                <SearchName searchType="diagnosis" searchVal={[diagnosisList[idx].diagnosisCode]} />
              }
              style={{ flex: 4 }}
            />
            <FormItem
              labelText="Diagnosis Type"
              ctnText={this.getDiagnosisTypeFn(diagnosisList[idx].diagnosisType)}
              style={{ flex: 3 }}
            />
            <FormItem
              labelText="Critical Illness Indicator"
              ctnText={<Checkbox checked={!!diagnosisList[idx].criticalIllness} disabled />}
              style={{ flex: 3 }}
            />
          </div>
        ))}
      </OPDFormSection>
    );
  }
}

export default DiagnosisForm;
