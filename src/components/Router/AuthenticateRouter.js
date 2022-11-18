import { connect } from "react-redux";
import { Navigate } from "react-router-dom";


function AuthenticateRouter(props) {
    if(!props.isLoggedIn) {
        return <Navigate to='/login' replace />
    }
    return props.children
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn : state.isLoggedIn,
    }
}

export default connect(mapStateToProps,null)(AuthenticateRouter)