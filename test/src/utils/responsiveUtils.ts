import lodash from 'lodash';
import { useEffect, useMemo, useState } from 'react';

// 移动端事件兼容
export const resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
const BASE_FONT_SIZE = 14;

function getResponsiveRatio() {
  return getRootFontSize() / BASE_FONT_SIZE;
}

function getRootFontSize() {
  const { width, height } = screen;
  if (width <= 1280) {
    return BASE_FONT_SIZE * 0.8;
  }
  if (width > 1280 && width < 1920) {
    return (((width - 1280) / 640) * 0.2 + 0.8) * BASE_FONT_SIZE;
  }
  if (width > 1920) {
    return (height / 1080) * BASE_FONT_SIZE;
  }
  return BASE_FONT_SIZE;
}

function calcResponsivePx(px: number, ratio: number) {
  return lodash.isNaN(px) ? 0 : px * ratio;
}

function useResponsivePx(px: number) {
  const [ratio, setRatio] = useState(getResponsiveRatio());

  const onResize = lodash.debounce(() => {
    setRatio(getResponsiveRatio());
  }, 150);

  useEffect(() => {
    window.addEventListener(resizeEvent, onResize);

    return () => {
      window.removeEventListener(resizeEvent, onResize);
    };
  }, []);

  return useMemo(() => calcResponsivePx(px, ratio), [px, ratio]);
}

function getResponsivePx(px: number, zoom?: number = 1) {
  const ratio = getResponsiveRatio();
  return calcResponsivePx(px, ratio) * (zoom || 1);
}

function getResponsivePxList(pxList: number[], zoom?: number = 1) {
  const ratio = getResponsiveRatio();
  return lodash.map(pxList, (px) => calcResponsivePx(px, ratio) * (zoom || 1));
}

function px2rem(
  px: number,
  options: { unit?: boolean; zoom?: number } = { unit: true, zoom: 1 }
): number | string {
  const { unit, zoom } = options;
  const rem = (px / BASE_FONT_SIZE) * (zoom || 1);
  if (lodash.isNaN(rem)) {
    return unit === false ? 0 : `0rem`;
  }
  return unit === false ? rem : `${rem}rem`;
}

export {
  px2rem,
  getResponsiveRatio,
  getRootFontSize,
  getResponsivePx,
  useResponsivePx,
  getResponsivePxList,
};
