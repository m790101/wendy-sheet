import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import IcError from "../assets/icons/ic-error.svg"
import IcSuccess from "../assets/icons/ic-success.svg"
import IcWarning from "../assets/icons/ic-warning.svg"


export interface IBaseModalProps {
  isVisible: boolean
  onRequestClose: () => void
}

export interface IMsgBoxProps extends IBaseModalProps {
  title: string
  content: string
  titleImg?: "success" | "error" | "warning"
  mainBtn: {
    label: string
    onClick?: () => void
  }
  minorBtn?: {
    label: string
    onClick?: () => void
  }
}

export function MsgBox(props: IMsgBoxProps) {
  const handleMinorBtnClick = () => {
    props.minorBtn?.onClick && props.minorBtn.onClick()
    props.onRequestClose()
  }

  const handleMainBtnClick = () => {
    props.mainBtn?.onClick && props.mainBtn.onClick()
    props.onRequestClose()
  }

  const isNoWayToClose = !props.mainBtn && !props.minorBtn

  return (
    <Dialog
      maxWidth="xs"
      sx={{ "& .MuiDialog-paper": { minHeight: 392 } }}
      fullWidth={true}
      disableEscapeKeyDown={isNoWayToClose}
      open={props.isVisible}
      className="msg-box"
    >
      <div className="msg-box__title">
        <DialogTitle>
          {props.titleImg && (
            <div className="msg-box__title-img">
              {props.titleImg === "success" && <img src={IcSuccess} />}
              {props.titleImg === "error" && <img src={IcError} />}
              {props.titleImg === "warning" && <img src={IcWarning} />}
            </div>
          )}
          {props.title}
        </DialogTitle>
      </div>
      <DialogContent>
        <DialogContentText className="msg-box__content">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.minorBtn && (
          <Button variant="outlined" onClick={handleMinorBtnClick}>
            {props.minorBtn.label}
          </Button>
        )}
        {props.mainBtn && (
          <Button variant="contained" onClick={handleMainBtnClick}>
            {props.mainBtn.label}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}