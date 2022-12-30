import {
    Home,
    Introduce,
    FinancialReport,
    Training,
    Web,
    SoftwareDeliveryService,
    ProvidentFund,
    Recruitment,
    Contact,
    Login,
    Register,
    ForgotPwd,
    ResetPwd,
    PageNotFound,
} from '../layouts';
import routers from './routers';

export const publicRouter = [
    { path: routers.login, component: Login, layout: null },
    { path: routers.register, component: Register, layout: null },
    { path: routers.forgotPwd, component: ForgotPwd, layout: null },
    { path: routers.resetPwd, component: ResetPwd, layout: null },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];
export const privateRouter = [
    { path: routers.home, component: Home },
    { path: routers.introduce, component: Introduce },
    { path: routers.financialReport, component: FinancialReport },
    { path: routers.training, component: Training },
    { path: routers.web, component: Web },
    {
        path: routers.softwareDeliveryService,
        component: SoftwareDeliveryService,
    },
    {
        path: routers.providentFund,
        component: ProvidentFund,
    },
    {
        path: routers.recruitment,
        component: Recruitment,
    },
    {
        path: routers.contact,
        component: Contact,
    },
    { path: routers.pageNotFound, component: PageNotFound, layout: null },
];
export const adminRouter = [];
