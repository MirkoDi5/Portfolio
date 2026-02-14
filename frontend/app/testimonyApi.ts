// app/testimonyApi.ts
import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1/testimony";

// Match backend DTOs
export interface TestimonyRequestDTO {
  firstName: string;
  lastName: string;
  comment: string;
  rating: number;
  status?: "PENDING" | "APPROVED" | "REJECTED";
}

export interface TestimonyResponseDTO {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  comment: string;
  rating: number;
  createdAt: string; // ISO string for LocalDateTime
  status: "PENDING" | "APPROVED" | "REJECTED";
}

export const testimonyApi = {
  // ✅ Public GETs (no token or credentials)
  async getAll(token?: string) {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : { withCredentials: false, headers: {} };
    const res = await axios.get<TestimonyResponseDTO[]>(API_URL, config);
    return res.data;
  },

  async getTestimonyById(id: number, token?: string) {
    const config = token
      ? { headers: { Authorization: `Bearer ${token}` } }
      : { withCredentials: false, headers: {} };
    const res = await axios.get<TestimonyResponseDTO>(`${API_URL}/${id}`, config);
    return res.data;
  },

  // 🔐 Protected endpoints (require JWT)
  async createTestimony(testimony: TestimonyRequestDTO, token: string) {
    const res = await axios.post<TestimonyResponseDTO>(API_URL, testimony, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },

  async updateTestimony(
    id: number,
    testimony: TestimonyRequestDTO,
    token: string
  ) {
    const res = await axios.put<TestimonyResponseDTO>(
      `${API_URL}/${id}`,
      testimony,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  },

  async deleteTestimony(id: number, token: string) {
    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
