import React, { useState, useEffect } from 'react';
import lodash from 'lodash';
import ModalWarnMessage from '../ModalWarnMessage';
import styles from './Guidance.less';
import { useSelector, useDispatch } from 'dva';
import { history } from 'umi';
import { findByUserId, updateInfo } from '@/services/userCenterGuideControllerService';
import { serialize as objectToFormData } from 'object-to-formdata';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { getPositon, headerElement, setElementStyle } from './utils';
import { safeParseUtil } from '@/utils/utils';
import Footer from './Footer';
import defaultInfo from './defaultInfo';
import queryString from 'query-string';

const GuideModal = () => {
  const dispatch = useDispatch();
  const [guidanceProcess, setGuidanceProcess] = useState(null);
  const guidance: string = useSelector(({ global }: any) => global?.guidance);
  const guidanceIndex: number = useSelector(({ global }: any) => global?.guidanceIndex);
  const searchStatus: string = useSelector(
    ({ advancedQueryAllForm }: any) => advancedQueryAllForm?.searchStatus
  );
  // const [guidanceIndex, setCurrentIndex] = useState(0);
  const [changeSize, setChangeSize] = useState(1);
  const [domRender, setDomRender] = useState(0);
  const userId: string = useSelector(({ user }: any) => user.currentUser?.userId);

  const pathname = history.location.pathname;
  const query = queryString.parse(history.location.search);

  const handleNextClick = () => {
    dispatch({
      type: 'global/changeGuidanceIndex',
      payload: guidanceIndex + 1,
    });
    if (guidanceIndex === List.length - 1) {
      dispatch({
        type: 'global/changeGuidance',
        payload: false,
      });
    }
  };

  const handleCloseClick = () => {
    dispatch({
      type: 'global/changeGuidanceIndex',
      payload: 0,
    });
    dispatch({
      type: 'global/changeGuidance',
      payload: false,
    });
    setElementStyle(headerElement(List[guidanceIndex]?.highLightNames), '0', '');
  };

  const routerName = [
    {
      name: 'advTaskOne',
      router: '/navigator/advancedquery',
    },
    {
      name: 'themeOne',
      router: '/navigator',
      next: 'themeTwo',
    },
    {
      name: 'themeTwo',
      prev: 'themeOne',
      router: '/navigator/user/management/customization',
      query: { g: 't' },
    },
  ];

  const objList = {
    advTaskOne: [
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_00001' }).replace('!', '!<br>'),
        highLightNames: [],
        container: '.guidance-advanced-query-container',
        positionclass: '.guidance-adv-one',
        position: (containerDom) => ({
          top: containerDom?.top * 1.3,
          left: containerDom?.left - 10,
        }),
        tipPosition: 'antModalLT',
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_00002' }),
        highLightNames: ['.ant-table-placeholder'],
        container: '.guidance-advanced-query-container',
        positionclass: '.ant-table-placeholder',
        position: (containerDom) => ({
          top: containerDom?.bottom - 200,
          left: (containerDom?.right + containerDom?.left) / 2 - 148,
        }),
        tipPosition: 'antModalLTM',
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_00003' }),
        highLightNames: ['.guidance-advanced-search-vetical-form'],
        container: '.guidance-advanced-query-container',
        positionclass: '.guidance-adv-one',
        position: (containerDom) => ({
          top: containerDom?.top * 2.6,
          left: containerDom?.left - 10,
        }),
        tipPosition: 'antModalLM',
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_00004' }),
        highLightNames: ['.ant-btn-primary'],
        container: '.guidance-advanced-query-container',
        positionclass: '.ant-btn-primary',
        highLightBgColor: 'none',
        position: (containerDom) => ({
          top: containerDom?.top - 30,
          left: containerDom?.right + 30,
        }),
        tipPosition: 'antModalLM',
      },
    ],
    themeOne: [
      {
        content: `${formatMessageApi({ Label_COM_Message: 'GUIDE_02001' }).replace(
          '!',
          '!<br>'
        )}<br><br>`,
        highLightNames: ['.guidance-theme-one'],
        container: '.guidance-theme-one',
        positionclass: '.guidance-theme-one',
        highLightBgColor: 'none',
        position: (containerDom) => ({
          top: containerDom?.bottom + 10,
          left: containerDom?.left - 148,
        }),
        tipPosition: 'antModalLTM',
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_02002' }),
        highLightNames: ['.guidance-theme-two'],
        container: '.guidance-theme-two',
        positionclass: '.guidance-theme-two',
        highLightBgColor: 'none',
        position: (containerDom) => ({
          top: containerDom?.bottom + 20,
          left: containerDom?.left - 250,
        }),
        tipPosition: 'antModalLTR',
        hiddenNext: true,
        hiddenDone: true,
        freeButton: true,
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_02002' }),
        highLightNames: ['.guidance-theme-three'],
        container: '.guidance-theme-three',
        positionclass: '.guidance-theme-three',
        highLightBgColor: 'none',
        position: (containerDom) => ({
          top: containerDom?.top - 4,
          left: containerDom?.left - 330,
        }),
        tipPosition: 'antModalRT',
        hiddenNext: true,
        hiddenDone: true,
        freeButton: true,
      },
    ],
    themeTwo: [
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_02003' }),
        highLightNames: ['.guidance-theme-four', '.guidance-theme-four-high'],
        container: '.guidance-theme-user-box',
        positionclass: '.guidance-theme-four',
        highLightBgColor: 'none',
        position: (containerDom) => ({
          top: containerDom?.top,
          left: containerDom?.left - 330,
        }),
        tipPosition: 'antModalRT',
        scrollToPosition: true,
        scrollBox: '.guidance-theme-scroll-one',
        scrollComplete: (srcollDom) => srcollDom.y - 198,
      },
      {
        content: formatMessageApi({ Label_COM_Message: 'GUIDE_02004' }),
        highLightNames: [
          '.guidance-ex-mask-theme-five',
          '.guidance-theme-five',
          '.guidance-theme-six',
          '.guidance-theme-seven',
        ],
        container: '.guidance-theme-six',
        positionclass: '.guidance-theme-five',
        highLightBgColor: 'none',
        position: (containerDom) => ({
          top: containerDom?.top - 70,
          left: containerDom?.right + 30,
        }),
        tipPosition: 'antModalLM',
        scrollToPosition: true,
        scrollBox: '.guidance-theme-six',
        scrollComplete: (srcollDom) => srcollDom.y - 198,
      },
    ],
    default: [],
  };

  const listenSize = () => {
    setChangeSize((e) => e + 1);
  };
  const doubleList = lodash.debounce(listenSize, 100);
  const matchRouter = routerName.find(
    (item) => pathname === item.router && (!item?.query || lodash.isEqual(item?.query, query))
  );
  const prevNumber = objList?.[matchRouter?.prev]?.length || 0;
  const nextNumber = objList?.[matchRouter?.next]?.length || 0;
  const matchname =
    matchRouter?.name === 'advTaskOne' && searchStatus ? 'default' : matchRouter?.name;

  const List = objList[matchname || 'default'];

  // 匹配到对应路由，并且还没完成过向导。
  // 重置向导步数，开启向导模式，默认对应dom元素未渲染完成。
  useEffect(() => {
    if (matchRouter && guidanceProcess?.transfer?.[matchRouter?.name] === false) {
      const uploadData = async () => {
        try {
          const updateKey = guidanceProcess?.mapParentKey?.[matchRouter?.name];
          const params = {
            userId: userId,
            guideControlInfo: JSON.stringify({
              ...(guidanceProcess?.origin || {}),
              [updateKey]: {
                ...guidanceProcess?.origin?.[updateKey],
                result: true,
              },
            }),
          };

          await updateInfo(params);
        } catch (error) {}
      };

      uploadData();
      setGuidanceProcess((e) => ({
        ...e,
        transfer: { ...e?.transfer, [matchRouter?.name]: true },
      }));
      dispatch({
        type: 'global/changeGuidanceIndex',
        payload: 0,
      });
      setDomRender(false);
      dispatch({
        type: 'global/changeGuidance',
        payload: true,
      });
    }
  }, [pathname, guidanceProcess]);

  // 如果有上一步遗留的遮罩层，先移除。
  // 恢复上一步高亮的样式和层级。
  useEffect(() => {
    try {
      const exMask = headerElement('.guidance-ex-mask');
      if (exMask) {
        exMask?.parentElement?.removeChild(exMask);
      }
      List[guidanceIndex - 1]?.highLightNames?.forEach((item) =>
        setElementStyle(headerElement(item), '0', '')
      );
    } catch (error) {
      console.log('maskError', error);
    }

    if (guidanceIndex + 1 <= List.length && domRender) {
      try {
        // 初始化滚动到指定dom位置
        if (List[guidanceIndex]?.scrollToPosition) {
          const positionDom = getPositon(List[guidanceIndex]?.positionclass) || {};
          let top = positionDom?.top;
          if (lodash.isFunction(List[guidanceIndex]?.scrollComplete)) {
            top = List[guidanceIndex]?.scrollComplete(positionDom);
          }

          headerElement(List[guidanceIndex]?.scrollBox)?.scrollTo(0, top);
          // 更新滚动后的坐标
          setChangeSize((e) => e + 1);
        }

        List[guidanceIndex]?.highLightNames?.forEach((item) =>
          setElementStyle(
            headerElement(item),
            '9999',
            List[guidanceIndex]?.highLightBgColor ||
              'var(--navigator-advanced-query-filter-bg-color)'
          )
        );
        // 额外的遮罩层
        if (List[guidanceIndex]?.exMaskClass) {
          const newParant = headerElement(List[guidanceIndex]?.exMaskClass);
          const mask = document.createElement('div');
          mask.classList.add('guidance-ex-mask');
          mask.classList.add(styles.exMask);
          newParant?.appendChild(mask);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [guidanceIndex, domRender]);

  useEffect(() => {
    const fetchData = async (userId: string) => {
      try {
        const response = await findByUserId(objectToFormData({ userId }));
        if (response != null) {
          let {
            enableGuideFlag,
            finishGuideFlag,
            guideControlInfo,
          } = lodash.pick(response.resultData, [
            'enableGuideFlag',
            'finishGuideFlag',
            'guideControlInfo',
          ]);
          if (lodash.isEmpty(guideControlInfo) && enableGuideFlag && finishGuideFlag) {
            guideControlInfo = JSON.stringify(defaultInfo);
            const params = {
              userId: userId,
              guideControlInfo,
            };

            await updateInfo(params);
          }

          if (
            enableGuideFlag === 'Y' &&
            finishGuideFlag !== 'Y' &&
            !lodash.isEmpty(guideControlInfo)
          ) {
            const parseGuideControlInfo: any = safeParseUtil(guideControlInfo);
            setGuidanceProcess({
              origin: parseGuideControlInfo,
              transfer: lodash.reduce(
                lodash.values(parseGuideControlInfo),
                (r, c) => {
                  if (c?.result === false) {
                    c.process.forEach((processKey) => {
                      r[processKey] = false;
                    });
                    return r;
                  }
                  return r;
                },
                {}
              ),
              mapParentKey: lodash.reduce(
                lodash.entries(parseGuideControlInfo),
                (r, [key, value]) => {
                  value.process.forEach((processKey) => {
                    r[processKey] = key;
                  });
                  return r;
                },
                {}
              ),
            });
          }
        }
      } catch (error) {}
    };
    if (userId) {
      fetchData(userId);
    }
    window.addEventListener('resize', doubleList);
    return () => {
      window.removeEventListener('resize', doubleList);
    };
  }, [userId]);
  // 搜索dom，存在坐标dom的情况下才会渲染弹窗
  useEffect(() => {
    let timer = null;

    if (!lodash.isEmpty(List)) {
      timer = setInterval(() => {
        const dom = document?.querySelector(List?.[0]?.positionclass);
        if (dom) {
          setDomRender(true);
          clearTimeout(timer);
        }
      }, 100);
      domRender;
    }
    return () => {
      clearTimeout(timer);
    };
  }, [List]);

  const item = List?.[guidanceIndex];
  const containerDom = document?.querySelector(item?.positionclass);

  return (
    <div key={changeSize}>
      {guidance && !lodash.isEmpty(List) && item && (
        <div key={changeSize}>
          {domRender && (
            <ModalWarnMessage
              className={`${styles[item?.tipPosition]} antModal`}
              visible={guidanceIndex < List?.length}
              hiddenExtraText={true}
              closable={false}
              zIndex={100}
              mask={true}
              maskStyle={{
                backgroundColor: 'var(--table-bg-color)',
                opacity: '0.45',
              }}
              wrapClassName={styles.wrap}
              getContainer={() => document?.querySelector(item?.container)}
              style={{ ...item.position(containerDom?.getBoundingClientRect()) }}
              showFooter={false}
              footer={
                <Footer
                  guidanceIndex={guidanceIndex}
                  List={List}
                  handleCloseClick={handleCloseClick}
                  handleNextClick={handleNextClick}
                  prevNumber={prevNumber}
                  nextNumber={nextNumber}
                />
              }
            >
              <div dangerouslySetInnerHTML={{ __html: item.content }} />
            </ModalWarnMessage>
          )}
        </div>
      )}
    </div>
  );
};
export default GuideModal;
