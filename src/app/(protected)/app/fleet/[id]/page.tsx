"use client";

import { aircrafts } from "@/schemas/aircraft";
import { useParams, useRouter } from "next/navigation";
import { aircraftSchema } from "@/schemas/aircraft";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Plus,
  Trash2,
  PenSquare,
  Check,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

function flightFilter({
  aircraft,
}: {
  aircraft: aircraftSchema["registration"];
}) {
  return (
    <Link href={`/app/flights/filter...`} className="block">
      <div className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-4">
          <div className="text-left">
            <p className="text-base font-semibold">Flights</p>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </Link>
  );
}

export default function AircraftPage() {
  const params = useParams();
  const router = useRouter();
  const [aircraft, setAircraft] = useState(
    aircrafts.find((c) => c.id.toString() === params.id)
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editedAircraft, setEditedAircraft] = useState(aircraft);

  if (!aircraft) {
    return <div>Aircraft not found</div>;
  }

  const handleDelete = () => {
    // In a real application, you would call an API to delete the aircraft
    console.log(`Deleting aircraft: ${aircraft.id}`);
    router.push("/app/fleet");
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedAircraft({ ...aircraft });
  };

  const handleSave = () => {
    if (editedAircraft) {
      // In a real application, you would call an API to update the aircraft
      setAircraft(editedAircraft);
      setIsEditing(false);
      console.log("Saving edited aircraft:", editedAircraft);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedAircraft) {
      setEditedAircraft({ ...editedAircraft, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="max-w-3xl mx-auto pb-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/app/fleet")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Fleet
        </Button>
        <Button variant="ghost" onClick={isEditing ? handleSave : handleEdit}>
          {isEditing ? (
            <Check className="h-5 w-5" />
          ) : (
            <PenSquare className="h-5 w-5" />
          )}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            {/* {aircraft.profilePicture ? (
              <Image
                src={contact.profilePicture}
                alt={`${contact.firstName} ${contact.lastName}`}
                width={80}
                height={80}
                className="rounded-full"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <Plus className="h-8 w-8 text-gray-500" />
              </div>
            )} */}
            <CardTitle>{aircraft.registration}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="registration">Registration</Label>
                  <input
                    id="registration"
                    name="registration"
                    value={editedAircraft?.registration}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {/* <div>
                  <Label htmlFor="userCode">User Code</Label>
                  <input
                    id="userCode"
                    name="userCode"
                    value={editedAircraft?.userCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div> */}
                <div>
                  <Label htmlFor="operator">Operator</Label>
                  <input
                    id="operator"
                    name="operator"
                    value={editedAircraft?.operator}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="delivery">Delivery Date</Label>
                {/* <input
                  id="delivery"
                  name="delivery"
                  value={editedAircraft?.delivery}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                /> */}
                <DatePicker />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Operator
                  </Label>
                  <p>{aircraft.operator}</p>
                </div>
                <div></div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Manufacturer
                  </Label>
                  <p>{aircraft.manufacturer}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Model
                  </Label>
                  <p>{`${aircraft.model} (${aircraft.icao_model})`}</p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Serial Number
                  </Label>
                  <p>{aircraft.serial}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Delivery
                  </Label>
                  <p>{aircraft.delivery.toISOString()}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Hexcode
                  </Label>
                  <p>{aircraft.hexcode}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">
                    Status
                  </Label>
                  <p>{aircraft.status}</p>
                </div>
              </div>
              <Separator />
              <div>
                <flightFilter />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Button
        variant="ghost"
        className="w-full mt-6 text-red-500 hover:text-red-700 hover:bg-red-50"
        onClick={handleDelete}
      >
        <Trash2 className="mr-2 h-4 w-4" /> Delete Aircraft
      </Button>
    </div>
  );
}
