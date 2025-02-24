import AppLogo from "../layout/AppLogo";
import Spinner from "./Spinner";

export default function loading() {
  return (
    <div className="absolute bg-white inset-0 flex items-center justify-center">
      <div className="flex items-center gap-4">
        <AppLogo />
        <Spinner size={25} />
      </div>
    </div>
  );
}
