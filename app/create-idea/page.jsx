"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateIdea = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    idea: "",
    tag: "",
  });

  const createIdea = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/idea/new", {
        method: "POST",
        body: JSON.stringify({
          idea: post.idea,
          userId: session?.user.id,
          tag: post.tag.replace(/^#+/, ""),
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Create Idea error: " + error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createIdea}
    />
  );
};

export default CreateIdea;
