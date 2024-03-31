'use client'
import { useForm } from "react-hook-form"
function Register(){
    const {register,handleSubmit, formState:{errors}} = useForm();
    const onSubmit =handleSubmit(data => console.log(data))
    console.log(errors)
    return(
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form onSubmit={onSubmit} className="w-1/4">
                <h1 className="text-slate-200 font-bold text-4xl mb-4 text-center">Registrarse</h1>

                <label htmlFor="username" className="text-slate-500 mb-2 block">Usuario</label>
                <input type="text"
                {...(register("username"),{
                    required:true,
                })}
                className="p-3 rounded block mb-2 bg-slate-900
                text-slate-300 w-full"
                placeholder = 'Usuario123'/>
                {errors.username && <span className='text-red-500 text-sm'>Este campo es requerido</span>}

                <label htmlFor="email" className="text-slate-500 mb-2 block">Correo</label>
                <input type="email" 
                {...(register("email"),{
                    required:true,
                })}
                className="p-3 rounded block mb-2 bg-slate-900
                text-slate-300 w-full"
                placeholder = 'correo@email.com'/>
                {errors.email && <span className='text-red-500 text-sm'>Este campo es requerido</span>}

                <label htmlFor="password" className="text-slate-500 mb-2 block">Contraseña</label>
                <input type="password"
                {...(register("password"),{
                    required:true,
                })}
                className="p-3 rounded block mb-2 bg-slate-900
                text-slate-300 w-full"
                placeholder='********' />
                {errors.password && <span className='text-red-500 text-sm'>Por favor introduzca la contraseña</span>}

                <label htmlFor="confirmPassword" className="text-slate-500 mb-2 block">Confirmar Contraseña</label>
                <input type="password"
                {...(register("confirmPassword"),{
                    required:true,
                })} 
                className="p-3 rounded block mb-2 bg-slate-900
                text-slate-300 w-full"
                placeholder = '********'/>
                {errors.confirmPassword && <span className='text-red-500 text-sm'>Por favor confirme la contraseña</span>}
                <button className="w-full bg-blue-500 text-white p-3 mt-2 rounded-lg text-3xl">Registrarse</button>
            </form>
        </div>
    )
} export default Register