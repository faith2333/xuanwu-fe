import { request } from "@umijs/max";

export async function createORG(
    params: {
        name: string;
        code: string;
        desc?: string;
        enabled?: boolean;
    },
) {
    return request(`/v1/organization/orgs`, {
        method: 'POST',
        data: {
            ...params,
        },
    });
}

export async function updateORG(
    params: {
        id?: number;
        name?: string;
        code?: string;
        desc?: string;
        status?: string;
    },
) {
    return request(`/v1/organization/orgs`, {
        method: 'PUT',
        data: {
            ...params,
        },
    });
}

export async function listORGs(
    params: {
        name?: string;
        code?: string;
        status?: string;
        current?: number;
        pageSize?: number;
    },
) {
    return request(`/v1/organization/orgs`, {
        method: 'GET',
        params: {
            name: params.name,
            code: params.code,
            status: params.status,
            pageIndex: params.current,
            pageSize: params.pageSize,
        },
    });
}

export async function listORGsAndFormatResponse(
    params: {
        name?: string;
        code?: string;
        enabled?: boolean;
        current?: number;
        pageSize?: number;
    },
) {
    return request(`/v1/organization/orgs`, {
        method: 'GET',
        params: {
            name: params.name,
            code: params.code,
            enabled: params.enabled,
            pageIndex: params.current,
            pageSize: params.pageSize,
        },
    }).then((res)=>{
        return res.data
    });
}

export async function deleteORG(
    params: {
        id: number
    }
) {
    return request(`/v1/organization/orgs/${params.id}`,{
        method: "DELETE"
    })
}