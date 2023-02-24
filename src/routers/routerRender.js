import routers from './routers';
import {
    Dashboard,
    Home,
    Deposits,
    Withdraw,
    User,
    UserDetail,
    Login,
    DepositsWithdrawDetail,
    Register,
    ResetPwd,
    FundUSD,
    UsdAgricultureDetail,
    FundAgriculture,
    ForgotPwd,
} from '../Layouts';

import { PageNotFound } from '../components';

export const publicRouter = [
    { path: routers.login, component: Login, layout: null },
    { path: routers.register, component: Register, layout: null },
    { path: routers.forgotPwd, component: ForgotPwd, layout: null },
    { path: routers.resetPwd, component: ResetPwd, layout: null },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];
export const privateRouter = [
    { path: routers.login, component: Login, layout: null },
    { path: routers.register, component: Register, layout: null },
    { path: routers.forgotPwd, component: ForgotPwd, layout: null },
    { path: routers.resetPwd, component: ResetPwd, layout: null },
    { path: routers.home, component: Home },
    { path: routers.dashboard, component: Dashboard },
    { path: routers.deposits, component: Deposits },
    {
        path: `${routers.deposits}/:idDeposits`,
        component: DepositsWithdrawDetail,
    },
    { path: routers.withdraw, component: Withdraw },
    {
        path: `${routers.withdraw}/:idWithdraw`,
        component: DepositsWithdrawDetail,
    },
    { path: routers.contractUsd, component: FundUSD },
    {
        path: `${routers.contractUsd}/:idContractUsd`,
        component: UsdAgricultureDetail,
    },
    { path: routers.contractAgriculture, component: FundAgriculture },
    {
        path: `${routers.contractAgriculture}/:idContractAgri`,
        component: UsdAgricultureDetail,
    },
    { path: routers.user, component: User },
    { path: `${routers.user}/:idUser`, component: UserDetail },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];
