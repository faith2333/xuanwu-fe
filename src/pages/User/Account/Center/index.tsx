
import { useIntl } from '@umijs/max';
import { Card, Tabs } from 'antd';
import { useContext, useState, useEffect } from 'react';
import ProfilePage from './profile';
import SettingsPage from './settings';


const AccountCenter: React.FC = () => {
    const { TabPane } = Tabs;
    const intl = useIntl(); 

    const [username, setUsername] = useState<string>('');


    useEffect(() => {
        const username = localStorage.getItem('currentUsername');
        if (username) {
            setUsername(username);
        }
    }, [username]);

    return (
        <Card>
            <Tabs defaultActiveKey="profile">
                <TabPane tab={intl.formatMessage({id: 'account.center.tab.profile', defaultMessage: '个人信息'})} key="profile">
                   <ProfilePage 
                        username={username}
                   />
                </TabPane>
                <TabPane tab={intl.formatMessage({id: 'account.center.tab.settings', defaultMessage: '个人配置'})} key="settings">
                   <SettingsPage 
                        username={username}
                   />
                </TabPane>
                <TabPane tab={intl.formatMessage({id: 'account.center.tab.security', defaultMessage: '安全配置'})} key="security">
                {/* Security content */}
                </TabPane>
            </Tabs>
        </Card>
    )
}

export default AccountCenter;