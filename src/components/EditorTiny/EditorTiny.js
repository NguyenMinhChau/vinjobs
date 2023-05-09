import React, { forwardRef } from 'react';
import className from 'classnames/bind';
import { Editor } from '@tinymce/tinymce-react';
import styles from './EditorTiny.module.css';

const cx = className.bind(styles);

function EditorTiny({ textInitial, value }, ref) {
	return (
		<div className={`${cx('container')}`}>
			<Editor
				onInit={(evt, editor) => (ref.current = editor)}
				initialValue={value || `<p>${textInitial}</p>`}
				init={{
					width: '100%',
					height: 500,
					menubar: true,
					entity_encoding: 'raw',
					images_upload_url: 'postAcceptor.php',
					automatic_uploads: false,
					plugins: [
						'image',
						'media',
						'insertdatetime',
						'lists',
						'link',
						'directionality',
						'emoticons',
						'preview',
						'searchreplace',
						'table',
						'wordcount',
					],
					toolbar:
						'undo redo | styles |' +
						'searchreplace preview link image media insertdatetime emoticons |' +
						'bold italic underline backcolor forecolor | alignleft aligncenter alignright alignjustify ltr rtl|' +
						'outdent indent bullist numlist |' +
						'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol |' +
						'removeformat wordcount',
					content_style:
						'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
				}}
			/>
		</div>
	);
}

export default forwardRef(EditorTiny);
