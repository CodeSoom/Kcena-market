import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(8),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  dropzoneArea: {
    border: '2px dashed black',
    padding: theme.spacing(5),
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
