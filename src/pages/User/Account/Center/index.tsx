
import { useIntl } from '@umijs/max';
import { Card, Tabs } from 'antd';
import React, { useContext } from 'react';


const AccountCenter: React.FC = () => {
    const { TabPane } = Tabs;
    const intl = useIntl();

    return (
        <Card>
            <Tabs defaultActiveKey="profile">
                <TabPane tab={intl.formatMessage({id: 'account.center.tab.profile', defaultMessage: '个人信息'})} key="profile">
                {/* Profile content */}
                </TabPane>
                <TabPane tab={intl.formatMessage({id: 'account.center.tab.settings', defaultMessage: '个人配置'})} key="settings">
                {/* Settings content */}
                </TabPane>
                <TabPane tab={intl.formatMessage({id: 'account.center.tab.security', defaultMessage: '安全配置'})} key="security">
                {/* Security content */}
                </TabPane>
            </Tabs>
        </Card>
    )
}

export default AccountCenter;