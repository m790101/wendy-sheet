import * as Yup from "yup"
import { cusRequired } from "./stringValidations"
// import { needMoreThanParam } from "./numberValidations"

// string
Yup.addMethod<Yup.StringSchema>(Yup.string, "cusRequired", cusRequired)

// // number
// Yup.addMethod<Yup.NumberSchema>(
//   Yup.number,
//   "needMoreThanParam",
//   needMoreThanParam
// )

// array

// object

export default Yup
