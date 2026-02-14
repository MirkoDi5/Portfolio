import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/projects`
    : "http://localhost:8080/api/v1/projects";

export type ProjectRequestDTO = {
  projectId?: string;
  name?: string;
  description?: string;
  link?: string;
  prodLink?: string;
};

export const getAllProjects = (token?: string) => axios.get(BASE_URL, token ? {
  headers: { Authorization: `Bearer ${token}` }
} : {});

export const getProjectById = (projectId: string, token: string) => axios.get(`${BASE_URL}/${projectId}`, {
  headers: { Authorization: `Bearer ${token}` }
});

export const createProject = (dto: ProjectRequestDTO, token: string) => axios.post(BASE_URL, dto, {
  headers: { Authorization: `Bearer ${token}` }
});

export const updateProject = (projectId: string, dto: ProjectRequestDTO, token: string) => axios.put(`${BASE_URL}/${projectId}`, dto, {
  headers: { Authorization: `Bearer ${token}` }
});

export const deleteProject = (projectId: string, token: string) => axios.delete(`${BASE_URL}/${projectId}`, {
  headers: { Authorization: `Bearer ${token}` }
});
