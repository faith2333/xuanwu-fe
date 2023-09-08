import { request } from "@umijs/max";


export async function listApps(
    params: {
        id?: number;
        code?: string;
        name?: string;
        appType?: string;
        category?: string;
        labels?: string[];
        /** current page */
        current?: number;
        /** page size */
        pageSize?: number;

    },
) {
    return request('/v1/application/app', {
        method: 'GET',
        params: {
            ...params,
        },
    });
}


export async function deleteApp(
    params: {
        code: string;
    },
) {
    return request(`/v1/application/app/delete/${params.code}`, {
        method: 'DELETE',
    });
}