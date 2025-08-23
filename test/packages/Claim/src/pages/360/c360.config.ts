import { TabsKey } from './enum';
import Policy from './pages/Policy';
import Coverage from './pages/Coverage';
import ClaimHistory from './pages/ClaimHistory';
import Pos from './pages/PosHistory';
import UserComment from './pages/UserComment';
import Transaction from './pages/TransactionHistory';
import { tenant } from '@/components/Tenant';
import getAuthByAuthorityCode from 'claim/pages/utils/getAuthByAuthorityCode.ts';

interface MenusIPros {
  coverageList: string[];
  hasComment: boolean;
}
/**
 * 配置菜单
 * insuredPolicyIdList - insured列表
 */
const Menus = ({ coverageList, hasComment }: MenusIPros) => {
  /**
   * 参数说明
   * key - 唯一标识
   * format - 国际化
   * show - 显示
   * component - 组件
   */
  const userCommentAuth = getAuthByAuthorityCode({ authorityCode: 'UserComment' });
  return [
    {
      key: TabsKey.policy,
      format: {
        typeCode: 'Label_BIZ_Policy',
        dictCode: 'Policy',
      },
      show: true,
      component: Policy,
    },
    {
      key: TabsKey.coverage,
      format: {
        typeCode: 'Label_BIZ_Policy',
        dictCode: 'Coverage',
      },
      show: coverageList.length > 0,
      component: Coverage,
    },
    {
      key: TabsKey.claim,
      format: {
        typeCode: 'Label_BIZ_Claim',
        dictCode: 'Claim',
      },
      show: true,
      component: ClaimHistory,
    },
    {
      key: TabsKey.pos,
      format: {
        typeCode: 'Label_BIZ_POS',
        dictCode: 'POS',
      },
      show: !tenant.isTH() && !tenant.isMY(),
      component: Pos,
    },
    {
      key: TabsKey.transaction,
      format: {
        typeCode: 'Label_BIZ_POS',
        dictCode: 'transactionHistory',
      },
      show: tenant.isTH() || tenant.isMY(),
      component: Transaction,
    },
    {
      key: TabsKey.userComment,
      format: {
        typeCode: 'Label_BIZ_Policy',
        dictCode: 'UserComment',
      },
      show: userCommentAuth,
      component: UserComment,
    },
  ];
};

export { Menus };
