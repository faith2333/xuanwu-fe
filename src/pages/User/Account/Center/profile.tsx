import { useIntl } from "@umijs/max";
import { Descriptions } from "antd";
import { useEffect, useState } from "react";

import { getUserByUsername } from "@/services/user/api";

export type ProfilePageProps = {
    username: string,
}

const ProfilePage: React.FC<ProfilePageProps> = (props) => {
    const [userInfo, setUserInfo] = useState<USER.User>({} as USER.User)

    const intl = useIntl();

    if (!userInfo.username) {
        getUserByUsername(props.username).then(res => {
            setUserInfo(res);
        })
    }

    return (
       <Descriptions title={intl.formatMessage({id: 'account.center.profile.title', defaultMessage: '用户信息'})} bordered>
            <Descriptions.Item label="UserName">{userInfo.username}</Descriptions.Item>
            <Descriptions.Item label="Telephone">{userInfo.phoneNumber}</Descriptions.Item>
            <Descriptions.Item label="Email">{userInfo.email}</Descriptions.Item>
        </Descriptions>
    )
}

export default ProfilePage;