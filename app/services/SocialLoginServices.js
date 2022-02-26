import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes
} from '@react-native-community/google-signin';

import {
    LoginButton,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager
} from 'react-native-fbsdk-next';

const WEB_CLIENT_ID = '85684263588-7adg60jtivefn3odoh1u9ctvv94fm5se.apps.googleusercontent.com';

export const GoogleSignInInit = () => {
    GoogleSignin.configure({
        webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server(needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
        accountName: '' // [Android] specifies an account name on the device that should be used
    });
};
export const GoogleLogIn = async (onSuccess, onFailure) => {
    try {
        await GoogleSignin.hasPlayServices();
        const isSignedIn = await GoogleSignin.isSignedIn();
        let info = {};
        if (isSignedIn) {
            console.log('IS SIGNED IN:', isSignedIn);
            info =
                Platform.OS == 'ios'
                    ? await GoogleSignin.signInSilently()
                    : await GoogleSignin.getCurrentUser();
        } else {
            console.log('SIGNING INTO GOOGLE:', isSignedIn);
            info = await GoogleSignin.signIn();
        }
        console.log({ userInfo: info });

        let userInfo = {
            id: info.user.email,
            name: info.user.name,
            photo: info.user.photo
        };
        onSuccess(userInfo);
        // checkUser(userInfo);
    } catch (error) {
        console.log('ERROR:', error, error.code);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
        } else {
            // some other error happened
        }
        onFailure(error);
    }
};

export const GoogleSignOut = async (onFailure) => {
    try {
        const isSignedIn = await GoogleSignin.isSignedIn();
        if (!isSignedIn) {
            return;
        }
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
    } catch (error) {
        onFailure(error);
        console.error(error);
    }
};

export const FacebookLogIn = async (onSuccess, onFailure) => {
    try {
        // LoginManager.setLoginBehavior('web_only');
        LoginManager.logInWithPermissions(['public_profile']).then(
            function (result) {
                if (result.isCancelled) {
                    console.log('Login cancelled');
                } else {
                    console.log(
                        'Login success with permissions: ' + result.grantedPermissions.toString()
                    );
                    AccessToken.getCurrentAccessToken().then((data) => {
                        console.log(data.accessToken.toString());
                        const parameters = {
                            fields: {
                                string: 'id, first_name, last_name, middle_name, picture.type(large)'
                            }
                        };
                        const infoRequest = new GraphRequest(
                            '/me',
                            { accessToken: data.accessToken, parameters: parameters },
                            (error, result) => {
                                if (error) {
                                    onFailure(error);
                                    return;
                                }
                                console.log(error, result);
                                let lastName = result.last_name ? ` ${result.last_name}` : '';
                                let userInfo = {
                                    id: result.id,
                                    name: `${result.first_name}${lastName}`,
                                    photo: result.picture.data.url
                                };
                                onSuccess(userInfo);
                            }
                        );
                        new GraphRequestManager().addRequest(infoRequest).start();
                    });
                }
            },
            function (error) {
                console.log('Login fail with error: ' + error);
                onFailure(error);
            }
        );
    } catch (error) {
        onFailure(error);
    }
};

export const FacebookSignOut = async (onFailure) => {
    try {
        LoginManager.logOut();
    } catch (error) {
        onFailure(error);
        console.error(error);
    }
};