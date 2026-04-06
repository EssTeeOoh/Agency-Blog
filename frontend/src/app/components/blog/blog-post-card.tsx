import React from "react";
import Image from "next/image";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  Avatar,
} from "@material-tailwind/react";

interface BlogPostCardProps {
  img: string;
  tag: string;
  title: string;
  desc: string;
  author: { name: string; img: string };
  date: string;
}

export function BlogPostCard({
  img,
  tag,
  title,
  desc,
  author,
  date,
}: BlogPostCardProps) {
  return (
    <Card shadow={true} className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardHeader>
        <Image
          width={768}
          height={768}
          src={img}
          alt={title}
          className="h-full w-full scale-110 object-cover"
        />
      </CardHeader>
      <CardBody className="p-6">
        <Typography variant="small" color="blue" className="mb-2 !font-medium">
          {tag}
        </Typography>

        <Typography variant="h5" color="blue-gray" className="mb-2 normal-case">
          {title}
        </Typography>

        <Typography className="mb-6 font-normal !text-gray-500 line-clamp-3">
          {desc}
        </Typography>

        <div className="flex items-center gap-4">
          {/* Fixed avatar: force small size + cover */}
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={author.img || '/images/avatar1.jpg'}
              alt={author.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="mb-0.5 !font-medium"
            >
              {author.name}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="text-xs !text-gray-500 font-normal"
            >
              {date}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

export default BlogPostCard;