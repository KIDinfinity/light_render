import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

import CommonResizeModal from 'basic/components/CommonResizeModal';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NbClientTag } from 'process/NewBusiness/ManualUnderwriting/Pages/CustomerIdentification/Enum';

import { NAMESPACE } from './activity.config';

import SuspectClients from './SuspectClients';
import MatchClients from './MatchClients';

import styles from './index.less';
import { useLoadRegionalDefaultValueList } from './_hooks';
import configs from './SuspectClients/ClientOptionSelection/config';

export enum CustomerIdentificationModalVisibleOptions {
  Close = 0,
  Visible = 0b01,
  CloseClientWhenClose = 0b10,
  VisibleAndCloseClientWhenClose = Visible + CloseClientWhenClose,
}

const SuspectItem = ({ clientInfoList, id, columnList }: any) => {
  const dispatch = useDispatch();
  const act002Config =
    useSelector(({ atomConfig }: any) => atomConfig.groups?.BP_NB_CTG001_BP_NB_ACT002) || {};
  useEffect(() => {
    if (lodash.isEmpty(act002Config)) {
      dispatch({
        type: 'atomConfig/loadAtomGroup',
        payload: {
          atomGroupCode: 'BP_NB_CTG001_BP_NB_ACT002',
        },
      });
    }
  }, [act002Config]);

  return (
    <SuspectClients
      act002Config={act002Config}
      columnList={columnList}
      clientInfoList={clientInfoList}
      id={id}
    />
  );
};

const MatchItem = ({ clientInfoList, columnList, id }: any) => {
  const clientList = useMemo(() => {
    return lodash
      .chain(clientInfoList)
      .filter(
        (item) =>
          lodash.find(item.identificationList, { clientTag: NbClientTag.FullyMatch }) ||
          lodash.find(item.identificationList, { clientTag: NbClientTag.Mismatch })
      )
      .map((item) => {
        const combinedResult = lodash.find(item.identificationList, {
          customerType: item.customerType,
        })?.combinedResult;
        return { ...item, combinedResult };
      })
      .value();
  }, [clientInfoList]);
  return <MatchClients clientList={clientList} columnList={columnList} id={id} />;
};

export default ({ mainNAMESPACE }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useLoadRegionalDefaultValueList();

  const { clientInfoList, id } =
    useSelector(
      ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData?.policyList?.[0]
    ) || {};

  const dedupCheckResult = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.claimProcessData?.policyList?.[0]?.clientInfoList?.[0]?.dedupCheckResult
  );

  const show = useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.show) || false;

  const columnList =
    useSelector(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.columnList) || [];

  const handleClose = () => {
    dispatch({
      type: `${NAMESPACE}/saveShow`,
      payload: {
        show: CustomerIdentificationModalVisibleOptions.Close,
      },
    });
    dispatch({
      type: `${NAMESPACE}/setCheckDuplicating`,
      payload: {
        checkDuplicating: '',
      },
    });
  };

  const list = useMemo(() => {
    return lodash
      .chain(clientInfoList)
      .filter(({ oldClient }: any) => !oldClient)
      .value();
  }, [clientInfoList]);

  // TODO:需要重新处理
  const handleConfirm = async () => {
    setLoading(true);
    const errors: any = await dispatch({
      type: `${NAMESPACE}/validateFields`,
      payload: {
        formKeys: [...configs],
      },
    });
    if (errors?.length > 0) {
      setLoading(false);
      return;
    }
    const success = await dispatch({
      type: `${NAMESPACE}/submit`,
      payload: {
        mainNAMESPACE,
      },
    });
    setLoading(false);
    if (success) {
      handleClose();
      if (show & CustomerIdentificationModalVisibleOptions.CloseClientWhenClose) {
        dispatch({
          type: `newBusinessManualUnderwriting/setEditingClientId`,
        });
      }
    }
  };

  useEffect(() => {
    if (show === CustomerIdentificationModalVisibleOptions.Close) return;
    if (lodash.isEmpty(columnList)) {
      dispatch({
        type: `${NAMESPACE}/getPageAtomConfig`,
        payload: {
          activityCode: 'BP_NB_ACT002',
          caseCategory: 'BP_NB_CTG001',
        },
      });
    }
  }, [columnList, show]);

  useEffect(() => {
    return () => {
      dispatch({
        type: `${NAMESPACE}/clearClaim`,
      });
    };
  }, []);

  return (
    <CommonResizeModal
      confirmAuth={true}
      visible={!!(show & CustomerIdentificationModalVisibleOptions.Visible)}
      onReturn={handleClose}
      onCancel={handleClose}
      onConfirm={handleConfirm}
      returnAuth
      width={1200}
      height={400}
      loading={loading}
      className={styles.CommonResizeModal}
    >
      {dedupCheckResult && (
        <div className={styles.title}>
          {formatMessageApi({ Dropdown_POL_DedupResult: dedupCheckResult })}
        </div>
      )}

      <SuspectItem clientInfoList={list} id={id} columnList={columnList} />
      <MatchItem clientInfoList={list} id={id} columnList={columnList} />
    </CommonResizeModal>
  );
};
