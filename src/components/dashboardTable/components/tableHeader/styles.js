import { createStyles } from "@mui/styles";


export const styles = createStyles({
    tableHeader: {
        width: '100%',
    },
    dateCell: {
        minWidth: 200,
        position: 'sticky',
        zIndex: '10',
        left: 0,
        textAlign: 'center',
        backgroundColor: 'rgb(50, 0, 100)',
        color: 'white'
    },
    totalCell: {
        minWidth: 150,
        position: 'sticky',
        right: 150,
        textAlign: 'center',
        backgroundColor: 'rgb(50, 0, 100)',
        color: 'white'
    },
    differenceCell: {
        minWidth: 150,
        position: 'sticky',
        right: 0,
        textAlign: 'center',
        backgroundColor: 'rgb(50, 0, 100)',
        color: 'white'
    },
    inOutCell: {
        textAlign: 'center',
        width: 700,
        backgroundColor: 'rgb(25, 50, 150)',
        color: 'white',
        position: 'relative'
    },
    verticalLine: {
        position: 'absolute !important',
        top: '0',
        right: '0',
        height: '100%',
        width: '2px',
        backgroundColor: 'rgba(224,224,224,1)',
    },
    verticalLineWithZIndex: {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '2px',
        backgroundColor: 'rgba(224,224,224,1)',
        zIndex: '10'
    }
});