import { Children, isValidElement } from "react";

interface Props {
  children: React.ReactNode;
}

export default function Show(props: Props) {
  let when: React.ReactNode | null = null;
  let otherwise: React.ReactNode | null = null;

  Children.forEach(props.children, (child) => {
    // Check if the child is a valid React element before accessing its props
    if (isValidElement(child)) {
      if (child.props.isTrue === undefined) {
        otherwise = child;
      } else if (!when && child.props.isTrue === true) {
        when = child;
      }
    }
  });

  return when || otherwise;
}

Show.When = ({
  isTrue,
  children,
}: {
  isTrue: boolean;
  children: React.ReactNode;
}) => (isTrue ? children : null);

Show.Else = ({ children }: { children: React.ReactNode }) => children;
