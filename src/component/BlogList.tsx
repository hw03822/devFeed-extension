import React, { useEffect, useState } from "react";
import Button from "./Button";

type Blog = {
  name: string;
  blog: string;
  rss: string;
  category: string;
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

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
            <Button blog={blog} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
