import React from "react"
import { useGetData } from '../../../content';
import { adminUrl } from '../../../BackendUrl';
import { useNavigate, useParams } from "react-router";

const UserDetails = () => {

    const { userId } = useParams()
    const [data] = useGetData(`${adminUrl}users/details/${userId}?query=detail`);
    const nav = useNavigate()

    if (!data) {
        return (
            <>Loading.....</>
        )
    }
    return (
        <div className="flex flex-col items-center mt-8 md:px-4 px-1 ">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-full py-6 rounded-xl">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full mx-auto">
                    <div className="flex items-center space-x-4 mb-6 flex-col">
                        <img className="h-20 w-20 rounded-full border-4 border-purple-500 " src={data?.user?.profile_pic} alt={'kjdld,mdmdmdm'} />
                        <div>
                            <h2 className="md:text-xl text-lg mt-2 font-bold text-center text-gray-900 break-all ">{!data?.user?.business_account_type ? data?.user?.first_name + ' ' + data?.user?.last_name : data?.user?.business_name}</h2>
                            <p className="text-gray-600  text-ellipsis break-all">{data?.user?.email}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <h3 className=" font-semibold text-gray-800 text-base">Basic Information</h3>
                            <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                                <li><strong>Username:</strong> {!data?.user?.business_account_type ? data?.user?.first_name + ' ' + data?.user?.last_name : data?.user?.business_name}</li>
                                <li><strong>UserId:</strong> {userId}</li>
                                <li><strong>Phone:</strong> {data?.user?.country_code + data?.user?.phone_number}</li>
                                <li><strong>Address:</strong> {data?.user?.state + " " + data?.user?.country}</li>
                                <li><strong>Gender:</strong> {data?.user?.gender}</li>
                                <li><strong>Birthdate:</strong> {data?.user?.date_of_birth}</li>
                                <li><strong>Joined:</strong> {data?.user?.createdAt?.split("T")[0]}</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className=" font-semibold text-gray-800 text-base">Posts</h3>
                            <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                                <li><strong>Count:</strong> {data?.user?.PostIds?.length}</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className=" font-semibold text-gray-800 text-base">Communities</h3>
                            <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                                <li><strong>Count:</strong> {data?.user?.Communities?.length}</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className=" font-semibold text-gray-800 text-base">Account report</h3>
                            <ul className="mt-2 space-y-1 text-gray-600 text-sm">
                                <li><strong>Count:</strong> {data?.user?.Reports?.length}</li>
                            </ul>
                        </div>
                        <div>
                            <button onClick={() => nav('gallery')} className="bg-gradient-to-r text-sm from-blue-500 to-indigo-600 text-white font-bold py-3 px-6 rounded shadow-md hover:shadow-lg transition duration-300">
                                view Gallery
                            </button>
                        </div>




                    </div>
                    {/* <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
                        <h2 className="text-xl font-bold mb-4">Communities</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <h3 className="text-lg font-bold">Community 1</h3>
                                <p className="text-gray-700">Description of community 1.</p>
                            </div>
                            <div className="p-4 bg-gray-100 rounded-lg">
                                <h3 className="text-lg font-bold">Community 2</h3>
                                <p className="text-gray-700">Description of community 2.</p>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    );
};



export default UserDetails;
