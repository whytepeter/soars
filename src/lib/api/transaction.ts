import {
  ActivityType,
  BalanceHistoryType,
  Transaction,
  UserDetails,
} from "@/types";
import { getRandomValue } from "../utils";
import { BENEFICIARY, TRANSACTIONS } from "../db";

// Mock API to get user transactions
export const getTransactions = async (): Promise<{
  success: boolean;
  data: Transaction[];
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (TRANSACTIONS) {
        resolve({
          success: true,
          data: TRANSACTIONS,
        });
      } else {
        reject({
          success: false,
          message: "No transactions found.",
        });
      }
    }, 1000);
  });
};

export const getBeneficiary = async (): Promise<{
  success: boolean;
  data: UserDetails[];
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (BENEFICIARY) {
        resolve({
          success: true,
          data: BENEFICIARY,
        });
      } else {
        reject({
          success: false,
          message: "No beneficiary found.",
        });
      }
    }, 1000);
  });
};

// Mock API for daily transaction data for the current week
export const getActivitiesChart = async (): Promise<{
  success: boolean;
  data: ActivityType[];
}> => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

  const data = daysOfWeek.map((day) => ({
    day,
    deposit: getRandomValue(50, 500), // Random deposit value
    withdrawal: getRandomValue(20, 300), // Random withdrawal value
  }));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, 1000);
  });
};

// Mock API for monthly balance history for the current year
export const getBalanceHistory = async (): Promise<{
  success: boolean;
  data: BalanceHistoryType[];
}> => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // const currentMonth = new Date().getMonth() + 1; // 0-based month
  const data = months.map((month, index) => ({
    month,
    balance: getRandomValue(1000, 10000) + index * 200, // Incrementally increasing balance
  }));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, 1000);
  });
};

// Mock API for expense statistics
export const getExpenseStats = async (): Promise<{
  success: boolean;
  data: { category: string; percentage: number }[];
}> => {
  const data = [
    { category: "Entertainment", percentage: 30 },
    { category: "Bill Expense", percentage: 15 },
    { category: "Investment", percentage: 20 },
    { category: "Other", percentage: 35 },
  ];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, 1000);
  });
};
