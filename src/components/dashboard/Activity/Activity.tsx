import Heading from "@/components/typography/Heading";
import Card from "@/components/base/Card";
import { cn } from "@/lib/utils";
import { useQuery } from "@/hooks/useQuery";
import { getActivitiesChart } from "@/lib/api/transaction";
import { ActivityType } from "@/types";
import Show from "@/components/base/Show";

import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import ActivityLoader from "./ActivityLoader";
import { useIsMobile } from "@/hooks/use-mobile";

interface Props {
  className?: string;
}

export default function Activity({ className }: Props) {
  const isMobile = useIsMobile();
  const { data, loading } = useQuery<ActivityType[]>(getActivitiesChart, []);

  const chartOptions: ApexOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
        height: 300,
        toolbar: {
          show: false,
        },
      },
      colors: ["#232323", "#396AFF"],
      xaxis: {
        categories: data?.map((item) => item.day),
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
            return val?.toLocaleString();
          },
          style: {
            colors: "#718EBF",
            fontSize: "12px",
          },
        },
      },

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "40%",
          borderRadius: isMobile ? 4 : 9,
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        fontSize: "16px",
        fontWeight: 300,
        markers: {
          shape: "circle",
        },
        labels: {
          colors: "#718EBF",
        },
      },
      tooltip: {
        y: {
          formatter: (val) => `$${val}`,
        },
      },
    }),
    [data]
  );

  const chartSeries = useMemo(
    () => [
      {
        name: "Deposit",
        data: data?.map((item) => item.deposit) || [],
      },
      {
        name: "Withdrawal",
        data: data?.map((item) => item.withdrawal) || [],
      },
    ],
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
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height="300"
            />
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
