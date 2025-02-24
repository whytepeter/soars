import React from "react";
import { TooltipProvider } from "../ui/tooltip";
import { persistor, store } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children?: React.ReactNode;
}
export default function AppProvider({ children }: Props) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <TooltipProvider>{children}</TooltipProvider>;
        </PersistGate>
      </Provider>
    </>
  );
}
