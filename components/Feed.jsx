"use client";
import { useEffect, useState } from "react";
import IdeaCard from "./IdeaCard";

const IdeaCardList = ({ data, handleTagClick }) => {
  return (
    <div className="idea_layout mt-5">
      {data.map((post) => (
        <IdeaCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const [allPosts, setAllPosts] = useState([]);

  const filterPosts = (searchText) => {
    const regex = new RegExp(searchText, "i"); // i-flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.idea)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    // Fast search refresh
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPosts(e.target.value);
        setSearchResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPosts(tagName);
    setSearchResults(searchResult);
  };

  const fetchPosts = async () => {
    const response = await fetch("api/idea");
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
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
      {searchText ? (
        <IdeaCardList data={searchResults} handleTagClick={handleTagClick} />
      ) : (
        <IdeaCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
