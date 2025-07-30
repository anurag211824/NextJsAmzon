import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-accent animate-pulse rounded-md", className)}
      {...props}
    />
  );
}

function HeroCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow h-[500px]">
      {/* Title placeholder */}
      <div className="p-4 border-b text-center">
        <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
      </div>

      {/* Grid of image placeholders */}
      <div className="grid grid-cols-2 gap-4 p-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className="w-[200px] h-[200px] rounded-lg bg-gray-300"
          />
        ))}
      </div>
    </div>
  );
}

function HeroSkeletonGrid() {
  return (
    <section className="min-h-screen p-10 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, idx) => (
          <HeroCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
}

export { Skeleton, HeroSkeletonGrid };
