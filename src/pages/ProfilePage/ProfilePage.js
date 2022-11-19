import { useEffect } from "react"
import { connect } from "react-redux"
import { GET_PROFILE } from "../../ReduxSaga/Saga/constants"

function ProfilePage(props) {
    useEffect(() => {
        console.log('Calling getProfile from profil page')
    },[])
    return (
        <>
            <h1>Profile Page</h1>
            <p>
                <span>Username : {props.username}</span>
            </p>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        username : state.username,
        accessToken : state.accessToken
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProfile : (accessToken) => {
            dispatch({type: GET_PROFILE, payload: accessToken })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)