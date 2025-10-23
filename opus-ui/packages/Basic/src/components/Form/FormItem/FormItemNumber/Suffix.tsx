import React, { useMemo } from 'react';
import { Icon } from 'antd';

const revertStyle = {
  payableAmount: { top: '6px', left: '78px' },
  payableDays: { top: '6px', left: '26px' },
  boosterAmount: { top: '6px', left: '78px' },
  boosterDays: { top: '6px', left: '26px' },
  deductibleAmount: { top: '6px', left: '78px' },
  deductibleWaived: { top: '6px', left: '78px' },
  deductibleOtherInsurerDeduction: { top: '6px', left: '78px' },
};

interface SuffixProps {
  hightLight: boolean;
  suffix: any;
  formName?: string;
  recoverValue: any;
  OnRecover: any;
  disabled?: boolean;
}

export default ({
  hightLight,
  suffix,
  formName = '',
  recoverValue,
  OnRecover,
  disabled,
}: SuffixProps) => {
  return useMemo(() => {
    if (suffix) {
      return suffix;
    }
    if (hightLight && !disabled) {
      return (
        <Icon
          type="reload"
          className="calculationSvg"
          style={revertStyle[formName]}
          onClick={() => {
            return OnRecover && OnRecover({ [formName]: recoverValue });
          }}
        />
      );
    }
    return <span />;
  }, [hightLight, suffix, formName, recoverValue, OnRecover, disabled]);
};
