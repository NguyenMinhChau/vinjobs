import routers from './routers';
import {
	Home,
	User,
	Content,
	UserDetail,
	Login,
	Register,
	ResetPwd,
	ForgotPwd,
	CreateHomeContent,
	CreateJobsContent,
	CreateRecuiterContent,
	CreateContactContent,
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
	{ path: routers.user, component: User },
	{ path: routers.content, component: Content },
	{
		path: `${routers.content}/${routers.createhomecontent}`,
		component: CreateHomeContent,
	},
	{
		path: `${routers.content}/${routers.updatehomecontent}/:idHomeContent`,
		component: CreateHomeContent,
	},
	{
		path: `${routers.content}/${routers.createjobscontent}`,
		component: CreateJobsContent,
	},
	{
		path: `${routers.content}/${routers.updatejobscontent}/:idJobsContent`,
		component: CreateJobsContent,
	},
	{
		path: `${routers.content}/${routers.createrecuitercontent}`,
		component: CreateRecuiterContent,
	},
	{
		path: `${routers.content}/${routers.updaterecuitercontent}/:idRecuiterContent`,
		component: CreateRecuiterContent,
	},
	{
		path: `${routers.content}/${routers.createcontactcontent}`,
		component: CreateContactContent,
	},
	{
		path: `${routers.content}/${routers.updatecontactcontent}/:idContactContent`,
		component: CreateContactContent,
	},
	{ path: `${routers.user}/:idUser`, component: UserDetail },
	{ path: routers.pageNotFound, component: PageNotFound, layout: null },
];
