"use client";

import { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignatureDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: {
    signature: string;
    name: string;
    licenseNumber: string;
  }) => void;
  initialData?: {
    name: string;
    licenseNumber: string;
  };
}

export function SignatureDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
}: SignatureDialogProps) {
  const signaturePad = useRef<SignaturePad>(null);
  const [name, setName] = useState(initialData?.name || "");
  const [licenseNumber, setLicenseNumber] = useState(
    initialData?.licenseNumber || ""
  );

  const handleClear = () => {
    signaturePad.current?.clear();
  };

  const handleSave = () => {
    if (signaturePad.current) {
      const signatureData = signaturePad.current.toDataURL();
      onSave({
        signature: signatureData,
        name,
        licenseNumber,
      });
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Signature</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="license">License Number</Label>
            <Input
              id="license"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="Enter your license number"
            />
          </div>
          <div className="grid gap-2">
            <Label>Signature</Label>
            <div className="border rounded-md p-2 bg-white">
              {/* <SignaturePad
                ref={signaturePad}
                canvasProps={{
                  className: "w-full h-40",
                }}
              /> */}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClear} className="mr-auto">
            Clear
          </Button>
          <Button onClick={handleSave}>Save signature</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
