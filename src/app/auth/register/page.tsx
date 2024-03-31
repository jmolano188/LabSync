'use client'
import { useForm } from "react-hook-form"
function Register(){
    const {register,handleSubmit} = useForm();
    const onSubmit =handleSubmit(data => console.log(data))
    return(
        <div>
            <form onSubmit={onSubmit}>

                <input type="text"
                {...(register("username"),{
                    required: true,
                })}
                className="p-3 rounded block mb-2 bg-slate-900
                text-slate-300 w-full "
                />
                <input type="email" 
                {...(register("email"),{
                    required: true,
                })}/>
                <input type="password"
                {...(register("password"),{
                    required: true,
                })} />
                <input type="password"
                {...(register("confirmPassword"),{
                    required: true,
                })} />
                <button>Registrarse</button>
            </form>
        </div>
    )
} export default Register