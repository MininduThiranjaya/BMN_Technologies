import React, { useState, useMemo } from "react";
import {
  Edit2,
  Trash2,
  Package,
  ChevronLeft,
  ChevronRight,
  Folder,
} from "lucide-react";
import DeleteConfirmation from "./DeleteConfirmation";
import axios from "axios";
import { endpoints } from "../api";
import { toast } from "react-toastify";
import AddProject from "./AddProject";
import { ProjectDetailsProps, ProjectType } from "../interfaces/Project_Interfaces";

const ProjectManagement = ({
  projects,
  deleteProduct,
  onSuccess,
}: ProjectDetailsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = projects.length;
  const [editProject, setEditProject] = useState(false);
  const [editProjectDetails, setEditProjectDetails] = useState<ProjectType>();
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    id: null,
  });

  function fetchAllProjects() {
    onSuccess();
  }

  const handleEdit = (id: any) => {
    setEditProject(true);
    const tempProject = currentProjects.find((project) => project.id === id);
    setEditProjectDetails(tempProject);
    console.log(id);
    //fetch for updating exist product
  };

  const handleDelete = (id: any) => {
    setDeleteConfirmation({ show: true, id: id });
  };

  const confirmDelete = () => {
    console.log("Deleting project:", deleteConfirmation.id);
    const token = localStorage.getItem("accessToken");

    async function fetchAllProjects() {
      await axios
        .delete(
          endpoints.project.deleteProject.replace(
            ":projectId",
            deleteConfirmation.id ?? ""
          ),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          if(res.data.success) {
            console.log(res.data);
            toast.success("Project deleted successfuly...");
            deleteProduct(res.data.object.id);
          }
          else {
            toast.error("Error deleting project...");
          }
        })
        .catch((error) => {
          console.log("Error fetching data : ", error);
          toast.error("Error deleting project...");
        });
    }
    if (deleteConfirmation.id) {
      fetchAllProjects();
    }
    setDeleteConfirmation({ show: false, id: null });
  };

  const cancelDelete = () => {
    setDeleteConfirmation({ show: false, id: null });
  };

  // Calculate pagination
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = useMemo(
    () => projects.slice(startIndex, endIndex),
    [projects, startIndex, endIndex]
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500">
        <Folder className="w-16 h-16 mb-4 text-gray-300" />
        <h3 className="text-lg font-medium mb-2">No projects yet</h3>
        <p className="text-sm">Add your first project to get started</p>
      </div>
    );
  }

  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        {currentProjects.length > 0 &&
          currentProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-200"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                {project.imageUrl.length > 0 && project.projectName ? (
                  <img
                    src={project.imageUrl[0].imageUrl}
                    alt={project.projectName}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <div
                  className={`${
                    project.imageUrl ? "hidden" : "flex"
                  } absolute inset-0 items-center justify-center bg-gray-100`}
                >
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
              </div>

              {/* Product Details */}
              <div className="p-4">
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {project.projectName}
                  </h3>
                  {project.projectDescription && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {project.projectDescription}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <span className="text-md font-bold text-blue-500">
                      {project.location}
                    </span>
                    {project.category && (
                      <span className="text-xs text-gray-500 uppercase tracking-wide">
                        {project.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project.id)}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 text-xs font-medium"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="flex items-center justify-center gap-1 px-2 py-1.5 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition-colors duration-200 text-xs font-medium"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
                {/* Edit Product */}
                {editProject && (
                  <AddProject
                    existFormData={editProjectDetails}
                    isOpen={editProject}
                    onClose={() => setEditProject(false)}
                    type={"Edit"}
                    title="Edit Project"
                    statement="Fill in the details to Edit a exits project"
                    onSuccess={fetchAllProjects}
                  />
                )}

                {/* Delete Confirmation Modal */}
                {deleteConfirmation.show && (
                  <DeleteConfirmation
                    data={project}
                    cancelDelete={() => {
                      cancelDelete();
                    }}
                    confirmDelete={() => {
                      confirmDelete();
                    }}
                    categoty={"Project"}
                  />
                )}
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 bg-white border-t border-gray-200">
          {/* Results Info */}
          <div className="flex items-center text-sm text-gray-700">
            <span>
              Showing {startIndex + 1} to {Math.min(endIndex, projects.length)}{" "}
              of {projects.length} products
            </span>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === "..." ? (
                    <span className="px-3 py-2 text-sm text-gray-500">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectManagement;
