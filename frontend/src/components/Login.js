/*App.js*/

import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import {useEffect} from "react";

export const Login = () => {
    const clientId = '342292852647-dn3osu20gkemv40it0r9rvqn036iakof.apps.googleusercontent.com';

    useEffect(() => {
       const initClient = () => {
             gapi.client.init({
             clientId: clientId,
             scope: ''
           });
        };
        gapi.load('client:auth2', initClient);
    });


    const onSuccess = (res) => {
        console.log('success:', res);
    };
    const onFailure = (err) => {
        console.log('failed:', err);
    };
    return (
       <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
  );
}

// import {useEffect, useState} from "react";
// import {useNavigate} from 'react-router-dom';
//
// export const Login = () => {
//     const [id] = useState('');
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//
//     const submit = async e => {
//         e.preventDefault();
//
//         try {
//             const response = await fetch('http://localhost:8002/login', {
//                 method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
//                     username, password
//                 })
//             });
//             const data = await response.json();
//             console.log("data:"+JSON.stringify(data))
//
//           if (data.success) {
//             // await navigate('/products');
//           } else {
//             // Login failed, display an error message
//             setError(data.message);
//           }
//         } catch (error) {
//           // An error occurred, display a message
//           setError(error.message);
//         }
//         //await navigate('');
//   }
//
//     return <div className="container">
//         <main>
//             <div className="py-5 text-center">
//                 <h2>Login Interface</h2>
//             </div>
//
//             <form onSubmit={submit}>
//                 <div className="row g-3">
//                     <div className="col-sm-6">
//                         <label className="form-label">Username</label>
//                         <input className="form-control"
//                                onChange={e => setUsername(e.target.value)}
//                         />
//                     </div>
//
//                     <div className="col-sm-6">
//                         <label className="form-label">Password</label>
//                         <input className="form-control"
//                                onChange={e => setPassword(e.target.value)}
//                         />
//                     </div>
//                 </div>
//                 <hr className="my-4"/>
//                 <button className="w-100 btn btn-primary btn-lg" type="submit">Log in</button>
//             </form>
//         </main>
//     </div>
// }
