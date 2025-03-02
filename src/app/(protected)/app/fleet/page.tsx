"use client";

import { aircraftSchema } from "@/schemas/aircraft";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

// TEMP
// import { aircrafts } from "@/schemas/aircraft";

const fetchAircrafts = async () => {
  const res = await fetch("/api/aircraft");
  return res.json();
};

function groupByOperator(aircrafts: aircraftSchema[]) {
  const grouped = aircrafts.reduce(
    (acc: Record<string, aircraftSchema[]>, aircraft) => {
      const operator = aircraft.operator;
      if (!acc[operator]) {
        acc[operator] = [];
      }
      acc[operator].push(aircraft);
      return acc;
    },
    {} as Record<string, aircraftSchema[]>
  );
  return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
}

function Item({ aircraft }: { aircraft: aircraftSchema }) {
  return (
    <Link href={`/app/fleet/${aircraft.id}`} className="block">
      <div className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-medium">
            TMP
          </div>
          <div className="text-left">
            <p className="text-base font-semibold">{aircraft.registration}</p>
            <div className="text-sm text-gray-500 space-x-2">
              <span>{`${aircraft.manufacturer_short} ${aircraft.model}`}</span>
              <span>·</span>
              <span>{aircraft.operator}</span>
            </div>
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </Link>
  );
}

export default function FleetPage() {
  const aircrafts = fetchAircrafts();
  console.log(aircrafts);
  const groupedOperators = groupByOperator(aircrafts);

  return (
    <div className="max-w-3xl mx-auto relative pb-6">
      <h1 className="text-2xl font-bold mb-6">Fleet</h1>

      <div className="space-y-6">
        {groupedOperators.map(([operator, aircraft]) => (
          <div key={operator} id={operator}>
            <div className="flex items-center mb-2">
              <h2 className="text-sm font-medium text-gray-500 mr-4">
                {operator}
              </h2>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            <Card>
              <CardContent className="p-0">
                {aircrafts.map((aircraft) => (
                  <Item key={aircraft.id} aircraft={aircraft} />
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
