// Js
// Etc
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';

const CommonSelect = ({ ...props }) => {
    const {
        value = 'none',
        onChange = () => {},
        options = [],
        sx = {},
        dropdownSx = {},
        width = 180,
        height = 30,
    } = props;

    return (
        <StyledFormControl sx={sx} width={width} height={height}>
            <Select value={value} onChange={onChange}>
                {options.map((option) => {
                    const [key] = Object.keys(option);
                    return (
                        <MenuItem sx={dropdownSx} value={key} key={key}>
                            {option[key]}
                        </MenuItem>
                    );
                })}
            </Select>
        </StyledFormControl>
    );
};

const StyledFormControl = styled(FormControl)(({ width, height }) => ({
    '&': {
        '&.MuiButtonBase-root': {
            width,
        },
        '& .MuiInputBase-root': {
            width,
            height: '30px',
        },
        '& .MuiSelect-select': {
            padding: 0,
        },
    },
}));

export default CommonSelect;
