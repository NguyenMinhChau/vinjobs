const DataWithdraws = (Icons) => {
    return {
        headers: {
            name: process.env.REACT_APP_WITHDRAW_NAME,
            index: {
                title: 'STT',
            },
            h1: {
                title: 'Số tiền rút',
            },
            h2: {
                title: 'Tài khoản',
            },
            h3: {
                title: 'Ngày rút',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h4: {
                title: 'Tạo bởi',
            },
            h5: {
                title: 'Trạng thái',
            },
        },
    };
};

export default DataWithdraws;
