import TaskDragAssign from '@/components/DnDHelper/TaskDragAssign';
import { HotkeyHomeIds } from '@/components/Hotkey/common/enum/hotkeyIds';
import { Hotkey } from '@/components/Hotkey/home';
import { Icon, Spin } from 'antd';
import classnames from 'classnames';
import { connect } from 'dva';
import lodash from 'lodash';
import { judgeIsInEnvList } from 'navigator/utils';
import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import MCSubscribeCard from '../MCSubscribe/MCSubscribeCard';
import EmptyOrLoading from './EmptyOrLoading';
import styles from './index.less';
import Item from './Item/Item';
import config from './swiper.config';

interface Iprops {
  dispatch?: any;
  user?: any;
  filter?: any;
  taskList?: any;
  filterParams: any;
}
interface Istate {
  loading: boolean;
  activeIndex: number;
  isSmallScreen: boolean;
}

@connect(({ user, task, homeList, siderWorkSpace, navigatorHomeWatching }: any) => ({
  user,
  taskList: task.taskList,
  filter: homeList.filter,
  siderToggle: siderWorkSpace.siderToggle,
  filterParams: navigatorHomeWatching.filterParams || {},
}))
class List extends Component<Iprops, Istate> {
  swiperRef: any;

  timeMark: any;

  count: number;

  abortController = new AbortController();

  constructor(props: any) {
    super(props);
    this.swiperRef = React.createRef();
    this.count = 0;
  }

  state: Istate = {
    loading: false,
    activeIndex: 0,
    isSmallScreen: false,
  };

  componentDidMount = () => {
    this.updateList();
    this.setState({
      isSmallScreen: document.body.clientHeight <= 700,
    });
    window.addEventListener('resize', this.listener);
  };

  listener = (e) => {
    this.setState({
      isSmallScreen: e.target.innerHeight <= 700,
    });
  };

  componentDidUpdate = async (nextProps?: any) => {
    const { filter, filterParams } = this.props;
    const swiper = this.swiperRef?.current?.swiper;
    if (nextProps.filter !== filter || nextProps.filterParams !== filterParams) {
      await this.updateList(filter);
      if (swiper && swiper.activeIndex) {
        swiper.slideTo(0, 0);
      }
    }
  };

  componentWillUnmount = () => {
    this.abortController.abort();
    window.removeEventListener('resize', this.listener);
  };

  updateList = async (nextFilter?: Iprops) => {
    // 需要屏蔽的环境：TH Staging、Production/HK SIT、UAT、Production
    const isInTHExcludeEnv = judgeIsInEnvList([
      'omp_th_preProd',
      'omp_th_prod',
      'dcp_dev',
      'dcp_uat',
      'dcp_prod',
    ]);
    if (!isInTHExcludeEnv) {
      return;
    }

    const { dispatch, user, filter, filterParams } = this.props;
    await dispatch({
      type: 'task/list',
      payload: {
        pageSize: 10,
        params: {
          assignee: user.currentUser.userId,
          taskStatus: nextFilter || filter,
          ...lodash.pickBy(filterParams),
        },
      },
      signal: this.abortController.signal,
    });
  };

  onMomentumBounce = async () => {
    const { taskList, dispatch, user, filter, filterParams } = this.props;
    const { loading } = this.state;
    const { page = 1, pageSize = 10, total = 0 } = taskList.pagination || {};
    const hasMore = page * pageSize < total;
    if (!hasMore || loading) return;
    this.setState({
      loading: true,
    });
    await dispatch({
      type: 'task/addList',
      payload: {
        currentPage: page + 1,
        pageSize: 10,
        params: {
          assignee: user.currentUser.userId,
          taskStatus: filter,
          ...lodash.pickBy(filterParams),
        },
      },
      signal: this.abortController.signal,
    });

    this.setState({
      loading: false,
    });
  };

  onMouseEnter = ({ isNext }: any) => {
    const { taskList, dispatch }: any = this.props;
    const { list } = taskList;
    const swiper = this.swiperRef?.current?.swiper;

    if (!swiper) return;

    this.timeMark = setInterval(() => {
      const activeIndex = swiper?.activeIndex || 0;
      const nextIndex = isNext ? activeIndex + 1 : activeIndex - 1;

      if (swiper && !swiper?.destroyed) {
        swiper.slideTo(nextIndex);
        dispatch({
          type: 'task/saveCaskIndex',
          payload: {
            caskIndex: nextIndex,
          },
        });

        if (lodash.isArray(list) && list.length === nextIndex + 2) {
          this.onMomentumBounce();
        }
      } else {
        window.clearInterval(this.timeMark);
        this.timeMark = null;
      }
    }, 1000);
  };

