import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AddProject from "./AddProject";
import axios from "axios";
import {
  ProjectType,
  ProjectPropsType,
} from "../interfaces/Project_Interfaces";
import { endpoints } from "../api";
import ProjectManagement from "./ProjectManagement";

export default function Projects({ onSuccess }: ProjectPropsType) {
  const [addProject, setAddProject] = useState(false);
  const [allProjects, setAllProjects] = useState<ProjectType[]>([]);

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

  useEffect(() => {
    fetchAllProjects();
  }, [addProject]);

  function deleteProduct(id: number) {
    const response = allProjects.filter((item) => item.id != id);
    setAllProjects(response);
    onSuccess();
  }

  return (
    <>
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b flex items-center justify-between">
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
          <div className="p-6">
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
