import axiosInstance from "../utils/axiosInstance";

export const getStudentFiles = async () => {
  const response = await axiosInstance.get("/api/student-files");

  return response.data;
};

export const uploadStudentFile = async (file, uploadData) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("program", uploadData.program);
  formData.append("academic_year", uploadData.academicYear);
  formData.append("academic_session", uploadData.academicSession);
  formData.append("semester", uploadData.semester);

  console.log([...formData.entries()]);

  const response = await axiosInstance.post(
    "/api/student-files/upload",
    formData,
  );

  return response.data;
};

export const getStudentRecords = async (fileId) => {
  const response = await axiosInstance.get(
    `/api/student-files/${fileId}/records`,
  );

  return response.data;
};

export const deleteStudentFile = async (fileId) => {
  const response = await axiosInstance.delete(`/api/student-files/${fileId}`);

  return response.data;
};
