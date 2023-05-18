/* eslint-disable no-unused-vars */
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import className from 'classnames/bind';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import styles from './SelectMultiple.module.css';
import { useAppContext } from '../../utils';
import { actions } from '../../app/';

const cx = className.bind(styles);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(name, personName, theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function SelectMultiple({
	data,
	placeholder,
	label,
	labelClass,
}) {
	const { state, dispatch } = useAppContext();
	const {
		editor: { area },
	} = state.set;
	const theme = useTheme();
	const [personName, setPersonName] = React.useState([]);
	const handleChange = (event) => {
		const {
			target: { value },
		} = event;
		setPersonName(typeof value === 'string' ? value.split(',') : value);
		dispatch(
			actions.setData({
				editor: {
					...state.set.editor,
					area: typeof value === 'string' ? value.split(',') : value,
				},
			}),
		);
	};
	return (
		<div style={{ margin: '10px 0', width: '100%' }}>
			{label && <label className={`label ${labelClass}`}>{label}</label>}
			<FormControl style={{ width: '100%' }}>
				<InputLabel id="demo-multiple-chip-label">
					{placeholder}
				</InputLabel>
				<Select
					labelId="demo-multiple-chip-label"
					id="demo-multiple-chip"
					multiple
					value={area || personName}
					onChange={handleChange}
					input={
						<OutlinedInput
							id="select-multiple-chip"
							label={placeholder}
						/>
					}
					renderValue={(selected) => {
						return (
							<Box
								sx={{
									display: 'flex',
									flexWrap: 'wrap',
									gap: 0.5,
								}}
							>
								{area.map((value) => {
									return <Chip key={value} label={value} />;
								})}
							</Box>
						);
					}}
					MenuProps={MenuProps}
				>
					{data?.map((item) => (
						<MenuItem
							key={item?.id}
							value={item?.desc}
							style={getStyles(item?.name, personName, theme)}
						>
							{item?.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
