import { Mousewheel } from 'swiper';

export default ({ loadCharts }: any) => ({
  slidesPerView: 'auto',
  spaceBetween: 16,
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true,
    snapOnRelease: false,
  },
  shouldSwiperUpdate: true, // Update swiper when component is updated
  modules: [Mousewheel],
  mousewheel: true,
  freeMode: true,
  noSwiping: true,
  // getSwiper: (swiperElement: any) => {
  //   if (!swiper) {
  //     setSwiper(swiperElement);
  //   }
  // },
  on: {
    reachEnd: () => {
      loadCharts && loadCharts();
    },
  },
});
