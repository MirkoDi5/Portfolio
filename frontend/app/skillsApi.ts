import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/skills";

export interface Skill {
  id: string;
  skillId: string;
  name: string;
  level: string;
  // Add other fields as needed
}

export interface SkillsRequestDTO {
  skillId: string;
  name: string;
  level: string;
  
}

export interface SkillsResponseDTO {
  id: string;
  skillId: string;
  name: string;
  level: string;
}

export const skillsApi = {
  getAll: async (token?: string): Promise<Skill[]> => {
    const res = await axios.get(BASE_URL, token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {});
    return res.data;
  },

  getSkillById: async (skillId: string, token: string): Promise<Skill> => {
    const res = await axios.get(`${BASE_URL}/${skillId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  updateSkill: async (skillId: string, dto: SkillsRequestDTO, token: string): Promise<SkillsResponseDTO> => {
    const res = await axios.put(`${BASE_URL}/${skillId}`, dto, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  createSkill: async (dto: SkillsRequestDTO, token: string): Promise<SkillsResponseDTO> => {
    const res = await axios.post(BASE_URL, dto, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },

  deleteSkill: async (id: string, token: string) => {
    const res = await axios.delete(`${BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  },
};
