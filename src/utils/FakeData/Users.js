const DataUsers = (Icons) => {
	return {
		headers: {
			name: process.env.REACT_APP_USER_NAME,
			index: {
				title: 'STT',
			},
			h1: {
				title: 'Họ và tên',
				iconSort: <i className="fa-solid fa-sort"></i>,
			},
			h2: {
				title: 'Email',
			},
			h3: {
				title: 'Ngày tạo',
			},
			h4: {
				title: 'Quyền',
			},
		},
	};
};

export default DataUsers;
