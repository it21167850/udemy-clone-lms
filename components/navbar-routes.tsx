"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";

export const NavbarRoutes = () => {
  const { user } = useUser();
  const pathname = usePathname();

  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/search";

  const userId = user?.id;

  return (
    <>
      {
        isSearchPage && (
          <div className="hidden md:block">
            <SearchInput />
          </div>
        )
      }
      <div className="flex items-center gap-x-2 ml-auto">
        {
          isTeacherPage || isCoursePage ? (
            <Link href="/">
              <Button size="sm" variant="ghost">
                <LogOut className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </Link>
          ) : isTeacher(userId) ? (
            <Link href="/teacher/courses">
              <Button size="sm" variant="ghost">
                Teacher mode
              </Button>
            </Link>
          ) : null
        }
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  )
}