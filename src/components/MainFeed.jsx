import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineRetweet } from "react-icons/ai";
import { CiBookmark } from "react-icons/ci";
import { FaHeart, FaRegComment } from "react-icons/fa";
import { GoUpload } from "react-icons/go";
import { RiDeleteBinLine } from "react-icons/ri";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const MainFeed = ({ tweetsUpdated }) => {
  const [tweets, setTweets] = useState([]);

  const apiUrl = import.meta.env.VITE_API_URL;

  const userId = localStorage.getItem("userId");

  const getProfileImage = (username) => {
    const hash = username.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    return `https://picsum.photos/seed/${hash}/200`;
  };

  const fetchTweets = () => {
    axios
      .get(`${apiUrl}/twitter/api/v1/tweet`, {
        withCredentials: true,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("response", response.data);
        const sortedTweets = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setTweets(sortedTweets);
      })
      .catch((error) => console.error("Veri çekme hatası:", error));
  };

  useEffect(() => {
    fetchTweets();
  }, [tweetsUpdated]);

  const handleLike = (tweetId) => {
    if (!userId) {
      console.error("User ID bulunamadı.");
      return;
    }

    axios
      .post(
        `${apiUrl}/twitter/api/v1/like/${tweetId}/${userId}`,
        {},
        { withCredentials: true }
      )
      .then(() => fetchTweets())
      .catch((error) => console.error("Like işlemi başarısız:", error));
  };

  const handleRetweet = (tweetId) => {
    if (!userId) {
      console.error("User ID bulunamadı.");
      return;
    }

    axios
      .post(
        `${apiUrl}/twitter/api/v1/retweet/${userId}/${tweetId}`,
        {},
        { withCredentials: true }
      )
      .then(() => fetchTweets())
      .catch((error) => console.error("Retweet işlemi başarısız:", error));
  };

  return (
    <div className="flex flex-col gap-4">
      {tweets.map((item, index) => (
        <Link to={`/tweet/${item.id}`} key={index} className="block">
          <div className="flex flex-col">
            <div className="flex ">
              <img
                src={getProfileImage(item.username)}
                className="w-10 h-10 rounded-full mx-3"
                alt={`${item.username}'s profile`}
              />
              <div className="flex flex-col">
                <div>
                  <div className="flex justify-between items-center w-[500px] ">
                    <div className="flex gap-1">
                      <h2 className="font-bold hover:underline cursor-pointer">
                        {item.username}
                      </h2>
                      <p className="text-gray-500">@{item.username}</p>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-800/50 transition-colors">
                      <RiDeleteBinLine />
                    </button>
                  </div>

                  <p className="text-xl mt-4">{item.content}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-around mt-4 mb-2">
              <p className="flex items-center gap-2 cursor-pointer">
                <FaRegComment />
                {item.commentCount || 0}
              </p>
              <p
                onClick={(e) => {
                  e.preventDefault();
                  handleRetweet(item.id);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <AiOutlineRetweet />
                {item.retweetCount || 0}
              </p>
              <p
                onClick={(e) => {
                  e.preventDefault();
                  handleLike(item.id);
                }}
                className="flex items-center gap-2 cursor-pointer"
              >
                <FaHeart />
                {item.likeCount || 0}
              </p>
              <p>5K</p>
              <div className="flex gap-2 cursor-pointer">
                <p>
                  <CiBookmark />
                </p>
                <p>
                  <GoUpload />
                </p>
              </div>
            </div>
            <div className="border-b border-gray-600"></div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MainFeed;
