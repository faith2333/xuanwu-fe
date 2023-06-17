import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '王安楠个人作品',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'XuanWu',
          title: 'XuanWu',
          href: 'https://github.com/xuanwu',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/faith2333/xuanwu-fe',
          blankTarget: true,
        },
        {
          key: 'Annan Wang',
          title: 'Annan Wang',
          href: 'https://github.com/faith2333',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
