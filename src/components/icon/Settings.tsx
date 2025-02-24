import { IconProps } from "@/types";

export default function SettingsIcon({ color }: IconProps) {
  return (
    <>
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_13_2623)">
          <path
            d="M18.1588 8.03125H17.7342C17.5963 7.59961 17.4223 7.18031 17.2138 6.77746L17.5145 6.47676C18.2436 5.74844 18.2241 4.58125 17.5147 3.87266L16.6276 2.98555C15.9194 2.27645 14.752 2.2559 14.0235 2.98527L13.7225 3.28621C13.3197 3.07777 12.9004 2.90371 12.4688 2.76578V2.34113C12.4688 1.32594 11.6428 0.5 10.6276 0.5H9.37238C8.35719 0.5 7.53125 1.32594 7.53125 2.34113V2.76578C7.09965 2.90367 6.68031 3.07773 6.27746 3.28621L5.9768 2.98555C5.24973 2.25762 4.08234 2.27469 3.37273 2.98531L2.48551 3.87246C1.77645 4.58074 1.75594 5.74801 2.48527 6.47656L2.78621 6.7775C2.57773 7.18035 2.40371 7.59961 2.26578 8.03129H1.84117C0.825977 8.03125 0 8.85719 0 9.87238V11.1276C0 12.1428 0.825977 12.9688 1.84117 12.9688H2.26578C2.40371 13.4004 2.57773 13.8197 2.78621 14.2225L2.48551 14.5232C1.75641 15.2516 1.77594 16.4188 2.48527 17.1273L3.37242 18.0145C4.08059 18.7236 5.24801 18.7441 5.97652 18.0147L6.27746 17.7138C6.68031 17.9222 7.09965 18.0963 7.53125 18.2342V18.6589C7.53125 19.6741 8.35723 20.5 9.37242 20.5H10.6276C11.6428 20.5 12.4688 19.6741 12.4688 18.6589V18.2342C12.9004 18.0963 13.3197 17.9223 13.7226 17.7138L14.0232 18.0145C14.7503 18.7424 15.9177 18.7253 16.6273 18.0147L17.5145 17.1275C18.2236 16.4192 18.2441 15.252 17.5148 14.5234L17.2138 14.2225C17.4223 13.8196 17.5963 13.4004 17.7343 12.9687H18.1589C19.1741 12.9687 20 12.1427 20 11.1275V9.8723C20 8.85719 19.174 8.03125 18.1588 8.03125V8.03125ZM10 14.8516C7.60051 14.8516 5.64844 12.8995 5.64844 10.5C5.64844 8.10055 7.60051 6.14844 10 6.14844C12.3995 6.14844 14.3516 8.10055 14.3516 10.5C14.3516 12.8995 12.3995 14.8516 10 14.8516Z"
            fill={color}
          />
        </g>
        <defs>
          <clipPath id="clip0_13_2623">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(0 0.5)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
}
