import axios from "axios";
import React, { useEffect, useState } from "react";

function PostList() {
  const [state, setState] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [maxPage, setMaxPage] = useState(1);

  //   update page
  const updatePage = (paginate) => {
    if (paginate == "prev") {
      setPage((prevPage) => {
        if (prevPage == 1) return prevPage;
        else parseInt(prevPage) - 1;
      });
    } else {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    setLoading("loading");
    axios
      .get(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
      )
      .then((res) => {
        setState(res.data);
        setLoading("");
        setMaxPage(res.data.length);
      })
      .catch((err) => {
        setErr(err.message);
        setLoading("");
      });
  }, [page]);

  return (
    <div>
      <ul>
        {loading}
        {!loading &&
          state.map((post) => (
            <li key={post.id}>
              <div>
                <h6>Title: {post.title}</h6>
                <p>userId: {post.userId}</p>
                <p>id: {post.id}</p>
              </div>
            </li>
          ))}
        {!loading && err}
      </ul>

      <div className="paginate">
        <div>limit: {limit}</div>
        <span
          onClick={() => {
            updatePage("prev");
          }}
        >
          prev
        </span>
        {page}
        <span onClick={() => updatePage("next")}>next</span>
      </div>
    </div>
  );
}

export default PostList;
