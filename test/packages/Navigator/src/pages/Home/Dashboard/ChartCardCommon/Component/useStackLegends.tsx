import { useState, useMemo, useCallback } from 'react';

export interface DataItem {
  x: string;
  y: number;
  type: string;
  [key: string]: any;
}

export type TotalsMap = Record<string, number>;

export interface LegendClickEvent {
  item: { value: string };
  checked: boolean;
}

interface stackedLegendProps {
  datas: any[];
  name: string;
  useHtml?: boolean;
  containerId: string;
  yField?: string;
  xField: string;
  pageSize?: number;
  linetotal?: number;
}

const useStackedLegendTotals = ({
  datas = [],
  name = '',
  useHtml = true,
  containerId,
  yField = 'value',
  xField,
  pageSize = 4,
  linetotal = 1,
}: stackedLegendProps) => {
  const [activeLegends, setActiveLegends] = useState<string[]>([]);
  const [page, setPage] = useState(0);
  const [linePage, setLinePage] = useState(0);

  const allLegends = useMemo(
    () => Array.from(new Set(datas?.map((item) => item[name]))),
    [datas, name]
  );

  const totalPages = Math.ceil(allLegends.length / (pageSize ?? 1));

  const pagedLegends = useMemo(
    () => allLegends.slice(page * pageSize, (page + 1) * pageSize),
    [allLegends, page, pageSize]
  );

  // 处理图例点击事件 - canvas做法
  const handleLegendClick = useCallback((ev: LegendClickEvent) => {
    const { item, checked } = ev;
    const value = item.value;

    setActiveLegends((prev) => (checked ? [...prev, value] : prev.filter((v) => v !== value)));
  }, []);

  // 处理图例点击事件 - useHtml做法
  const toggleLegend = (value: string) => {
    setActiveLegends((prev) => {
      if (prev.length === 1 && prev.includes(value)) return prev;
      return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
    });
  };

  // 事件委托 - useHtml 做法 , 挂载到报表初始化后
  const onBindLegendsEvent = useCallback(() => {
    if (!useHtml) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    let currentLegend: HTMLElement | any = null;

    const bindClick = () => {
      const legend = container.querySelector('.g2-legend');
      if (legend && legend !== currentLegend) {
        currentLegend = legend;

        const handleClick = (e: Event) => {
          const target = e.target as HTMLElement;
          const li = target.closest('.g2-legend-list-item') as HTMLElement;
          if (li) {
            const value = li.getAttribute('data-value');
            if (value) toggleLegend(value);
          }
          const prevBtn = target.closest(`.${containerId}-prev`) as HTMLElement;
          const nextBtn = target.closest(`.${containerId}-next`) as HTMLElement;
          if (prevBtn) {
            setPage((p) => Math.max(0, p - 1));
          }
          if (nextBtn) {
            setPage((p) => Math.min(totalPages - 1, p + 1));
          }

          const prevLineBtn = target.closest(`.${containerId}-line-prev`) as HTMLElement;
          const nextLineBtn = target.closest(`.${containerId}-line-next`) as HTMLElement;
          if (prevLineBtn) {
            setLinePage((p) => Math.max(0, p - 1));
          }
          if (nextLineBtn) {
            setLinePage((p) => Math.min(linetotal - 1, p + 1));
          }
        };

        legend.addEventListener('click', handleClick);

        // 清理旧的 legend 上的事件
        return () => {
          legend.removeEventListener('click', handleClick);
        };
      }
      return legend;
    };
    const observer = new MutationObserver(() => {
      bindClick();
    });

    observer.observe(container, { childList: true, subtree: true });

    // 初始绑定
    bindClick();

    return () => observer.disconnect();
  }, [containerId, useHtml, toggleLegend]);

  const initLegendsFromChart = useCallback(
    (chart: any) => {
      if (!name) return;
      if (useHtml) {
        // 如果是useHtml的legends， 需要从数据中获取
        const uniqueLegends = Array.from(new Set(datas?.map((item) => item[name])));
        setActiveLegends(uniqueLegends);
        onBindLegendsEvent();
      } else {
        const legends = chart.get('legendController').legends;
        const initial: string[] = [];
        // 如果是canvas的图例,
        if (legends) {
          Object.values(legends)?.forEach?.((group: any) => {
            group?.forEach?.((legend: any) => {
              legend?.items?.forEach?.((item: any) => {
                if (item.checked) initial.push(item.name);
              });
            });
          });
          setActiveLegends(initial);
        }
      }
    },
    [name, onBindLegendsEvent]
  );

  const { filteredData, totalGroup, allTotalGroup } = useMemo(() => {
    if (!name) return { filteredData: [], totalGroup: {} };
    const filtered = datas.filter((d) => activeLegends.includes(d[name]));
    // 分组并计算总和
    const totalGroup = filtered.reduce((acc: Record<string, number>, d: DataItem) => {
      const key = d[xField];
      if (!acc[key]) acc[key] = 0;
      acc[key] += d[yField] || 0;
      return acc;
    }, {});
    const allTotalGroup = datas.reduce((acc: Record<string, number>, d: DataItem) => {
      const key = d[xField];
      if (!acc[key]) acc[key] = 0;
      acc[key] += d[yField] || 0;
      return acc;
    }, {});
    return { filteredData: filtered, totalGroup, allTotalGroup };
  }, [datas, activeLegends]);

  return {
    activeLegends,
    totalGroup,
    pagedLegends, // 返回当前页 legend
    handleLegendClick,
    initLegendsFromChart,
    page,
    totalPages,
    linePage,
    setPage,
    allLegends,
    allTotalGroup,
  };
};

export default useStackedLegendTotals;
