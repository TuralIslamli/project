import { createStyles } from "@mui/styles";


export const styles = createStyles({
  formInputContainer: {
    width: "100%",
  },
  formInput: {
    marginBottom: 2,
    color: "black",
    "&:require": {
      backgroundColor: "white",
    },
  },
});