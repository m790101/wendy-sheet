import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { PropsWithChildren } from "react"

interface IBaseModalProps {
  isVisible: boolean
  onRequestClose: () => void
}

export interface IFormModalProps extends IBaseModalProps {
  title: string
  hasCloseBtn?: boolean
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl"
  mainBtn?: {
    label: string
    onClick?: () => void
  }
  minorBtn?: {
    label: string
    onClick?: () => void
  }
}

export default function FormModal(props: PropsWithChildren<IFormModalProps>) {
  const handleOnClose = () => {
    props.onRequestClose()
  }

  const handleMinorBtnClick = () => {
    props.minorBtn?.onClick && props.minorBtn.onClick()
    props.onRequestClose()
  }

  const handleMainBtnClick = () => {
    props.mainBtn?.onClick && props.mainBtn.onClick()
  }

  const isNoWayToClose = !props.mainBtn && !props.minorBtn && !props.hasCloseBtn

  return (
    <Dialog
      maxWidth={props.maxWidth || "xs"}
      fullWidth={true}
      disableEscapeKeyDown={isNoWayToClose || props.hasCloseBtn}
      open={props.isVisible}
      onClose={handleOnClose}
      className="form-modal"
    >
      <div className="form-modal__title">
        <DialogTitle>
          {props.title}
          {props.hasCloseBtn && (
            <CloseRoundedIcon
              onClick={handleOnClose}
              className="icons-materia form-modal__close-btn"
            />
          )}
        </DialogTitle>
      </div>
      <DialogContent>{props.children}</DialogContent>
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