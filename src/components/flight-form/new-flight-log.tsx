"use client";

import { useState } from "react";
import { TimeInputSection } from "@/components/flight-form/time-input-section";
import { HobbsInputSection } from "@/components/flight-form/hobbs-input-section";
import { calculateTimeDifference, calculateHobbsDifference } from "@/lib/calc";
import type { FlightData } from "@/types/flight";

interface NewFlightLogbookProps {
  callSign?: string;
  className?: string;
}

export function NewFlightLogbook({ className }: NewFlightLogbookProps) {
  const [flightData, setFlightData] = useState<FlightData>({
    block: {
      offBlock: { time: "" },
      onBlock: { time: "" },
    },
    flight: {
      takeoff: { time: "" },
      landing: { time: "" },
    },
    hobbs: {
      start: "",
      end: "",
      duration: "00:00",
    },
  });

  const calculateDurations = (data: FlightData): FlightData => {
    const newData = { ...data };

    // Calculate block time if both times are filled
    if (data.block.offBlock.time && data.block.onBlock.time) {
      newData.block.offBlock.duration = calculateTimeDifference(
        data.block.offBlock.time,
        data.block.onBlock.time
      );
    } else {
      newData.block.offBlock.duration = "00:00";
    }

    // Calculate flight time if both times are filled
    if (data.flight.takeoff.time && data.flight.landing.time) {
      newData.flight.takeoff.duration = calculateTimeDifference(
        data.flight.takeoff.time,
        data.flight.landing.time
      );
    } else {
      newData.flight.takeoff.duration = "00:00";
    }

    // Calculate hobbs time if both values are filled
    if (data.hobbs.start && data.hobbs.end) {
      newData.hobbs.duration = calculateHobbsDifference(
        Number(data.hobbs.start),
        Number(data.hobbs.end)
      );
    } else {
      newData.hobbs.duration = "0.0";
    }

    return newData;
  };

  //   const handleSave = () => {
  //     const updatedData = calculateDurations(flightData);
  //     setFlightData(updatedData);
  //     console.log("Saving flight data:", updatedData);
  //   };

  return (
    <div className="relative">
      <div className={className}>
        <div className="grid grid-cols-3 gap-2">
          <TimeInputSection
            title="OFF BLOCK"
            subtitle="ON BLOCK"
            firstTime={flightData.block.offBlock.time}
            secondTime={flightData.block.onBlock.time}
            duration={flightData.block.offBlock.duration}
            className="border-none"
            headerClassName="bg-[#f0f5d7]"
            isEditing={true}
            onFirstTimeChange={(value) =>
              setFlightData({
                ...flightData,
                block: {
                  ...flightData.block,
                  offBlock: { ...flightData.block.offBlock, time: value },
                },
              })
            }
            onSecondTimeChange={(value) =>
              setFlightData({
                ...flightData,
                block: {
                  ...flightData.block,
                  onBlock: { ...flightData.block.onBlock, time: value },
                },
              })
            }
          />
          <TimeInputSection
            title="TAKEOFF"
            subtitle="LANDING"
            firstTime={flightData.flight.takeoff.time}
            secondTime={flightData.flight.landing.time}
            duration={flightData.flight.takeoff.duration}
            className="border-none"
            headerClassName="bg-[#e6f2f5]"
            isEditing={true}
            onFirstTimeChange={(value) =>
              setFlightData({
                ...flightData,
                flight: {
                  ...flightData.flight,
                  takeoff: { ...flightData.flight.takeoff, time: value },
                },
              })
            }
            onSecondTimeChange={(value) =>
              setFlightData({
                ...flightData,
                flight: {
                  ...flightData.flight,
                  landing: { ...flightData.flight.landing, time: value },
                },
              })
            }
          />
          <HobbsInputSection
            firstValue={flightData.hobbs.start}
            secondValue={flightData.hobbs.end}
            duration={flightData.hobbs.duration}
            className="border-none"
            headerClassName="bg-[#faf5e6]"
            isEditing={true}
            onFirstValueChange={(value) =>
              setFlightData({
                ...flightData,
                hobbs: { ...flightData.hobbs, start: value },
              })
            }
            onSecondValueChange={(value) =>
              setFlightData({
                ...flightData,
                hobbs: { ...flightData.hobbs, end: value },
              })
            }
          />
        </div>
      </div>
    </div>
  );
}
