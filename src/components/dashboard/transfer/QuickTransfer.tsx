import Card from "@/components/base/Card";
import Heading from "@/components/typography/Heading";
import { cn } from "@/lib/utils";
import { Input } from "@/components/base/Input";
import { Button } from "@/components/base/Button";

import SendIcon from "@/assets/icon/send.svg";

import ListBeneficiary from "./ListBeneficiary";

interface Props {
  className?: string;
}

export default function QuickTransfer({ className }: Props) {
  return (
    <div className={cn("space-y-4", className)}>
      <Heading>Quick Transfer</Heading>
      <Card className="space-y-8 !py-8">
        <ListBeneficiary />

        <div className="text-dark-200 flex items-center gap-4 text-sm ">
          <span className="font-light whitespace-nowrap">Write Amount</span>
          <div className="h-[48px] relative flex-1 ">
            <Input
              type="number"
              inputMode="numeric"
              name="amount"
              className="h-[48px] bg-background rounded-full md:pr-24"
            />

            <Button className="absolute top-1/2 -translate-y-1/2 right-0 hover:bg-dark rounded-full">
              Send
              <img className="w-5" src={SendIcon} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
