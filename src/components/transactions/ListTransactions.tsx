import { useMemo, useState } from "react";
import Table, { TableHeadersProps } from "../base/Table";
import Search from "../base/Search";
import Heading from "../typography/Heading";
import { Transaction } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useQuery } from "@/hooks/useQuery";
import { getTransactions } from "@/lib/api/transaction";
import { setTransactionState } from "@/store/slices/transactionSlice";

import Avatar from "../base/Avatar";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { TRANSACTION_METHODS } from "./TransactionCard";
import Pagination, { PaginationType } from "../base/Pagination";

export default function ListTransactions() {
  const dispatch = useAppDispatch();

  const transactions = useAppSelector(
    (state) => state.transaction.transactions
  );

  const { loading } = useQuery<Transaction[]>(getTransactions, [], {
    onSuccess: (data) => {
      dispatch(setTransactionState({ transactions: data }));
      setPagination((prev) => ({
        ...prev,
        totalPage: data?.length / pagination.pageSize,
      }));
    },
  });

  const [pagination, setPagination] = useState<PaginationType>({
    currentPage: 1,
    totalPage: 0,
    pageSize: 10,
  });

  const [searchInput, setSearchInput] = useState("");

  const visibleTransaction = useMemo(() => {
    const lowerCaseText = searchInput?.trim()?.toLowerCase();
    if (!lowerCaseText) return transactions;
    return transactions?.filter(
      (el) =>
        el?.description?.toLowerCase()?.includes(lowerCaseText) ||
        el?.type?.toLowerCase()?.includes(lowerCaseText) ||
        el?.method?.toLowerCase()?.includes(lowerCaseText)
    );
  }, [transactions, searchInput]);

  const tableHeader: TableHeadersProps[] = [
    {
      title: "Ref ID",
      field: "reference",
    },
    {
      title: "Transaction Date",
      field: "createdAt",
      body: (data: Transaction) => <span>{formatDate(data.createdAt)}</span>,
    },
    {
      title: "Description",
      field: "description",
    },
    {
      title: "Amount",
      field: "amount",
      body: (data: Transaction) => (
        <h3 className="font-semibold">{formatCurrency(data.amount)}</h3>
      ),
    },

    {
      title: "Type",
      field: "type",
      body: (data: Transaction) => (
        <div
          className={cn(data.type === "CREDIT" ? "text-success" : "text-error")}
        >
          {data.type}
        </div>
      ),
    },

    {
      title: "Method",
      field: "method",
      body: (data: Transaction) => {
        const methodIcon =
          TRANSACTION_METHODS[data.method] || TRANSACTION_METHODS.TRANSFER;
        return (
          <Avatar
            className="w-10 h-10 col-span-2"
            alt="icon"
            img={methodIcon}
          ></Avatar>
        );
      },
    },
  ];

  return (
    <div className="space-y-4">
      <Table
        dataKey="id"
        loading={loading}
        headerTemplate={
          <div className="bg-white py-2 px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Heading className="text-dark-300">All Transactions</Heading>
            <div className="w-full max-w-sm ">
              <Search
                placeholder="Search transaction"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="h-[44px] bg-white"
              />
            </div>
          </div>
        }
        headers={tableHeader}
        data={visibleTransaction}
      />

      <Pagination pagination={pagination} />
    </div>
  );
}
