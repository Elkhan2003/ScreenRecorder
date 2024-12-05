"use client";
import { FC } from "react";
import scss from "./Header.module.scss";
import Link from "next/link";

const Header: FC = () => {
	return (
		<header className={scss.Header}>
			<div className="container">
				<div className={scss.content}>
					<Link href="/">Home</Link>
					<Link href="/video">Video</Link>
				</div>
			</div>
		</header>
	);
};

export default Header;
