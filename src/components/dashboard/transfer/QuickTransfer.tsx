import Card from "@/components/base/Card";
import Heading from "@/components/typography/Heading";
import { cn } from "@/lib/utils";
import { Input } from "@/components/base/Input";
import { Button } from "@/components/base/Button";

import SendIcon from "@/assets/icon/send.svg";

import ListBeneficiary from "./ListBeneficiary";
import { useState } from "react";
import { UserDetails } from "@/types";
import toast from "react-hot-toast";

interface Props {
  className?: string;
}

export default function QuickTransfer({ className }: Props) {
  const [selected, setSelected] = useState<UserDetails | null>(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!amount || +amount <= 0) {
      toast.error("Amount is required");
      return;
    }

    if (!selected) {
      toast.error("Please select a recipient");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      toast.success("Transfer was successful");
      setLoading(false);
      setAmount("");
      setSelected(null);
    }, 3000);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Heading>Quick Transfer</Heading>
      <Card className="space-y-8 !py-8">
        <ListBeneficiary selected={selected} setSelected={setSelected} />

        <div className="text-dark-200 flex items-center gap-4 text-sm ">
          <span className="font-light whitespace-nowrap">Write Amount</span>
          <div className="h-[48px] relative flex-1 ">
            <Input
              disabled={loading}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              currency
              inputMode="numeric"
              name="amount"
              className="h-[48px] bg-background rounded-full md:pr-24"
            />

            <Button
              onClick={handleSend}
              loading={loading}
              className="absolute top-1/2 -translate-y-1/2 right-0 rounded-full"
            >
              Send
              <img className="w-5" src={SendIcon} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
