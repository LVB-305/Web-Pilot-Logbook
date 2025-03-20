import { Overlay } from "@/components/overlay";
import { SearchCommand } from "@/components/flight-form/search-command";

interface SelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  searchPlaceholder: string;
  items: Array<{ value: string; label: string }>;
  value?: string;
  onValueChange: (value: string) => void;
  emptyMessage?: string;
}

export function SelectionDialog({
  isOpen,
  onClose,
  title,
  searchPlaceholder,
  items,
  value,
  onValueChange,
  emptyMessage,
}: SelectionDialogProps) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose} title={title}>
      <div className="w-full h-full flex flex-row">
        <SearchCommand
          items={items}
          placeholder={searchPlaceholder}
          value={value}
          onValueChange={(newValue) => {
            onValueChange(newValue);
            onClose();
          }}
          emptyMessage={emptyMessage}
        />
      </div>
    </Overlay>
  );
}
