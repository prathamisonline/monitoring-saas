import api from "@/lib/api";

export const getProjects = async () => {
  const res = await api.get("/project");
  return res.data;
};

export const createProject = async (data: {
  name: string;
  description?: string;
}) => {
  const res = await api.post("/project", data);
  return res.data;
};

export const removeProject=async (projectId:string)=>{
  const res = await api.delete(`/project/${projectId}`);
  return res?.data
}