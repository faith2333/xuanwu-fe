import { listApps } from "@/services/application/app/api";
import { PageContainer, ProColumns, ProTable } from "@ant-design/pro-components";


export type ApplicationListProps = {

}

const ApplicationList: React.FC<ApplicationListProps> = (props) => {

    const columns : ProColumns<APP.AppItem>[] = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'AppType',
            dataIndex: 'appType',
            key: 'appType',
        }
    ] 

    return (
        <>
            <PageContainer 
                title={false}
            >
                <ProTable
                    columns={columns}
                    request={listApps}
                />
            </PageContainer>
        </>
    )
}

export default ApplicationList;