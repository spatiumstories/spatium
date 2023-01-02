import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const fictionGenres = [
    'Fantasy',
    'Science Fiction',
    'Dystopian',
    'Action & Adventure',
    'Mystery',
    'Horror',
    'Thriller & Suspense',
    'Historical Fiction',
    'Romance',
    'Women\'s Fiction',
    'Contemporary Fiction',
    'Literary Fiction',
    'Magical Realism',
    'Graphic Novel',
    'Young Adult',
    'Children\'s',
];

const nonFictionGenres = [
    'Memoir & Autobiography',
    'Biography',
    'Food & Drink',
    'Art & Photography',
    'Self-help',
    'History',
    'Travel',
    'True Crime',
    'Humor',
    'Essays',
    'Guide / How-To',
    'Religion & Spirituality',
    'Humanities & Social Sciences',
    'Parenting & Families',
    'Science & Technology',
    'Children\'s'
]

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const GenrePicker = (props) => {
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    let genres = typeof value === 'string' ? value.split(',') : value;
    props.onChange(genres);
  };

  const genres = props.fiction ? fictionGenres : nonFictionGenres;

  return (
    <div>
      <FormControl sx={{ m: 1, width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">Genre (pick multiple)</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={props.genres}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Genre (pick multiple)" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {genres.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, props.genres, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default GenrePicker;