import Avatar from "@/components/base/Avatar";

import { cn, initials } from "@/lib/utils";
import { UserDetails } from "@/types";

type Props = {
  beneficiary: UserDetails;
  selected?: boolean;
  onClick?: () => void;
};

export default function Beneficiary({ beneficiary, selected, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col  rounded-xl items-center mx-auto gap-1"
    >
      <Avatar className="w-16 h-16">
        {beneficiary?.pfp ? (
          <img
            src={beneficiary?.pfp}
            className="w-full h-full object-cover"
            alt={beneficiary?.full_name}
          />
        ) : (
          <span className="font-semibold text-lg">
            {initials(beneficiary?.full_name)}
          </span>
        )}
      </Avatar>

      <div
        className={cn(
          "flex flex-col items-center w-fit",
          selected ? "font-semibold" : "font-light md:font-normal"
        )}
      >
        <h4 className="text-dark text-sm md:text-base whitespace-nowrap ">
          {beneficiary?.full_name}
        </h4>
        <span className="text-dark-200 text-xs sm:text-sm">
          {beneficiary?.jobTitle}
        </span>
      </div>
    </div>
  );
}
