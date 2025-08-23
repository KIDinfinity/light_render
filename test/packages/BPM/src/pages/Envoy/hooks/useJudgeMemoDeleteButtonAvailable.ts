import { useMemo } from 'react';
import lodash from 'lodash';
interface ConfigItem {
  visible?: boolean;
  multiple?: boolean;
  disabled?: boolean;
}

interface DisplayConfig {
  sort: number;
  visible: boolean;
  editable: boolean;
  children: {
    memoClientRole: ConfigItem;
    memoClientId: ConfigItem;
    memoRemark: ConfigItem;
    subInfos: ConfigItem;
    memoDeleteButton: ConfigItem;
  };
}

interface IProps {
  displayConfig: DisplayConfig;
  isDraft: boolean;
}
export default ({ displayConfig, isDraft }: IProps) => {
  return useMemo(() => {
    if (isDraft) {
      return true;
    }
    const memoDeleteButtonAvailable = !lodash
      .chain(displayConfig)
      .get('children.memoDeleteButton.disabled')
      .isEqual(true)
      .value();
    return memoDeleteButtonAvailable;
  }, [displayConfig, isDraft]);
};
