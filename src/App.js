/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { DefaultLayouts } from './layouts';
import { privateRouter, publicRouter } from './routers/routerRender';
import axios from 'axios';
import { IconGetApp, ProgressLine } from './components';
import { useAppContext } from './utils';
import { setData } from './app/reducer';
import { routers } from './routers';
// import { useAppContext } from './utils';

function App() {
    const { state, dispatch } = useAppContext();
    const { currentUser } = state.set;
    const [scrollToTop, setScrollToTop] = useState(false);
    const [getApp, setGetApp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [valueProgress, setValueProgress] = useState(0);
    const Routers = privateRouter;
    const history = useNavigate();
    const toogleGetApp = (e) => {
        e.stopPropagation();
        setGetApp(!getApp);
    };
    const getAppTrue = (e) => {
        e.stopPropagation();
        setGetApp(true);
    };
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
                })
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
    const downloadFile = async (url, name) => {
        setIsLoading(true);
        setGetApp(true);
        await axios({
            url: url,
            method: 'GET',
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setValueProgress(percentCompleted);
                if (percentCompleted >= 100) {
                    setTimeout(() => {
                        setIsLoading(false);
                        setGetApp(false);
                        setValueProgress(0);
                    }, 2000);
                }
            },
        })
            .then((res) => {
                const url = window.URL.createObjectURL(res.data);
                const a = document.createElement('a');
                a.href = url;
                a.download = name;
                a.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };
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
                <div
                    className='btn-down-app'
                    onClick={toogleGetApp}
                    style={{ right: scrollToTop ? '70px' : '20px' }}
                >
                    <span>Get App Mobile</span>
                    {getApp && (
                        <div
                            className='list-app-container'
                            onClick={getAppTrue}
                        >
                            <div
                                onClick={() => {
                                    downloadFile(
                                        require('./APK Android/app-release.apk'),
                                        'Provident Fund | AIKING GROUP'
                                    );
                                }}
                                className='list-app-item'
                            >
                                <IconGetApp.AndroidIcon />
                                <div className='list-app-item-text ml8'>
                                    {isLoading ? (
                                        <>
                                            <div>
                                                {valueProgress >= 100
                                                    ? 'Done!'
                                                    : 'Downloading, please wait...'}
                                            </div>
                                            <ProgressLine
                                                value={valueProgress}
                                            />
                                        </>
                                    ) : (
                                        'Download for Android (.apk)'
                                    )}
                                </div>
                            </div>
                            {/* <a
                                className='list-app-item'
                                href='##'
                                target='_blank'
                                alt='Download on Google Play'
                                rel='noreferrer'
                            >
                                <IconGetApp.CHPlayIcon />
                                <div className='list-app-item-text ml8'>
                                    Download on Google Play
                                </div>
                            </a> */}
                            <div
                                className='list-app-item'
                                onClick={() => alert('Đang phát triển')}
                            >
                                <IconGetApp.CHPlayIcon />
                                <div className='list-app-item-text ml8'>
                                    Download on Google Play
                                </div>
                            </div>
                            <div
                                className='list-app-item'
                                onClick={() => alert('Đang phát triển')}
                            >
                                <IconGetApp.AppleStoreIcon />
                                <div className='list-app-item-text ml8'>
                                    Download on Apple Store
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
