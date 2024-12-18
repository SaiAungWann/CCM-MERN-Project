import { Link } from "react-router-dom";
import axios from "../helpers/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
    
    let [name, setName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState(null);

    let navigate = useNavigate();

    let register = async (e) => {
        try {
            e.preventDefault();
            setError(null);
            let data = {name, email, password};
            let res = await axios.post('/users/register', data , {withCredentials: true});
            if (res.status === 200) {
                navigate('/');
            }
        } catch (e) {
            setError(e.response.data.error);
            console.log(e.response.data.error);
        }

    }
    
    return (
        <div className="w-full max-w-lg mx-auto">
            <form onSubmit={register} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold text-center">Register Form</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input value={name} onChange={e => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Name" />
                    {!! (error && error.name) && <p className="text-red-500 text-xs italic">{error.name.msg}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input value={email} onChange={e => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                    {!! (error && error.email) && <p className="text-red-500 text-xs italic">{error.name.msg}</p>}
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input value={password} onChange={e => setPassword(e.target.value)} className=" shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                   {!! (error && error.password) && <p className="text-red-500 text-xs italic">{error.name.msg}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit"  className="bg-orange-400 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Register
                    </button>
                    <Link to="/sign-in" className="inline-block align-baseline font-bold text-sm text-orange-400 hover:text-orange-400" href="#">
                        Login here
                    </Link>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )
}