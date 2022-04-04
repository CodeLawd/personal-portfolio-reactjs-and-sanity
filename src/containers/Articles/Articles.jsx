import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import moment from "moment";

import { AppWrap, MotionWrap } from "../../wrapper";
import "./Articles.scss";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let cancel = false;
    const gql = async (query, variables = {}) => {
      const data = await fetch("https://api.hashnode.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      return data.json();
    };

    const GET_USER_ARTICLES = `
          query GetUserArticles($page: Int!) {
              user(username: "codelawd") {
                  name
                  publication {
                      posts(page: $page) {
                          title
                          brief
                          slug
                          coverImage
                          dateAdded
                      }
                  }
              }
          }
      `;

    gql(GET_USER_ARTICLES, { page: 0 }).then((result) => {
      console.log(result);
      if (cancel) return;
      setArticles(result.data.user.publication.posts);
    });

    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      <h2 className="head-text" style={{ marginTop: "4rem" }}>
        I also <span>write tech Articles</span>
      </h2>
      <div className="app__articles">
        {[
          articles.map((article, index) => (
            <motion.div
              whileInView={{ opacity: 1 }}
              // whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, type: "tween" }}
              className="app__article-item"
              key={article.title + index}
            >
              <img src={article.coverImage} alt="" />
              <h2 className="bold-text" style={{ marginTop: 20 }}>
                {article.title}
              </h2>
              <small style={{ marginTop: "10px" }}>
                Date published:{" "}
                {moment(article.dateAdded).format("MMMM Do, YYYY")}
              </small>

              <div className="line"></div>

              <p className="p-text" style={{ marginTop: 10 }}>
                {article.brief.slice(0, 150)}...
              </p>

              <a
                className="app__article-btn"
                href={`https://codelawd.hashnode.dev/${article.slug}`}
                target="_blank"
                rel="noreferrer"
              >
                Read more
              </a>
            </motion.div>
          )),
        ]}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Articles, "app__skills"),
  "articles",
  "app__otherbg"
);
