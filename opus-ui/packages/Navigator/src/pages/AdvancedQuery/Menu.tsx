import { some, filter } from 'lodash';
import { ReactComponent as iconCaseSvg } from 'navigator/assets/case.svg';
import { ReactComponent as iconTaskSvg } from 'navigator/assets/task.svg';
import { ReactComponent as iconUserSvg } from 'navigator/assets/user.svg';
import { ReactComponent as iconClaimHistorySvg } from 'navigator/assets/claim-history.svg';
import { ReactComponent as iconHospitalBillingSvg } from 'navigator/assets/hospital-billing.svg';
import { ReactComponent as iconUnknownDocumentSvg } from 'navigator/assets/unknownDocument.svg';
import { ReactComponent as iconRuleSetSvg } from 'navigator/assets/rule-set.svg';
import { ReactComponent as iconPOSHistorySvg } from 'navigator/assets/POSHistory.svg';
import { ReactComponent as iconNBHistorySvg } from 'navigator/assets/nb-history.svg';

import { formatMessageApi } from '@/utils/dictFormatMessage';
import { AdvancedEnum } from '@/enum/GolbalAuthority';

import AdvancedQueryOfCase from './Case';
import AdvancedQueryOfTask from './Task';
import AdvancedQueryOfUser from './User';
import AdvancedQueryOfHospitalBilling from './HospitalBilling';
import AdvancedQueryOfClaimHistory from './ClaimHistory';
import AdvancedQueryOfUnknownDocument from './views/entry/unknownDocument';
import AdvancedQueryOfRuleSet from './RuleSet';
import AdvancedQueryOfNBHistory from './NBHistory';
import AdvancedQueryOfServicingHistory from './ServicingHistory';
import { AdvancedMenu, AdvancedMenuKey } from 'navigator/pages/AdvancedQuery/Enum';

const getTitle = (labelId: string, typeCode: string = 'Label_COM_General') =>
  formatMessageApi({ [typeCode]: labelId });

export { AdvancedMenu };

export default (permissionMenus: any[] = []) => {
  const menu = [
    {
      key: AdvancedMenuKey.case,
      id: AdvancedEnum.AdvancedQueryOfCase,
      icon: iconCaseSvg,
      title: getTitle('caseinquiry'),
      show: some(
        permissionMenus,
        (el) => el.result && el.authorityCode === AdvancedEnum.AdvancedQueryOfCase
      ),

      component: AdvancedQueryOfCase,
    },
    {
      key: AdvancedMenuKey.task,
      id: AdvancedEnum.AdvancedQueryOfTask,
      icon: iconTaskSvg,
      show: some(
        permissionMenus,
        (el) => el.result && el.authorityCode === AdvancedEnum.AdvancedQueryOfTask
      ),
      title: getTitle('taskinquiry'),
      component: AdvancedQueryOfTask,
    },
    {
      key: AdvancedMenuKey.user,
      id: AdvancedEnum.AdvancedQueryOfUser,
      icon: iconUserSvg,
      show: some(
        permissionMenus,
        (el) => el.result && el.authorityCode === AdvancedEnum.AdvancedQueryOfUser
      ),
      title: getTitle('userinquiry'),
      component: AdvancedQueryOfUser,
    },
    {
      key: AdvancedMenuKey.claimhistory,
      id: AdvancedEnum.AdvancedQueryOfClaimHistory,
      icon: iconClaimHistorySvg,
      show: some(
        permissionMenus,
        (el) => el.result && el.authorityCode === AdvancedEnum.AdvancedQueryOfClaimHistory
      ),
      title: getTitle('claimhistoryinquiry'),
      component: AdvancedQueryOfClaimHistory,
    },
    {
      key: AdvancedMenuKey.hospitalbilling,
      id: AdvancedEnum.AdvancedQueryOfHospitalBilling,
      icon: iconHospitalBillingSvg,
      show: some(
        permissionMenus,
        (el) => el.result && el.authorityCode === AdvancedEnum.AdvancedQueryOfHospitalBilling
      ),
      title: getTitle('app.navigator.taskDetail.inquireForm.tab.hospital-billing'),
      component: AdvancedQueryOfHospitalBilling,
    },
    {
      key: AdvancedMenuKey.document,
      id: AdvancedEnum.AdvancedQueryOfUnknownDocument,
      icon: iconUnknownDocumentSvg,
      show: some(
        permissionMenus,
        (el) => el.result && el.authorityCode === AdvancedEnum.AdvancedQueryOfUnknownDocument
      ),
      title: getTitle('documentinquiry'),
      component: AdvancedQueryOfUnknownDocument,
    },
    {
      key: AdvancedMenuKey.rule,
      id: AdvancedEnum.AdvancedQueryOfRuleSet,
      icon: iconRuleSetSvg,
      show: some(
        permissionMenus,
        (el) => el.result && el.authorityCode === AdvancedEnum.AdvancedQueryOfRuleSet
      ),
      title: getTitle('ruleinquiry'),
      component: AdvancedQueryOfRuleSet,
    },
    {
      key: AdvancedMenuKey.servicinghistory,
      id: AdvancedEnum.AdvancedQueryOfServicingHistory,
      icon: iconPOSHistorySvg,
      show: some(
        permissionMenus,
        (el) => el.result && el.authorityCode === AdvancedEnum.AdvancedQueryOfServicingHistory
      ),
      title: getTitle('ServicingHistoryInquiry', 'Label_COM_Inquiry'),
      component: AdvancedQueryOfServicingHistory,
    },
    {
      key: AdvancedMenuKey.nbhistoryinquiry,
      id: AdvancedEnum.AdvancedQueryOfNBHistory,
      icon: iconNBHistorySvg,
      show: some(
        permissionMenus,
        (el) => el.result && el.authorityCode === AdvancedEnum.AdvancedQueryOfNBHistory
      ),
      title: formatMessageApi({ Label_COM_General: 'NBHistory' }),
      component: AdvancedQueryOfNBHistory,
    },
  ];

  return filter(menu, (el) => el.show) || [];
};
