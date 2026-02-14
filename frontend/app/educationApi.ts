import axios from 'axios';

export interface Education {
  id: number;
  educationId: string;
  schoolName: string;
  program: string;
  time: string;
  description?: string;
}

export interface EducationRequestDTO {
  educationId?: string;
  schoolName?: string;
  program?: string;
  time?: string;
}

export interface EducationResponseDTO {
  id?: number;
  educationId?: string;
  schoolName?: string;
  program?: string;
  time?: string;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/education`
    : "http://localhost:8080/api/v1/education";

export const educationApi = {
  async getAll(token?: string): Promise<Education[]> {
    const res = await axios.get(API_BASE, token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {});
    return res.data;
  },

  async getEducationById(educationId: string, token: string): Promise<Education> {
    const res = await axios.get(`${API_BASE}/${educationId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  async updateEducation(id: string, dto: EducationRequestDTO, token: string): Promise<EducationResponseDTO> {
    const res = await axios.put(`${API_BASE}/${id}`, dto, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  async createEducation(dto: EducationRequestDTO, token: string): Promise<EducationResponseDTO> {
    const res = await axios.post(API_BASE, dto, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  async deleteEducation(id: string, token: string): Promise<EducationResponseDTO> {
    const res = await axios.delete(`${API_BASE}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },
};
