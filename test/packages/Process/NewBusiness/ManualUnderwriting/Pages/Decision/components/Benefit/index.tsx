import React, { useEffect, useState, useContext } from 'react';
import lodash from 'lodash';
import useGetDecisionColumnsMW from './_hooks/useGetDecisionColumnsMW';
import useGetFieldOrderAtomConfigCallback from 'basic/components/Elements/hooks/useGetFieldOrderAtomConfigCallback';
import useGetSAMultiplierOPUS from './_hooks/useGetSAMultiplierOPUS';
import useGetRopList from './_hooks/useGetRopList';
import CustomisationCol from 'basic/components/CustomisationCol';
import CoverageList from './components/CoverageList';
import styles from './index.less';
import Footer from './components/Footer';
import BaseModal from 'process/NewBusiness/ManualUnderwriting/_components/Modal';
import { useSelector, useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';
import { Icon } from 'antd';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import CoverageListEdit from './Edit';
import useGetSectionAtomConfig from 'basic/components/Elements/hooks/useGetSectionAtomConfig';
import { localConfig } from 'process/NewBusiness/ManualUnderwriting/Pages/Fund/_config/FundTableField';

import { OptionType } from 'process/NewBusiness/ManualUnderwriting/_enum';
import Context from 'navigator/components/CaseTaskDetail/Context';
import context from 'bpm/pages/OWBEntrance/Context/context';
//单独出来避免外层渲染多次
const UpdateProductInfoByContractType = () => {
  const dispatch = useDispatch();
  const contractType = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.planInfoData?.caseType
  );
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/getProductInfoByContractType`,
    });
  }, [contractType]);
  return null;
};
const CoverageTableHeader = () => {
  const decisionColumns = useGetDecisionColumnsMW();
  const handleGetOrder = useGetFieldOrderAtomConfigCallback({
    localConfig: {},
    section: 'UWDecision-Table',
  });
  return (
    <div className={styles.product}>
      <div className={styles.fieDecision}>
        {lodash.map(decisionColumns, (item, index) => (
          <CustomisationCol
            key={index}
            span={item?.span}
            order={handleGetOrder({ field: item?.key })}
          >
            {item?.title}
          </CustomisationCol>
        ))}
      </div>
    </div>
  );
};

const Content = () => {
  const dispatch = useDispatch();
  useGetRopList();
  useGetSAMultiplierOPUS();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/loadPlanDictProductRegion`,
    });
  }, []);

  return (
    <>
      <UpdateProductInfoByContractType />
      <div className={styles.content}>
        <div className={styles.coverageContainer}>
          <CoverageTableHeader />
          <div
            id="coverageListArea"
            style={{
              maxHeight: '370px',
              overflowY: 'scroll',
              width: 'fit-content',
              position: 'relative',
              gap: '8px',
              display: 'grid',
            }}
          >
            <CoverageList />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

const EditModal = ({ showEditModal, setShowEditModal }: any) => {
  const dispatch = useDispatch();
  const { setOverdueTime }: any = useContext(Context);
  const { dispatch: overdueTimedispatch } = useContext(context);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const fundSectionConfig = useGetSectionAtomConfig({ localConfig, section: 'Fund-Table' });
  const formKeys =
    useSelector(({ formCommonController }: any) => {
      const keys: any = [];
      const forms = formCommonController?.forms ?? {};
      Object.keys(forms).forEach((key) => {
        if (key.includes('UWDecision-Table')) {
          keys.push(key);
        }
      });
      return keys;
    }, shallowEqual) || [];
  const applicationNo = useSelector(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData?.applicationNo,
    shallowEqual
  );

  useEffect(() => {
    if (showEditModal) {
      setConfirmLoading(true);
      setTimeout(() => {
        setConfirmLoading(false);
      }, 1000);
    }
  }, [showEditModal]);

  const handleConfirm = async () => {
    await dispatch({
      type: `${NAMESPACE}/alignFund`,
      payload: {
        config: fundSectionConfig,
      },
    });
    const result = await dispatch({
      type: `${NAMESPACE}/submit`,
      payload: {
        type: OptionType.coverage,
        formKeys,
        setOverdueTime,
        overdueTimedispatch,
      },
    });

    return result;
  };

  const handleBack = () => {
    setShowEditModal(false);
    dispatch({
      type: `${NAMESPACE}/saveHiddenModal`,
    });
  };

  return (
    <BaseModal
      width="90%"
      onConfirm={handleConfirm}
      setShow={setShowEditModal}
      confirmLoading={confirmLoading}
      onBack={handleBack}
      show={showEditModal}
    >
      <CoverageListEdit />
    </BaseModal>
  );
};

const Wrapper = (props: any) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { editable = true } = props;
  const isEditable =
    !useSelector(({ claimEditable }: any) => claimEditable.taskNotEditable) && editable;
  const dispatch = useDispatch();

  const handleEditCoverage = () => {
    dispatch({
      type: `${NAMESPACE}/clearError`,
    });
    setShowEditModal(true);
    dispatch({
      type: `${NAMESPACE}/saveShowModal`,
      payload: {
        type: 'decision',
      },
    });
  };
  const openEditModal = async () => {
    const sustainabilityValidate = await dispatch({
      type: `${NAMESPACE}/validateSustainability`,
      payload: {
        type: 'main',
      },
    });
    if (!sustainabilityValidate) {
      handleWarnMessageModal(
        [
          {
            content: formatMessageApi({
              Label_COM_WarningMessage: 'MSG_000794',
            }),
          },
        ],
        {
          okFn: () => {
            handleEditCoverage();
          },
          cancelFn: () => {
            dispatch({
              type: `${NAMESPACE}/initSustainability`,
            });
            dispatch({
              type: `${NAMESPACE}/setSustainabilityModalVisible`,
              payload: {
                visible: true,
              },
            });
          },
        }
      );
      return;
    }
    handleEditCoverage();
  };
  return (
    <>
      {isEditable && (
        <div className={styles.iconEdit}>
          <Icon type="edit" onClick={openEditModal} />
        </div>
      )}
      {React.cloneElement(props.children, { showEditModal, setShowEditModal })}
    </>
  );
};

const Benefit = ({ editable = true }: { editable?: boolean }) => {
  return (
    <div className={styles.container}>
      <Content />
      <Wrapper editable={editable}>
        <EditModal />
      </Wrapper>
    </div>
  );
};

Benefit.displayName = 'benefit';

export default Benefit;
