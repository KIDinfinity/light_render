type DataItem = Record<string, number>;

/**
 * 将数值四舍五入到指定小数位
 */
function roundToPrecision(value: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
}

/**
 * 获取小数的精度（小数点后位数）
 */
function getPrecision(step: number): number {
  const stepStr = step.toString();
  if (stepStr.includes('e-')) {
    return parseInt(stepStr.split('e-')[1], 10);
  }
  const decimalPart = stepStr.split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

/**
 * 获取字段的最小值和最大值
 */
function getFieldRange(data: DataItem[], fields: string | string[]): { min: number; max: number } {
  const fieldList = Array.isArray(fields) ? fields : [fields];
  const values = data.flatMap((d) => fieldList.map((f) => d[f]));
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

/**
 * 根据 roughStep 计算一个“整洁”的步长
 */
function getNiceStep(min: number, max: number, desiredTickCount: number): number {
  const range = max - min;
  const roughStep = range / (desiredTickCount - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const multiples = [1, 1.25, 1.5, 2, 2.5, 5, 10];

  for (const m of multiples) {
    const step = m * magnitude;
    if (step >= roughStep) return step;
  }

  return 10 * magnitude;
}

export default function niceScaleTicks(
  data?: DataItem[],
  field?: string | string[],
  desiredTickCount: number = 5,
  options?: { min?: number; max?: number }
): number[] {
  const { min: optMin, max: optMax } = options || {};

  const hasExplicitRange = typeof optMin === 'number' && typeof optMax === 'number';

  const { min: dataMin, max: dataMax } = hasExplicitRange
    ? { min: optMin!, max: optMax! }
    : getFieldRange(data, field);

  const min = optMin ?? dataMin;
  const max = optMax ?? dataMax;
  const shouldUseCleanSteps = min > 0 && max < 5;
  const shouldStartFromZero = min >= 0;
  const start = shouldStartFromZero ? 0 : min;
  const end = max;
  const range = end - start;

  if (min === 0 && max === 0) {
    return new Array(desiredTickCount).fill('-').map((_, index) => index);
  }

  let step: number;
  if (shouldUseCleanSteps) {
    const cleanSteps = [
      0.01, 0.02, 0.05, 0.1, 0.12, 0.2, 0.25, 0.3, 0.4, 0.5, 1, 1.25, 1.5, 2, 2.5,
    ];
    step =
      cleanSteps.find((s) => s * (desiredTickCount - 1) >= range) ??
      cleanSteps[cleanSteps.length - 1];
  } else {
    step = getNiceStep(start, end, desiredTickCount);
  }

  const precision = getPrecision(step);

  const ticks: number[] = [];
  const maxTicks = 1000;
  let current = start;
  let count = 0;

  // 先生成至少 desiredTickCount 个刻度
  while (count < desiredTickCount && count < maxTicks) {
    ticks.push(roundToPrecision(current, precision));
    current = roundToPrecision(current + step, precision);
    count++;
  }

  // 如果还没覆盖 end，再继续补刻度
  while (current <= end + step * 0.5 && count < maxTicks) {
    ticks.push(roundToPrecision(current, precision));
    current = roundToPrecision(current + step, precision);
    count++;
  }

  return ticks;
}
