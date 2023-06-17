declare namespace USER {
    type CurrentUser = {
        username : string;
        email? : string;
        avatar? : string;
        phoneNumber? : string;
        notificationCount? : number;
    }

    type User = {
        id : number;
        username : string;
        email : string;
        phoneNumber : string;
    }

    type LoginReq = {
        username : string;
        password : string;
        autoLogin : boolean;
        type : string;
    }

    type LoginResp = {
        code? : number;
        data? : {
            jwtToken? : string;
        }
        message? : string;
        success? : boolean;
    }
}