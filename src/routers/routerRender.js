import {
	Home,
	Jobs,
	Login,
	Contact,
	Register,
	ForgotPwd,
	ResetPwd,
	Forum,
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
	{ path: routers.jobs, component: Jobs },
	{
		path: routers.forum,
		component: Forum,
	},
	{
		path: routers.contact,
		component: Contact,
	},
	{ path: routers.pageNotFound, component: PageNotFound, layout: null },
];
export const adminRouter = [];
