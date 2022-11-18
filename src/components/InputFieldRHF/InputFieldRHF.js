
export default function InputFieldRHF ({label,name,register,errors,...rest}) {
    const validation = {}
    return (
        <p>
            {label ? <label>{label}</label> : null}
            <input {...register(name,validation)} {...rest}/>
            {errors && errors[name] && errors[name].message}
        </p>
    )
}