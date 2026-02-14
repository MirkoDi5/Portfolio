import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/contacts`
    : "http://localhost:8080/api/v1/contacts";

export interface ContactsRequestDTO {
  name: string;
  lastName: string;
  email: string;
  comment: string;
}

export interface ContactsResponseDTO {
  id: number;
  name: string;
  lastName: string;
  email: string;
  comment: string;
}

export const contactsApi = {
  getAllContacts: async (token?: string): Promise<ContactsResponseDTO[]> => {
    const res = await axios.get(BASE_URL, token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {});
    return res.data;
  },

  getContactById: async (contactId: string, token?: string): Promise<ContactsResponseDTO> => {
    const res = await axios.get(`${BASE_URL}/${contactId}`, token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {});
    return res.data;
  },

  createContact: async (dto: ContactsRequestDTO, token?: string): Promise<ContactsResponseDTO> => {
    const res = await axios.post(BASE_URL, dto, token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {});
    return res.data;
  },

  updateContact: async (contactId: string, dto: ContactsRequestDTO, token?: string): Promise<ContactsResponseDTO> => {
    const res = await axios.put(`${BASE_URL}/${contactId}`, dto, token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {});
    return res.data;
  },

  deleteContact: async (contactId: string, token?: string): Promise<void> => {
    await axios.delete(`${BASE_URL}/${contactId}`, token ? {
      headers: { Authorization: `Bearer ${token}` }
    } : {});
  }
};
