import { FormControl, FormHelperText, TextField } from "@mui/material";
import { useFormik } from "formik"
import Yup from "../../utils/validations/yupSchemaExtended";
import errorService from "../../service/errorService";
import { useNavigate } from "react-router-dom";
import { showMsgBox } from "../../utils/helpers/msgHelper";
import { useDispatch } from "react-redux";
import { updateLoginInfo } from "../../store/appSlice";


const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const initialValues = {
        userName: "",
        userPassword: "",
    }

    const validationSchema = Yup.object().shape({
        userName: Yup.string().cusRequired('使用者名稱'),
        userPassword: Yup.string().cusRequired('密碼')
    })

    const fakeAccount = {
        userName: "wendy",
        userPassword: "0000"
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: (values) => {
           const  result = handleSubmit(values, fakeAccount)
           if(result){
            dispatch(updateLoginInfo({isLogin:true}))
            showMsgBox({
                content: `登入成功!`,
                titleImg: "success",
                title: "成功",
                mainBtn: { label: "我知道了" , onClick: () => navigate('/main/home')},
              })

           } 
            handleResetForm()

        },
    })

    const handleResetForm = () => {
        formik.resetForm({
            values: initialValues,
        })
    }

    return (
        <>
            <div className="login p-4">
                <section>
                    <div className="w-100 d-flex justify-content-center fs-2 fw-bold">
                        <p>清點清點一直點</p>
                    </div>
                </section>

                <form onSubmit={formik.handleSubmit} className="p-5">
                    <label className="form__label form__label--required" htmlFor="userName">使用者名稱</label>
                    <FormControl fullWidth>
                        <TextField
                            id="userName"
                            name="userName"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.userName}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText
                            error={
                                formik.touched.userName && Boolean(formik.errors.userName)
                            }
                        >
                            {formik.touched.userName
                                ? formik.errors.userName
                                : null}
                        </FormHelperText>
                    </FormControl>
                    <label className="form__label form__label--required" htmlFor="userPassword">密碼</label>
                    <FormControl fullWidth>
                        <TextField
                            id="userPassword"
                            name="userPassword"
                            type="password"
                            variant="outlined"
                            onChange={formik.handleChange}
                            value={formik.values.userPassword}
                            onBlur={formik.handleBlur}
                        />
                        <FormHelperText
                            error={
                                formik.touched.userPassword && Boolean(formik.errors.userPassword)
                            }
                        >
                            {formik.touched.userPassword
                                ? formik.errors.userPassword
                                : null}
                        </FormHelperText>
                    </FormControl>
                    <button type="submit" className=" btn-login mt-3 w-100">goooooo</button>
                </form>
            </div>
        </>
    );
}


export default Login;

interface LoginValues {
    userName: string
    userPassword: string
}


function handleSubmit(values:LoginValues, fakeAccount: LoginValues) {

    console.log(values)
    const result = values.userName === fakeAccount.userName && values.userPassword === fakeAccount.userPassword
    return result ? result : errorService.showErrorMsg('登入失敗')
}