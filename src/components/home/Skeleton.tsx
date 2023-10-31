import { Card, Skeleton } from '@nextui-org/react';

const PhotoSkeleton = () => {
  // Create an array with 4 elements to map over
  const skeletonArray = new Array(5).fill(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {skeletonArray.map((_, index) => (
        <Card key={index} className="w-[200px] space-y-5 p-4" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-40 rounded-lg bg-default-300"></div>
          </Skeleton>
        </Card>
      ))}
    </div>
  );
};

export default PhotoSkeleton;
