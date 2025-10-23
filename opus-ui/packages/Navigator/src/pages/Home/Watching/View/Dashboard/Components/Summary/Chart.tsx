import React, { useMemo } from 'react';
import { Icon } from 'antd';
import lodash from 'lodash';
import { useSelector } from 'dva'
import {

  Chart,
  Geom,
  Axis,
  Coord,
  Legend,
  Guide,
} from "bizcharts";
import DataSet from "@antv/data-set";

import configIcon from './configIcon';

import styles from './index.less'


const Tabs = ({ item }: any) => {

  const activeTheme = useSelector(({ theme }: any) => theme.activeTheme) || "";

  const colors = useMemo(() => {
    const config = {
      dark: ["#fff", "#FEE8A0", "#FE7A15"],
      default: ["#D8EBE5", "#6ECEB2", "#42AAC2"]
    }
    return config?.[activeTheme] || config?.default
  }, [activeTheme])

  const data = useMemo(() => {

    return lodash
      .chain(['pending', 'todo', 'completed'])
      .map((key) => ({
        item: key,
        count: item[key]
      }))
      .value()
  }, [])


  const { DataView } = DataSet;

  const dv = new DataView();
  dv.source(data).transform({
    type: "percent",
    field: "count",
    dimension: "item",
    as: "percent"
  });
  const cols = {
    percent: {
      formatter: val => {
        val = val * 100 + "%";
        return val;
      }
    }
  };


  return (
    <>
      {!lodash.isEmpty(activeTheme) && <Chart
        width={70}
        height={70}
        data={dv}
        scale={cols}
        padding={["1%", "1%", "1%", "1%"]}
        // forceFit
        className={styles.chart}
      >
        <Coord type={"theta"} radius={0.75} innerRadius={0.6} />
        <Axis name="percent" />
        <Legend
          position="bottom"
        />
        <Guide>
          <Icon style={{ fontSize: "24px", position: "absolute", top: "23px", "left": "23px" }} component={configIcon?.[item.region]} />
        </Guide>
        <Geom
          type="intervalStack"
          position="percent"
          color={["item", colors]}
         />
      </Chart>}
    </>

  );
}


export default Tabs
