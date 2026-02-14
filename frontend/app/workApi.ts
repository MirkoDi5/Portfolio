import axios from 'axios';

export interface Work {
  id: string;
  workId?: string;
  name?: string;
  workName?: string;
  time?: string;
  description?: string;
}

export interface WorkRequestDTO {
  workId?: string;
  name?: string;
  workName?: string;
  time?: string; // Fix type to string
  description?: string;
}

export interface WorkResponseDTO {
  id?: number;
  workId?: string;
  name?: string;
  workName?: string;
  time?: string;
  description?: string;
}

// Use backend URL directly for development
const API_BASE = "http://localhost:8080/api/v1/work";

export const workApi = {
  async getAll(token?: string): Promise<Work[]> {
    const res = await axios.get(API_BASE, token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {});
    return res.data;
  },

  async getWorkById(workId: string, token: string): Promise<Work> {
    const res = await axios.get(`${API_BASE}/${workId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  async updateWork(workId: string, dto: WorkRequestDTO, token: string): Promise<WorkResponseDTO> {
    const res = await axios.put(`${API_BASE}/${workId}`, dto, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  async createWork(dto: WorkRequestDTO, token: string): Promise<WorkResponseDTO> {
    const res = await axios.post(API_BASE, dto, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  async deleteWork(id: string, token: string): Promise<WorkResponseDTO> {
    const res = await axios.delete(`${API_BASE}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },
};
