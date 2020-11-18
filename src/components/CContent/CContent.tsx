import React from "react";
import { Route, Switch } from "react-router-dom";

import styles from "./CContent.module.scss";

import Home from "../../pages/Home/Home";
import Employees from "../../pages/Employees/Employees";
import Skillsets from "../../pages/Skillsets/Skillsets";
import EmployeesForm from "../../pages/EmployeesForm/EmployeesForm";
import SkillsetsForm from "../../pages/SkillsetsForm/SkillsetsForm";

import { Layout } from "antd";

export const CContent = () => {
  const { Content } = Layout;

  return (
    <>
      <Content className={styles.siteLayoutBackground}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/skills" component={Skillsets} />
          <Route exact path="/skills/add" component={SkillsetsForm} />
          <Route path="/skills/:id" component={SkillsetsForm} />
          <Route exact path="/employees" component={Employees} />
          <Route exact path="/employees/add" component={EmployeesForm} />
          <Route path="/employees/:id" component={EmployeesForm} />
        </Switch>
      </Content>
    </>
  );
};

export default CContent;
