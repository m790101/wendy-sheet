import { FormControl, FormHelperText, TextField } from "@mui/material"
import FormModal from "../../../component/FormModal"
import { useFormik } from "formik"
import Yup from "../../../utils/validations/yupSchemaExtended"
import { SetStateAction } from "react"
import React from "react"
import useGetItemApi from "../hook/useGetItemApi"
import useAddItemApi from "../hook/useAddItemApi"

const initialValues = {
    itemName: "",
    itemNumber: 0,
}

const validationSchema = Yup.object().shape({
    itemName: Yup.string().required('請輸入物品名稱'),
    itemNumber: Yup.number().required('請輸入物品數量')
})


interface AddNewModalProps{
    isVisible:boolean,
    setIsVisible:React.Dispatch<SetStateAction<boolean>>,
    setDataListInitial:(data: SetStateAction<never[]>) => void
}


const AddNewModal = ({ isVisible, setIsVisible, setDataListInitial }:AddNewModalProps) => {
    const {getItemsApi} = useGetItemApi()
    const {addItemsApi} = useAddItemApi()

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async(values) => {
            // await handleAddSubmit(values,addItems)
            handleResetForm()
            await addItemsApi(values)
            await getItemsApi(setDataListInitial)
            setIsVisible(false)
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
                            {formik.touched.itemName
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
                            {formik.touched.itemNumber
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




