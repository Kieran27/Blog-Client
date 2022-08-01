import { useState, useEffect } from "react";

const Base = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = () => {
      fetch("http://localhost:3000/api/posts")
        .then((res) => res.json())
        .then((data) => {
          setData(data.posts);
          console.log(data);
        });
    };
    getData();
  }, []);

  const handleClick = (e) => {
    const id = e.target.parentElement.id;
    fetch(`http://localhost:3000/api/posts/${id}`)
      .then((res) => res.json())
      .then((post) => console.log(post));
  };

  return (
    <div>
      <form action="http://localhost:3000/api/posts" method="POST">
        <label htmlFor="posttitle">Post Title:</label>
        <input type="text" name="posttitle" />
        <label htmlFor="postbody">Post Title:</label>
        <input type="text" name="postbody" />
        <input type="submit" />
      </form>
      <div>
        {data?.map((obj, index) => {
          return (
            <div key={obj._id} id={obj._id} onClick={handleClick}>
              <p>{obj.title}</p>
              <p>{obj.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Base;
