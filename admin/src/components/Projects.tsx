import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import AddProject from "./AddProject";
import axios from "axios";
import {
  ProjectType,
  ProjectPropsType,
  ProjectFilter,
} from "../interfaces/Project_Interfaces";
import { endpoints } from "../api";
import ProjectManagement from "./ProjectManagement";

export default function Projects({ onSuccess }: ProjectPropsType) {
  const [addProject, setAddProject] = useState(false);
  const [allProjects, setAllProjects] = useState<ProjectType[]>([]);
  const [isOpen, setIsOpen] = useState(true)
    const [filters, setFilters] = useState<ProjectFilter>({
        category: 'all',
        location: null,
        projectMinDate: null,
        projectMaxDate: null,
    })
    const [submitFilter, setSubmitFilter] = useState(false)
    const menuItems = [
        { type: "Select all category", value: "all" },
        { type: "Residential Solar", value: "residential" },
        { type: "Commercial Buildings", value: "commercial" },
        { type: "Industrial Solutions", value: "industry" }
    ];
    const provinces = [
        { type: "All Provinces", value: "all" },
        { type: "Central Province", value: "central" },
        { type: "Eastern Province", value: "eastern" },
        { type: "Northern Province", value: "northern" },
        { type: "North Central Province", value: "north_central" },
        { type: "North Western Province", value: "north_western" },
        { type: "Sabaragamuwa Province", value: "sabaragamuwa" },
        { type: "Southern Province", value: "southern" },
        { type: "Uva Province", value: "uva" },
        { type: "Western Province", value: "western" }
    ];

  const token = localStorage.getItem("accessToken");

  async function fetchAllProjects() {
    await axios
      .get(endpoints.project.getAllProjects, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setAllProjects(res.data);
      })
      .catch((error) => {
        console.log("Error fetching data : ", error);
      });
    onSuccess();
  }

  async function fetchFilteredProducts() {
      await axios
          .post(`${endpoints.project.getFiltered}`, filters)
          .then((res) => {
              console.log(res);
              setAllProjects(res.data);
          })
          .catch((error) => {
              console.log("Error fetching data : ", error);
          });
          onSuccess()
  }
  
  async function fetchAllProducts() {
      await axios
          .get(`${endpoints.project.getAllProjects}`)
          .then((res) => {
              console.log(res);
              setAllProjects(res.data);
          })
          .catch((error) => {
              console.log("Error fetching data : ", error);
          });
          onSuccess()
  }
  
  useEffect(() => {

        if (submitFilter) {
            fetchFilteredProducts();
            setSubmitFilter(false)
        }
        if(!submitFilter && filters.category == 'all') {
            fetchAllProducts();
        }
    }, [submitFilter, addProject]);

  function deleteProduct(id: number) {
    const response = allProjects.filter((item) => item.id != id);
    setAllProjects(response);
    onSuccess();
  }

  return (
    <>
      {!isOpen && (
        <div className="fixed top-25 w-2/3 h-2/5 md:w-1/5 md:h-3/5 backdrop-blur-sm z-50 flex items-center justify-center">
            {/* Modal container */}
            <div className="relative w-full h-full bg-white/90 rounded-lg border-2 shadow-lg max-w-md p-6">

                {/* Close button (top-left) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={28} className="text-gray-800" />
                </button>

                {/* Content */}
                <div className="text-center mt-4">
                    <h2 className="text-2xl font-bold text-gray-800">Filter Products</h2>
                    <div className="flex flex-col md:flex-col justify-between items-center gap-4 w-full mt-5 md:mt-10">
                        <select
                            value={filters.category || ""}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700"
                        >    
                            {menuItems.map((item, index) => (
                                <option className="text-xs md:text-sm" key={index} value={item.value}>
                                        {item.type}
                                </option>
                            ))}
                        </select>

                        <select
                            value={filters.location || ""}
                            onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                            className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-700"
                        >   
                            {provinces.map((item, index) => (
                                <option className="text-xs md:text-sm" key={index} value={item.value}>
                                    {item.type}
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            value={filters.projectMinDate || ""}
                            onChange={(e) => setFilters({...filters, projectMinDate: e.target.value})}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full md:w-64"
                        />

                        <input
                            type="date"
                            value={filters.projectMaxDate || ""}
                            onChange={(e) => setFilters({...filters, projectMaxDate: e.target.value})}
                            className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 w-full md:w-64"
                        />

                        <div className="w-3/4 md:w-2/3 flex flex-row justify-between md:mt-5">
                            <button
                                onClick={() => {setSubmitFilter(true)}}
                            >
                                Set Filters
                            </button>

                            <button
                                onClick={() => {setFilters({
                                    category: 'all',
                                    location: null,
                                    projectMinDate: null,
                                    projectMaxDate: null,
                                })}}
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      )}
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b flex items-center justify-between">
            <div>
              <button
                  onClick={() => { setIsOpen(!isOpen) }}
                  className="text-sm md:text-lg text-center transition-all duration-300 flex items-center justify-center px-3 scale-100 hover:scale-110 -translate-y-1 font-semibold text-black"
              >
                  Filter
              </button>
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Project Management
            </h3>
            <button
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => {
                setAddProject(true);
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
          <div className="p-6 h-[30rem] overflow-y-scroll">
            <ProjectManagement
              projects={allProjects}
              deleteProduct={deleteProduct}
              onSuccess={fetchAllProjects}
            />
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {addProject && (
        <AddProject
          existFormData={null}
          isOpen={addProject}
          onClose={() => setAddProject(false)}
          type={"Add"}
          title="Add New Project"
          statement="Fill in the details to add a new project to your inventory"
          onSuccess={fetchAllProjects}
        />
      )}
    </>
  );
}
