import lodash from 'lodash';
import { SwitchEnum } from 'claim/pages/utils/claim';
import { isPremiumAccount } from 'claim/enum/isPremiumAccount';
import type { BankAccountModal } from '../_dto/Models';

const bankAccountReOrder = (bankAccountList?: BankAccountModal[]) => {
  if (lodash.isEmpty(bankAccountList)) return [];

  // 获取C360那边过来的bank account数据
  const fromC360 = lodash.filter(
    bankAccountList,
    (bankItem: BankAccountModal) => bankItem?.isPremiumAccount === isPremiumAccount.Yes
  );
  // 获取手动添加的bank account数据
  const fromManualAdd = lodash.filter(
    bankAccountList,
    (bankItem: BankAccountModal) => bankItem?.manualAdd === SwitchEnum.YES
  );
  // 获取上一个节点系统流转下来的bank account数据
  const fromPreNode = lodash.differenceWith(
    bankAccountList,
    fromC360.concat(fromManualAdd),
    lodash.isEqual
  );

  // 按C360，前一个节点，最后是手动添加的次序重新组装返回
  return lodash
    .chain(fromC360)
    .concat([...fromPreNode, ...fromManualAdd])
    .compact()
    .uniqBy('id')
    .value();
};

export default bankAccountReOrder;
