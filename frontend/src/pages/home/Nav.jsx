import React from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

function Nav() {
    const queryClient = useQueryClient();
    const { mutate: logout } = useMutation({
        mutationFn: async () => {
            try {
                const res = await fetch('/api/auth/logout', {
                    method: 'POST',
                });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || 'Something went wrong');
                }
            } catch (error) {
                throw new Error(error);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['authUser'] });
        },
        onError: () => {
            toast.error('Logout failed');
        },
    });
    const { data: authUser } = useQuery({ queryKey: ['authUser'] });

    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 h-20">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div><h1 className='text-2xl font-bold text-fuchsia-950'>Connect Sphere</h1></div>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                <Link to={`/profile/${authUser.username}`} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 mr-6">
                                    <div className="flex items-center">
                                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                            <img src={authUser.profileImg || '/avatar-placeholder.png'} alt="Profile" className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-base text-gray-800 dark:text-white">{authUser.fullName}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">@{authUser.username}</p>
                                        </div>
                                    </div>
                                </Link>
                        {authUser && (
                                    <button onClick={logout} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Logout</button>
                                )}
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to={'/'} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                            </li>
                            <li>
                                <Link to={'/notifications'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Notifications</Link>
                            </li>
                            <li>
                                <Link to={'/chat'} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Chat</Link>
                            </li>
                            
                            <li className='relative'>
                                <div className='absolute -left-12 -top-3 h-6 w-6 bg-red-400 text-center rounded-full'>{authUser?.NotificationCount}</div>
                                
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
        </div>
    );
}

export default Nav;
