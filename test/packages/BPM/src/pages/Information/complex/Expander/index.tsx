import React from 'react';
import { connect, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import InformationExpander from 'bpm/pages/Information/complex/InformationExpander';
import HistoryExpander from 'bpm/pages/Information/complex/HistoryExpander';
import Empty from '@/components/Empty';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formUtils } from 'basic/components/Form';
import styles from './index.less';

const Expander = (props: any) => {
  const { authInfoEditable, expenderModel, activeEditTabs } = props;
  const { addInformations } = useSelector(
    (state: any) => state.navigatorInformationController,
    shallowEqual
  );
  const allCategoryHistory = useSelector(
    (state: any) => state.navigatorInformationController.allCategoryHistory,
    shallowEqual
  );

  const activeId = lodash.findLast(activeEditTabs);
  const hasActiveInformationItem = !lodash.isEmpty(activeEditTabs);
  const activeCategory = formUtils.queryValue(
    lodash
      .chain(addInformations)
      .find((item) => item.id === activeId)
      .get('categoryCode')
      .value()
  );

  const displayInformationExpander =
    expenderModel === 'edit' && authInfoEditable && hasActiveInformationItem && activeCategory;

  const displayEmpty =
    expenderModel === 'edit' &&
    authInfoEditable &&
    (lodash.isEmpty(allCategoryHistory) ||
      (!lodash.isEmpty(addInformations) && !lodash.isEmpty(allCategoryHistory)));

  const displayInfoExpanderInstruction =
    expenderModel === 'edit' &&
    authInfoEditable &&
    lodash.isEmpty(addInformations) &&
    !lodash.isEmpty(allCategoryHistory);

  return (
    <>
      <div className={styles.content}>
        {displayInformationExpander && <InformationExpander />}
        {expenderModel === 'history' && <HistoryExpander />}
        {displayEmpty && (
          <div className={styles.please}>
            <Empty />
          </div>
        )}
        {displayInfoExpanderInstruction && (
          <div className={styles.please}>
            {formatMessageApi({ Label_Sider_Information: 'InfoExpanderInstruction' })}
          </div>
        )}
      </div>
    </>
  );
};

export default connect(
  ({ authController, workspaceSwitchOn, navigatorInformationController }: any) => ({
    authInfoEditable: authController.authInfoEditable,
    isShow: workspaceSwitchOn.isShow,
    isSwitchOn: workspaceSwitchOn.isSwitchOn,
    allCategoryHistory: navigatorInformationController.allCategoryHistory,
    categoryList: navigatorInformationController.categoryList,
    informationData: navigatorInformationController.informationData,
    defaultKey: navigatorInformationController.defaultKey,
    expenderModel: navigatorInformationController.expenderModel,
    activeEditTabs: navigatorInformationController.activeEditTabs,
  })
)(Expander);
