import React, { useEffect, useMemo, useState, useRef } from 'react';
import styles from './index.less';
import lodash from 'lodash';
import { TypeEnum } from '@/enum/GolbalAuthority';
import { useSelector } from 'dva';
import PageComponentMapping from './PageComponentMapping';
import Masonry from 'react-masonry-component';
import { findAll } from '@/services/miscAtomConfigControllerService';
import { tenant } from '@/components/Tenant';
import { centerExport } from '@/services/monitorCenterControllerService';
import Scenario from 'navigator/pages/Home/Monitor/Scenario';
import ScenarioMode from 'navigator/pages/Home/Monitor/Scenario/Enum/ScenarioMode';
import classnames from 'classnames';
import isSupportCenter from '@/utils/isSupportCenter';

export default function Monitor() {
  const commonAuthorityList = useSelector((state: any) => state.authController.commonAuthorityList);

  const [width, setWidth] = useState(document.body.offsetWidth - 44 - 40);
  const [height, setHeight] = useState(document.body.offsetHeight - 48 - 48 - 40 - 100);
  const [sectionConfig, setSectionConfig] = useState([]);
  const [showSection, setShowSection] = useState([]);
  const [expandList, setExpandList] = useState<any[]>([]);
  const componentRefList = useRef<HTMLDivElement[]>([]);
  const lastExpandList = useRef([]);
  const authPageConfig: any[] = useMemo(
    () => sectionConfig.filter((item) => showSection.includes(item?.section)),
    [showSection, sectionConfig]
  );

  useEffect(() => {
    if (lastExpandList.current.length !== expandList.length) {
      let expandItem;
      if (expandList.length > lastExpandList.current.length) {
        expandItem = expandList[expandList.length - 1];
      } else {
        expandItem = lastExpandList.current.find((item) => !expandList.includes(item));
      }
      if (expandItem !== -1) {
        const expandElement = componentRefList.current[authPageConfig.indexOf(expandItem)];
        expandElement?.offsetParent?.addEventListener(
          'transitionend',
          () => {
            setTimeout(() => {
              window.scrollTo({
                top: expandElement?.offsetParent?.offsetTop,
                behavior: 'smooth',
              });
            }, 200);
          },
          { once: true }
        );
      }
    }
    return () => {
      lastExpandList.current = expandList;
    };
  }, [expandList]);

  const resizeRender = () => {
    setWidth(document.body.offsetWidth - 44 - 40);
    setHeight(document.body.offsetHeight - 48 - 48 - 40 - 100);
  };

  const getPageConfig = async () => {
    const response = await findAll();
    if (response && response.success && response.resultData) {
      const list = lodash
        .chain(commonAuthorityList)
        .filter((item) => item.result && item.type === TypeEnum.Menu)
        .map((item) => item.authorityCode)
        .value();

      const authPageConfig = response.resultData
        .filter((item) => [tenant.region(), 'BS'].includes(lodash.upperCase(item?.region)))
        .filter((item) => list.includes(item?.section))
        .sort((a, b) => lodash.toNumber(a?.order) - lodash.toNumber(b?.order));

      setSectionConfig([...authPageConfig]);
      setShowSection([...lodash.union(authPageConfig.map((item) => item.section))]);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', resizeRender);
    return () => {
      window.removeEventListener('resize', resizeRender);
    };
  }, []);

  useEffect(() => {
    getPageConfig();
  }, [commonAuthorityList]);

  const renderGrid = useMemo(() => {
    return (
      <Masonry elementType={'div'} enableResizableChildren={true}>
        <Scenario mode={ScenarioMode.HOME_PAGE}>
          {authPageConfig.map((item, index) => {
            const isExpanded = expandList.includes(item);
            const unCalWidth = isSupportCenter() ? width - 80 : width;
            const itemWidth =
              unCalWidth *
                lodash.toNumber(
                  document.body.offsetHeight < 600 || authPageConfig.length === 1 || isExpanded
                    ? 24
                    : item?.width
                ) *
                0.0415 -
              3;
            return (
              <div
                key={item?.section}
                className={'image-element-class'}
                style={{
                  width: `${itemWidth}px`,
                  overflow: 'auto',
                  margin: '10px 0',
                  padding: '0 10px',
                }}
              >
                <div
                  className={classnames(styles.sectionBox, {
                    [styles.expandedSection]: isExpanded,
                    [styles.retractedSection]: !isExpanded,
                    [styles.supportCenterSectionBox]: isSupportCenter(),
                  })}
                  ref={(ref) => {
                    if (!ref) {
                      return;
                    }
                    componentRefList.current[index] = ref;
                    componentRefList.current = componentRefList.current.concat([]);
                  }}
                >
                  <PageComponentMapping
                    type={item?.section}
                    isExpand={isExpanded}
                    setExpand={(isExpand: boolean) => {
                      if (isExpand !== expandList.includes(item)) {
                        if (isExpand) {
                          setExpandList([...expandList, item]);
                        } else {
                          setExpandList(expandList.filter((currItem) => currItem !== item));
                        }
                      }
                    }}
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    exportExcel={async (params = [], setLoading = (bool: boolean) => {}) => {
                      setLoading(true);
                      await centerExport(...params);
                      setLoading(false);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </Scenario>
      </Masonry>
    );
  }, [width, authPageConfig, height, expandList]);
  return (
    <div
      className={classnames(
        isSupportCenter() ? styles.supportCenterContent : styles.content,
        'monitorBox'
      )}
    >
      {renderGrid}
    </div>
  );
}
