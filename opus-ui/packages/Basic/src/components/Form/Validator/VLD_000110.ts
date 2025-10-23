import lodash from 'lodash';

export const VLD_000110 = (existDiagnosisList: any) => {
  let diagnosisTypeSelectMain = '';
  lodash.forEach(existDiagnosisList, (item) => {
    if (item.diagnosisType === 'P') {
      diagnosisTypeSelectMain = item.id;
    }
  });
  return diagnosisTypeSelectMain;
};
