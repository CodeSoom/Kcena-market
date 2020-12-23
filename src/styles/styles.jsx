import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    '& a': {
      color: '#fff',
      textDecoration: 'none',
      outline: 'none',
    },
    '& button': {
      fontSize: '1.1rem',
    },
  },
  page: {
    paddingTop: theme.spacing(8),
  },
  form: {
    marginTop: theme.spacing(1),
  },
  dropzoneArea: {
    border: '2px dashed black',
    padding: theme.spacing(5),
    marginTop: theme.spacing(3),
  },
  deleteButton: {
    position: 'absolute',
    top: '-25%',
    left: '-30%',
    zIndex: 10,
  },
  productDetail: {
    padding: '20px 80px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

export default useStyles;
