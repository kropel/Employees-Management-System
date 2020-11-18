import React from 'react';

import ICollapse from '../../models/ICollapse';

import styles from './CHeader.module.scss';

import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { Layout, Button } from 'antd';
import { clearToken } from '../../services/authSvc';

export const CHeader = ({
  isCollapsed,
  collapseHandler = (): void => {},
  handlerToken,
}: ICollapse) => {
  const { Header } = Layout;

  return (
    <div className={styles.Container}>
      <Header className={styles.siteLayoutBackground}>
        {isCollapsed ? (
          <MenuUnfoldOutlined
            onClick={() => collapseHandler(isCollapsed)}
            className={styles.trigger}
          />
        ) : (
          <MenuFoldOutlined
            onClick={() => collapseHandler(isCollapsed)}
            className={styles.trigger}
          />
        )}
        <Button
          onClick={() => {
            handlerToken!();
            clearToken();
          }}
        >
          Logout
        </Button>
      </Header>
    </div>
  );
};

export default CHeader;
