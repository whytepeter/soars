export interface UserDetails {
  id: string;
  full_name: string;
  email: string;
  user_name: string;
  password: string;
  postal_code: string;
  dob: string;
  city: string;
  country: string;
  jobTitle: string;
  permanent_address: string;
  present_address: string;
  pfp: string | null;
}

export interface CreditCards {
  id: string;
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cardType: string;
  balance: number;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  reference: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  method: "CARD" | "PAYPAL" | "TRANSFER";
  type: "CREDIT" | "DEBIT";
  amount: number;
}

export interface ExpenseStatistic {
  category: string;
  percentage: number;
}

export interface ActivityType {
  day: string;
  deposit: number;
  withdrawal: number;
}

export interface BalanceHistoryType {
  month: string;
  balance: number;
}

export interface IconProps {
  color: string;
}
