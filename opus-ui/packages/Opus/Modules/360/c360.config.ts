import { TabsKey } from './enum';
import Policy from './pages/Policy';
import Coverage from './pages/Coverage';
import ClaimHistory from './pages/ClaimHistory';
import Pos from './pages/PosHistory';
import UserComment from './pages/UserComment';

interface MenusIPros {
  coverageList: string[];
  hasComment: boolean;
}
/**
 * 配置菜单
 * insuredPolicyIdList - insured列表
 */
const Menus = ({ coverageList, hasComment, posHistoryList }: MenusIPros) => {
  /**
   * 参数说明
   * key - 唯一标识
   * format - 国际化
   * show - 显示
   * component - 组件
   */
  return [
    {
      key: TabsKey.policy,
      format: {
        typeCode: 'Label_BIZ_Policy',
        dictCode: 'Policy',
      },
      title: {
        typeCode: 'Label_BIZ_Claim',
        dictCode: 'app.navigator.task-detail-of-data-capture.title.policy-information',
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
      title: {
        typeCode: 'Label_BIZ_Claim',
        dictCode: 'app.navigator.taskDetail.inquireForm.tab.claim-history',
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
      show: true,
      component: Pos,
    },
    {
      key: TabsKey.userComment,
      format: {
        typeCode: 'Label_BIZ_Policy',
        dictCode: 'UserComment',
      },
      show: hasComment,
      component: UserComment,
    },
  ];
};

export { Menus };
