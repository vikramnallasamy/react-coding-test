import { connect } from "react-redux"


function ProfilePage(props) {

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
        username : state.username
    }
}
export default connect(mapStateToProps,null)(ProfilePage)