import { LS, LSKey } from '@/utils/cache';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { useThrottleFn } from 'ahooks';
import { Dropdown, Icon, Menu, Spin } from 'antd';
import useLoading from 'basic/hooks/useLoading';
import { ReactComponent as funnelIcon } from 'bpm/assets/funnel.svg';
import classnames from 'classnames';
import { useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import useExpanderController from 'navigator/hooks/useExpanderController';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './index.less';

type Reason = {
  caseCategory?: string;
  caseCategoryCount?: number;
  status?: string;
  taskGroupCode?: string;
  taskGroupName?: string;
  totalCount?: number;
};

let prevAbortController: any = null;
let interval: any = null;
let updateReasonsAbortController: any = null;
let timeout: NodeJS.Timeout | null = null;

const clearTimeoutIfExist = () => {
  if(timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
}

const INTERVAL_TIME = 30000;
const COLLAPSE_WIDTH = 1680;

export default ({ className }: any) => {
  const firstRenderRef = useRef(true);
  const userInfo = LS.getItem(LSKey.CURRENTUSER);
  const { isSiderToggleOn } = useExpanderController();
  const dispatch = useDispatch();
  const userId = useSelector((state: any) => state.user.currentUser.userId);
  const filter = useSelector((state: any) => state.homeList.filter);
  const filterList = useSelector((state: any) => state.navigatorHomeWatching.filterList);
  const reasonList = useSelector((state: any) => state.navigatorHomeWatching.filterReasonList);
  const filterParams = useSelector((state: any) => state.navigatorHomeWatching.filterParams);
  const { caseCategory = '', taskGroupCode = '', submissionChannel = '' } = filterParams || {};

  const { loading, setLoading } = useLoading();
  const [categoryCollapsed, setCategoryCollapsed] = useState(false);

  const isEmpty = useMemo(
    () => !reasonList.length || reasonList.every((item: any) => !item.totalCount),
    [reasonList]
  );

  const caseCategoryList = useMemo(() => {
    return (
      lodash
        .chain(filterList)
        .map((el: any) => el.caseCategory)
        .uniq()
        .value() || []
    );
  }, [filterList]);

  // categories display in menu
  const menuCategories = useMemo(() => {
    if (categoryCollapsed) {
      return [];
    } else if (caseCategoryList.length > 3) {
      if (caseCategory) {
        const slice = lodash.slice(caseCategoryList, 0, 3);

        if (slice.includes(caseCategory)) {
          return slice;
        }

        return [
          ...lodash.slice(
            lodash.filter(caseCategoryList, (item) => item !== caseCategory),
            0,
            2
          ),
          caseCategory,
        ];
      }
      return lodash.slice(caseCategoryList, 0, 3);
    }
    return caseCategoryList;
  }, [caseCategory, caseCategoryList, categoryCollapsed]);

  // categories display in dropdown
  const dropdownCategories = useMemo(() => {
    if (categoryCollapsed) {
      return caseCategoryList;
    }

    return caseCategoryList.length > 3
      ? lodash.filter(caseCategoryList, (item) => !menuCategories.includes(item))
      : [];
  }, [caseCategoryList, categoryCollapsed, menuCategories]);

  const saveFilterParams = useCallback(
    (changeValue: any) => {
      dispatch({
        type: 'navigatorHomeWatching/saveFilterParams',
        payload: {
          changeValue,
        },
      });
    },
    [dispatch]
  );

  const onCategoryChange = useCallback(
    (category: string) => {
      const updatedCategory = caseCategory === category ? '' : category;
      const previousFilter = LS.getItem(LSKey.NAVIGATOR_CASE_FILTER);

      // 筛选条件持久化
      LS.setItem(LSKey.NAVIGATOR_CASE_FILTER, {
        ...previousFilter,
        caseCategory: updatedCategory,
      });

      saveFilterParams({ caseCategory: updatedCategory });
      setLoading(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [caseCategory, saveFilterParams]
  );

  const onReasonChange = useCallback(
    (newReason?: string) => {
      const updatedReason = taskGroupCode === newReason ? '' : newReason;
      const previousFilter = LS.getItem(LSKey.NAVIGATOR_CASE_FILTER);

      // 筛选条件持久化
      LS.setItem(LSKey.NAVIGATOR_CASE_FILTER, {
        ...previousFilter,
        taskGroupCode: updatedReason,
      });

      saveFilterParams({ taskGroupCode: updatedReason });
    },
    [taskGroupCode, saveFilterParams]
  );

  const updateList = useCallback(() => {
    const abortController = new AbortController();

    if (prevAbortController) {
      prevAbortController.abort();
    }
    prevAbortController = abortController;

    dispatch({
      type: 'task/list',
      payload: {
        pageSize: 10,
        params: {
          assignee: userId,
          taskStatus: filter,
          ...lodash.pickBy(filterParams),
        },
      },
      signal: abortController.signal,
    });
  }, [dispatch, filter, filterParams, userId]);

  const updateReasons = useCallback(() => {
    clearTimeoutIfExist();
    if (updateReasonsAbortController) {
      updateReasonsAbortController.abort();
    }

    updateReasonsAbortController = new AbortController();
    const { businessCode } = userInfo;

    dispatch({
      type: 'navigatorHomeWatching/getFilterReasonList',
      payload: {
        userId: userId,
        status: filter,
        businessCode,
        caseCategory,
        submissionChannel,
      },
      signal: updateReasonsAbortController.signal,
    });
  }, [caseCategory, dispatch, filter, userId, submissionChannel]);

  const { run: updateCategoryFilterStyle } = useThrottleFn(
    () => {
      const element = document.body;

      if (element) {
        const { clientWidth } = element;

        setCategoryCollapsed(isSiderToggleOn || clientWidth < COLLAPSE_WIDTH);
      }
    },
    { wait: 300 }
  );

  // 初始化查询
  useEffect(() => {
    const previousFilter = LS.getItem(LSKey.NAVIGATOR_CASE_FILTER);

    if (!lodash.isEmpty(previousFilter)) {
      saveFilterParams(previousFilter);
    }
  }, [saveFilterParams]);

  // 切换filter时重置查询条件
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
    } else {
      onCategoryChange('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  useEffect(() => {
    updateReasons();

    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(updateReasons, INTERVAL_TIME);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [updateReasons]);

  useEffect(() => {
    // 这是因为assign task可能会改变筛选数据（assign给别人后这个task不会再在当前列表中，数字统计里也会去掉它）
    // 所以assign task之后需要重新请求。但这里并没有直接监听assign，而是监听侧边栏收起
    // 这个延迟从逻辑上来说是不需要的，当时应该是保险起见加上的，这里为了避免扩大影响没有去掉
    // 但延迟导致了另一个问题，如果在延迟期间内参数改变了（user切换了tab或者改了筛选条件），延迟回调内的参数不会改变
    // 在延迟到期时会用旧的参数重新call一遍，拿到的也是改变前的数据，会导致filter数据跳回之前的版本
    // 因此之前的开发在dependency里面加了updateReasons，这样改变参数时，也会发起自己的延迟回调，自己的延迟回调会再把数据改回新的版本
    // 但结果就是如果user改变条件时正好有一个延迟回调，那么user会看到数据先跳成错的（旧筛选条件），隔半秒后又跳回对的（新的）
    // 在保持延迟的情况下正确的做法应该是延迟期间内有任何后续请求/发起延迟时，都清一遍延迟回调
    if (!isSiderToggleOn) {
      clearTimeoutIfExist();
      timeout = setTimeout(() => {
        updateReasons();
      }, 3000);
    }
  }, [isSiderToggleOn]);

  useEffect(() => {
    updateList();
  }, [updateList]);

  useEffect(() => {
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reasonList]);

  // 内容溢出时的样式
  useEffect(() => {
    let resizeObserver: any;
    const element = document.body;

    if (element) {
      resizeObserver = new ResizeObserver(updateCategoryFilterStyle);
      resizeObserver.observe(element);
    }
    return () => {
      if (element) {
        resizeObserver.unobserve(element);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSiderToggleOn]);

  const dropdownOverlay = (
    <Menu
      className={styles.dropdownOverlay}
      selectedKeys={[caseCategory]}
      onClick={({ key }) => onCategoryChange(key)}
    >
      {lodash.map(dropdownCategories, (item: string) => (
        <Menu.Item key={item}>
          <span>
            {formatMessageApi({
              Label_BPM_CaseCategory: item,
            })}
          </span>
        </Menu.Item>
      ))}
    </Menu>
  );

  if (isEmpty) {
    return null;
  }

  return (
    <div className={classnames(styles.wrapper, className)}>
      <Spin spinning={loading}>
        <div className={styles.content}>
          {caseCategoryList.length > 1 && (
            <div className={styles.categories}>
              <Dropdown
                overlay={dropdownOverlay}
                disabled={!dropdownCategories.length}
                placement="bottomLeft"
                getPopupContainer={(triggerNode) => triggerNode.parentNode}
              >
                <Icon
                  className={classnames(styles.funnel, !!dropdownCategories.length && styles.dot)}
                  component={funnelIcon}
                />
              </Dropdown>
              {lodash.map(menuCategories, (item: string) => {
                const title = formatMessageApi({
                  Label_BPM_CaseCategory: item,
                });

                return (
                  <div
                    key={item}
                    className={classnames(styles.default, caseCategory === item && styles.selected)}
                    onClick={() => onCategoryChange(item)}
                    title={title}
                  >
                    {title}
                  </div>
                );
              })}
            </div>
          )}
          <div className={styles.reasons}>
            {lodash.map(reasonList, (item: Reason) => {
              const {
                taskGroupCode: reasonCode,
                taskGroupName,
                caseCategoryCount = 0,
                totalCount = 0,
              } = item;

              return (
                <div
                  key={reasonCode}
                  className={classnames(
                    styles.default,
                    taskGroupCode === reasonCode && styles.selected,
                    !!caseCategory && styles.filtered
                  )}
                  onClick={() => onReasonChange(reasonCode)}
                >
                  <div className={styles.reasonName}>
                    {taskGroupName || formatMessageApi({ Dropdown_COM_ReasonofTask: reasonCode })}
                  </div>
                  <div className={classnames(styles.count, !!caseCategory && styles.current)}>
                    {!!caseCategory && (
                      <>
                        <span className={styles.number}>{caseCategoryCount}</span>
                        <span className={styles.slash}>/</span>
                      </>
                    )}
                    <span className={styles.total}>{totalCount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Spin>
    </div>
  );
};
