import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { addArticle } from "@/action";
import { Button } from "antd-mobile";

function Dashboard(props) {
  const history = useHistory();
  const [count, setCount] = useState(0);

  function handleClick() {
    history.push("/");
  }

  useEffect(() => {
    count !== 0 &&
      props.addArticle({
        title: "test" + count,
      });
  }, [count]);

  return (
    <div>
      <h2>Dashboard</h2>
      {props.articles.map((article, index) => (
        <div key={index}>{article.title}</div>
      ))}
      <Button type="primary" onClick={() => setCount(count + 1)}>
        add article
      </Button>
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
