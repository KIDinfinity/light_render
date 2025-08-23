import checkDom from './checkDom';
import checkBlacklist from './checkBlacklist';
import Warn from '../common/index';

class DeleteWarning extends Warn {
  before = ({ targetDom, sectionID: sectionId, type: triggerPoint }: any): boolean => {
    const hasValue = checkDom(targetDom);
    const isBlacklist = checkBlacklist(sectionId, triggerPoint);
    // 如果目标区域内没有值,或者sectionID在黑名单中,都不会弹出warning框
    if (!hasValue || isBlacklist) {
      return false;
    }
    return true;
  };
}

export default new DeleteWarning().trigger;
