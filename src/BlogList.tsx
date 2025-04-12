import React, { useEffect, useState } from "react";
import { parse } from "yaml";

type Blog = {
  name: string;
  blog: string;
  rss: string;
  description: string;
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchYAML = async () => {
      const res = await fetch(
        "https://raw.githubusercontent.com/awesome-devblog/awesome-devblog/main/db_community.yml"
      );
      const text = await res.text();
      const data = parse(text); // YAML -> JS 객체로 파싱

      // 기업 블로그만 필터링
      const companyBlogs: Blog[] = data
        .filter((item: any) => item.blog)
        .map((item: any) => ({
          name: item.name,
          blog: item.blog,
          rss: item.rss,
          description: item.description,
        }));
      setBlogs(companyBlogs);
      console.log(blogs);
    };

    fetchYAML();
  }, []);

  useEffect(() => {
    console.log("blogs 변경됨:", blogs);
  }, [blogs]);

  return (
    <div>
      <h2>기업 개발 블로그 목록</h2>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.name}>
            <a href={blog.blog} target="_blank" rel="noopener noreferrer">
              {blog.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;
