import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-4">
      <Loader className="h-8 w-8 animate-spin" />
    </div>
  );
}