  onMouseLeave = () => {
    window.clearInterval(this.timeMark);
    this.timeMark = null;
  };

  render() {
    const { taskList, siderToggle, swiperList }: any = this.props;
    const { loading, activeIndex, isSmallScreen } = this.state;
    const assigneeProps = { sourcetype: 2 };

    return (
      <div className={styles.swiper_container_home}>
        {!!swiperList && swiperList?.length > 0 ? (
          <div>
            <Hotkey
              id={HotkeyHomeIds.HomeWatchingSwiper}
              next={() => {
                if (loading) return;
                const swiper = this.swiperRef?.current?.swiper;
                if (swiper.activeIndex + 1 < this.props.taskList?.list.length) {
                  // 使用setTimeout解决在reducer中调用effect;hotkey问题，去掉会在最后一个发送请求时报错。
                  setTimeout(() => {
                    if (swiper && !swiper?.destroyed) {
                      swiper.slideNext.call(swiper);
                    }
                  }, 0);
                }
              }}
              prev={() => {
                const swiper = this.swiperRef?.current?.swiper;
                if (swiper.activeIndex > 0) {
                  swiper.slidePrev.call(swiper);
                }
              }}
            />
            {swiperList?.length > 6 && (
              <div
                className={classnames(styles.swiperButton, styles.swiperPre)}
                onMouseEnter={() => {
                  this.onMouseEnter({ isNext: false });
                }}
                onMouseLeave={() => {
                  this.onMouseLeave();
                }}
              />
            )}

            {/*
                // @ ts-ignore */}
            <Swiper
              {...config(this)}
              width={isSmallScreen ? 379 : 455}
              // force rerender
              key={isSmallScreen ? 'a' : 'b'}
              ref={this.swiperRef}
              containerClass={classnames(
                'swiper-container',
                styles.filter,
                swiperList?.length < 5 && styles.overList
              )}
            >
              {lodash.map(swiperList, (item: any, index: number) => {
                return (
                  // @ts-ignore
                  <div
                    className={styles.swiperItem}
                    style={{ zIndex: 10 * (index + 1) }}
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${item.taskId}-${index}`}
                  >
                    <TaskDragAssign
                      {...assigneeProps}
                      // @ts-ignore
                      record={item}
                      index={index}
                      className={styles.undrag}
                    >
                      <Item
                        swiperRef={this.swiperRef}
                        item={item}
                        index={index}
                        size="small"
                        list={swiperList}
                        onClickMounce={this.onMomentumBounce}
                        isSmallScreen={isSmallScreen}
                      />
                    </TaskDragAssign>
                  </div>
                );
              })}
            </Swiper>
            {swiperList?.length > 6 && (
              <div
                className={classnames(styles.swiperButton, styles.swiperNext)}
                onMouseEnter={() => {
                  this.onMouseEnter({ isNext: true });
                }}
                onMouseLeave={() => {
                  this.onMouseLeave();
                }}
              />
            )}
            {loading && <Spin className={styles.loading} size="large" />}
            {swiperList?.length > 5 && activeIndex > 0 && (
              <Icon
                type="left"
                className={styles.swiperPrevButton}
                onClick={() => {
                  this.count += 1;
                  setTimeout(() => {
                    const currentSwiper = this.swiperRef?.current?.swiper;
                    if (!currentSwiper && currentSwiper?.destroyed) return false;
                    if (this.count === 1 && currentSwiper?.activeIndex > 4) {
                      currentSwiper.slideTo(currentSwiper?.activeIndex - 5);
                    } else if (
                      this.count > 1 ||
                      (this.count === 1 && currentSwiper?.activeIndex <= 4)
                    ) {
                      currentSwiper.slideTo(0);
                    }
                    this.count = 0;
                  }, 200);
                }}
              />
            )}
            {swiperList?.length > 5 &&
              activeIndex + 1 < taskList.pagination.total &&
              activeIndex + 5 < taskList.pagination.total && (
                <Icon
                  type="right"
                  className={classnames({
                    [styles.swiperNextButtonOn]: siderToggle === 'on',
                    [styles.swiperNextButton]: siderToggle !== 'on',
                  })}
                  onClick={() => {
                    const currentSwiper = this.swiperRef?.current?.swiper;
                    if (!currentSwiper) return false;
                    if (loading) return false;
                    if (currentSwiper?.activeIndex + 5 > swiperList?.length) {
                      currentSwiper.slideTo(swiperList?.length);
                    } else {
                      currentSwiper.slideTo(currentSwiper?.activeIndex + 5);
                    }
                  }}
                />
              )}
          </div>
        ) : (
          <EmptyOrLoading loading={loading} />
        )}
        <MCSubscribeCard />
      </div>
    );
  }
}

export default List;
