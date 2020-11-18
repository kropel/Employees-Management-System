import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import CNavbar from "./CNavbar";
import ICollapse from "../../models/ICollapse";

export default {
  title: "Storybook/Layout/Navbar",
  component: CNavbar,
} as Meta;

const Template: Story<ICollapse> = (args) => (
  <Router>
    <Switch>
      <CNavbar {...args} />;
    </Switch>
  </Router>
);

export const CollapsedNavbar = Template.bind({});
CollapsedNavbar.args = {
  isCollapsed: true,
};

export const UncollapsedNavbar = Template.bind({});
UncollapsedNavbar.args = {
  isCollapsed: false,
};
