import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Toast } from "antd-mobile";
import styles from "@/pages/Home.module.less";
import testStyles from "@/pages/Test.module.less";

console.log("styles: ", styles);
console.log("testStyles: ", testStyles);

function Home() {
  const history = useHistory();

  function handleClick() {
    history.push("/dashboard");
  }
  return (
    <div className={styles.container}>
      <h2 className={testStyles.header}>Home</h2>
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
