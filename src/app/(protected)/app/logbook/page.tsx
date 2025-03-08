import Table from "@/components/flight-table/table";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function LogbookPage() {
  return (
    <div>
      <PageHeader
        title="Logbook"
        backHref="/"
        showBackButton={true}
        isTopLevelPage={true}
        actionButton={
          <Button variant="ghost" className="text-blue-600 font-medium" asChild>
            <Link href="/app/logbook/new">
              <Plus className="h-4 w-4" />
            </Link>
          </Button>
        }
      />
      <Table />
    </div>
  );
}
