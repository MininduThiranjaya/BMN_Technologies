import { useState } from "react";
import {
  Upload,
  X,
  MapPin,
  User,
  Camera,
  Save,
  Eye,
  Plus,
  Calendar,
  FileText,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { BeatLoader } from "react-spinners";
import {
  AddProjectProps,
  FormDataType,
  ImageType,
  ProjectImage,
} from "../interfaces/Project_Interfaces";
import { endpoints } from "../api";

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true,
};

export default function AddProject({
  existFormData,
  isOpen,
  onClose,
  type,
  title,
  statement,
  onSuccess,
}: AddProjectProps) {
  const [isLoading, setIsLoading] = useState(false);
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env
    .VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;

  const [formData, setFormData] = useState<FormDataType>({
    projectId: existFormData?.projectId,
    projectName: existFormData?.personName,
    personName: existFormData?.personName,
    location: existFormData?.location,
    projectDescription: existFormData?.projectDescription,
    category: existFormData?.category,
    projectDate: existFormData?.projectDate,
  });

  const [mainThumbnail, setMainThumbnail] = useState<ImageType>({
    file: null,
    preview: existFormData?.imageUrl[0].imageUrl,
    name: null,
  });

  const [additionalImages, setAdditionalImages] = useState<ImageType[]>([
    { file: null, preview: existFormData?.imageUrl[1].imageUrl, name: null },
    { file: null, preview: existFormData?.imageUrl[2].imageUrl, name: null },
    { file: null, preview: existFormData?.imageUrl[3].imageUrl, name: null },
    { file: null, preview: existFormData?.imageUrl[4].imageUrl, name: null },
  ]);
  const [dragOver, setDragOver] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMainThumbnailUpload = (file: any) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        setMainThumbnail({
          file: file,
          preview: e.target?.result,
          name: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdditionalImageUpload = (file: any, index: any) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const newImages = [...additionalImages];
        newImages[index] = {
          file: file,
          preview: e.target?.result,
          name: file.name,
        };
        setAdditionalImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: any) => {
    const newImages = [...additionalImages];
    newImages[index] = { file: null, preview: null, name: null };
    setAdditionalImages(newImages);
  };

  const removeMainThumbnail = () => {
    setMainThumbnail({ file: null, preview: null, name: null });
  };

  const handleDrop = (e: any, callback: any, index: number) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      if (index !== null) {
        callback(files[0], index);
      } else {
        callback(files[0]);
      }
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (mainThumbnail?.file && mainThumbnail?.name && mainThumbnail?.preview) {
      setIsLoading(true);
      const allImages: ImageType[] = [mainThumbnail, ...additionalImages];
      const compressedImages = (
        await Promise.all(
          allImages.map(async (image) => {
            if (image.file instanceof File && image.name && image.preview) {
              return await imageCompression(image.file, options);
            }
            return null;
          })
        )
      ).filter((img): img is File => img !== null);
      // console.log(compressedImages);
      uploadImage(compressedImages);
    } else {
      toast.error("No Main Thumbnail Selected...");
    }
  };

  const uploadImage = async (allImages: File[]) => {
    const imageUrl: ProjectImage[] = [];

    try {
      const uploadPromises = allImages.map(async (file) => {
        const tempImage = new FormData();
        tempImage.append("file", file);
        tempImage.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
        tempImage.append("folder", "bmn_technologies/projects");

        const res = await axios.post(CLOUDINARY_UPLOAD_URL, tempImage, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        const data = res.data;
        return data.secure_url;
      });

      const urls = await Promise.all(uploadPromises);
      imageUrl.push(...urls.map((url) => ({ imageUrl: url })));
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Image upload failed.");
    } finally {
      setIsLoading(false);
      const updatedFormData = {
        ...formData,
        imageUrl,
      };
      addProjectIntoDatabase(updatedFormData);
      handleClose();
    }
    // console.log("All Uploaded URLs:", imageUrl);
  };

  const addProjectIntoDatabase = (updatedFormData: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log(updatedFormData);
      axios
        .post(endpoints.project.add, updatedFormData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Project added successfully:", response.data);
          onSuccess();
          toast.success("Project added successfully!");
        })
        .catch((error) => {
          console.error("Error adding Project:", error);
          toast.error("Failed to add Project. Please try again.");
        });
    } catch (error) {
      console.error("Error adding Project to database:", error);
      toast.error("Failed to add Project. Please try again.");
    }
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const handleClose = () => {
    // Reset form when closing
    setFormData({
      projectId: "",
      projectName: "",
      personName: "",
      location: "",
      projectDescription: "",
      category: "",
      projectDate: "",
    });
    setMainThumbnail({ file: null, preview: null, name: null });
    setAdditionalImages([
      { file: null, preview: null, name: null },
      { file: null, preview: null, name: null },
      { file: null, preview: null, name: null },
      { file: null, preview: null, name: null },
    ]);
    setPreviewMode(false);
    onClose();
  };

  if (!isOpen) return null;

  if (previewMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
            <h2 className="text-2xl font-bold text-gray-800">
              Project Preview
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={togglePreview}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Edit
              </button>
              <button
                onClick={handleClose}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                {mainThumbnail.preview ? (
                  <img
                    src={mainThumbnail.preview}
                    alt="Project"
                    className="w-full h-96 object-cover rounded-lg shadow-md"
                  />
                ) : (
                  <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Camera className="w-16 h-16 text-gray-400" />
                  </div>
                )}

                <div className="grid grid-cols-4 gap-2 mt-4">
                  {additionalImages.map((image, index) => (
                    <div key={index} className="aspect-square">
                      {image.preview ? (
                        <img
                          src={image.preview}
                          alt={`Project ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                          <Camera className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {formData.projectName || "Project Name"}
                </h1>
                <p className="text-lg text-blue-600 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  {formData.personName || "Person Name"}
                </p>
                <p className="text-lg text-green-600 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  {formData.location || "Location"}
                </p>
                <p className="text-gray-600 mb-4">
                  Project ID: {formData.projectId || "N/A"}
                </p>
                <p className="text-gray-600 mb-4 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Project Date: {formData.projectDate || "N/A"}
                </p>
                <p className="text-gray-600 mb-6">
                  Category: {formData.category || "N/A"}
                </p>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {formData.projectDescription || "No description provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-60">
          <BeatLoader color="#0065F8" size={25} margin={6} />
        </div>
      )}

      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">{title}</h1>
              <p className="text-blue-100 mt-1">{statement}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={togglePreview}
                className="flex items-center px-4 py-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </button>
              <button
                onClick={handleClose}
                className="p-2 text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Project Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  Project Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project ID *
                    </label>
                    <input
                      type="text"
                      name="projectId"
                      value={formData.projectId ?? ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter unique project ID"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName ?? ""}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Enter project name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Person Name *
                    </label>
                    <div className="relative">
                      <User className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="personName"
                        value={formData.personName ?? ""}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter person name"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <div className="relative">
                      <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="location"
                        value={formData.location ?? ""}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                        placeholder="Enter location"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category ?? ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="">Select Category</option>
                        <option value="web-development">Residential Solar</option>
                        <option value="mobile-app">Commercial Buildings</option>
                        <option value="design">Industrial Solutions</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Project Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          name="projectDate"
                          value={formData.projectDate ?? ""}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Project Description *
                    </label>
                    <textarea
                      name="projectDescription"
                      value={formData.projectDescription ?? ""}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Enter detailed project description..."
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-blue-600" />
                  Project Images
                </h3>

                {/* Main Thumbnail */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Thumbnail *
                  </label>
                  <div
                    className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                      dragOver
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300"
                    }`}
                    onDrop={(e) => handleDrop(e, handleMainThumbnailUpload, 0)}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                  >
                    {mainThumbnail.preview ? (
                      <div className="relative">
                        <img
                          src={mainThumbnail.preview}
                          alt="Main thumbnail"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={removeMainThumbnail}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="mt-2 text-sm text-gray-600 truncate">
                          {mainThumbnail.name}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">
                          Drop your main project image here, or{" "}
                          <label className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                            browse
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={(e: any) =>
                                handleMainThumbnailUpload(e.target.files[0])
                              }
                            />
                          </label>
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Additional Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Images (Up to 4)
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {additionalImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 aspect-square transition-colors hover:border-blue-400"
                        onDrop={(e) =>
                          handleDrop(e, handleAdditionalImageUpload, index)
                        }
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                      >
                        {image.preview ? (
                          <div className="relative h-full">
                            <img
                              src={image.preview}
                              alt={`Additional ${index + 1}`}
                              className="w-full h-full object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="h-full flex flex-col items-center justify-center text-center">
                            <Plus className="w-8 h-8 text-gray-400 mb-2" />
                            <label className="text-xs text-blue-600 hover:text-blue-700 cursor-pointer font-medium">
                              Add Image
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e: any) =>
                                  handleAdditionalImageUpload(
                                    e.target.files[0],
                                    index
                                  )
                                }
                              />
                            </label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              {type} Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
