import { UserDetails } from "@/types";
import { USER } from "../db";

// Mock API to update user information
export const updateUser = async (
  userData: Partial<UserDetails>
): Promise<{ success: boolean; data: Partial<UserDetails> }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Mock successful update
      const isSuccess = true;

      if (isSuccess) {
        resolve({
          success: true,
          data: {
            ...userData, // Return updated user data
          },
        });
      } else {
        reject({
          success: false,
          message: "Failed to update user information.",
        });
      }
    }, 1000); // Simulate API delay
  });
};

export const getUser = async (): Promise<{
  success: boolean;
  data: UserDetails;
}> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (USER) {
        resolve({
          success: true,
          data: { ...USER },
        });
      } else {
        reject({
          success: false,
          message: "User not found.",
        });
      }
    }, 1000);
  });
};
