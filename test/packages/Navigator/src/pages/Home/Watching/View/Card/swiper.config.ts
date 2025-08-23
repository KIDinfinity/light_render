import { getResponsivePx } from '@/utils/responsiveUtils';
import { Mousewheel } from 'swiper';

const handleChange = (me: any) => {
  const { taskList } = me.props;
  const swiperList = taskList.list;
  const swiper = me.swiperRef?.current?.swiper;
  if (!swiper) return;
  const { activeIndex } = swiper;

  me.setState({
    activeIndex: activeIndex,
  });
  const record: any = swiperList[activeIndex] || {};

  const { caseNo = '' } = record || {};
  if (caseNo === me.caseNo) {
    return;
  }
  me.caseNo = caseNo;
};

const changeSlide = (me: any) => {
  setTimeout(() => {
    const swiper = me.swiperRef?.current?.swiper;
    if (!swiper) return;
    const { slides, activeIndex } = swiper;

    let scaleCount = 0;
    slides.forEach((silde: any, idx: number) => {
      const slideProgress = silde.progress; // 用于加速度
      //   // Z轴
      const zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
      if (activeIndex === idx) {
        silde.style.transform = `scale(1,1)`;
        silde.style.zIndex = 1000;
      } else if (idx > activeIndex) {
        scaleCount += 1;
        const scale = 1 - Math.abs(scaleCount) * 0.06;
        silde.style.transform = `scale(${scale})`;
        silde.style.zIndex = zIndex;
      }
    });
  }, 0);
};

export default (me: any) => ({
  spaceBetween: getResponsivePx(-130),
  // slidesOffsetBefore: 200, //200, // 向左偏移360，【TODO】循环时，有空缺    「BUG」设置后滚动条到最后会回滚
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true,
    snapOnRelease: true,
  },
  shouldSwiperUpdate: true, // Update swiper when component is updated
  modules: [Mousewheel],
  mousewheel: true,
  noSwiping: true,
  watchSlidesProgress: true, // 监控on事件

  on: {
    init() {
      changeSlide(me);
    },
    progress: () => {
      changeSlide(me);
    },
    // scoll to end or begin does not transition
    reachEnd: async () => {
      me.onMomentumBounce();
      setTimeout(() => {
        handleChange(me);
      }, 0);
    },
    reachBeginning: () => {
      setTimeout(() => {
        handleChange(me);
      }, 0);
    },
    transitionEnd: async () => {
      setTimeout(() => {
        // changeSlide(me)
        handleChange(me);
      }, 0);
    },
  },
});

