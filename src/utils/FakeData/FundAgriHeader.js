const DataFundAgriHeader = (Icons) => {
    return {
        headers: {
            name: process.env.REACT_APP_FUND_AGRI_HEADER,
            index: {
                title: 'STT',
            },

            h1: {
                title: 'Tài khoản',
            },
            h2: {
                title: 'Mã HD',
                iconSort: <i className='fa-solid fa-sort'></i>,
            },
            h3: {
                title: 'Kỳ hạn',
            },
            h4: {
                title: 'Số tiền gửi',
            },
            h5: {
                title: 'Trạng thái',
            },
        },
    };
};

export default DataFundAgriHeader;
