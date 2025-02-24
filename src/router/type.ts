export enum ROUTES {
  Dashboard = "/",
  Transaction = "/transactions",
  Accounts = "/accounts",
  Investments = "/investments",
  CreditCard = "/credit-cards",
  Loans = "/loans",
  Services = "/services",
  Privileges = "/privileges",
  Settings = "/settings",
}

import DashboardIcon from "@/components/icon/Dashboard";
import AccountIcon from "@/components/icon/Account";
import TransactionIcon from "@/components/icon/Transaction";
import InvestmentIcon from "@/components/icon/Investment";
import LoanIcon from "@/components/icon/Loan";
import CreditCardIcon from "@/components/icon/CreditCard";
import ServiceIcon from "@/components/icon/Services";
import PivilegesIcon from "@/components/icon/Privileges";
import SettingsIcon from "@/components/icon/Settings";

export const ICON = {
  dashboard: DashboardIcon,
  transaction: TransactionIcon,
  account: AccountIcon,
  investment: InvestmentIcon,
  credtCard: CreditCardIcon,
  loans: LoanIcon,
  services: ServiceIcon,
  privileges: PivilegesIcon,
  settings: SettingsIcon,
};
