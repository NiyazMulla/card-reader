import { COMMON_ERROR } from "./constant";

export const parseAPIErrorMessage = (errorObj) => {
    let error = {
        heading: '',
        subHeading: '',
    };

    if(errorObj.code === COMMON_ERROR.ERR_NETWORK) {
        return error = {
            heading: 'Due to maintenance, Server is down',
            subHeading: 'Please contact admin to get the status'
        }
    }
}