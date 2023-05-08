/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { DefaultLayouts } from './layouts';
import { privateRouter, publicRouter } from './routers/routerRender';
import { useAppContext } from './utils';
import { setData } from './app/reducer';
import { routers } from './routers';

function App() {
	const { state, dispatch } = useAppContext();
	const { currentUser } = state.set;
	const [scrollToTop, setScrollToTop] = useState(false);
	const Routers = privateRouter;
	const history = useNavigate();
	useEffect(() => {
		const handleScrollToTop = () => {
			const heightY = window.scrollY;
			if (heightY > 100) {
				setScrollToTop(true);
			} else {
				setScrollToTop(false);
			}
		};
		window.addEventListener('scroll', handleScrollToTop);
		if (currentUser) {
			dispatch(
				setData({
					currentUser: currentUser,
				}),
			);
		} else {
			if (
				!currentUser &&
				!!privateRouter.includes(window.location.pathname)
			) {
				history(routers.home);
			} else {
				privateRouter.includes(window.location.pathname);
			}
		}
	}, []);
	return (
		<>
			<div className="app">
				<Routes>
					{Routers.map((route, index) => {
						const Layout = route.layout
							? route.layout
							: route.layout === null
							? Fragment
							: DefaultLayouts;
						const Page = route.component;
						return (
							<Route
								key={index}
								path={route.path}
								element={
									<Layout>
										<Page />
									</Layout>
								}
							/>
						);
					})}
				</Routes>
				<MessengerCustomerChat
					pageId="104145032476041"
					appId="468033418602915"
				/>
				{scrollToTop && (
					<div
						className="scroll-to-top-container"
						onClick={() => {
							window.scrollTo({ top: 0, behavior: 'smooth' });
						}}
					>
						<i className="fa-solid fa-arrow-up"></i>
					</div>
				)}
			</div>
		</>
	);
}

export default App;
