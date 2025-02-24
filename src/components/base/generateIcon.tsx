import { IconProps } from "@/types";

export const generateIcon = (Icon: React.ComponentType<IconProps>) => {
  return (color: string = "#B1B1B1"): JSX.Element => {
    return <Icon color={color} />;
  };
};
