import { Transaction } from "@/types";
import Avatar from "../base/Avatar";

import PaypalIcon from "@/assets/icon/paypal-m.svg";
import CardIcon from "@/assets/icon/card-m.svg";
import TransferIcon from "@/assets/icon/cash-m.svg";
import { cn, formatCurrency, formatDate } from "@/lib/utils";

export const TRANSACTION_METHODS = {
  PAYPAL: PaypalIcon,
  CARD: CardIcon,
  TRANSFER: TransferIcon,
} as const;

export default function TransactionCard({
  description,
  createdAt,
  method,
  type,
  amount,
}: Transaction) {
  const methodIcon =
    TRANSACTION_METHODS[method] || TRANSACTION_METHODS.TRANSFER;

  return (
    <div className="py-2 grid grid-cols-9 gap-2 ">
      <div className="col-span-7 flex items-center gap-4">
        <Avatar
          className="w-14 h-14 col-span-2"
          alt="icon"
          img={methodIcon}
        ></Avatar>

        <div className="flex-1 flex flex-col col-span-5 truncate">
          <span className="truncate text-dark ">{description} </span>
          <span className="text-dark-200 text-sm">
            {formatDate(createdAt, "DD MMMM YYYY")}
          </span>
        </div>
      </div>

      <div
        className={cn(
          type === "CREDIT" ? "text-success" : "text-error",
          "col-span-2 text-right"
        )}
      >
        <span>{type === "CREDIT" ? "+" : "-"}</span>
        {formatCurrency(amount)}
      </div>
    </div>
  );
}
