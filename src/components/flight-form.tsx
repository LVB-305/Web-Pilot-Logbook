import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flightSchema } from "@/schemas/flight";
import { useRouter } from "next/navigation";
import { NewFlightLogbook } from "./flight-form/new-flight-log";
import { Button } from "./ui/button";
import { ArrowLeftIcon, ArrowRightIcon, X } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

// TEMP
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

interface FlightFormProps {
  initialFlight?: Partial<flightSchema>;
  onSubmit: (flight: flightSchema) => void;
  isEditing?: boolean;
  onDelete?: () => void;
}

export function FlightForm({
  initialFlight,
  onSubmit,
  isEditing = true,
}: FlightFormProps) {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState("general");
  const tabs = ["general", "timings", "crew", "landings", "remarks"];

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

  const handleNextTab = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex < tabs.length - 1) {
      setCurrentTab(tabs[currentIndex + 1]);
    }
  };

  const handlePreviousTab = () => {
    const currentIndex = tabs.indexOf(currentTab);
    if (currentIndex > 0) {
      setCurrentTab(tabs[currentIndex - 1]);
    }
  };

  return (
    <form>
      <div className="p-1">
        <Tabs
          value={currentTab}
          onValueChange={setCurrentTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="w-full">
                {tab.charAt(0).toLocaleUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>New Flight</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <DatePicker />
                    {errors.date && (
                      <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="flightNumber">Flight Number</Label>
                    <Input
                      id="flightNumber"
                      name="flightNumber"
                      value={flight.flightNumber || ""}
                      onChange={handleInputChange}
                      className={errors.flightNumber ? "border-red-500" : ""}
                      readOnly={!isEditing}
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
                  <div className="space-y-2">
                    <Label htmlFor="departure">Departure</Label>
                    <Input
                      id="departure"
                      name="departure"
                      value={flight.departure || ""}
                      onChange={handleInputChange}
                      className={errors.departure ? "border-red-500" : ""}
                      readOnly={!isEditing}
                      required
                    />
                    {errors.departure && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.departure}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <Input
                      id="destination"
                      name="destination"
                      value={flight.destination || ""}
                      onChange={handleInputChange}
                      className={errors.destination ? "border-red-500" : ""}
                      readOnly={!isEditing}
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
                  <div className="space-y-2">
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
                      readOnly={!isEditing}
                      required
                    />
                    {errors.aircraftRegistration && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.aircraftRegistration}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="aircraftType">Aircraft Type</Label>
                    {isEditing ? (
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
                    ) : (
                      <Input
                        id="aircraftType"
                        name="aircraftType"
                        value={flight.aircraftType || ""}
                        readOnly
                      />
                    )}
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
          <TabsContent value="timings">
            <Card>
              <CardHeader>
                <CardTitle>New Flight</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <NewFlightLogbook />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="crew">
            <Card className="pt-6">
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="function">Function</Label>
                  {isEditing ? (
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
                  ) : (
                    <Input
                      id="function"
                      name="function"
                      value={flight.function || ""}
                      readOnly
                    />
                  )}
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
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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
                      disabled={!isEditing}
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
                    readOnly={!isEditing}
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
                      readOnly={!isEditing}
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
                      readOnly={!isEditing}
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
                      readOnly={!isEditing}
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
                      readOnly={!isEditing}
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
                  {isEditing && (
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
                  )}
                  <div className="space-y-1">
                    {flight.approachTypes?.map((type) => (
                      <div
                        key={type}
                        className="flex items-center justify-between bg-secondary text-secondary-foreground px-3 py-1 rounded-md"
                      >
                        <span>{type}</span>
                        {isEditing && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApproachTypeChange(type)}
                            className="h-auto p-1"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
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
                    className={`h-24 ${errors.remarks ? "border-red-500" : ""}`}
                    readOnly={!isEditing}
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
                    readOnly={!isEditing}
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
      <div className="flex justify-center mt-6">
        <Button
          type="button"
          onClick={handlePreviousTab}
          disabled={currentTab === tabs[0]}
          variant="outline"
          size="icon"
          className="mr-2"
        >
          <ArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          onClick={handleNextTab}
          variant="outline"
          size="icon"
          className="mr-2"
        >
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
}
