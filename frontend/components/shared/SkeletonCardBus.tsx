import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCardBus() {
  return (
    <div className="wrapper flex flex-col space-y-3">
      <Skeleton className="h-[150px] max-w-[900px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[350px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
