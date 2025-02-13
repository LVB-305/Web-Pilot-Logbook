"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { flightSchema } from "@/schemas/flight";
import { ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";

const aircraftTypes = [
  "A320",
  "B737",
  "B747",
  "B777",
  "B787",
  "CRJ",
  "DA40D",
  "E175",
  "E190",
];

const functionTypes = ["PIC", "Co-Pilot", "Dual", "Instructor"];

const approachTypes = ["ILS", "VOR", "NDB", "RNAV", "Visual", "Circling"];

export default function NewFlightPage() {
  const router = useRouter();
  const [flight, setFlight] = useState<Partial<flightSchema>>({
    approachTypes: [],
    isSolo: false,
    isSpic: false,
    isPicus: false,
    isSigned: false,
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof flightSchema, string>>
  >({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFlight({ ...flight, [name]: value });
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFlight({ ...flight, [name]: checked });
  };

  const handleApproachTypeChange = (type: string) => {
    const updatedApproachTypes = flight.approachTypes?.includes(type)
      ? flight.approachTypes.filter((t) => t !== type)
      : [...(flight.approachTypes || []), type];
    setFlight({ ...flight, approachTypes: updatedApproachTypes });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate a unique ID for the new flight
    // const newFlight = { ...flight, id: Date.now().toString() };
    console.log(flight);

    flightSchema.parse(flight);

    try {
      flightSchema.parse(flight);

      // If validation passes, you would typically send the flight data to your backend
      console.log("Submitting new flight:", flight);

      // const response = fetch("/api/submit", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newFlight),
      // });
      // For now, we'll just redirect back to the logbook
      router.push("/logbook");
    } catch (error) {
      console.log(error);
      if (error instanceof z.ZodError) {
        const newErrors: Partial<Record<keyof flightSchema, string>> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0] as keyof flightSchema] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-6">
      <div className="flex justify-between items-center mb-6">
        <Button variant="ghost" onClick={() => router.push("/logbook")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Logbook
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-1">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
              <TabsTrigger value="general" className="w-full">
                General
              </TabsTrigger>
              <TabsTrigger value="times" className="w-full">
                Times
              </TabsTrigger>
              <TabsTrigger value="crew" className="w-full">
                Crew
              </TabsTrigger>
              <TabsTrigger value="landings" className="w-full">
                Landings
              </TabsTrigger>
              <TabsTrigger value="remarks" className="w-full">
                Remarks
              </TabsTrigger>
            </TabsList>
            <TabsContent value="general">
              <Card className="pt-6">
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={flight.date || ""}
                        onChange={handleInputChange}
                        className={errors.date ? "border-red-500" : ""}
                        required
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.date}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="flightNumber">Flight Number</Label>
                      <Input
                        id="flightNumber"
                        name="flightNumber"
                        value={flight.flightNumber || ""}
                        onChange={handleInputChange}
                        className={errors.flightNumber ? "border-red-500" : ""}
                        required
                      />
                      {errors.flightNumber && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.flightNumber}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="departure">Departure</Label>
                      <Input
                        id="departure"
                        name="departure"
                        value={flight.departure || ""}
                        onChange={handleInputChange}
                        className={errors.departure ? "border-red-500" : ""}
                        required
                      />
                      {errors.departure && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.departure}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="destination">Destination</Label>
                      <Input
                        id="destination"
                        name="destination"
                        value={flight.destination || ""}
                        onChange={handleInputChange}
                        className={errors.destination ? "border-red-500" : ""}
                        required
                      />
                      {errors.destination && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.destination}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="aircraftRegistration">
                        Aircraft Registration
                      </Label>
                      <Input
                        id="aircraftRegistration"
                        name="aircraftRegistration"
                        value={flight.aircraftRegistration || ""}
                        onChange={handleInputChange}
                        className={
                          errors.aircraftRegistration ? "border-red-500" : ""
                        }
                        required
                      />
                      {errors.aircraftRegistration && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.aircraftRegistration}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="aircraftType">Aircraft Type</Label>
                      <Select
                        name="aircraftType"
                        value={flight.aircraftType}
                        onValueChange={(value) =>
                          handleSelectChange("aircraftType", value)
                        }
                      >
                        <SelectTrigger
                          className={
                            errors.aircraftType ? "border-red-500" : ""
                          }
                        >
                          <SelectValue placeholder="Select aircraft type" />
                        </SelectTrigger>
                        <SelectContent>
                          {aircraftTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.aircraftType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.aircraftType}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="times">
              <Card className="pt-6">
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <Label htmlFor="departureTime">Departure Time</Label>
                        <div className="flex items-center">
                          <Input
                            id="departureTime"
                            name="departureTime"
                            value={flight.departureTime || ""}
                            type="time"
                            onChange={handleInputChange}
                            className={
                              errors.departureTime ? "border-red-500" : ""
                            }
                          />
                          <span className="ml-2">UTC</span>
                        </div>
                        {errors.departureTime && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.departureTime}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <Label htmlFor="arrivalTime">Arrival Time</Label>
                        <div className="flex items-center">
                          <Input
                            id="arrivalTime"
                            name="arrivalTime"
                            value={flight.arrivalTime || ""}
                            type="time"
                            onChange={handleInputChange}
                            className={
                              errors.arrivalTime ? "border-red-500" : ""
                            }
                          />
                          <span className="ml-2">UTC</span>
                        </div>
                        {errors.arrivalTime && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.arrivalTime}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="blockTime">Block Time</Label>
                      <Input
                        id="blockTime"
                        name="blockTime"
                        value={flight.blockTime || ""}
                        type="time"
                        onChange={handleInputChange}
                        className={errors.blockTime ? "border-red-500" : ""}
                      />
                      {errors.blockTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.blockTime}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <Label htmlFor="timeTakeOff">Take-Off Time</Label>
                        <div className="flex items-center">
                          <Input
                            id="timeTakeOff"
                            name="timeTakeOff"
                            value={flight.timeTakeOff || ""}
                            type="time"
                            onChange={handleInputChange}
                            className={
                              errors.timeTakeOff ? "border-red-500" : ""
                            }
                          />
                          <span className="ml-2">UTC</span>
                        </div>
                        {errors.timeTakeOff && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.timeTakeOff}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-grow">
                        <Label htmlFor="timeLanding">Landing Time</Label>
                        <div className="flex items-center">
                          <Input
                            id="timeLanding"
                            name="timeLanding"
                            value={flight.timeLanding || ""}
                            type="time"
                            onChange={handleInputChange}
                            className={
                              errors.timeLanding ? "border-red-500" : ""
                            }
                          />
                          <span className="ml-2">UTC</span>
                        </div>
                        {errors.timeLanding && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.timeLanding}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="totalAirTime">Total Air Time</Label>
                      <Input
                        id="totalAirTime"
                        name="totalAirTime"
                        value={flight.totalAirTime || ""}
                        type="time"
                        onChange={handleInputChange}
                        className={errors.totalAirTime ? "border-red-500" : ""}
                      />
                      {errors.totalAirTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.totalAirTime}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="nightTime">Night Time</Label>
                      <Input
                        id="nightTime"
                        name="nightTime"
                        value={flight.nightTime || ""}
                        onChange={handleInputChange}
                        type="time"
                        className={errors.nightTime ? "border-red-500" : ""}
                      />
                      {errors.nightTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.nightTime}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="ifrTime">IFR Time</Label>
                      <Input
                        id="ifrTime"
                        name="ifrTime"
                        value={flight.ifrTime || ""}
                        type="time"
                        onChange={handleInputChange}
                        className={errors.ifrTime ? "border-red-500" : ""}
                      />
                      {errors.ifrTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.ifrTime}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="crew">
              <Card className="pt-6">
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="function">Function</Label>
                    <Select
                      name="function"
                      value={flight.function}
                      onValueChange={(value) =>
                        handleSelectChange("function", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.function ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select function" />
                      </SelectTrigger>
                      <SelectContent>
                        {functionTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.function && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.function}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isSolo"
                        checked={flight.isSolo}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("isSolo", checked as boolean)
                        }
                      />
                      <Label htmlFor="isSolo">Solo</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isSpic"
                        checked={flight.isSpic}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("isSpic", checked as boolean)
                        }
                      />
                      <Label htmlFor="isSpic">SPIC</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isPicus"
                        checked={flight.isPicus}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange("isPicus", checked as boolean)
                        }
                      />
                      <Label htmlFor="isPicus">PICUS</Label>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="picName">PIC Name</Label>
                    <Input
                      id="picName"
                      name="picName"
                      value={flight.picName || ""}
                      onChange={handleInputChange}
                      className={errors.picName ? "border-red-500" : ""}
                    />
                    {errors.picName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.picName}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="landings">
              <Card className="pt-6">
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="takeoffDay">Take-offs (Day)</Label>
                      <Input
                        id="takeoffDay"
                        name="takeoffDay"
                        type="number"
                        value={flight.takeoffDay || ""}
                        onChange={handleInputChange}
                        className={errors.takeoffDay ? "border-red-500" : ""}
                      />
                      {errors.takeoffDay && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.takeoffDay}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="takeoffNight">Take-offs (Night)</Label>
                      <Input
                        id="takeoffNight"
                        name="takeoffNight"
                        type="number"
                        value={flight.takeoffNight || ""}
                        onChange={handleInputChange}
                        className={errors.takeoffNight ? "border-red-500" : ""}
                      />
                      {errors.takeoffNight && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.takeoffNight}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="landingDay">Landings (Day)</Label>
                      <Input
                        id="landingDay"
                        name="landingDay"
                        type="number"
                        value={flight.landingDay || ""}
                        onChange={handleInputChange}
                        className={errors.landingDay ? "border-red-500" : ""}
                      />
                      {errors.landingDay && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.landingDay}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="landingNight">Landings (Night)</Label>
                      <Input
                        id="landingNight"
                        name="landingNight"
                        type="number"
                        value={flight.landingNight || ""}
                        onChange={handleInputChange}
                        className={errors.landingNight ? "border-red-500" : ""}
                      />
                      {errors.landingNight && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.landingNight}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Approach Types</Label>
                    <Select
                      onValueChange={(value) => handleApproachTypeChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select approach type" />
                      </SelectTrigger>
                      <SelectContent>
                        {approachTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="space-y-1">
                      {flight.approachTypes?.map((type) => (
                        <div
                          key={type}
                          className="flex items-center justify-between bg-secondary text-secondary-foreground px-3 py-1 rounded-md"
                        >
                          <span>{type}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApproachTypeChange(type)}
                            className="h-auto p-1"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    {errors.approachTypes && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.approachTypes}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="remarks">
              <Card className="pt-6">
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="remarks">Remarks</Label>
                    <Textarea
                      id="remarks"
                      name="remarks"
                      value={flight.remarks || ""}
                      onChange={handleInputChange}
                      className={`h-24 ${
                        errors.remarks ? "border-red-500" : ""
                      }`}
                    />
                    {errors.remarks && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.remarks}
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="endorsement">Endorsement</Label>
                    <Input
                      id="endorsement"
                      name="endorsement"
                      value={flight.endorsement || ""}
                      onChange={handleInputChange}
                      className={errors.endorsement ? "border-red-500" : ""}
                    />
                    {errors.endorsement && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.endorsement}
                      </p>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button type="submit">Submit Flight</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </form>
    </div>
  );
}
