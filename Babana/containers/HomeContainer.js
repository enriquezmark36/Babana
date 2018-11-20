import {connect} from "react-redux";

import {getInputData} from "../modules/home";
const mapStateToProps = (state) => ({
    inputData:state.home.inputData || {}
})
