const LeftSidebar = () => {
  const trendingTopics = [
    {
      category: "Kişisel",
      title: "Ümit Şahin",
      type: "Gündemdekiler",
    },
    {
      category: "Software",
      title: "Twitter Rest-Api",
      posts: "61B gönderi",
      type: "Gündemdekiler",
    },
    {
      category: "Software",
      title: "React",
      posts: "3.491 gönderi",
    },
  ];

  const suggestedUsers = [
    {
      name: "Ümit",
      username: "@umitsahin",
    },
    {
      name: "Doğancan Kınık",
      username: "@kınıkdogancan",
    },
    {
      name: "Workintech",
      username: "@workintech",
    },
  ];

  return (
    <div className="w-[350px] h-screen p-4 sticky top-0">
      <div className="rounded-xl p-4 mb-4 border border-gray-600">
        <h2 className="text-xl font-bold mb-2">Premium'a Abone Ol</h2>
        <p className="text-sm text-gray-600 mb-4">
          Yeni özellikleri açmak için abone ol ve uygun olman durumunda içerik
          üreticisi gelir payı kazan.
        </p>
        <button className="bg-white text-black rounded-full px-4 py-2 font-bold">
          Abone Ol
        </button>
      </div>

      <div className="rounded-xl p-4 mb-4 border border-gray-600">
        <h2 className="text-xl font-bold mb-4">Gündemdekiler</h2>
        <h3 className="text-lg font-bold mb-2">Neler oluyor?</h3>
        {trendingTopics.map((topic, index) => (
          <div key={index} className="py-2 cursor-pointer">
            {topic.category && (
              <p className="text-sm text-gray-500">{topic.category}</p>
            )}
            <p className="font-bold">{topic.title}</p>
            {topic.posts && (
              <p className="text-sm text-gray-500">{topic.posts}</p>
            )}
            {topic.type && (
              <p className="text-sm text-gray-500">{topic.type}</p>
            )}
          </div>
        ))}
        <button className="text-blue-500 hover:text-blue-600 mt-2">
          Daha fazla göster
        </button>
      </div>

      <div className="rounded-xl p-4 border border-gray-600">
        <h2 className="text-xl font-bold mb-4">Kimi takip etmeli</h2>
        {suggestedUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 cursor-pointer"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
              <div>
                <p className="font-bold">{user.name}</p>
                <p className="text-gray-500">{user.username}</p>
              </div>
            </div>
            <button className="bg-white text-black rounded-full px-4 py-2 font-bold text-sm">
              Takip et
            </button>
          </div>
        ))}
        <button className="text-blue-500 hover:text-blue-600 mt-2">
          Daha fazla göster
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;
