import { useMediaQuery } from "react-responsive";
import { ResponsiveProps } from "../models/common/BaseProps.Interface";

export const DesktopView = ({ children }: ResponsiveProps) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
export const TabletView = ({ children }: ResponsiveProps) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
export const MobileView = ({ children }: ResponsiveProps) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
