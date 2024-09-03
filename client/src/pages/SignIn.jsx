import React from 'react';
import { useState } from 'react';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn() {
    const [formData, setFormData] = useState({}); // On initialise le state formData qui sert à stocker les données du formulaire
    const { loading, error: errorMessage } = useSelector(state => state.user); // On extrait les valeurs loading et error du state user
    const dispatch = useDispatch(); // On initialise la fonction dispatch qui permet de dispatcher les actions
    const navigate = useNavigate(); // On initialise la fonction navigate qui permet de rediriger l'utilisateur vers une autre page

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() }); // On met à jour le state formData en ajoutant la nouvelle valeur saisie par l'utilisateur
    };

    // Cette fonction permet de soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('Please fill all the fields')); // On dispatch l'action signInFailure pour indiquer que la requête de connexion a échoué
        }

        try {
            dispatch(signInStart()); // On dispatch l'action signInStart pour indiquer que la requête de connexion a commencé
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message)); // On dispatch l'action signInFailure pour indiquer que la requête de connexion a échoué
            }
            if (res.ok) {
                dispatch(signInSuccess(data)); // On dispatch l'action signInSuccess pour indiquer que la requête de connexion a réussi
                navigate('/');
            }

        } catch (error) {
            dispatch(signInFailure(error.message)); // On dispatch l'action signInFailure pour indiquer que la requête de connexion a échoué
        }
    };

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>

                {/* Left */}
                <div className='flex-1'>
                    <Link to='/' className='text-4xl font-bold dark:text-white'>
                        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Flibouche's</span>
                        Blog
                    </Link>
                    <p className='text-sm mt-5'>
                        This is a demo project. You can sign in with your email and password or with Google.
                    </p>
                </div>

                {/* Right */}
                <div className='flex-1'>
                    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your email' />
                            <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='Your password' />
                            <TextInput type='password' placeholder='**********' id='password' onChange={handleChange} />
                        </div>
                        <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
                            {
                                loading ? (
                                    <>
                                        <Spinner size='sm' />
                                        <span className='pl-3'>Loading...</span>
                                    </>
                                ) : 'Sign In'
                            }
                        </Button>
                    </form>
                    <div className='flex gap-2 text-sm mt-5'>
                        <span>Don't have an account ?</span>
                        <Link to='/sign-up' className='text-indigo-500'>
                            Sign Up
                        </Link>
                    </div>
                    {
                        errorMessage && (
                            <Alert className='mt-5' color='failure'>
                                {errorMessage}
                            </Alert>
                        )
                    }
                </div>

            </div>
        </div>
    )
}
