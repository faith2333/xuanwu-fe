
export namespace ORG {
    type OrganizationItem = {
        id: number;
        name: string;
        code: string;
        desc?: string;
        status?: string;
        gmtCreate: string;
        gmtModify: string;
        createUser: string;
        modifyUser: string;
    }
}