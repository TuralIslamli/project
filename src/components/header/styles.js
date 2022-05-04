import { createStyles } from "@mui/styles";


export const styles = createStyles({
    headerStack: {
        display: 'flex',
        marginBottom: 2,
        alignItems: "center",
        marginTop: "15px"
    },
    logoUserInfo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    stackStyles: {
        display: 'flex',
        marginBottom: 2,
        alignItems: "flex-end",
        marginTop: "15px",
        position: 'relative'
    },
    burger: {
        color: '#fff',
        fontSize: '36px',
        cursor: 'pointer',
        position: 'relative',
    },
    line: {
        width: '30px',
        height: '4px',
        backgroundColor: 'white',
        margin: '5px',
        transition: '0.6s all ease-in',
    },
    lineFirst: {
        width: '30px',
        height: '4px',
        backgroundColor: 'white',
        margin: '5px',
        transition: '0.5s all ease-in',
        position: 'absolute',
        opacity: '0',
    },
    lineSecond: {
        width: '30px',
        height: '4px',
        backgroundColor: 'white',
        margin: '5px',
        transition: '0.4s all ease-in',
        position: 'absolute',
        transform: 'rotate(675deg)'
    },
    lineThird: {
        width: '30px',
        height: '4px',
        backgroundColor: 'white',
        margin: '4px',
        transition: '0.4s all ease-in',
        marginLeft: '5px',
        transform: 'rotate(45deg)'
    }
});