import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import classnames from 'classnames';
import Swiper from 'react-id-swiper';
import { fnPrecisionFormat, fnPrecisionParser } from '@/utils/precisionUtils';
import { useGetTsarDatas, useGetAllCategoryTsarData } from './_hooks';
import styles from './index.less';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import StatusList from './StatusList';

interface IProps {
  monthPeriod: any;
  selectedRoleInd: string;
}

interface IPropsTsar {
  monthPeriod: any;
  selectedRoleInd: string;
  tsarCalculationCategory: string;
  setTsarCalculationCategory: Function;
}

const CoverageTsar = ({ monthPeriod, selectedRoleInd }: IProps) => {
  const [tsarCalculationCategory, setTsarCalculationCategory] = useState('');
  return (
    <>
      <TsarList
        monthPeriod={monthPeriod}
        selectedRoleInd={selectedRoleInd}
        tsarCalculationCategory={tsarCalculationCategory}
        setTsarCalculationCategory={setTsarCalculationCategory}
      />
      <StatusList
        tsarCalculationCategory={tsarCalculationCategory}
        monthPeriod={monthPeriod}
        selectedRoleInd={selectedRoleInd}
      />
    </>
  );
};

const TsarList = ({
  monthPeriod,
  selectedRoleInd,
  tsarCalculationCategory,
  setTsarCalculationCategory,
}: IPropsTsar) => {
  const allCategroyData = useGetAllCategoryTsarData({ monthPeriod, selectedRoleInd });
  const tsarDatas = useGetTsarDatas({
    allCategroyData,
    tsarCalculationCategory,
  });

  useEffect(() => {
    const category = lodash.chain(allCategroyData).first().get('tsarCalculationCategory').value();
    if (category) {
      setTsarCalculationCategory(category);
    }
  }, [allCategroyData]);

  const params = {
    slidesPerView: 3, //显示数量
    loop: false,
    observer: true,
    observeSlideChildren: true,
    speed: 2000,
    // 设置间隔
    spaceBetween: 10,
  };

  return (
    !lodash.isEmpty(tsarDatas) && <div className={classnames(styles.TypeList, styles.container)}>
      <Swiper {...params}>
        {tsarDatas.map((item: any) => (
          <div
            key={item.id}
            className={styles.item}
            onClick={() => {
              setTsarCalculationCategory(item.tsarCalculationCategory);
            }}
          >
            <div className={styles.context}>
              <p className={styles.top}>
                {formatMessageApi({
                  Label_Slider_360: item.tsarCalculationCategory,
                })}
              </p>
              <p
                className={styles.total}
                title={fnPrecisionFormat(fnPrecisionParser(parseFloat(item.tsar)))}
              >
                {fnPrecisionFormat(fnPrecisionParser(parseFloat(item.tsar)))}
              </p>
              {item.currency && !lodash.isEmpty(item.currency) && (
                <p className={styles.top}>{item.currency}</p>
              )}
            </div>
          </div>
        ))}
      </Swiper>
    </div> || null
  );
};

export default CoverageTsar;
