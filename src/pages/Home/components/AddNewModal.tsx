import { FormControl, FormHelperText, TextField } from "@mui/material"
import FormModal from "../../../component/FormModal"
import { useFormik } from "formik"
import Yup from "../../../utils/validations/yupSchemaExtended"
import { showMsgBox } from "../../../utils/helpers/msgHelper"
import itemApi from "../../../api/itemApi"
import errorService from "../../../service/errorService"

const initialValues = {
    itemName: "",
    itemNumber: 0,
}

const validationSchema = Yup.object().shape({
    itemName: Yup.string().required('請輸入物品名稱'),
    itemNumber: Yup.number().required('請輸入物品數量')
})


const AddNewModal = ({ isVisible, setIsVisible, setIsRefresh }) => {

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async(values) => {
            await handleAddSubmit(values)
            handleResetForm()
            setIsVisible(false)
            setIsRefresh(true)
        },
    })

    const handleResetForm = () => {
        formik.resetForm({
            values: initialValues,
        })
    }

    return (
        <>
            <FormModal
                title="新增物品"
                hasCloseBtn={true}
                maxWidth="sm"
                isVisible={isVisible}
                mainBtn={{ label: "Ok", onClick: () => { formik.handleSubmit() } }}
                minorBtn={{
                    label: "Cancel",
                }}
                onRequestClose={() => {
                    setIsVisible(false)
                    handleResetForm()
                }} >

                <form onSubmit={formik.handleSubmit}>
                    <label className="form__label form__label--required" htmlFor="itemName">物品名稱</label>
                    <FormControl fullWidth>
                        <TextField
                            id="itemName"
                            name="itemName"
                            label=""
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.itemName}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText
                            error={
                                formik.touched.itemName && Boolean(formik.errors.itemName)
                            }
                        >
                            {formik.errors.itemName
                                ? formik.errors.itemName
                                : null}
                        </FormHelperText>
                    </FormControl>
                    <label className="form__label form__label--required" htmlFor="itemName">物品數量</label>
                    <FormControl fullWidth>
                        <TextField
                            id="itemNumber"
                            name="itemNumber"
                            type="number"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.itemNumber}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText
                            error={
                                formik.touched.itemNumber && Boolean(formik.errors.itemNumber)
                            }
                        >
                            {formik.errors.itemNumber
                                ? formik.errors.itemNumber
                                : null}
                        </FormHelperText>
                    </FormControl>
                </form>
            </FormModal>
        </>
    )
}



export default AddNewModal


const handleAddSubmit = async (data) => {
    const res = await itemApi.addItems({ data })
    const { header: { code, message } } = res.data

    if (code === '0000') {
        showMsgBox({
            content: `已成功新增${data.itemName}!`,
            titleImg: "success",
            title: "更新成功",
            mainBtn: { label: "我知道了" },
        })
    } else {
        errorService.showErrorMsg(message)
    }
}


