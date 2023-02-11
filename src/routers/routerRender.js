import {
    Home,
    Introduce,
    FinancialReport,
    Training,
    Web,
    SoftwareDeliveryService,
    ProvidentFund,
    ProvidentFundHome,
    Recruitment,
    Contact,
    Login,
    Deposits,
    UploadDeposits,
    Withdraws,
    VerifyWithdraw,
    Transactions,
    Proifile,
    Investment,
    Fund,
    Partner,
    Customcare,
    InterestRateTable,
    SendFunds,
    ManagerFunds,
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
    { path: routers.login, component: Login, layout: null },
    { path: routers.register, component: Register, layout: null },
    { path: routers.forgotPwd, component: ForgotPwd, layout: null },
    { path: routers.resetPwd, component: ResetPwd, layout: null },

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
        path: `${routers.providentFund}/${routers.providentFundHome}`,
        component: ProvidentFundHome,
    },
    {
        path: `${routers.providentFund}/${routers.deposits}`,
        component: Deposits,
    },
    {
        path: `${routers.providentFund}/${routers.deposits}/${routers.uploadDeposits}`,
        component: UploadDeposits,
    },
    {
        path: `${routers.providentFund}/${routers.withdraws}`,
        component: Withdraws,
    },
    {
        path: `${routers.providentFund}/${routers.withdraws}/${routers.verifyWithdraw}`,
        component: VerifyWithdraw,
    },
    {
        path: `${routers.providentFund}/${routers.transactions}`,
        component: Transactions,
    },
    {
        path: `${routers.providentFund}/${routers.profile}`,
        component: Proifile,
    },
    {
        path: `${routers.providentFund}/${routers.fund}`,
        component: Fund,
    },
    {
        path: `${routers.providentFund}/${routers.fund}/${routers.interestRateTable}`,
        component: InterestRateTable,
    },
    {
        path: `${routers.providentFund}/${routers.fund}/${routers.sendFunds}`,
        component: SendFunds,
    },
    {
        path: `${routers.providentFund}/${routers.fund}/${routers.managerFund}`,
        component: ManagerFunds,
    },
    {
        path: `${routers.providentFund}/${routers.investment}`,
        component: Investment,
    },
    {
        path: `${routers.providentFund}/${routers.partner}`,
        component: Partner,
    },
    {
        path: `${routers.providentFund}/${routers.customcare}`,
        component: Customcare,
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
