import { ReactNode } from "react";

export type NavlinkType = {
  key?: string;
  href: string;
  label: string;
  icon: ReactNode;
  hovered?: boolean;
  setHovered?: (hovered: boolean) => void;
  className?: string;
}
