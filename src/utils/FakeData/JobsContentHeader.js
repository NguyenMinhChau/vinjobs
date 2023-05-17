const DataJobsContentHeader = (Icons) => {
	return {
		headers: {
			name: process.env.REACT_APP_JOB_CONTENT_HEADER,
			index: {
				title: 'STT',
			},

			h1: {
				title: 'Người tạo',
			},
			h2: {
				title: 'Nội dung',
			},
			h3: {
				title: 'Hình ảnh',
			},
			h4: {
				title: 'Ngày tạo',
			},
			h5: {
				title: 'Lĩnh vực',
			},
		},
	};
};

export default DataJobsContentHeader;
