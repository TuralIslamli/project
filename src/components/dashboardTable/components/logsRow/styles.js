import { createStyles } from "@mui/styles";


export const styles = createStyles({
    dateRow: {
        left: 0,
        backgroundColor: 'white',
        textAlign: 'center',
        zIndex: 2,
        position: 'sticky'
    },
    totalRow: {
        right: 150,
        textAlign: 'center',
        position: 'sticky'
    },
    differenceRow: {
        right: 0,
        position: 'sticky',
        textAlign: 'center'
    },
    inOutRow: {
        textAlign: 'center',
        minWidth: 220,
        flexDirection: 'row',
    },
    verticalLineLeftPosition: {
        position: 'absolute',
        top: '0',
        left: '0',
        height: '100%',
        width: '2px',
        backgroundColor: 'rgba(224,224,224,1)',
        zIndex: '10'
    },
    verticalLineRightPosition: {
        position: 'absolute',
        top: '0',
        right: '0',
        height: '100%',
        width: '2px',
        backgroundColor: 'rgba(224,224,224,1)',
    }
});