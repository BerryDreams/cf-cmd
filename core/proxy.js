import { getProxySettings } from "get-proxy-settings";

const getDefaultProxy = () => {
    getProxySettings().then(result => {
        if (result == null) {
            return;
        }
        if (result.http != null) {
            console.log(result.http.toString());
        }
        if (result.https != null) {
            console.log(result.https.toString());
        }
    });
};