import CreditCard from "./CreditCard";
import Show from "../base/Show";
import CardLoading from "./CardLoading";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setUserState } from "@/store/slices/userSlice";
import { getUserCards } from "@/lib/api/cards";
import { useQuery } from "@/hooks/useQuery";
import { CreditCards } from "@/types";

export default function ListAllCards() {
  const dispatch = useAppDispatch();

  const cards = useAppSelector((state) => state.user.cards);

  const { loading } = useQuery<CreditCards[]>(getUserCards, [], {
    onSuccess: (data) => {
      dispatch(setUserState({ cards: data }));
    },
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-6">
      <Show>
        <Show.When isTrue={loading && !cards?.length}>
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </Show.When>
        <Show.Else>
          {cards?.map((card, index) => (
            <CreditCard key={index} card={card} />
          ))}
        </Show.Else>
      </Show>
    </div>
  );
}
