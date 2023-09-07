import { PageContainer } from "@ant-design/pro-components";

export type RoleListProps = {}

const RoleList: React.FC<RoleListProps> = (props) => {
    return (
        <div>
            <PageContainer
                title={false}
            >
               Role List
            </PageContainer>
        </div>
    )
}

export default RoleList;