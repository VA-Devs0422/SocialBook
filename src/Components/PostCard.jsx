import React, { useEffect } from "react";
import service from "../Appwrite/services";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../store/authSlice";

function PostCard() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.posts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await service.getPosts();
        console.log("Final data is:", data);

        const getFileUrl = await Promise.all(
          data.documents.map(async (doc) => {
            const imageLink = await service.getFilePreview(doc.image_id);
            console.log("typeof url is:", typeof imageLink);
            return { ...doc, imageLink };
          })
        );

        console.log("File url is:", getFileUrl);
        dispatch(setPosts(getFileUrl));
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col-reverse gap-6 p-4">
      {posts.map((data) => (
        <div
          key={data.$id}
          className="flex flex-col bg-white border border-gray-200  rounded-2xl shadow-md w-full"
        >
          <img
            className=" w-full h-96 object-cover rounded-t-2xl"
            src={String(data.imageLink)}
            alt={data.caption}
          />
          <div className="p-4">
            <h1 className="text-lg font-semibold text-gray-800">
              {data.caption}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostCard;
