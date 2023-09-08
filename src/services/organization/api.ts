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
        id: number;
        name: string;
        code: string;
        desc?: string;
        enabled?: boolean;
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
    });
}