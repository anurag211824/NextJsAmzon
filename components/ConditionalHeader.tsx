"use client";
import { usePathname } from "next/navigation";
import NavSearch from "./NavSearch";

export default function ConditionalHeader() {
  const pathname = usePathname();

  const isAdminRoute = pathname?.startsWith("/admin");
  const isAuthRoute =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
  const showHeader = !isAdminRoute && !isAuthRoute;

  if (!showHeader) {
    return null;
  }
  return <NavSearch />;
}
