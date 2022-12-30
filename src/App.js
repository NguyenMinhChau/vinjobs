import { Fragment, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DefaultLayouts } from './layouts';
import { privateRouter } from './routers/routerRender';
// import { useAppContext } from './utils';

function App() {
    // const { state } = useAppContext();
    const [scrollToTop, setScrollToTop] = useState(false);
    const Routers = privateRouter;
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
    }, []);
    return (
        <>
            <div className='app'>
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
                {scrollToTop && (
                    <div
                        className='scroll-to-top-container'
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                    >
                        <i className='fa-solid fa-arrow-up'></i>
                    </div>
                )}
            </div>
        </>
    );
}

export default App;
