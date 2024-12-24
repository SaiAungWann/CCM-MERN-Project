import { useState } from "react";
import axios from "../helpers/axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function SignUpForm() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState(null);

    let navigate = useNavigate();

    let {user , dispatch }     = useContext(AuthContext);
    let login = async (e) => {
        try {
            e.preventDefault();
            setError(null);
            let data = { email, password };
            console.log(data);
            let res = await axios.post('/api/users/login', data, { withCredentials: true });
            if (res.status === 200) {
                dispatch({ type: 'LOGIN', payload: res.data.user });
                navigate('/');
                console.log(res.data.user);
            }
        } catch (e) {
            // setError(e.response.data.message);
            console.log(e.response);
        }
    }
    return (
        <div className="w-full max-w-lg mx-auto">
            <form onSubmit={login} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl font-bold text-center">Login Form</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email" />
                    {!! error  && <p className="text-red-500 text-xs italic">{error}</p>}
                </div>
                <div className="mb-6">
                    <label  className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                   
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-orange-400 hover:bg-orange-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                    </button>
                    <a className="inline-block align-baseline font-bold text-sm text-orange-400 hover:text-orange-400" href="#">
                        Forgot Password?
                    </a>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2020 Acme Corp. All rights reserved.
            </p>
        </div>
    )
}