import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import CHeader from "./CHeader";
import ICollapse from "../../models/ICollapse";

export default {
  title: "Storybook/Layout/Header",
  component: CHeader,
} as Meta;

const Template: Story<ICollapse> = (args) => (
  <>
    <CHeader {...args} />
  </>
);

export const Header = Template.bind({});
Header.args = {
  isCollapsed: true,
};
