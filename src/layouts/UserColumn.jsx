
import UserFeed from "../components/UserFeed";

const UserColumn = () => {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("userName");

  const getProfileImage = (username) => {
    const hash = username.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    return `https://picsum.photos/seed/${hash}/200`;
  };

  return (
    <div className="w-7/12 h-screen border-r-[0.2px] border-l-[0.2px] border-gray-500 flex flex-col ">
      <img
        src={getProfileImage(userId || "anonymous")}
        className="h-36 object-cover w-full"
      />
      <div className="flex mb-8">
        <img
          src={getProfileImage(userId || "anonymous")}
          className="w-32 h-32 rounded-full border-4 border-black -mt-8 mx-4"
        />
        <p className="ml-73 mt-4 border-2 rounded-full h-10 w-44 text-[16px]  flex justify-center items-center mr-4">
          Profili düzenle
        </p>
      </div>
      <div className="mx-8 flex flex-col gap-2">
        <div>
          <p className="font-bold text-2xl">{username || "Username"}</p>
          <p className="text-gray-500">@{username || "username"}</p>
        </div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab optio
          praesentium vitae minus veniam, sed odio maiores delectus ad non
          expedita quidem obcaecati ipsum mollitia. Placeat quibusdam ea
          recusandae voluptas?
        </p>
        <div className="flex gap-12 mb-6">
          <p>
            6 <span className="text-gray-500">Takip edilen</span>
          </p>
          <p>
            302 <span className="text-gray-500">Takipçi</span>
          </p>
        </div>
      </div>
      <div className="mb-6">
        <nav className="flex justify-around mb-4 cursor-pointer">
          <p>Gönderiler</p>
          <p>Yanıtlar</p>
          <p>Öne Çıkanlar</p>
          <p>Makaleler</p>
          <p>Medya</p>
          <p>Beğeni</p>
        </nav>
        <div className="border-b border-gray-600"></div>
      </div>
      <UserFeed />
    </div>
  );
};

export default UserColumn;
