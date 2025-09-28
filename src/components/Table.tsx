import { useState } from "react";
import { data } from "../utils/data";
import { BiSort } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdSort } from "react-icons/md";


const Table = () => {
  const [projects, setProjects] = useState(data);
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);
  const [sortConfig, setSortConfig] = useState<{key: string; direction: string;} | null>(null);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);

  const [filters, setFilters] = useState({
    name: '',
    country: '',
    email: '',
    project: '',
    status: '',
  });

  const [searchQuery, setSearchQuery] = useState('');


  const sortProjects = (key: string) => {
    let sortedProjects = [...projects];

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      sortedProjects.sort((a,b) => (a[key] > b[key] ? -1 : 1)); //a[key] > b[key] is comparing specific values within objects in data. Ex: a[name] > b[name] where a[name] == 'beerus' and b[name] == 'alfred'
      setSortConfig({key, direction: 'descending'})
    }
    else {
      sortedProjects.sort((a,b) => (a[key] > b[key] ? 1 : -1));
      setSortConfig({key, direction: 'ascending'})
    }

    setProjects(sortedProjects);
  };

  const handleSortOptionClick = (key: string) => {
    sortProjects(key);
    setDropDownVisible(false);
  };
 
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filteredProjects = projects.filter((project) => (
    searchQuery === '' || 
    Object.values(project).some((value) => 
      value.toLowerCase().includes(searchQuery.toLowerCase())))
      && 
      filters.name === '' || 
      project.country.toLowerCase().includes(filters.country.toLowerCase()) 
      && 
      filters.email === '' || 
      project.email.toLowerCase().includes(filters.email.toLowerCase())
      &&
      filters.project === '' || 
      project.project.toLowerCase().includes(filters.project.toLowerCase())
      &&
      filters.status === '' || 
      project.status.toLowerCase().includes(filters.status.toLowerCase())
    
  );

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-4 w-[93%] ml-[5rem]">
        {/*Sorting*/}
        <div className="flex items-center mb-5">
            <div className="relative">
                <button onClick={() => setDropDownVisible(!dropDownVisible)} className="border border-gray-700 flex items-center justify-center text-white p-2 rounded">
                    <BiSort className="mr-[0.3 rem] "/>
                    Sort 
                    <AiOutlineDown className="ml-2"/>
                </button>

                {dropDownVisible && (
                  <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-gray-700 rounded shadow lg">
                    <button onClick={() => handleSortOptionClick('client')} 
                      className="block px-4 py-2 text-white w-full hover:bg-gray-700">
                        Name
                    </button>

                    <button onClick={() => handleSortOptionClick('country')} 
                      className="block px-4 py-2 text-white w-full hover:bg-gray-700">
                        Country
                    </button>

                    <button onClick={() => handleSortOptionClick('date')} 
                      className="block px-4 py-2 text-white w-full hover:bg-gray-700">
                        Date
                    </button>
                  </div>
                )}


            </div>
            

            <div className="relative ml-4 w-full">
              <button onClick={() => setFilterVisible(!filterVisible)} className="border border-gray-700 flex items-center justify-center text-white p-2 rounded">
                <MdSort className="mr-[0.3rem]" /> Filters 
                <AiOutlineDown className="ml-2" />
              </button>
              
              {filterVisible && (
                <div className="absolute top-full left-0 mt-2 bg-gray-800 border border-white rounded shadow-lg p-4">
                  <div className="mb-2">
                    <label htmlFor="name" className="block text-white">Filter By Name: </label>
                    <input type="text" 
                      name="name" 
                      className="bg-gray-900 text-white rounded p-2 w-full" 
                      value={filters.name}
                      onChange={handleFilterChange}
                    />
                  </div>
              
                  <div className="mb-2">
                    <label htmlFor="country" className="block text-white">Filter By Country: </label>
                    <input type="text" 
                      name="country" 
                      className="bg-gray-900 text-white rounded p-2 w-full" 
                      value={filters.country}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="email" className="block text-white">Filter By Email: </label>
                    <input type="text" 
                      name="email" 
                      className="bg-gray-900 text-white rounded p-2 w-full" 
                      value={filters.email}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="project" className="block text-white">Filter By Projects: </label>
                    <input type="text" 
                      name="projecy" 
                      className="bg-gray-900 text-white rounded p-2 w-full" 
                      value={filters.project}
                      onChange={handleFilterChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label htmlFor="status" className="block text-white">Filter By Status: </label>
                    <input type="text" 
                      name="status" 
                      className="bg-gray-900 text-white rounded p-2 w-full" 
                      value={filters.status}
                      onChange={handleFilterChange}
                    />
                  </div>


                </div>
              )}

            </div>

        </div>


        {/*Main Table*/}
        <table className="min-w-full table-auto rounded border border-gray-700 text-white">
        <thead>
          <tr>
            <th className="px-5 py-3 text-left">Image</th>
            <th className="px-5 py-3 text-left">Name</th>
            <th className="px-5 py-3 text-left">Country</th>
            <th className="px-5 py-3 text-left">Email</th>
            <th className="px-5 py-3 text-left">Project Name</th>
            <th className="px-5 py-3 text-left">Task Progress</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-left">Date</th>
            <th className="px-5 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project, index) => (
            <tr key={index} className="border border-gray-700">
              <td className="px-4 py-2">
                <img
                  src={project.image}
                  alt={project.client}
                  className="w-[3rem] h-[3rem] object-cover rounded-full"
                />
              </td>
              <td className="px-4 py-2">{project.client}</td>
              <td className="px-4 py-2">{project.country}</td>
              <td className="px-4 py-2">{project.email}</td>
              <td className="px-4 py-2">{project.project}</td>


              <td className="px-4 py-2">
                <div className="w-24 h-2 bg-gray-700-rounded">
                    <div className="h-2 bg-green-500 rounded"></div>
                </div>
              </td>

              <td className="px-4 py-2 w-[10rem]">
                <span>{project.status}</span>
              </td>

              <td className="px-4 py-2">{project.date}</td>

              <td className="px-4 py-2">
                <div className="relative">
                    <BsThreeDots className="cursor-pointer"/>
                </div>
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {/*pagination*/}
      <div className="flex justify-end mt-4">
        <button disabled={currentPage === 1 ? true : false} onClick={() => handlePageChange(currentPage - 1)} className="px-4 py-2 bg-gray-700 text-white rounded mr-2 disabled:opacity-50">
          Previous
        </button>

        <span className="px-4 py-2 font-bold text-white">Page {currentPage} Of {totalPages}</span>

        <button disabled={currentPage === totalPages ? true : false} onClick={() => handlePageChange(currentPage + 1)}  className="px-4 py-2 bg-gray-700 text-white rounded mr-2 disabled:opacity-50">
          Next
        </button>

      </div>

    </div>
  )
}

export default Table