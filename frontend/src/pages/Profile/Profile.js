import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SpinLoader from '~/components/Loader';
import { axiosPublic } from '~/config/axiosConfig';

function Profile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosPublic.get(`/users/${userId}`);
                setUser(response.data);
                setLoading(false);
            } catch (error) {
                console.log('🚀 ~ fetchUser ~ error:', error);
                setLoading(false);
            }
        };
        fetchUser();
    }, []);
    return (
        <>
            {!loading && (
                <section className="pt-16 bg-blueGray-50">
                    <div className="w-full lg:w-4/12 px-4 mx-auto">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
                            <div className="px-6">
                                <div className="flex flex-wrap justify-center mt-6">
                                    <img
                                        alt="..."
                                        src={user.avatar || '/thumb-default.jpg'}
                                        className="shadow-md rounded-full w-[100px] h-[100px] object-cover"
                                    />
                                    <div className="w-full px-4 text-center ">
                                        <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                            <div className="mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {user.numOfPosts}
                                                </span>
                                                <span className="text-sm text-blueGray-400">Posts</span>
                                            </div>

                                            <div className="lg:mr-4 p-3 text-center">
                                                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                                                    {user.numOfComments}
                                                </span>
                                                <span className="text-sm text-blueGray-400">Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-12">
                                    <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                                        {user.first_name + ' ' + user.last_name}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg " />
                                        {user.address}
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                {user.description || 'No information available'}
                                            </p>
                                            <span
                                                onClick={() => navigate(-1)}
                                                className="font-normal text-primary cursor-pointer"
                                            >
                                                Exit
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            {loading && <SpinLoader />}
        </>
    );
}

export default Profile;
