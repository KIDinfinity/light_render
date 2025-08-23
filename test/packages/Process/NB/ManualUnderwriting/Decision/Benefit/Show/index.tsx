import React from 'react';
import lodash from 'lodash';
import useGetDecisionColumnsMW from 'process/NB/ManualUnderwriting/_hooks/useGetDecisionColumnsMW';
import useGetFieldOrderAtomConfigCallback from 'basic/components/Elements/hooks/useGetFieldOrderAtomConfigCallback';
import AddDPRemarkModal from 'process/NB/ManualUnderwriting/Decision/Benefit/AddDPRemarkModal';
import AddLoadingModal from 'process/NB/ManualUnderwriting/Decision/Benefit/AddLoadingModal';
import AddDPRemarkForm from 'process/NB/ManualUnderwriting/Decision/Benefit/AddDPRemarkForm';
import AddLoadingForm from 'process/NB/ManualUnderwriting/Decision/Benefit/AddLoadingForm';
import useGetSAMultiplierOPUS from 'process/NB/ManualUnderwriting/_hooks/useGetSAMultiplierOPUS';
import useGetRopList from 'process/NB/ManualUnderwriting/_hooks/useGetRopList';
import CustomisationCol from 'basic/components/CustomisationCol';
import CoverageList from './CoverageList';
import styles from './index.less';
import Footer from './Footer';
import useJudgeCoverageScrollable from 'process/NB/ManualUnderwriting/_hooks/useJudgeCoverageScrollable';

const Benefit = (props: any) => {
  const decisionColumns = useGetDecisionColumnsMW();
  const scrollable = useJudgeCoverageScrollable();
  const handleGetOrder = useGetFieldOrderAtomConfigCallback({
    localConfig: {},
    section: 'UWDecision-Table',
  });
  useGetRopList();
  useGetSAMultiplierOPUS();

  return (
    <>
      <div className={styles.coverageContainer}>
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
        <div
          style={{
            maxHeight: props?.windowHeight ? props.windowHeight - 135 : '370px',
            overflowY: scrollable ? 'scroll' : 'visible',
            width: 'fit-content',
          }}
        >
          <CoverageList />
        </div>
        <Footer />
      </div>
      <AddDPRemarkModal>
        <AddDPRemarkForm />
      </AddDPRemarkModal>
      <AddLoadingModal>
        <AddLoadingForm />
      </AddLoadingModal>
    </>
  );
};

Benefit.displayName = 'benefit';

export default Benefit;
