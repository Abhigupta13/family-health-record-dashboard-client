import axios from 'axios';
import { socketService } from './socketService';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export const uploadDocument = async (file, familyId, memberId, tags = []) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('familyId', familyId);
    formData.append('memberId', memberId);
    formData.append('tags', JSON.stringify(tags));

    const response = await axios.post(`${API_URL}/api/document/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Emit socket event for real-time update
    socketService.emit('document-upload', {
      familyId,
      memberId,
      document: response.data,
    });

    return response.data;
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const getDocuments = async (familyId, memberId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/document/${familyId}/${memberId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const deleteDocument = async (documentId, familyId) => {
  try {
    const response = await axios.delete(
      `${API_URL}/api/document/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    // Emit socket event for real-time update
    socketService.emit('document-deleted', {
      familyId,
      documentId,
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};

export const updateDocumentTags = async (documentId, tags, familyId) => {
  try {
    const response = await axios.patch(
      `${API_URL}/api/document/${documentId}/tags`,
      { tags },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    // Emit socket event for real-time update
    socketService.emit('document-updated', {
      familyId,
      documentId,
      tags,
    });

    return response.data;
  } catch (error) {
    console.error('Error updating document tags:', error);
    throw error;
  }
}; 