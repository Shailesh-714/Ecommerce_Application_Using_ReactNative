import * as Yup from "yup";

const addressValidation = Yup.object().shape({
  addressUserName: Yup.string().required("required"),
  lane: Yup.string().required("required"),
  street: Yup.string().required("required"),
  city: Yup.string().required("required"),
  state: Yup.string().required("required"),
  country: Yup.string().required("required"),
  postalCode: Yup.string().required("required"),
  contactNumber: Yup.string().required("required"),
});

export default addressValidation;
