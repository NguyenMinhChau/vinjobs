const DataUserBalance = () => {
    return {
        headers: {
            name: process.env.REACT_APP_DASHBOARD_NAME,
            index: {
                title: 'STT',
            },
            h1: {
                title: 'Họ và tên',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h2: {
                title: 'Email',
            },
            h3: {
                title: 'Tài sản',
            },
            h4: {
                title: 'Quyền',
            },
            h5: {
                title: 'Hạng',
            },
        },
    };
};

export default DataUserBalance;
