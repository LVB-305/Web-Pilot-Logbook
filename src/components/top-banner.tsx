import { SidebarTrigger } from "./ui/sidebar";

export function TopBanner() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#18181B]">
      <div className="flex h-14 items-center px-4">
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={onToggleNav}
          className="mr-2 text-white"
        >
          {isNavCollapsed ? (
            <Menu className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle navigation</span>
        </Button> */}
        {/* <SidebarTrigger className="mr-2 text-white" /> */}
        <div className="flex flex-1 items-center justify-between">
          <p className="text-sm font-medium text-white">Digital Logbook</p>
          <div className="flex items-center space-x-4">
            {/* <div className="relative hidden sm:block">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search"
                className="pl-8 bg-[#27272A] border-0 text-white placeholder-gray-400 focus:ring-0 focus:border-0"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white sm:hidden"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Plus className="h-5 w-5" />
              <span className="sr-only">Add</span>
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <List className="h-5 w-5" />
              <span className="sr-only">List</span>
            </Button> */}
          </div>
        </div>
      </div>
    </header>
  );
}
