import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import dashboardItems from '../data/dashboardItems';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', // Overrides inline-style
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'relative',
  left: 10,
  right: 10,
  top: 10,
  bottom: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function ButtonBases() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const images = dashboardItems;
  const image = images[index];
  const image2 = images[index + 1];

  const checkNumber = (number) => {
    if (number > images.length - 2) {
      return 0;
    }
    if (number < 0) {
      return images.length - 2;
    }
    return number;
  };
  const nextItem = () => {
    setIndex((index) => {
      let newIndex = index + 1;
      return checkNumber(newIndex);
    });
  };
  const prevItem = () => {
    setIndex((index) => {
      let newIndex = index - 1;
      return checkNumber(newIndex);
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        minWidth: 300,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
      }}
    >
      <div className="button-container">
        <button className="prev-btn" onClick={prevItem}>
          <FaChevronLeft />
        </button>
      </div>
      <ImageButton
        focusRipple
        key={image.title}
        style={{
          width: image.width,
        }}
        sx={{
          marginTop: 2,
          marginLeft: 2,
          marginRight: 2,
          marginBottom: 2,
          height: 400,
        }}
        onClick={() => {
          navigate(image.redirectUrl);
        }}
      >
        <ImageSrc style={{ backgroundImage: 'url(' + image.url + ')' }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />
        <Image>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            sx={{
              position: 'relative',
              p: 4,
              pt: 2,
              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
            }}
          >
            {image.title}
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
        </Image>
      </ImageButton>
      <ImageButton
        focusRipple
        key={image2.title}
        style={{
          width: image2.width,
        }}
        sx={{
          marginTop: 2,
          marginLeft: 2,
          marginRight: 2,
          marginBottom: 2,
          height: 400,
        }}
        onClick={() => {
          navigate(image.redirectUrl);
        }}
      >
        <ImageSrc style={{ backgroundImage: 'url(' + image2.url + ')' }} />
        <ImageBackdrop className="MuiImageBackdrop-root" />

        <Image>
          <Typography
            component="span"
            variant="subtitle1"
            color="inherit"
            sx={{
              position: 'relative',
              p: 4,
              pt: 2,
              pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
            }}
          >
            {image2.title}
            <ImageMarked className="MuiImageMarked-root" />
          </Typography>
        </Image>
      </ImageButton>

      <div className="button-container">
        <button className="next-btn" onClick={nextItem}>
          <FaChevronRight />
        </button>
      </div>
    </Box>
  );
}
