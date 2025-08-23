class Action {
  // 搜索遮住时，滚动到可见
  setTranslate = ({ swiper, SearchRef }: any) => {
    if (!swiper) return;
    const { clientWidth, offsetLeft } = SearchRef?.current?.offsetParent || {};
    const searchTranslate = swiper?.width - (clientWidth + offsetLeft);
    if (searchTranslate < swiper?.getTranslate()) {
      swiper?.setTranslate(searchTranslate);
      swiper?.update();
    }
    swiper?.scrollbar?.updateSize();
  };

  // 锁定时，计算报表宽度是否超过整屏，内滚动
  setWidth = async ({ swiper, SearchRef, setChartWidth, lock }: any) => {
    if (!swiper) return;
    const { clientWidth: searchWidth } = SearchRef?.current || {};
    const { clientWidth, offsetLeft } = SearchRef?.current?.offsetParent || {};
    const maxChartWidth = swiper?.width - searchWidth;
    if (!lock && clientWidth > maxChartWidth) {
      await setChartWidth(maxChartWidth);
      swiper?.setTranslate(-offsetLeft);
      swiper?.mousewheel?.disable();
      swiper?.scrollbar?.$el.css('width', '0');
      swiper?.update();
      swiper?.scrollbar?.updateSize();
    } else if (lock) {
      // 解锁
      setChartWidth(null);
      swiper?.mousewheel?.enable();
      swiper?.scrollbar?.$el.css('width', '98%');
      swiper?.update();
      swiper?.scrollbar?.updateSize();
    }
  };

  // 刷新报表时宽度变化，重新计算滚动位置
  setUpdateChartData = async ({ swiper, SearchRef, ChartRef, setChartWidth, lock }: any) => {
    if (!swiper) return;
    const { clientWidth: searchWidth } = SearchRef?.current || {};
    const { clientWidth: chartWidth } = ChartRef?.current || {};
    const { clientWidth, offsetLeft } = SearchRef?.current?.offsetParent || {};
    if (swiper?.getTranslate() < -(offsetLeft + clientWidth)) {
      swiper?.setTranslate(-offsetLeft);
    }
    // 宽度变窄，不足锁定， 解锁, 开启滚动条
    if (chartWidth < swiper?.width) {
      setChartWidth(null);
      swiper?.mousewheel?.enable();
      swiper?.scrollbar?.$el.css('width', '98%');
    }

    // 锁定时，新的报表数据超出一屏幕，设置内滚动，并禁用外层滚动条
    if (lock && clientWidth > swiper?.width) {
      const maxChartWidth = swiper?.width - searchWidth;
      await setChartWidth(maxChartWidth);
      swiper?.setTranslate(-offsetLeft);
      swiper?.mousewheel?.disable();
      swiper?.scrollbar?.$el.css('width', '0');
    }

    swiper?.scrollbar?.updateSize();
    swiper?.update();
  };
}

export const { setTranslate, setWidth, setUpdateChartData } = new Action();
