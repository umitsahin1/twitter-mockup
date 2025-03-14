import { useEffect, useState } from "react";
import axios from "axios";
import { FaArrowLeft, FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";
import { useParams, useHistory } from "react-router-dom";
import { GoUpload } from "react-icons/go";
import { CiBookmark } from "react-icons/ci";
import { AiOutlineRetweet } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

function TweetDetails() {
  const [text, setText] = useState("");
  const [tweets, setTweets] = useState(null);
  const [comments, setComments] = useState([]);
  const { tweetId } = useParams();
  const userId = localStorage.getItem("userId");
  const history = useHistory();
  const [isLiked, setIsLiked] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;  

  const getProfileImage = (username) => {
    const hash = username.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    return `https://picsum.photos/seed/${hash}/200`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate();
    const month = date.toLocaleString("tr-TR", { month: "short" });
    const year = date.getFullYear();

    return `${hours}:${minutes} · ${day} ${month} ${year}`;
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
        const sortedTweets = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setTweets(sortedTweets);
      })
      .catch((error) => console.error("Veri çekme hatası:", error));
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/twitter/api/v1/tweet/findById/${tweetId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setTweets(response.data);
        setIsLiked(response.data.likes?.includes(userId));
      })
      .catch((error) => {
        console.error("Tweet detayları alınırken bir hata oluştu:", error);
      });
  }, [tweetId]);

  useEffect(() => {
    axios
      .get(`${apiUrl}/twitter/api/v1/comment?tweetId=${tweetId}`, {
        withCredentials: true,
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("Yorumlar alınırken bir hata oluştu:", error);
      });
  }, [tweetId]);

  const commentAt = () => {
    if (text.trim() === "") {
      console.error("Yorum içeriği boş olamaz!");
      return;
    }
    axios
      .post(
        `${apiUrl}/twitter/api/v1/comment`,
        { content: text, tweetId: tweetId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then(() => {
        setText("");
        axios
          .get(`${apiUrl}/twitter/api/v1/comment?tweetId=${tweetId}`, {
            withCredentials: true,
          })
          .then((response) => {
            setComments(response.data);
          })
          .catch((error) => {
            console.error("Yorumlar alınırken bir hata oluştu:", error);
          });
      })
      .catch((error) => {
        console.error("Yorum gönderilirken bir hata oluştu:", error);
      });
  };

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
      .then(() => {
        setIsLiked(!isLiked);
        fetchTweets();
      })
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

  if (!tweets)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  return (
    <div className="w-full h-full border border-gray-600 flex flex-col text-white">
      <div className="sticky top-0 z-10 backdrop-blur-md px-4 py-2 border border-gray-600 bg-opacity-80">
        <div className="flex items-center gap-6">
          <button
            onClick={() => history.goBack()}
            className="p-2 rounded-full hover:bg-gray-800/50 transition-colors"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">Gönderi</h1>
        </div>
      </div>

      <div className="flex flex-col p-4 border border-gray-600">
        <div className="flex items-start gap-3">
          <img
            src={getProfileImage(tweets.username)}
            className="w-12 h-12 rounded-full"
            alt={`${tweets.username}'s profile`}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold hover:underline cursor-pointer">
                  {tweets.username}
                </h2>
                <p className="text-gray-500">@{tweets.username}</p>
              </div>
              <button className="p-2 rounded-full hover:bg-gray-800/50 transition-colors">
                <BsThreeDots />
              </button>
            </div>
            <p className="mt-3 text-xl break-words">{tweets.content}</p>
            {tweets.createdAt && (
              <p className="mt-4 text-gray-500">
                {formatDate(tweets.createdAt)}
              </p>
            )}

            <div className="flex justify-between mt-4 py-2 ">
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                <FaRegComment className="w-5 h-5" />
                <span>{tweets.commentCount || 0}</span>
              </button>
              <button
                onClick={() => handleRetweet(tweets.id)}
                className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors"
              >
                <AiOutlineRetweet className="w-6 h-6" />
                <span>{tweets.retweetCount || 0}</span>
              </button>
              <button
                onClick={() => handleLike(tweets.id)}
                className={`flex items-center gap-2 ${
                  isLiked
                    ? "text-pink-600"
                    : "text-gray-500 hover:text-pink-500"
                } transition-colors`}
              >
                {isLiked ? (
                  <FaHeart className="w-5 h-5" />
                ) : (
                  <FaRegHeart className="w-5 h-5" />
                )}
                <span>{tweets.likeCount || 0}</span>
              </button>
              <button className="text-gray-500 hover:text-blue-500 transition-colors">
                <CiBookmark className="w-5 h-5" />
              </button>
              <button className="text-gray-500 hover:text-blue-500 transition-colors">
                <GoUpload className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border border-gray-600">
        <div className="flex gap-4">
          <img
            src={getProfileImage(userId || "anonymous")}
            className="w-12 h-12 rounded-full"
            alt="your profile"
          />
          <div className="flex-1">
            <textarea
              className="w-full bg-transparent text-xl placeholder-gray-500 focus:outline-none resize-none min-h-[100px]"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tweete yanıt ver"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-2 text-blue-500">
                <button className="p-2 rounded-full hover:bg-blue-500/10 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"
                    ></path>
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-blue-500/10 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M3 5.5C3 4.119 4.12 3 5.5 3h13C19.88 3 21 4.119 21 5.5v13c0 1.381-1.12 2.5-2.5 2.5h-13C4.12 21 3 19.881 3 18.5v-13zM5.5 5c-.28 0-.5.224-.5.5v13c0 .276.22.5.5.5h13c.28 0 .5-.224.5-.5v-13c0-.276-.22-.5-.5-.5h-13zM18 10.711V9.25h-3.74v5.5h1.44v-1.719h1.7V11.57h-1.7v-.859H18zM11.79 9.25h1.44v5.5h-1.44v-5.5zm-3.07 1.375c.34 0 .77.172 1.02.43l1.03-.86c-.51-.601-1.28-.945-2.05-.945C7.19 9.25 6 10.453 6 12s1.19 2.75 2.72 2.75c.85 0 1.54-.344 2.05-.945v-2.149H8.38v1.032h1.02v.515c-.17.086-.42.172-.68.172-.76 0-1.36-.602-1.36-1.375 0-.688.6-1.375 1.36-1.375z"
                    ></path>
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-blue-500/10 transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M8 9.5C8 8.119 8.672 7 9.5 7S11 8.119 11 9.5 10.328 12 9.5 12 8 10.881 8 9.5zm6.5 2.5c.828 0 1.5-1.119 1.5-2.5S15.328 7 14.5 7 13 8.119 13 9.5s.672 2.5 1.5 2.5zM12 16c-2.224 0-3.021-2.227-3.051-2.316l-1.897.633c.05.15 1.271 3.684 4.949 3.684s4.898-3.533 4.949-3.684l-1.896-.638c-.033.095-.83 2.322-3.053 2.322zm10.25-4.001c0 5.652-4.598 10.25-10.25 10.25S1.75 17.652 1.75 12 6.348 1.75 12 1.75 22.25 6.348 22.25 12zm-2 0c0-4.549-3.701-8.25-8.25-8.25S3.75 7.451 3.75 12s3.701 8.25 8.25 8.25 8.25-3.701 8.25-8.25z"
                    ></path>
                  </svg>
                </button>
              </div>
              <button
                onClick={commentAt}
                disabled={!text.trim()}
                className={`px-4 py-2 rounded-full font-bold ${
                  text.trim()
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-blue-500/50 cursor-not-allowed"
                } transition-colors`}
              >
                Yanıtla
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-600">
        {comments.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Bu tweete henüz yanıt verilmemiş. Konuşmaya katıl!
          </div>
        ) : (
          comments.map((reply, index) => (
            <div
              key={index}
              className="p-4 hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex gap-3">
                <img
                  src={getProfileImage(reply.username)}
                  className="w-12 h-12 rounded-full"
                  alt={`${reply.username}'s profile`}
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-bold hover:underline cursor-pointer">
                        {reply.username}
                      </span>
                      <span className="text-gray-500 ml-2">
                        @{reply.username}
                      </span>
                      {reply.createdAt && (
                        <span className="text-gray-500 ml-2">·</span>
                      )}
                    </div>
                    <button className="p-1 rounded-full hover:bg-gray-800/50 transition-colors">
                      <BsThreeDots />
                    </button>
                  </div>
                  <p className="mt-2">{reply.content}</p>
                  <div className="flex justify-between mt-3 max-w-md">
                    <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                      <FaRegComment className="w-4 h-4" />
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                      <AiOutlineRetweet className="w-5 h-5" />
                    </button>
                    <button className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors">
                      <FaRegHeart className="w-4 h-4" />
                    </button>
                    <button className="text-gray-500 hover:text-blue-500 transition-colors">
                      <CiBookmark className="w-4 h-4" />
                    </button>
                    <button className="text-gray-500 hover:text-blue-500 transition-colors">
                      <GoUpload className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TweetDetails;
