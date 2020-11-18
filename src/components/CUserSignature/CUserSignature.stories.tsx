import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { IEmployee, ELevels } from '../../models/IEmployee';
import { Table } from 'antd';
import CUserSignature, { IUserSignature } from './CUserSignature';

export default {
  title: 'Storybook/CUserSignature',
  component: CUserSignature,
} as Meta;

const Template: Story<IUserSignature> = (args) => (
  <CUserSignature {...args}>Test content</CUserSignature>
);

export const CUserSignatureWithoutAvatar = Template.bind({});
CUserSignatureWithoutAvatar.args = {
  name: 'John',
  surname: 'Doe',
};

export const CUserSignatureWithAvatar = Template.bind({});
CUserSignatureWithAvatar.args = {
  name: 'John',
  surname: 'Doe',
  photo:
    'https://pbs.twimg.com/profile_images/762226166736547840/hQXGSqX6_bigger.jpg',
};
