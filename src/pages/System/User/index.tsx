import { PageContainer } from "@ant-design/pro-components";

export type UserListProps = {}

const UserList: React.FC<UserListProps> = (props) => {
    return (
        <div>
            <PageContainer
                title={false}
            >
               User List
            </PageContainer>
        </div>
    )
}

export default UserList;