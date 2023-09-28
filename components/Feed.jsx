"use client";
import { useEffect, useState } from "react";
import IdeaCard from "./IdeaCard";

const IdeaCardList = ({ data, handleTagClick }) => {
  return (
    <div className="idea_layout mt-16">
      {data.map((post) => (
        <IdeaCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchIdeas = async () => {
      const response = await fetch("api/idea");
      const data = await response.json();
      console.log(data);
      setPosts(data);
    };
    fetchIdeas();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <IdeaCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
