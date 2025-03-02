"use client";

import { FlightForm } from "@/components/flight-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewFlightPage() {
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {};

  return (
    <div className="max-w-4xl mx-auto pb-2 pt-4">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/app/logbook")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Logbook
        </Button>
        <div className="flex items-center space-x-2">
          {/* <Button variant="ghost" onClick={isEditing ? () => setIsEditing(false) : handleEdit}>
            {isEditing ? <Check className="h-5 w-5" /> : <PenSquare className="h-5 w-5" />}
          </Button> */}
          <Button
            variant="ghost"
            size="icon"
            // onClick={handleDelete}
            aria-label="Clear form"
          >
            <Trash2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <FlightForm onSubmit={handleSubmit} />
    </div>
  );
}
