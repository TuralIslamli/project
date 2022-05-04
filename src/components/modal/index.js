import * as React from 'react';
import { styled } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { useSelector, useDispatch } from 'react-redux';
import { getIsShowHistoryLoading, getShowRecHistory } from "../../modules/redux/showRecHistory/selectors";
import { AppBar, List, ListItemText, Stack } from "@mui/material";
import { setModal, setShowRecHistoryRedux } from '../../modules/redux/showRecHistory/actions';
import Lottie from 'react-lottie';
import buttonLoading from '../../assets/lottieAnimation/buttonLoading.json';
import { localization } from '../../modules/localization';
import { getReasons } from '../../modules/redux/applicationInfo/selectors';


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

export default function ModalHistory() {
  const dispatch = useDispatch();
  const modalWindow = useSelector(getShowRecHistory);
  const reasons = useSelector(state => state.applicationInfoReducer.reasons);
  const isHistoryLoading = useSelector(getIsShowHistoryLoading);

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    dispatch(setModal(false));
    dispatch(setShowRecHistoryRedux([]));
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: buttonLoading,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const loading = <Lottie width={50} height={50} options={defaultOptions} />;

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={modalWindow.openModal}
      onClose={handleClose}
      BackdropComponent={Backdrop}
      sx={{ maxHeight: "50vh", margin: "auto", overflowY: "scroll", display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column' }}
    >
      <List sx={style}>
        <AppBar style={{ backgroundColor: "#320064", position: "relative", textAlign: "center", height: "30px", padding: "5px", marginBottom: "30px" }}>
          <b>{localization.HISTORY}</b>
        </AppBar>
        {modalWindow.data.length ? modalWindow.data.map((item, index) => {
          return (
            <Stack sx={{ marginBottom: 3, padding: '10px 20px', color: "white", backgroundColor: "#320064" }} elevation={10} key={index}>
              <ListItemText>
                <b>{localization.DATE_TIME_HISTORY}</b> <i>{item.created_time}</i>
              </ListItemText>
              {item.cud_reason_id == "0" ?
                <ListItemText>
                  <b>{localization.REASON_HISTORY}</b> <i>{localization.APPROVING_PROCESS_HISTORY}</i>
                </ListItemText>
                : reasons.map((reason, index) => {
                  return (
                    reason.id == item.cud_reason_id ?
                      <ListItemText key={index}>
                        <b>{localization.REASON_HISTORY}</b> <i>{reason.cud_reason_text}</i>
                      </ListItemText> : null
                  );
                })
              }
              <ListItemText>
                <b>{localization.DESCRIPTION_HISTORY}</b><i style={{ wordBreak: 'break-word' }}>{item.description}</i>
              </ListItemText>
              <ListItemText>
                <b>{localization.ADDED_BY_HISTORY}</b> <i>{item.firstname_lastname}</i>
              </ListItemText>
            </Stack>
          );
        }) :
          <ListItemText style={{ textAlign: "center" }} disabled={isHistoryLoading}>
            {isHistoryLoading ? loading : localization.EMPTY}
          </ListItemText>
        }
      </List>
    </StyledModal>
  );
};