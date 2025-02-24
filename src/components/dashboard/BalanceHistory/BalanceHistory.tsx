import Heading from "@/components/typography/Heading";
import Card from "@/components/base/Card";
import { cn } from "@/lib/utils";
import { getBalanceHistory } from "@/lib/api/transaction";
import { useQuery } from "@/hooks/useQuery";
import { BalanceHistoryType } from "@/types";

import Show from "@/components/base/Show";
import { useMemo } from "react";

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import BalanceLoader from "./BalanceLoader";

interface Props {
  className?: string;
}

export default function BalanceHistory({ className }: Props) {
  const { data, loading } = useQuery<BalanceHistoryType[]>(
    getBalanceHistory,
    []
  );

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "area",
        height: 250,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#396AFF"],
      xaxis: {
        categories: data?.map((el) => el.month) || [],
        labels: {
          style: {
            colors: "#718EBF",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          formatter(val) {
            return val?.toLocaleString() ?? "";
          },
          style: {
            colors: "#718EBF",
            fontSize: "12px",
          },
        },
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      dataLabels: {
        enabled: false,
      },

      tooltip: {
        y: {
          formatter: (val) => `$${val}`,
        },
      },

      legend: {
        show: false,
      },
    }),
    [data]
  );

  const chartSeries = useMemo(
    () => [
      {
        name: "Balance",
        data: data?.map((el) => el.balance) || [],
      },
    ],
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
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="area"
              height="250"
            />
          </Show.When>
        </Show>
      </Card>
    </div>
  );
}
