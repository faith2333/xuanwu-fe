import { PageContainer } from "@ant-design/pro-components";

export type OrganizationProps = {}

const Organization: React.FC<OrganizationProps> = (props) => {
    return (
        <div>
            <PageContainer
                title={false}
            >
               Organization List
            </PageContainer>
        </div>
    )
}

export default Organization;