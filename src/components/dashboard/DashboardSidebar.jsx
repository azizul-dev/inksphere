"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutSplitSideContentLeft,
  CirclePlus,
  Bookmark,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";
import { useSession } from "@/lib/auth-client";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const writerNavLink = [
    {
      icon: House,
      label: "Dashboard",
      href: "/dashboard/writer",
    },
    {
      icon: House,
      label: "Book",
      href: "/dashboard/writer/manage",
    },
    {
      icon: Magnifier,
      label: "Purchased Books",
      href: "/dashboard/purchased-books",
    },
    {
      icon: Bookmark,
      label: "Bookmarked Books",
      href: "/dashboard/bookmark",
    },
    {
      icon: CirclePlus,
      label: "Add a Book",
      href: "/dashboard/writer/manage/new",
    },
    {
      icon: Person,
      label: "Profile",
      href: "/dashboard/profile",
    },
  ];

  const readerNavLink = [
    {
      icon: House,
      label: "Dashboard",
      href: "/dashboard/reader",
    },
    {
      icon: Magnifier,
      label: "Purchased Books",
      href: "/dashboard/reader/purchased-books",
    },
    {
      icon: Bookmark,
      label: "Bookmarked Books",
      href: "/dashboard/bookmark",
    },
    {
      icon: Person,
      label: "Profile",
      href: "/dashboard/reader/profile",
    },
  ];

  const navLinksMap = {
    writer: writerNavLink,
    reader: readerNavLink,
  };

  // While session is loading, or user isn't resolved yet, fall back to
  // an empty list instead of crashing on `user.role`.
  const navItems = isPending
    ? []
    : navLinksMap[user?.role || "reader"];

  const navContent = (
    <nav className="flex flex-col gap-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`
              group
              flex
              items-center
              gap-3
              rounded-2xl
              px-4
              py-3
              text-sm
              font-medium
              transition-all
              duration-300

              ${
                isActive
                  ? `
                    bg-gradient-to-r
                    from-amber-500
                    via-orange-500
                    to-red-500
                    text-white
                    shadow-lg
                    shadow-orange-200
                  `
                  : `
                    text-slate-700
                    hover:bg-slate-100
                    hover:translate-x-1
                  `
              }
            `}
          >
            <item.icon
              className={`
                size-5
                transition-all
                duration-300

                ${
                  isActive
                    ? "text-white"
                    : "text-slate-500 group-hover:text-orange-500"
                }
              `}
            />

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}

      <aside className="hidden lg:flex lg:w-72 shrink-0 border-r border-slate-200 bg-white p-5 sticky top-0 h-screen">
        <div className="w-full">
          {/* Logo */}

          <div className="mb-8">
            <h2 className="text-2xl font-black bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">
              BookVerse
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {user?.role === "writer" ? "Writer Dashboard" : "Reader Dashboard"}
            </p>
          </div>

          {navContent}
        </div>
      </aside>

      {/* Mobile Drawer Button */}

      <div className="lg:hidden py-1">
        <Drawer>
          <Button
            className="
            min-w-0
            rounded-xl
           
            shadow-lg
            border
            border-slate-200
            "
          >
            <LayoutSplitSideContentLeft />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog>
                <Drawer.CloseTrigger />

                <Drawer.Header>
                  <Drawer.Heading>
                    <span
                      className="
                      bg-gradient-to-r
                      from-amber-500
                      via-orange-500
                      to-red-500
                      bg-clip-text
                      text-transparent
                      font-bold
                      "
                    >
                      Navigation
                    </span>
                  </Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body>{navContent}</Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}