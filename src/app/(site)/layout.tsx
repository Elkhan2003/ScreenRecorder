import { FC, ReactNode } from "react";
import LayoutSite from "@/components/layout/LayoutSite";

interface ILayoutProps {
	children: ReactNode;
}

const layout: FC<ILayoutProps> = ({ children }) => {
	return <LayoutSite>{children}</LayoutSite>;
};

export default layout;
