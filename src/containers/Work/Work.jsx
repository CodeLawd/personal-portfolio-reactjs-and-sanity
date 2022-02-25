import { useState, useEffect } from "react";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import { urlFor, client } from "../../client";

import "./Work.scss";

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);

  useEffect(() => {
    let cancel = false;
    const query = '*[_type == "works"]';

    client.fetch(query).then((data) => {
      if (cancel) return;
      setWorks(data);
      setFilterWork(data);
    });

    return () => {
      cancel = true;
    };
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);

    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);

      item === "All"
        ? setFilterWork(works)
        : setFilterWork(works.filter((work) => work.tags.includes(item)));
    }, 500);
  };
  return (
    <>
      <h2 className="head-text">
        Recent <span>Works</span>
      </h2>
      <div className="app__work-filter">
        {["UI/UX", "Web App", "React JS", "All"].map((item, index) => (
          <div
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item && "item-active"
            }`}
            key={index}
            onClick={() => handleWorkFilter(item)}
          >
            {item}
          </div>
        ))}
      </div>

      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              {work.imgUrl && <img src={urlFor(work.imgUrl)} alt={work.name} />}
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileHover={{ scale: [1, 0.9] }}
                    whileInView={{ scale: [0, 1] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>

                <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileHover={{ scale: [1, 0.9] }}
                    whileInView={{ scale: [0, 1] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillGithub />
                  </motion.div>
                </a>
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p
                className="p-text"
                style={{
                  marginTop: 10,
                  fontSize: ".95rem",
                  textAlign: "justify",
                }}
              >
                {work.description}
              </p>

              <div className="app__work-stack app__flex">
                {work.stack?.map((stack, i) => (
                  <div key={i}>{stack}</div>
                ))}
              </div>

              <div className="app__work-tag app__flex">
                <p className="p-text">All</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
