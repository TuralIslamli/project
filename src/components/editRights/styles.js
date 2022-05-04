import { createStyles } from "@mui/styles";


export const styles = createStyles({
    addRightsContainer: {
        display: "flex",
        margin: 50,
        flexDirection: "column",
        width: 500,
    },
    formInputContainer: {
        width: '100%',
    },
    formButton: {
        height: 40,
        marginTop: 3,
        fontSize: 20,
        backgroundColor: '#23e9b4',
    },
    rightsWrapper: {
        minWidth: '49%',
        padding: '10px'
    },
    typographyBlock: {
        width: '250px',
        fontSize: '14px'
    },
    roleBlock: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '220px',
        marginTop: '10px',
        padding: '10px',
        cursor: 'pointer',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px;',
        "&:hover": {
            backgroundColor: '#F5F5F5',
            transition: '0.3s all ease-in',
        }
    },
    removeIcon: {
        fill: "red"
    },
    addIcon: {
        fill: "green"
    },
    word: {
        fontSize: '20px',
        textAlign: 'center',
        marginBottom: '10px'
    },
    lineVertical: {
        backgroundColor: '#bdbdbd',
        height: '100%',
        width: '1px',
        marginTop: '10px'
    }
});