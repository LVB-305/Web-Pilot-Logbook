import { IOSButton } from "./flight-logs/overlays/ios-button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { ReactNode } from "react";

interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

export function Overlay({ isOpen, onClose, title, children }: OverlayProps) {
  const handleDone = () => {
    onClose();
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          className="w-full h-full max-w-full sm:min-h-[500px] md:max-w-md md:max-h-[60vh] p-0 gap-0 bg-[#f5f5f5] dark:bg-zinc-900 [&>button]:hidden flex flex-col"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <div className="w-[60px]" />
            <DialogTitle>
              <span className="text-lg font-medium">{title}</span>
            </DialogTitle>
            <IOSButton onClick={handleDone}>Done</IOSButton>
          </div>
          <div className="flex-1 overflow-auto">{children}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}
