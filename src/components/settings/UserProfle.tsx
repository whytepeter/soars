import Avatar from "@/components/base/Avatar";
import Pencil from "@/assets/icon/edit.svg";

import { Button } from "@/components/base/Button";
import { cn, initials } from "@/lib/utils";
import { Input } from "../base/Input";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { editUser } from "@/store/slices/userSlice";

interface Props {
  edit?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function UserProfile({
  edit = false,
  className,
  onClick,
}: Props) {
  const dispatch = useAppDispatch();
  const userDetails = useAppSelector((state) => state.user.userDetails);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const pfp = reader.result as string;
        dispatch(editUser({ pfp }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div onClick={onClick} className="w-fit relative ">
        <Avatar className={cn("w-20 h-20  ", className)}>
          {userDetails?.pfp ? (
            <img
              src={userDetails?.pfp}
              className="w-full h-full object-cover"
              alt={userDetails?.full_name}
            />
          ) : (
            <span className="font-semibold text-lg">
              {initials(userDetails?.full_name)}
            </span>
          )}
        </Avatar>
        {edit && (
          <div className="absolute -right-2 bottom-0">
            <Button
              onClick={() => document.getElementById("avatar-input")?.click()}
              size="icon"
              className="rounded-full w-8 h-8"
            >
              <img src={Pencil} />
            </Button>
          </div>
        )}
      </div>

      <Input
        id="avatar-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
    </>
  );
}
