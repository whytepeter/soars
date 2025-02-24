import Heading from "../../typography/Heading";
import Card from "../../base/Card";
import { cn } from "@/lib/utils";
import { useQuery } from "@/hooks/useQuery";
import { ExpenseStatistic } from "@/types";
import { getExpenseStats } from "@/lib/api/transaction";

import ReactECharts from "echarts-for-react";
import ExpenseChartLoader from "./ExpenseChartLoader";
import { useMemo } from "react";
import Show from "@/components/base/Show";

interface Props {
  className?: string;
}

export default function ExpenseStats({ className = "" }: Props) {
  const { data, loading } = useQuery<ExpenseStatistic[]>(getExpenseStats, []);

  const chartOptions = useMemo(() => {
    const chartData =
      data?.map((item) => ({
        value: item.percentage,
        name: item.category,
        selected: true,
      })) || [];

    return {
      color: ["#343C6A", "#FC7900", "#396AFF", "#000000"],
      tooltip: {
        trigger: "item",
        formatter: ["{b}", "{d}%"].join("\n"),
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: "Expense",
          type: "pie",
          radius: [0, 130],
          selectedMode: "multiple",
          selectedOffset: 7,

          data: chartData,

          label: {
            show: true,
            position: "inside",

            formatter: ["{percent|{d}%}", "{name|{b}}"].join("\n"),
            rich: {
              percent: {
                fontSize: 16,
                fontWeight: "500",
              },
              name: {
                fontSize: 12,
                fontWeight: "400",
                padding: [2, 0, 0, 4],
              },
            },
            color: "#fff",
          },

          labelLine: {
            show: false,
          },

          emphasis: {
            itemStyle: {
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
  }, [data]);

  return (
    <div className={cn("space-y-4", className)}>
      <Heading>Expense Statistics</Heading>
      <Card>
        <Show>
          <Show.When isTrue={loading}>
            <ExpenseChartLoader />
          </Show.When>
          <Show.When isTrue={!!data?.length}>
            <div className="mx-auto w-fit">
              <ReactECharts option={chartOptions} className="w-[350px]" />
            </div>
          </Show.When>
          <Show.Else>
            <div className="sm:h-[300px] flex items-center justify-center">
              <p className="text-center text-dark-200 text-sm">
                No data available
              </p>
            </div>
          </Show.Else>
        </Show>
      </Card>
    </div>
  );
}
