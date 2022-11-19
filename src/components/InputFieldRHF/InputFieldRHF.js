import styled from "styled-components"

export default function InputFieldRHF ({label,name,register,errors,...rest}) {
    const validation = {required: 'This field is required'}
    return (
        <P>
            {label ? <label>{label}</label> : null}
            <div>
                <input {...register(name,validation)} {...rest}/>
                {errors && errors[name] && errors[name].message}
            </div>
        </P>
    )
}

const P = styled.p`
    display: flex;
    justify-content: space-between;
    width: 20vw;
    margin: 1rem auto;
    div {
        color: red;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
`