declare namespace APP {
    type AppItem = {
        id : number;
        name : string;
        code : string;
        appType : string;
        labels ?: string[];
        desc ?: string;
        category ?: string;
        developmentInfo ?: {
            developers ?: string[];
            developmentManger ?: string;
            gitAddress ?: string;
            language ?: string;
        };
        testInfo ?: {
            testManager ?: string;
        }
        notificationInfos ?: [
            {
                notifyType ?: string;
                notifyID ?: string;
                notifyUsers ?: string[];
            }
        ]
    }
}