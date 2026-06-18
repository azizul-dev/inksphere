import {
  LayoutSplitSideContentLeft,
  CirclePlus,
  Bookmark,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

export function DashboardSidebar() {
  const navItems = [
    { icon: House, label: "Dashboard" },
    { icon: Magnifier, label: "Purchased Books" },
    { icon: Bookmark, label: "Bookmarked Books" },
    { icon: CirclePlus, label: "Add a Book" },
    { icon: Person, label: "Profile" },
    
  ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <button
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </button>
      ))}
    </nav>
  );

  return (
    <>
    <aside className="hidden lg:flex lg:w-64 xl:w-72 shrink-0 border-r bg-white p-4">
        {navContent}
    </aside>
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <LayoutSplitSideContentLeft />
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>
                {navContent}
              </Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
