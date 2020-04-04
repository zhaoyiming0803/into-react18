import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Toast } from "antd-mobile";
import styles from "@/pages/Home.module.less";

console.log(styles);

function Home() {
  const history = useHistory();

  function handleClick() {
    history.push("/dashboard");
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Home</h2>
      <Button type="primary" onClick={() => handleClick()}>
        to dashboard
      </Button>
      <Button
        type="warning"
        onClick={() => Toast.info("this is a Toast component")}
      >
        show toast
      </Button>
    </div>
  );
}

export default Home;
