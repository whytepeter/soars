import Heading from "@/components/typography/Heading";
import Card from "@/components/base/Card";
import { cn } from "@/lib/utils";
import { useQuery } from "@/hooks/useQuery";
import { useMemo } from "react";
import { getActivitiesChart } from "@/lib/api/transaction";
import { ActivityType } from "@/types";
import Show from "@/components/base/Show";

import ReactECharts from "echarts-for-react";
import ActivityLoader from "./ActivityLoader";

interface Props {
  className?: string;
}

export default function Activity({ className }: Props) {
  const { data, loading } = useQuery<ActivityType[]>(getActivitiesChart, []);

  const chartOptions = useMemo(
    () => ({
      color: ["#4c8cf5", "#000000"],
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
      },
      legend: {
        data: ["Deposit", "Withdraw"],
        top: 10,
        right: 20,
        icon: "circle",
        itemWidth: 12,
        itemHeight: 12,

        textStyle: {
          color: "#718EBF",
        },
      },
      grid: {
        left: "4%",
        right: "5%",
        top: 50,
        bottom: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: data?.map((el) => el.day) || [],
        axisLabel: {
          color: "#718EBF",
        },
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: true,
        },
        axisLabel: {
          color: "#718EBF",
        },
      },
      series: [
        {
          name: "Deposit",
          type: "bar",
          data: data?.map((el) => el.deposit) || [],
          barWidth: 15,
          barGap: "50%",

          itemStyle: {
            color: "#396AFF",
            borderRadius: 10,
          },
        },
        {
          name: "Withdraw",
          type: "bar",
          data: data?.map((el) => el.withdrawal) || [],
          barWidth: 15,

          itemStyle: {
            color: "#232323",
            borderRadius: 10,
          },
        },
      ],
    }),
    [data]
  );

  return (
    <div className={cn("space-y-4", className)}>
      <Heading>Weekly Activity</Heading>
      <Card className="!px-2 !pb-2">
        <Show>
          <Show.When isTrue={loading && !data?.length}>
            <ActivityLoader />
          </Show.When>
          <Show.When isTrue={!!data?.length}>
            <ReactECharts option={chartOptions} className="h-[300px]" />
          </Show.When>
          <Show.Else>
            <p className="text-center text-dark-200 text-sm">
              No data available
            </p>
          </Show.Else>
        </Show>
      </Card>
    </div>
  );
}
