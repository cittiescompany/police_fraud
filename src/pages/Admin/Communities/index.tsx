import { adminUrl } from '../../../BackendUrl';
import { useGetData } from '../../../content';
import React, { useEffect, useState } from 'react';


const CommunityTable = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [communities, setCommunities] = useState([])
    const [filteredCommunities, setFilteredCommunities] = useState<any>([]);
    const [data] = useGetData(`${adminUrl}get_all_communities`)

    useEffect(() => {
        setCommunities((prev: any) => {
            if (data?.communities) {
                const _res = data?.communities.map((val: any) => ({
                    name: val?.name,
                    users: val?.Users?.length,
                    posts: val?.PostIds?.length,
                    unique_id: val?.unique_id
                }))
                setFilteredCommunities(_res)
                return _res
            }
            return []
        })
    }, [data])
    const handleSearch = (event: any) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        setFilteredCommunities((preValues: any) =>
            communities?.filter(
                (community: any) =>
                    community?.name?.toLowerCase()?.includes(term) ||
                    community?.users?.toString()?.includes(term) ||
                    community?.PostIds?.toString()?.includes(term)
            )
        );
    };

    return (
        <div className="flex flex-col max-w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-gray-100 rounded-t-lg shadow-md">
                <h2 className="text-[1rem] sm:text-2xl font-bold text-gray-700 text-start w-full">Communities</h2>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="px-4 py-2 border rounded-md  w-full sm:w-1/4  focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="overflow-x-auto px-4">
                <div className="inline-block min-w-full py-2 align-middle">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Users
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Posts
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                                        Engage
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredCommunities.map((community: any, index: any) => (
                                    <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {community?.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {community?.users?.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {community?.posts?.toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {community?.posts?.toLocaleString()}
                                        </td>
                                    </tr>
                                ))}
                                {filteredCommunities.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-6 py-4 text-center text-sm text-gray-500">
                                            No results found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommunityTable;
