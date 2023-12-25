import { FormControl, FormHelperText, MenuItem, Select, TextField } from "@mui/material"
import FormModal from "../../../component/FormModal"
import { useFormik } from "formik"
import Yup from "../../../utils/validations/yupSchemaExtended"
import { SetStateAction, useEffect, useState } from "react"
import React from "react"
import useGetItemApi from "../hook/useGetItemApi"
import useAddItemApi from "../hook/useAddItemApi"
import useGetTypesApi from "../hook/useGetTypesApi"

const initialValues = {
    itemType: [],
    itemUnit: "",
    itemName: "",
    itemNumber: 0,
    itemRemark: ""
}

const validationSchema = Yup.object().shape({
    itemType: Yup.string().max(50, '不可超過50字'),
    itemName: Yup.string().required('請輸入物品名稱'),
    itemNumber: Yup.number().min(0, '不可小於零').required('請輸入物品數量'),
    itemRemark: Yup.string().max(50, '不可超過50字'),
    itemUnit: Yup.string().max(10, '不可超過10字'),

})



interface AddNewModalProps {
    isVisible: boolean,
    setIsVisible: React.Dispatch<SetStateAction<boolean>>,
    setDataListInitial: (data: SetStateAction<never[]>) => void
}


const AddNewModal = ({ isVisible, setIsVisible, setDataListInitial }: AddNewModalProps) => {
    const [typeList, setTypeList] = useState([]);
    const { getItemsApi } = useGetItemApi()
    const { addItemsApi } = useAddItemApi()
    const { getTypesApi } = useGetTypesApi()


    useEffect(() => {
        getTypesApi(setTypeList)
    },[])

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
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
                    <label className="form__label " htmlFor="itemType">物品類型</label>
                    <FormControl fullWidth>
                    <Select
                        labelId="demo-multiple-name-label"
                        id="itemType"
                        name="itemType"
                        displayEmpty
                        value={formik.values.itemType}
                        onChange={formik.handleChange}
                    >
                        <MenuItem disabled value="">
                            <em>請選取類型</em>
                        </MenuItem>
                        {typeList.map((type:TypeData) => (
                            <MenuItem
                                key={type._id}
                                value={type.name}
                            >
                                {type.name}
                            </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                    <label className="form__label " htmlFor="itemUnit">物品單位</label>
                    <FormControl fullWidth>
                        <TextField
                            id="itemUnit"
                            name="itemUnit"
                            label=""
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.itemUnit}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText
                            error={
                                formik.touched.itemType && Boolean(formik.errors.itemUnit)
                            }
                        >
                            {formik.touched.itemUnit
                                ? formik.errors.itemUnit
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
                    <label className="form__label " htmlFor="itemRemark">備註</label>
                    <FormControl fullWidth>
                        <TextField
                            id="itemRemark"
                            name="itemRemark"
                            label=""
                            variant="outlined"
                            multiline
                            rows={3}
                            onChange={formik.handleChange}
                            value={formik.values.itemRemark}
                            onBlur={formik.handleBlur}

                        />
                        <FormHelperText
                            error={
                                formik.touched.itemRemark && Boolean(formik.errors.itemRemark)
                            }
                        >
                            {formik.touched.itemRemark
                                ? formik.errors.itemRemark
                                : null}
                        </FormHelperText>
                    </FormControl>
                </form>
            </FormModal>
        </>
    )
}


interface TypeData {
    _id: string;
    name: string;
  }



export default AddNewModal




