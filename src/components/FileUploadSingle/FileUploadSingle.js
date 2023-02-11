/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react';
import className from 'classnames/bind';
import styles from './FileUploadSingle.module.css';
import { useAppContext } from '../../utils';
import { Pane, FileUploader, FileCard } from 'evergreen-ui';
import { setData } from '../../app/reducer';

const cx = className.bind(styles);

export default function FileUploadSingle({ label = 'Upload File', desc }) {
    const { state, dispatch } = useAppContext();
    const { file } = state.set;
    // const [files, setFiles] = React.useState([]);
    const [fileRejections, setFileRejections] = React.useState([]);
    const handleChange = React.useCallback(
        (files) =>
            // setFiles([files[0]])
            dispatch(setData({ file: [files[0]] })),
        []
    );
    const handleRejected = React.useCallback(
        (fileRejections) => setFileRejections([fileRejections[0]]),
        []
    );
    const handleRemove = React.useCallback(() => {
        // setFiles([]);
        dispatch(setData({ file: [] }));
        setFileRejections([]);
    }, []);
    return (
        <div className={`${cx('container')} mt8`}>
            <Pane maxWidth={654}>
                <FileUploader
                    label={label}
                    description={desc}
                    maxSizeInBytes={50 * 1024 ** 2}
                    maxFiles={1}
                    onChange={handleChange}
                    onRejected={handleRejected}
                    renderFile={(file) => {
                        const { name, size, type } = file;
                        const fileRejection = fileRejections.find(
                            (fileRejection) => fileRejection.file === file
                        );
                        const { message } = fileRejection || {};
                        return (
                            <FileCard
                                key={name}
                                isInvalid={fileRejection != null}
                                name={name}
                                onRemove={handleRemove}
                                sizeInBytes={size}
                                type={type}
                                validationMessage={message}
                            />
                        );
                    }}
                    values={file}
                />
            </Pane>
        </div>
    );
}
