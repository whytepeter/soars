import Card from "@/components/base/Card";
import Heading from "@/components/typography/Heading";
import { cn } from "@/lib/utils";
import { TransactionLoading } from "./TransactionLoading";
import Show from "../base/Show";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setTransactionState } from "@/store/slices/transactionSlice";
import { Transaction } from "@/types";
import { getTransactions } from "@/lib/api/transaction";
import { useQuery } from "@/hooks/useQuery";
import TransactionCard from "./TransactionCard";
import { ROUTES } from "@/router/type";
import { Link } from "react-router-dom";
import { Button } from "../base/Button";

interface Props {
  className?: string;
}

export default function RecentTransaction({ className }: Props) {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(
    (state) => state.transaction.transactions
  );

  const { loading } = useQuery<Transaction[]>(getTransactions, [], {
    onSuccess: (data) => {
      dispatch(setTransactionState({ transactions: data }));
    },
  });

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Heading>Recent Transaction</Heading>
        <Link to={ROUTES.Transaction}>
          <Button
            className="text-dark-300 font-semibold text-base"
            variant="link"
          >
            See all
          </Button>
        </Link>
      </div>
      <Card className="overflow-auto min-h-[250px] max-h-[400px] md:max-h-[250px] no-scrollbar">
        <Show>
          <Show.When isTrue={loading && !transactions?.length}>
            <TransactionLoading />
            <TransactionLoading />
            <TransactionLoading />
          </Show.When>
          <Show.Else>
            {transactions?.map((tranx) => (
              <TransactionCard key={tranx.id} {...tranx} />
            ))}
          </Show.Else>
        </Show>
      </Card>
    </div>
  );
}
