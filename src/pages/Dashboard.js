import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addArticle } from "@/action";

function Dashboard(props) {
  const history = useHistory();
  const [count, setCount] = useState(0);

  function handleClick() {
    history.push("/home");
  }

  return (
    <div>
      <h2>Dashboard</h2>
      {props.articles.map((article, index) => (
        <div key={index}>{article.title}</div>
      ))}
      <button
        onClick={() => {
          setCount(count + 1);
          props.addArticle({
            title: count,
          });
        }}
      >
        add article
      </button>
    </div>
  );
}

const mapStateToProps = (state) => ({
  articles: state.nameReducer.articles,
});

const mapDispatchToProps = (dispatch) => ({
  addArticle: (article) => dispatch(addArticle(article)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
