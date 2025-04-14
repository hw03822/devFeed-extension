import React, { useState } from "react";

type Blog = {
  name: string;
  blog: string;
  rss: string;
  category: string;
};

type Props = {
  blog: Blog;
};

const Button = ({ blog }: Props) => {
  const [isSubscribe, setIsSubscribe] = useState(false);

  const handleSubscribe = (blog: Blog) => {
    let subscribeBlogs = JSON.parse(
      localStorage.getItem("subscribedBlogs") || "[]"
    );

    if (!subscribeBlogs.includes(blog.name)) {
      subscribeBlogs.push(blog.name);
      localStorage.setItem("subscribedBlogs", JSON.stringify(subscribeBlogs));
      setIsSubscribe(true);
      alert(`${blog.name} 가 구독되었습니다.`);
    } else {
      subscribeBlogs = subscribeBlogs.filter((item: any) => item !== blog.name);
      localStorage.setItem("subscribedBlogs", JSON.stringify(subscribeBlogs));
      setIsSubscribe(false);
      alert(`${blog.name} 를 구독해제하였습니다.`);
    }
  };

  return (
    <>
      {isSubscribe ? (
        <button
          className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          onClick={() => {
            handleSubscribe(blog);
          }}
        >
          구독중
        </button>
      ) : (
        <button
          className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          onClick={() => {
            handleSubscribe(blog);
          }}
        >
          + 구독
        </button>
      )}
    </>
  );
};

export default Button;
