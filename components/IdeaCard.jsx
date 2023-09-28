"use client";

import Image from "next/image";
import { useState } from "react";

const IdeaCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(post.idea);
    navigator.clipboard.writeText(post.idea);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="idea_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt="Profile Image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.idea
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt=""
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.idea}</p>
      <p
        className="blue_gradient font-inter text-sm cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
};

export default IdeaCard;
