import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";

export default function FlightsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader
        title="Dev"
        backHref="/app/logbook"
        showBackButton={true}
        isTopLevelPage={true}
        actionButton={
          <Button variant="ghost" className="text-blue-600 font-medium" asChild>
            <Link href="/app/logbook/new">
              <Plus className="h-4 w-4 mr-2" />
            </Link>
          </Button>
        }
      />

      <div className="flex-1 p-4">
        <div className="text-center text-gray-500 py-8">
          <p>No flights recorded yet.</p>
          <p>Add your first flight by clicking the + button.</p>
        </div>
      </div>
    </div>
  );
}
