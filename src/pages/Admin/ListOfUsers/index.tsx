import React, { useEffect, useState } from 'react'
import { adminUrl } from '../../../BackendUrl'
import { fetcher, useGetData } from '../../../content'
import { parseISO, formatDistanceToNow } from 'date-fns';
import { Navigate, useNavigate, useParams } from "react-router"

export const TimeAgo = (e: any) => {
  if (!e) return "";
  const date: any = parseISO(e)
  let timeStamp: any = formatDistanceToNow(date);
  // less than a minute === just now
  if (timeStamp == "less than a minute") return "just now";

  //  1minute ==1m ago
  if (timeStamp.substring(timeStamp.length - 2) == "te") return `${timeStamp.substring(0, timeStamp.length - 7)}min ago`;

  //   2 minutes and above == 2 or any number ms ago
  if (timeStamp.substring(timeStamp.length - 2) == "es") return `${timeStamp.substring(0, timeStamp.length - 8)}mins ago`;

  // If the time is up hour it we add about at front of the time. remove `About` from the time it will just return the time 
  if (timeStamp.substring(0, 5) == "about") timeStamp = timeStamp.substring(5);

  //  changing the time from  Hour to hr ago;
  if (timeStamp.substring(timeStamp.length - 2) == "ur") return timeStamp = `${timeStamp.substring(0, timeStamp.length - 5)}hr`;

  //  changing the time from hours to hrs ago;
  if (timeStamp.substring(timeStamp.length - 2) == "rs") return timeStamp = `${timeStamp.substring(0, timeStamp.length - 6)}hrs ago`;

  return `${timeStamp} ago `
}


const arr = ['business-acounts', 'individual-accounts']
const UserTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([])
  const { name } = useParams();
  const [filteredUsers, setFilteredUsers] = useState<any>([]);


  useEffect(() => {
    if (name) {
      setUsers([])
      fetcher(`${adminUrl}get_users/users?account_individual=${arr[0] == name}`,).then((data: any) => {
        if (data.user) {
          setUsers((prev: any) => {
            const _res = data?.user.map((val: any) => ({
              name: !val.business_account_type ? val?.first_name + ' ' + val?.last_name : val?.business_name,
              phone_number: val.country_code + val?.phone_number,
              country: val?.country,
              createdAt: val?.createdAt,
              unique_id: val?.unique_id,
              profile_pic: val?.profile_pic
            }))
            setFilteredUsers(_res)
            return _res
          })
        }
      })
    }
  }, [name])

  const handleSearch = (event: any) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter(
        (user: any) =>
          user.name.toLowerCase().includes(term) ||
          user.phone_number.includes(term) ||
          user.createdAt.includes(term)
      )
    );
  };

  const nav = useNavigate()
  if (!arr.includes(name as string)) {
    return <Navigate to="/admin/dashboard" />
  }
  return (
    <>
      <div className="flex flex-col max-w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 bg-gray-100 rounded-t-lg shadow-md">
          <h2 className="text-[1rem] sm:text-2xl font-bold text-gray-700 text-start w-full capitalize">{name?.split("-").join(" ")} List</h2>
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
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Created At
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user: any, index: any) => (
                    <tr key={index} className="hover:bg-gray-100 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img className="h-10 w-10 rounded-full" src={user?.profile_pic} alt={user.name} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.phone_number}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {TimeAgo(user.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900" onClick={() => nav(user.unique_id)}>View More</button>
                      </td>
                    </tr>
                  ))}
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
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
    </>

  );
};

export default UserTable;
