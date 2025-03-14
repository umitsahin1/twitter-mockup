import { useState } from "react";
import MainFeed from "../components/MainFeed";
import axios from "axios";

function MainColumn() {
  const [text, setText] = useState("");
  const [tweetsUpdated, setTweetsUpdated] = useState(false);
  const userId = localStorage.getItem("userId");
  const apiUrl = import.meta.env.VITE_API_URL;  

  const getProfileImage = (username) => {
    const hash = username.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    return `https://picsum.photos/seed/${hash}/200`;
  };

  const tweetAt = () => {
    if (text.trim() === "") {
      console.error("Tweet içeriği boş olamaz!");
      return;
    }
    axios
      .post(
        `${apiUrl}/twitter/api/v1/tweet?userId=${userId}`,
        JSON.stringify({ content: text }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Tweet başarıyla gönderildi:", response.data);
        setText("");
        setTweetsUpdated((prev) => !prev);
      })
      .catch((error) => {
        console.error("Tweet gönderilirken bir hata oluştu:", error);
      });
  };

  return (
    <div className="w-7/12 h-full border-r-[0.2px] border-l-[0.2px] border-gray-500 flex flex-col ">
      <div className="flex justify-around ">
        <p className="border-b-3 border-[#1A91DA] text-lg">Sana Özel</p>
        <p className="text-lg">Takip</p>
      </div>
      <textarea
        className="border-t-[0.2px] border-gray-500 px-14 py-8 focus:outline-none h-24 text-sm placeholder:text-2xl mb-3"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Neler Oluyor?"
        style={{
          backgroundImage: `url(${getProfileImage(userId || "anonymous")})`,
          backgroundSize: "40px 40px",
          backgroundPosition: "10px 30px",
          backgroundRepeat: "no-repeat",
        }}
      />
      <button
        onClick={() => tweetAt()}
        className="bg-[#787a7a] text-md w-40 h-10 rounded-full text-[#080a0d] font-bold ml-auto mx-4 cursor-pointer"
      >
        Gönderi Yayınla
      </button>
      <div className="border-b border-gray-600 mb-4 mt-4"></div>
      <MainFeed tweetsUpdated={tweetsUpdated} />
    </div>
  );
}

export default MainColumn;
