import React, { useState } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, GetStringKeys, Input } from "../common/FormsControl/FormsControl";
import { required } from "../../utils/validators/validtors";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import styles from "./Login.module.css";
import { loginTC } from "../../redux/thunks/authThunk";
import { isVisible } from "@testing-library/user-event/dist/utils";

type LoginFormPropsType = {
    captchaUrl: string | null;
};

export type LoginFormDataType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string | null;
};
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormDataType>;
type AllSampleFormProps = LoginFormPropsType & InjectedFormProps<LoginFormDataType, LoginFormPropsType>;

const LoginForm: React.FC<AllSampleFormProps> = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            <div>
                {createField<LoginFormValuesTypeKeys>(
                    "Email",
                    "email",
                    [required],
                    Input,
                    { className: styles.loginInput },
                    "Email Address",
                )}
            </div>
            <div>
                {createField<LoginFormValuesTypeKeys>(
                    "Password",
                    "password",
                    [required],
                    Input,
                    { type: "password" },
                    "Password",
                )}
            </div>

            {captchaUrl && <img src={captchaUrl} alt="captcha-image" />}
            {captchaUrl && createField<LoginFormValuesTypeKeys>("Symbols from image", "captcha", [required], Input)}

            {error && <div className={styles.formSummaryError}>{error}</div>}
            <div>
                <button type="submit" className={styles.loginButton}>
                    Get Started
                </button>
            </div>
        </form>
    );
};

const LoginReduxForm = reduxForm<LoginFormDataType, LoginFormPropsType>({ form: "login" })(LoginForm);

type LoginType = {
    login: (email: string, password: string, rememberMe: boolean, captchaUrl: string | null) => void;
    isAuth: boolean;
    captchaUrl: string | null;
};
const Login: React.FC<LoginType> = (props) => {
    const { isAuth, login, captchaUrl } = props;

    const [isVisible, setIsVisible] = useState(false);

    const onShowHandler = () => {
        setIsVisible(true);
    };

    const onHideHandler = () => {
        setIsVisible(false);
    };

    const onSubmitHandler = (formData: LoginFormDataType) => {
        login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    };

    if (isAuth) return <Redirect to={"/profile"} />;

    return (
        <div className={styles.wrapper}>
            <div className={styles.root}>
                <h1 className={styles.title}>Login</h1>
                <LoginReduxForm onSubmit={onSubmitHandler} captchaUrl={captchaUrl} />
            </div>
            <div className={styles.testLoginInfo}>
                <p>
                    To log in get registered
                    <a href={"https://social-network.samuraijs.com/"} target={"_blank"} rel="noreferrer">
                        <span className={styles.link}> here,</span>
                    </a>
                </p>
                <p>
                    or use common test account credentials:{" "}
                    {!isVisible ? (
                        <span className={styles.text} onClick={onShowHandler}>
                            Show data
                        </span>
                    ) : (
                        <span className={styles.text} onClick={onHideHandler}>
                            Hide data
                        </span>
                    )}
                </p>
                {isVisible && (
                    <>
                        <p className={styles.loginData}>Email: free@samuraijs.com</p>
                        <p className={styles.loginData}>Password: free</p>
                    </>
                )}
            </div>
        </div>
    );
};

type MapStateToPropsType = {
    captchaUrl: string | null;
    isAuth: boolean;
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        captchaUrl: state.auth.captchaUrl,
    };
};

export default connect(mapStateToProps, { login: loginTC })(Login);
