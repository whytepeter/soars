import Heading from "@/components/typography/Heading";
import Card from "@/components/base/Card";
import { cn } from "@/lib/utils";
import { getBalanceHistory } from "@/lib/api/transaction";
import { useQuery } from "@/hooks/useQuery";
import { BalanceHistoryType } from "@/types";

import Show from "@/components/base/Show";
import { useMemo } from "react";

import BalanceLoader from "./BalanceLoader";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

interface Props {
  className?: string;
}

export default function BalanceHistory({ className }: Props) {
  const { data, loading } = useQuery<BalanceHistoryType[]>(
    getBalanceHistory,
    []
  );

  const chartOptions = useMemo(
    () => ({
      tooltip: {
        trigger: "axis",
        borderRadius: 10,
        textStyle: {
          color: "#000",
        },
      },
      legend: {
        show: false,
      },
      xAxis: {
        type: "category",
        data: data?.map((el) => el.month) || [],

        axisLabel: {
          color: "#718EBF",
        },
      },

      yAxis: {
        type: "value",
        axisLabel: {
          color: "#718EBF",
        },
      },

      grid: {
        left: "4%",
        right: "0%",
        bottom: "10%",
        top: "10%",
        containLabel: true,
      },
      series: [
        {
          name: "Balance History",
          type: "line",
          data: data?.map((el) => el.balance) || [],
          smooth: true,
          lineStyle: {
            width: 3,
          },

          itemStyle: {
            color: "#1814F3",
          },

          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: "rgba(45, 96, 255, 0.25)" },
              { offset: 1, color: "rgba(45, 96, 255, 0)" },
            ]),
          },

          symbol: "none",
        },
      ],
    }),
    [data]
  );

  return (
    <div className={cn("space-y-4", className)}>
      <Heading>Balance History</Heading>
      <Card className="!px-2 !pb-2">
        <Show>
          <Show.When isTrue={loading && !data?.length}>
            <BalanceLoader />
          </Show.When>
          <Show.When isTrue={!loading}>
            <ReactECharts option={chartOptions} className="h-[250px]" />
          </Show.When>
        </Show>
      </Card>
    </div>
  );
}
