import React from 'react';

import { FormateEP, AccuracyConfigTool } from '@/utils/accuracy';

const Main = ({ type, value }: any) => {
  const config = {
    sumAssured: AccuracyConfigTool.getAccuaryItem({
      objectFieldName: 'opus.home.allCases.sumAssured',
    }),
    modalPremiumAmount: AccuracyConfigTool.getAccuaryItem({
      objectFieldName: 'opus.home.allCases.modalPremiumAmount',
    }),
    policyGrossPremium: AccuracyConfigTool.getAccuaryItem({
      objectFieldName: 'opus.home.allCases.policyGrossPremium',
    }),
  };

  const { enableThousandSeparation, thousandSeparator, accuracyScale } = config?.[type] || {};
  return (
    <>
      {enableThousandSeparation === 'Y'
        ? FormateEP.getThousandsFormat({
            value: Number(value).toFixed(accuracyScale),
            thousandssSeparator: thousandSeparator,
            precision: accuracyScale,
          })
        : FormateEP.fnKeepPrecision(value, accuracyScale)}
    </>
  );
};

export default Main;
