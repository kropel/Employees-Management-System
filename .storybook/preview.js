import React from "react";
import { StoryWrapper } from "../src/storybook/StoryWrapper";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [
  (Story) => (
    <StoryWrapper>
      <Story />
    </StoryWrapper>
  ),
];
