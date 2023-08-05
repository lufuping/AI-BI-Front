import Footer from '@/components/Footer';
// import { login } from '@/services/ant-design-pro/api';
// import { getFakeCaptcha } from '@/services/ant-design-pro/login';
import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    // ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, history, SelectLang, useIntl, useModel, Helmet } from '@umijs/max';
import { Alert, message, Tabs } from 'antd';
import Settings from '../../../../config/defaultSettings';
import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { getLoginUserUsingGET, userLoginUsingPOST, userRegisterUsingPOST } from '@/services/xiaolu/userController';
const loginPath = '/user/login';
const ActionIcons = () => {
    const langClassName = useEmotionCss(({ token }) => {
        return {
            marginLeft: '8px',
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: '24px',
            verticalAlign: 'middle',
            cursor: 'pointer',
            transition: 'color 0.3s',
            '&:hover': {
                color: token.colorPrimaryActive,
            },
        };
    });

    return (
        <>
            <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
            <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
            <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
        </>
    );
};

const Lang = () => {
    const langClassName = useEmotionCss(({ token }) => {
        return {
            width: 42,
            height: 42,
            lineHeight: '42px',
            position: 'fixed',
            right: 16,
            borderRadius: token.borderRadius,
            ':hover': {
                backgroundColor: token.colorBgTextHover,
            },
        };
    });

    return (
        <div className={langClassName} data-lang>
            {SelectLang && <SelectLang />}
        </div>
    );
};
// 注册信息
const RegisterMessage: React.FC<{
    content: string;
}> = ({ content }) => {
    return (
        <Alert
            style={{
                marginBottom: 24,
            }}
            message={content}
            type="error"
            showIcon
        />
    );
};
// 定义注册方法
const Register: React.FC = () => {
    // 获取用户登录信息
    // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
    // 判断是什么注册
    const [type, setType] = useState<string>('account');
    // 设置用户登录信息
    // const { initialState, setInitialState } = useModel('@@initialState');

    const containerClassName = useEmotionCss(() => {
        return {
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            overflow: 'auto',
            backgroundImage:
                "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
            backgroundSize: '100% 100%',
        };
    });
    // 国际化
    const intl = useIntl();
    // 从接口获取用户信息
    // const fetchUserInfo = async () => {
    //     const userInfo = await getLoginUserUsingGET();
    //     if (userInfo) {
    //         flushSync(() => {
    //             setInitialState((s) => ({
    //                 ...s,
    //                 currentUser: userInfo,
    //             }));
    //         });
    //     }
    // };

    // 网页提交给后端的信息
    const handleSubmit = async (values: API.UserRegisterRequest) => {
        try {
            // 调用接口注册
            const res = await userRegisterUsingPOST(values);
            // 判断是否注册成功
            if (res.code === 0) {
                // 如果注册成功，提示注册成功
                // const defaultRegisterSuccessMessage = intl.formatMessage({
                //     // id: 'pages.login.success',
                //     defaultMessage: '注册成功！',
                // });
                const defaultRegisterSuccessMessage ='注册成功';
                message.success(defaultRegisterSuccessMessage);
                // 重新获取用户信息
                // await fetchUserInfo();
                // 重定向到登录页
                // history.push(loginPath)
                // 刷新页面
                const urlParams = new URL(window.location.href).searchParams;
                // history.push(urlParams.get('redirect') || '/');
                history.push(loginPath)
                return;
            } else {
                // 注册失败返回后端失败消息
                message.error(res.message)

            }
        }
        // 注册逻辑异常处理 
        catch (error) {
            // 刷新注册失败信息
            const defaultRegisterFailureMessage = '注册失败，请重试！';
            console.log(error);
            message.error(defaultRegisterFailureMessage);
        }
    };
    // 记录用户登录态
    // const { status, type: loginType } = userLoginState;
    // 提交的表单
    return (
        // 设置初始标题和信息
        <div className={containerClassName}>
            <Helmet>
                <title>
                    {intl.formatMessage({
                        id: 'menu.login',
                        defaultMessage: '注册页',
                    })}
                    - {Settings.title}
                </title>
            </Helmet>
            <Lang />
            <div
                style={{
                    flex: '1',
                    padding: '32px 0',
                }}
            >
                <LoginForm
                submitter={{
                    searchConfig: {
                        submitText: '注册'
                    }
                }}
                    contentStyle={{
                        minWidth: 280,
                        maxWidth: '75vw',
                    }}
                    logo={<img alt="logo" src="/logo.svg" />}
                    title="小鹿智能BI"
                    // 二级标题
                    subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
                    // initialValues={{
                    //     // autoLogin: false,
                    // }}
                    // 提交注册表单信息
                    onFinish={async (values: API.UserRegisterRequest) => {
                        await handleSubmit(values as API.UserRegisterRequest);
                    }}
                > 
        
                    <Tabs
                        activeKey={type}
                        onChange={setType}
                        centered
                        items={[
                            {
                                key: 'account',
                                // label: intl.formatMessage({
                                //     id: 'pages.login.accountLogin.tab',
                                //     defaultMessage: '账户密码注册',
                                // }),
                                label: '账户密码注册',
                            
                            },

                        ]}
                    />
                    
                    {status === 'error' && type === 'account' && (
                        <RegisterMessage
                            content='账户或密码错误(admin/ant.design)'
                        />
                    )}
                    {type === 'account' && (
                        <>
                            <ProFormText
                                name="userAccount"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined />,
                                }}
                                // placeholder={intl.formatMessage({
                                //     id: 'pages.login.username.placeholder',
                                //     defaultMessage: '用户名: admin or user',
                                // })}
                                placeholder='用户名：'
                                rules={[
                                    {
                                        required: true,
                                        // message: (
                                        //     <FormattedMessage
                                        //         id="pages.login.username.required"
                                        //         defaultMessage="请输入用户名!"
                                        //     />
                                        // ),
                                        message:'请输入用户名!'
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="userPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined />,
                                }}
                                placeholder={'请输入密码！'}
                                rules={[
                                    {
                                        required: true,
                                        message: (
                                            <FormattedMessage
                                                id="pages.login.password.required"
                                                defaultMessage="请输入密码！"
                                            />
                                        ),
                                    },
                                ]}
                            />
                            <ProFormText.Password
                            // 检查密码
                                name="checkPassword"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined />,
                                }}
                                placeholder={'请再输入密码！'}
                                rules={[
                                    {
                                        required: true,
                                        message: "请再输入密码！",
                                    },
                                ]}
                            />
                        </>
                    )}

                    <div
                        style={{
                            marginBottom: 24,
                        }}
                    >
                        {/* <ProFormCheckbox noStyle name="autoLogin">
                            <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
                        </ProFormCheckbox> */}
                        {/* <a
                            style={{
                                float: 'right',
                            }}
                            href='register'
                        >
                            注册
                        </a> */}


                    </div>
                </LoginForm>
            </div>
            <Footer />
        </div>
    );
};

export default Register;
