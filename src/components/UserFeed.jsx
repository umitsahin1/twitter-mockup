import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { GoUpload } from "react-icons/go";

const UserFeed = () => {
  const [tweets, setTweets] = useState([]);
  const [openComment, setOpenComment] = useState(false);
  const [comments, setComments] = useState([]);
  const userId = localStorage.getItem("userId");

  const getProfileImage = (username) => {
    const hash = username.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    return `https://picsum.photos/seed/${hash}/200`;
  };

  useEffect(() => {
    if (!userId) return;
    axios
      .get(
        `http://localhost:3000/twitter/api/v1/tweet/findByUserId?userId=${userId}`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const sortedTweets = response.data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setTweets(sortedTweets);
      })
      .catch((error) => console.error("Veri çekme hatası:", error));
  }, []);

  const handleComment = () => {
    setOpenComment(!openComment);
  };

  return (
    <div className="flex flex-col gap-4">
      {tweets.length === 0 ? (
        <p className="text-center text-gray-500">Henüz tweet paylaşılmadı.</p>
      ) : (
        tweets.map((item, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex">
              <img
                src={getProfileImage(item.username || userId)}
                className="w-10 h-10 rounded-full mx-3"
                alt={`${item.username}'s profile`}
              />
              <div className="flex flex-col">
                <div>
                  <p>{item.username}</p>
                  <p>{item.content}</p>
                </div>
              </div>
            </div>

            <div className="flex justify-around mt-4">
              <p
                onClick={handleComment}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FaRegComment />
                {item.commentCount || 0}
              </p>

              {openComment && (
                <div className="comments">
                  {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                      <p>{comment.content}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="flex items-center gap-2">
                <AiOutlineRetweet />
                {item.retweetCount || 0}
              </p>
              <p className="flex items-center gap-2">
                <FaHeart />
                {item.likeCount || 0}
              </p>
              <p>5K</p>
              <div className="flex gap-2">
                <p>
                  <CiBookmark />
                </p>
                <p>
                  <GoUpload />
                </p>
              </div>
            </div>
            <div className="border-b border-gray-600 mt-4"></div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserFeed;
