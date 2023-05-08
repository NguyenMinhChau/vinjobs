import {
	Home,
	Training,
	Login,
	Contact,
	Register,
	ForgotPwd,
	ResetPwd,
	Recruitment,
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
	{ path: routers.training, component: Training },
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
