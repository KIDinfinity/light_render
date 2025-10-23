import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';
import { Icon } from 'antd';
import CommonResizeModal from 'basic/components/CommonResizeModal';
import Search from './Search';
import Table from './Table';
import { SearchListType } from 'claim/enum';
import styles from './index.less';
import { formUtils } from 'basic/components/Form';
import moment from 'moment';
export default (props: any) => {
  const { otherProcedureId } = props;
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(true);
  const [selectPayableIds, setSelectPayableIds] = useState([]);

  const editable = !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable);
  const DrugsDetail = useSelector(
    ({ JPCLMOfClaimAssessment }: any) => JPCLMOfClaimAssessment.DrugsDetail
  );
  const antiCancerProcedureItem = useSelector(
    ({ JPCLMOfClaimAssessment }: any) =>
      JPCLMOfClaimAssessment.claimEntities.otherProcedureListMap[otherProcedureId]
        ?.therapeuticMonthList?.[DrugsDetail.idx]
  );
  const therapeuticMonth = antiCancerProcedureItem?.therapeuticMonth;
  const isSwitchOn = useSelector(({ workspaceSwitchOn }: any) => workspaceSwitchOn.isSwitchOn);
  const therapeuticDateList = lodash.isString(antiCancerProcedureItem?.therapeuticDateList)
    ? JSON.parse(antiCancerProcedureItem?.therapeuticDateList)
    : antiCancerProcedureItem?.therapeuticDateList;

  const therapeuticDate = moment(therapeuticDateList[0]).format('YYYY/MM/DD');

  useEffect(() => {
    const t = async () => {
      if (DrugsDetail.show) {
        if (lodash.isEmpty(DrugsDetail.allList)) {
          await dispatch({
            type: 'JPCLMOfClaimAssessment/getDrugsDetailList', //请求数据
            payload: {
              currentPage: 1,
            },
          });
        }
      }
    };
    t();
  }, [DrugsDetail.show]);

  const handleCancel = () => {
    dispatch({
      type: 'JPCLMOfClaimAssessment/updateDrugsDetailList', //关闭并清空
      payload: {
        type: SearchListType.CLEAR,
      },
    });
  };
  const handleConfirm = async () => {
    const { drugsListStore } = DrugsDetail;
    await dispatch({
      type: 'JPCLMOfClaimAssessment/saveDrugsDetailList', //保存已选中药品
      payload: {
        therapeuticMonth,
        otherProcedureId,
        changedFields: {
          therapeuticDrugs: lodash
            .chain([
              ...formUtils.queryValue(antiCancerProcedureItem.therapeuticDrugs),
              ...drugsListStore,
            ])
            .uniq()
            .value(),
        },
      },
    });
    dispatch({
      type: 'JPCLMOfClaimAssessment/updateDrugsDetailList', //关闭并清空
      payload: {
        type: SearchListType.CLEAR,
      },
    });
  };
  return (
    <CommonResizeModal
      confirmAuth={true && editable}
      visible={DrugsDetail?.show}
      onReturn={() => {
        handleCancel();
      }}
      onCancel={() => {
        handleCancel();
      }}
      onConfirm={() => {
        handleConfirm();
      }}
      returnAuth
      width="70%"
      height={400}
      authHeight
    >
      <div className={styles.SerialClaim}>
        <Search showSearch={showSearch} therapeuticDate={therapeuticDate} editable={editable} />
        <div className={styles.arrow}>
          <Icon
            type={showSearch ? 'double-left' : 'double-right'}
            onClick={() => {
              setShowSearch(!showSearch);
            }}
          />
        </div>
        <Table
          antiCancerProcedureItem={antiCancerProcedureItem}
          selectPayableIds={selectPayableIds}
          setSelectPayableIds={setSelectPayableIds}
          isSwitchOn={isSwitchOn}
          total={DrugsDetail.total}
          therapeuticMonth={moment(therapeuticDateList[0]).format('YYYY-MM')}
          otherProcedureId={otherProcedureId}
          therapeuticDate={therapeuticDate}
        />
      </div>
    </CommonResizeModal>
  );
};
