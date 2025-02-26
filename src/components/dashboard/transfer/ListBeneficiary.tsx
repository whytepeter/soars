import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Beneficiary from "./Beneficiary";
import Show from "@/components/base/Show";
import BeneficiaryLoading from "./BeneficiaryLoading";

import { UserDetails } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useQuery } from "@/hooks/useQuery";
import { getBeneficiary } from "@/lib/api/transaction";
import { setTransactionState } from "@/store/slices/transactionSlice";

interface Props {
  selected: UserDetails | null;
  setSelected: (value: UserDetails) => void;
}

export default function ListBeneficiary({ selected, setSelected }: Props) {
  const dispatch = useAppDispatch();

  const beneficiaries = useAppSelector(
    (state) => state.transaction.beneficiaries
  );

  const { loading } = useQuery<UserDetails[]>(getBeneficiary, [], {
    onSuccess: (data) => {
      dispatch(setTransactionState({ beneficiaries: data }));
    },
  });

  return (
    <div className="relative ">
      <Show>
        <Show.When isTrue={loading && !beneficiaries?.length}>
          <div className="flex items-center gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <BeneficiaryLoading key={index} />
            ))}
          </div>
        </Show.When>
        <Show.Else>
          <Carousel className="w-full  ">
            <CarouselContent className="pl-2  ">
              {beneficiaries?.map((benf) => (
                <CarouselItem
                  key={benf.id}
                  className="pl-2 basis-1/3 md:basis-1/4 lg:basis-1/3 "
                >
                  <Beneficiary
                    onClick={() => setSelected(benf)}
                    selected={selected?.id == benf.id}
                    beneficiary={benf}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="!absolute border-none shadow-md h-12 w-12 !top-1/2 !-translate-y-1/2 left-0 " />
            <CarouselNext className="!absolute border-none shadow-md h-12 w-12 !top-1/2 !-translate-y-1/2 right-0 " />
          </Carousel>
        </Show.Else>
      </Show>
    </div>
  );
}
