import React, { useEffect, useState } from "react";

type Blog = {
  name: string;
  blog: string;
  rss: string;
  category: string;
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const handleSubscribe = (blog: Blog) => {
    let subscribeBlogs = JSON.parse(
      localStorage.getItem("subscribedBlogs") || "[]"
    );

    if (!subscribeBlogs.includes(blog.name)) {
      subscribeBlogs.push(blog.name);
      localStorage.setItem("subscribedBlogs", JSON.stringify(subscribeBlogs));
      alert(`${blog.name} 가 구독되었습니다.`);
    } else {
      subscribeBlogs = subscribeBlogs.filter((item: any) => item !== blog.name);
      localStorage.setItem("subscribedBlogs", JSON.stringify(subscribeBlogs));
      alert(`${blog.name} 를 구독해제하였습니다.`);
    }
  };

  useEffect(() => {
    const fetchJSON = async () => {
      const res = await fetch("/resource/db_blogs.json");
      const data = await res.json();

      // 기업 블로그만 필터링
      const companyBlogs: Blog[] = data
        .filter((item: any) => item.category === "company")
        .map((item: any) => ({
          name: item.name,
          blog: item.link,
          rss: item.rss,
          category: item.category,
        }));
      setBlogs(companyBlogs);
      console.log(blogs);
    };

    fetchJSON();
  }, []);

  useEffect(() => {
    console.log("blogs 변경됨:", blogs);
  }, [blogs]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <h2>기업 개발 블로그 목록</h2>
      {blogs.map((blog) => (
        <div
          key={blog.name}
          className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100"
        >
          <div className="p-6">
            <a href={blog.blog} target="_blank" rel="noopener noreferrer">
              <h3 className="text-xl font-bold">{blog.name}</h3>
            </a>

            {/* 설명 */}
            <p className="text-gray-600 text-sm mb-6">{blog.category}</p>

            {/* 버튼 */}
            {(localStorage.getItem("subscribedBlogs") || "[]").includes(
              blog.name
            ) ? (
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
