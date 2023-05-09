const DataTrainingContentHeader = (Icons) => {
	return {
		headers: {
			name: process.env.REACT_APP_TRAINING_CONTENT_HEADER,
			index: {
				title: 'STT',
			},

			h1: {
				title: 'Nội dung',
			},
			h2: {
				title: 'Hình ảnh',
			},
		},
	};
};

export default DataTrainingContentHeader;
