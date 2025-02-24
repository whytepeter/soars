import { CreditCards } from "@/types";
import { CARDS } from "../db";

export const getUserCards = async (): Promise<{
  success: boolean;
  data: CreditCards[];
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (CARDS) {
        resolve({
          success: true,
          data: CARDS,
        });
      } else {
        reject({
          success: false,
          message: "No cards found.",
        });
      }
    }, 1000);
  });
};
