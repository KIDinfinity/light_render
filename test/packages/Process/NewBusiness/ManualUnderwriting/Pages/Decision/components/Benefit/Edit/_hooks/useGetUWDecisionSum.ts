import { useMemo } from 'react';
import lodash from 'lodash';
import useJudgeIsDisplayPlanOption from 'decision/components/Benefit/_hooks/useJudgeIsDisplayPlanOption';

export default ({ config }: any) => {
  const isDisplayPlanOption = useJudgeIsDisplayPlanOption();
  return useMemo(() => {
    return lodash
      .chain(config)
      .filter((configItem: any) => {
        if (lodash.includes(['numberOfUnits'], configItem.field)) {
          return isDisplayPlanOption;
        }
        if (lodash.get(configItem, '[field-props].visible') === 'N') {
          return false;
        }
        return true;
      })
      .sumBy('[field-props].[x-layout].lg.span')
      .value();
  }, [isDisplayPlanOption, config]);
};
