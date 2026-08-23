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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

interface ProjectsProps extends ProjectPropsType {
  darkMode?: boolean;
}

export default function Projects({ onSuccess, darkMode = false }: ProjectsProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

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

  // Theme tokens — mirrors the Products / AdminUserManagement pattern
  const theme = darkMode
    ? {
        panel: "bg-[#111827]",
        panelBorder: "border-white/10",
        text: "text-white",
        textSub: "text-gray-300",
        textMuted: "text-gray-400",
        textFaint: "text-gray-500",
        inputBg: "bg-black/20",
        inputBorder: "border-white/10",
        inputText: "text-white",
        placeholder: "placeholder-gray-500",
        modalOverlay: "bg-black/60",
        modalPanel: "bg-[#111827]/95 border-white/10",
        hoverIcon: "hover:bg-white/10",
        filterText: "text-white",
        primaryBtn: "bg-blue-500 text-white hover:bg-blue-600",
        secondaryBtn: "bg-white/10 text-gray-200 hover:bg-white/20",
      }
    : {
        panel: "bg-white",
        panelBorder: "border-gray-200",
        text: "text-gray-800",
        textSub: "text-gray-700",
        textMuted: "text-gray-600",
        textFaint: "text-gray-500",
        inputBg: "bg-white",
        inputBorder: "border-gray-300",
        inputText: "text-gray-700",
        placeholder: "placeholder-gray-400",
        modalOverlay: "bg-black/30",
        modalPanel: "bg-white/90 border-gray-200",
        hoverIcon: "hover:bg-gray-100",
        filterText: "text-black",
        primaryBtn: "bg-blue-600 text-white hover:bg-blue-700",
        secondaryBtn: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      };

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
        <div className={`fixed inset-0 ${theme.modalOverlay} backdrop-blur-sm z-50 flex items-center justify-center p-4`}>
            {/* Modal container */}
            <div className={`relative w-full max-w-md ${theme.modalPanel} rounded-lg border shadow-lg p-6 max-h-[90vh] overflow-y-auto`}>

                {/* Close button (top-left) */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`absolute top-4 left-4 p-2 ${theme.hoverIcon} rounded-full transition-colors`}
                >
                    <X size={24} className={theme.textMuted} />
                </button>

                {/* Content */}
                <div className="text-center mt-10">
                    <h2 className={`text-2xl font-bold ${theme.text}`}>Filter Products</h2>
                    <div className="flex flex-col justify-between items-center gap-4 w-full mt-6">
                        <select
                            value={filters.category || ""}
                            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                            className={`w-full px-4 py-2 border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
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
                            className={`w-full px-4 py-2 border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400`}
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
                            className={`w-full border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />

                        <input
                            type="date"
                            value={filters.projectMaxDate || ""}
                            onChange={(e) => setFilters({...filters, projectMaxDate: e.target.value})}
                            className={`w-full border ${theme.inputBorder} ${theme.inputBg} ${theme.inputText} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
                        />

                        <div className="w-full flex flex-row justify-between gap-3 mt-4">
                            <button
                                onClick={() => {setSubmitFilter(true)}}
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${theme.primaryBtn}`}
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
                                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${theme.secondaryBtn}`}
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
        <div className={`${theme.panel} rounded-lg shadow-sm border ${theme.panelBorder} flex flex-col`}>
          <div className={`p-6 border-b ${theme.panelBorder} shrink-0 flex flex-col sm:flex-row items-center justify-between gap-4`}>
            <div>
              <button
                  onClick={() => { setIsOpen(!isOpen) }}
                  className={`text-sm md:text-lg text-center transition-all duration-300 flex items-center justify-center px-3 scale-100 hover:scale-110 -translate-y-0 sm:-translate-y-1 font-semibold ${theme.filterText}`}
              >
                  Filter
              </button>
            </div>
            <h3 className={`text-xl font-semibold ${theme.text} order-first sm:order-none`}>
              Project Management
            </h3>
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${theme.primaryBtn}`}
              onClick={() => {
                setAddProject(true);
              }}
            >
              <Plus className="w-4 h-4" />
              <span>Add Project</span>
            </button>
          </div>
          <div
            className="p-6 overflow-y-auto overflow-x-auto"
            style={{ height: "calc(100vh - 14rem)" }}
          >
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