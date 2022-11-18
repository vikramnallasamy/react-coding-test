import { useForm } from 'react-hook-form'
import { connect } from 'react-redux';
import InputFieldRHF from '../InputFieldRHF/InputFieldRHF'
import { logIn } from '../../actions/actions'


const LoginForm = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handleLogin = (data) => {
        console.log(data);
        props.logIn(data.username,data.password)
    } 
    if(props.isLoading ) return <h2>Logging In...</h2>
    if(props.isLoggedIn) {
        return <h2>Logged In Successfully</h2>
    }
    return (
        <>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div>
                    <InputFieldRHF label={'Name'} name='username' errors={errors} register={register}/>    
                    <InputFieldRHF label={'Password'} name='password' type={'password'} errors={errors} register={register}/>    
                </div>
                <button disabled={props.isLoading}>Submit</button>
            </form>
        </>
    );
  };

  const mapStateToProps = (state) => {
      return {
          isLoggedIn : state.isLoggedIn,
          isLoading : state.isLoading,
          username : state.username
      }
    
  }
  const mapDispatchToProps = (dispatch) => {
      return {
          logIn : (username,password) => {
              dispatch(logIn(username,password))
          }
      }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)