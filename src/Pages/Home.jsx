import React from "react";
import PostCard from "../Components/PostCard";

function Home() {
  return (
    <>
      <div className="min-h-screen overflow-y-auto bg-gradient-to-tr from-pink-800 via-blue-200 to-pink-200 w-full">
        <PostCard />
      </div>
    </>
  );
}

export default Home;
