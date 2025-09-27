import { useState } from "react";
import { data } from "../utils/data";
import { BiSort } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";


const Table = () => {
 const [projects, setProjects] = useState(data);


  return (
    <div className="p-4 w-[93%] ml-[5rem]">
        <div className="flex items-center mb-5">
            <div className="relative">
                <button className="border border-gray-700 flex items-center justify-center text-white p-2 rounded">
                    <BiSort className="mr-[0.3 rem] "/>
                    Sort 
                    <AiOutlineDown className="ml-2"/>
                </button>
            </div>

        </div>

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
          {projects.map((project, index) => (
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

              
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  )
}

export default Table