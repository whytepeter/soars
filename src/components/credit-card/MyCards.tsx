import Heading from "@/components/typography/Heading";
import CreditCard from "./CreditCard";
import { cn } from "@/lib/utils";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import { Link } from "react-router-dom";
import { ROUTES } from "@/router/type";
import CardLoading from "./CardLoading";
import Show from "../base/Show";
import { useQuery } from "@/hooks/useQuery";
import { CreditCards } from "@/types";
import { getUserCards } from "@/lib/api/cards";
import { setUserState } from "@/store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { Button } from "../base/Button";

interface Props {
  className?: string;
}

export default function ListCreditCards({ className }: Props) {
  const dispatch = useAppDispatch();

  const cards = useAppSelector((state) => state.user.cards);

  const { loading } = useQuery<CreditCards[]>(getUserCards, [], {
    onSuccess: (data) => {
      dispatch(setUserState({ cards: data }));
    },
  });

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <Heading>My Cards</Heading>
        <Link to={ROUTES.CreditCard}>
          <Button
            className="text-dark-300 font-semibold text-base"
            variant="link"
          >
            See all
          </Button>
        </Link>
      </div>

      <Show>
        <Show.When isTrue={loading && !cards?.length}>
          <div className="w-full flex items-center gap-6 overflow-x-auto no-scrollbar">
            <CardLoading />
            <CardLoading />
          </div>
        </Show.When>
        <Show.Else>
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 1.5,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
          >
            {cards?.map((card, index) => (
              <SwiperSlide key={index}>
                <CreditCard loading={loading} card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Show.Else>
      </Show>
    </div>
  );
}
