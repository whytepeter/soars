import { cn, formatCurrency, maskCreditCardNumber } from "@/lib/utils";

import CardMarkDark from "@/assets/icon/card-mark-dark.svg";
import CardMarkLight from "@/assets/icon/card-mark-light.svg";

import CardChipDark from "@/assets/img/card-chip-dark.png";
import CardChipLight from "@/assets/img/card-chip-light.png";
import { CreditCards } from "@/types";
import Spinner from "../base/Spinner";

interface Props {
  loading?: boolean;
  card: CreditCards;
}

export default function CreditCard({ loading, card }: Props) {
  const { isActive, cardHolderName, expiryDate, cardNumber, balance } = card;

  const cardClass = cn(
    isActive
      ? "card-gradient text-white/80"
      : "text-dark-200 bg-white border border-outline",
    "w-full aspect-[6/4] h-[200px] md:h-[235px] rounded-[25px] flex flex-col justify-between gap-4 mx-auto md:mx-0"
  );

  const textColor = isActive ? "text-white" : "text-dark-300";

  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between px-6 pt-6 ">
        <div className="flex flex-col">
          <span className="text-xs">Balance</span>
          {loading ? (
            <Spinner color={isActive ? "#fff" : "#000"} />
          ) : (
            <h3 className={cn(textColor, "text-xl font-semibold")}>
              {formatCurrency(balance)}
            </h3>
          )}
        </div>
        <span className="flex-shrink-0">
          <img className="w-10" src={isActive ? CardChipLight : CardChipDark} />
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 px-6">
        <div className="flex flex-col">
          <span className="text-xs">CARD HOLDER</span>
          <span className={cn(textColor, "font-medium text-sm")}>
            {cardHolderName}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs">VALID THRU</span>
          <span className={cn(textColor, "font-medium text-sm")}>
            {expiryDate}
          </span>
        </div>
      </div>

      <div
        className={cn(
          isActive
            ? "bg-gradient-to-r from-white/10 to-white/30"
            : "border-t border-outline",
          "p-6 flex items-center gap-4 justify-between"
        )}
      >
        <h2 className="text-lg lg:text-xl xl:text-2xl truncate font-semibold">
          {maskCreditCardNumber(cardNumber)}
        </h2>
        <span className="flex-shrink-0">
          <img className="w-10" src={isActive ? CardMarkLight : CardMarkDark} />
        </span>
      </div>
    </div>
  );
}
