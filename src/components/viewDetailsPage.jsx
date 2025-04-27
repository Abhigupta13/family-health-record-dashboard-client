import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaDownload, FaWindowClose, FaTrash, FaQrcode } from "react-icons/fa";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { StoreContext } from "../context/StoreContext";
import { API_BASE_URL } from "@/utils/constant";
import HealthTimeline from "./HealthTimeline";
import HealthChart from "./HealthChart";
import ImageViewer from 'react-simple-image-viewer';
import QRCode from 'qrcode.react';
import { jsPDF } from 'jspdf';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(StoreContext);

  const [member, setMember] = useState(null);
  const [currentHealthRecord, setCurrentHealthRecord] = useState(null);
  const [pastRecords, setPastRecords] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('view');
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const [imageViewerIndex, setImageViewerIndex] = useState(0);
  const [imageViewerImages, setImageViewerImages] = useState([]);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrData, setQrData] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }
    console.log(viewMode)
    fetchMemberDetails();
  }, [id, isAuthenticated]);

  const fetchMemberDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/api/health/family/${id}/records`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        // console.log(response.data.data)
        setMember(response.data.data);
        fetchHealthRecords(token);
      } else {
        toast.error("Member not found");
      }
    } catch (error) {
      toast.error("Error fetching member details");
      console.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  const fetchHealthRecords = async (token) => {
    try {
      
      const response = await axios.get(`${API_BASE_URL}/api/health/family/${id}/records`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPastRecords(response.data.data.healthRecords);
      setCurrentHealthRecord(response.data.data.healthRecords[0] || null);
    } catch (error) {
      toast.error("Error fetching health records");
      console.error(error.message)
    }
  };

  const handleViewRecord = (record) => {
    setSelectedRecord({
      ...record,
      visit_date: record.visit_date?.split('T')[0],
      follow_up_date: record.follow_up_date?.split('T')[0],
      medications: Array.isArray(record.medications) ? record.medications.join(', ') : record.medications || ''
    });
    setModalType("view");
    setViewMode('view');
    setImagePreviews(record.images || []);
  };

  const handleImageClick = (image) => {
    const images = imagePreviews.length > 0 ? imagePreviews : [];
    const index = images.indexOf(image);
    setImageViewerImages(images);
    setImageViewerIndex(index !== -1 ? index : 0);
    setIsImageViewerOpen(true);
    setModalType(null);
  };

  const handleAddNewRecord = () => {
    setSelectedRecord({
      illness: "",
      doctor_name: "",
      doctor_notes: "",
      visit_date: new Date().toISOString().split('T')[0],
      follow_up_date: "",
      medications: "",
      blood_pressure: {
        systolic: null,
        diastolic: null
      },
      heart_rate: null
    });
    setModalType("add");
    setViewMode('edit');
    setImagePreviews([]);
    setSelectedImages([]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(prev => [...prev, ...files]);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (index, isExisting = false) => {
    if (isExisting) {
      const imageToDelete = imagePreviews[index];
      setImagesToDelete(prev => [...prev, imageToDelete]);
    }
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent multiple submissions
    if (e.target.dataset.submitting === 'true') {
      return;
    }
    e.target.dataset.submitting = 'true';

    try {
      const formData = new FormData();

      // Add basic fields
      formData.append('illness', selectedRecord.illness || '');
      formData.append('doctor_name', selectedRecord.doctor_name || '');
      formData.append('doctor_notes', selectedRecord.doctor_notes || '');
      formData.append('medications', selectedRecord.medications || '');
      formData.append('visit_date', selectedRecord.visit_date || '');
      formData.append('follow_up_date', selectedRecord.follow_up_date || '');

      // Handle heart rate
      const heartRate = selectedRecord.heart_rate !== null && selectedRecord.heart_rate !== '' 
        ? Number(selectedRecord.heart_rate) 
        : null;
      formData.append('heart_rate', heartRate);

      // Handle blood pressure
      const bloodPressureObj = {
        systolic: selectedRecord.blood_pressure?.systolic !== null && selectedRecord.blood_pressure?.systolic !== ''
          ? Number(selectedRecord.blood_pressure.systolic)
          : null,
        diastolic: selectedRecord.blood_pressure?.diastolic !== null && selectedRecord.blood_pressure?.diastolic !== ''
          ? Number(selectedRecord.blood_pressure.diastolic)
          : null
      };
      formData.append('blood_pressure', JSON.stringify(bloodPressureObj));

      // Add new images
      if (selectedImages && selectedImages.length > 0) {
        selectedImages.forEach((image) => {
          formData.append('images', image);
        });
      }

      // Make API call to add new record
      const response = await axios.post(
        `${API_BASE_URL}/api/health/family/${id}/records`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        closeModal();
        toast.success('Health record added successfully');
        await fetchMemberDetails();
      }
    } catch (error) {
      console.error('Error adding health record:', error);
      toast.error(error.response?.data?.message || 'Failed to add health record');
    } finally {
      e.target.dataset.submitting = 'false';
    }
  };

  const handleUpdateRecord = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.target.dataset.submitting === 'true') {
      return;
    }
    e.target.dataset.submitting = 'true';

    try {
      const formData = new FormData();

      formData.append('illness', selectedRecord.illness || '');
      formData.append('doctor_name', selectedRecord.doctor_name || '');
      formData.append('doctor_notes', selectedRecord.doctor_notes || '');
      formData.append('medications', selectedRecord.medications || '');
      formData.append('visit_date', selectedRecord.visit_date || '');
      formData.append('follow_up_date', selectedRecord.follow_up_date || '');

      const heartRate = selectedRecord.heart_rate !== null && selectedRecord.heart_rate !== '' 
        ? Number(selectedRecord.heart_rate) 
        : null;
      formData.append('heart_rate', heartRate);

      const bloodPressureObj = selectedRecord.blood_pressure
        ? {
            systolic:
              selectedRecord.blood_pressure.systolic != null && selectedRecord.blood_pressure.systolic !== ''
                ? Number(selectedRecord.blood_pressure.systolic)
                : null,
            diastolic:
              selectedRecord.blood_pressure.diastolic != null && selectedRecord.blood_pressure.diastolic !== ''
                ? Number(selectedRecord.blood_pressure.diastolic)
                : null,
          }
        : null;
      formData.append('blood_pressure', JSON.stringify(bloodPressureObj));

      const existingImages = imagePreviews.filter(img => !img.startsWith('blob:'));
      if (existingImages && existingImages.length > 0) {
        formData.append('existingImages', JSON.stringify(existingImages));
      }

      if (imagesToDelete && imagesToDelete.length > 0) {
        formData.append('imagesToDelete', JSON.stringify(imagesToDelete));
      }

      if (selectedImages && selectedImages.length > 0) {
        selectedImages.forEach((image) => {
          formData.append('images', image);
        });
      }

      const response = await axios.put(
        `${API_BASE_URL}/api/health/family/${id}/records/${selectedRecord._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.data.success) {
        closeModal();
        toast.success('Health record updated successfully');
        await fetchMemberDetails();
      }
    } catch (error) {
      console.error('Error updating health record:', error);
      toast.error(error.response?.data?.message || 'Failed to update health record');
    } finally {
      e.target.dataset.submitting = 'false';
    }
  };

  const handleEditRecord = (record) => {
    setSelectedRecord({
      ...record,
      visit_date: record.visit_date?.split('T')[0],
      follow_up_date: record.follow_up_date?.split('T')[0],
      medications: Array.isArray(record.medications) ? record.medications.join(', ') : record.medications || ''
    });
    setModalType("edit");
    setViewMode('edit');
    setImagePreviews(record.images || []);
    setSelectedImages([]);
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/health/family/${id}/records/${recordId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success('Record deleted successfully');
      fetchHealthRecords(localStorage.getItem("token"));
    } catch (error) {
      toast.error('Failed to delete record');
      console.error(error.message);
    }
  };

  const closeModal = () => {
    setModalType(null);
    setViewMode('view');
    setSelectedRecord({
      illness: "",
      doctor_name: "",
      doctor_notes: "",
      visit_date: "",
      follow_up_date: "",
      medications: "",
      blood_pressure: {
        systolic: null,
        diastolic: null
      },
      heart_rate: null
    });
    setSelectedImages([]);
    setImagePreviews([]);
    setImagesToDelete([]);
  };

  // Transform health records into chart data
  const getChartData = () => {
    if (!pastRecords || pastRecords.length === 0) return [];
    
    return pastRecords.map(record => ({
      date: record.visit_date,
      bloodPressure: record.blood_pressure ? 
        (record.blood_pressure.systolic + record.blood_pressure.diastolic) / 2 : 
        null,
      systolic: record.blood_pressure?.systolic || null,
      diastolic: record.blood_pressure?.diastolic || null,
      heartRate: record.heart_rate || null,
    })).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    const dayWithSuffix = day + (day % 10 === 1 && day !== 11 ? 'st' : 
                                day % 10 === 2 && day !== 12 ? 'nd' : 
                                day % 10 === 3 && day !== 13 ? 'rd' : 'th');
    return `${dayWithSuffix} ${month} ${year}`;
  };

  const generatePDF = async () => {
    if (!member || !currentHealthRecord) {
      toast.error("No health record data available");
      return;
    }
  
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
  
      // Header
      doc.setFontSize(24);
      doc.setTextColor(0, 128, 128);
      doc.text('Family Health Records', 105, 20, { align: 'center' });
      doc.setDrawColor(0, 128, 128);
      doc.line(20, 25, 190, 25); // Header underline
  
      // Member Info Section
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('Member Information', 20, 40);
      doc.setFontSize(12);
      doc.text(`Name: ${member.familyMember.name}`, 20, 50);
      doc.text(`Email: ${member.familyMember.email || 'N/A'}`, 20, 58);
      doc.text(`Relation: ${member.familyMember.relation || 'N/A'}`, 20, 66);
      doc.text(`Last Visit: ${formatDate(member.familyMember.last_doctor_visit) || 'N/A'}`, 20, 74);
  
      // Current Health Record Section
      doc.setFontSize(16);
      doc.text('Current Health Record', 20, 90);
      doc.setFontSize(12);
      doc.text(`Illness: ${currentHealthRecord.illness || 'N/A'}`, 20, 100);
      doc.text(`Doctor: ${currentHealthRecord.doctor_name || 'N/A'}`, 20, 108);
      doc.text(`Visit Date: ${formatDate(currentHealthRecord.visit_date) || 'N/A'}`, 20, 116);
      doc.text(`Follow-up Date: ${formatDate(currentHealthRecord.follow_up_date) || 'N/A'}`, 20, 124);
  
      // Current Vital Signs
      doc.setFontSize(16);
      doc.text('Current Vital Signs', 20, 140);
      doc.setFontSize(12);
      if (currentHealthRecord.blood_pressure) {
        doc.text(`Blood Pressure: ${currentHealthRecord.blood_pressure.systolic}/${currentHealthRecord.blood_pressure.diastolic} mmHg`, 20, 150);
      }
      if (currentHealthRecord.heart_rate) {
        doc.text(`Heart Rate: ${currentHealthRecord.heart_rate} bpm`, 20, 158);
      }
  
      // Current Medications
      doc.setFontSize(16);
      doc.text('Current Medications', 20, 174);
      doc.setFontSize(12);
      const medications = Array.isArray(currentHealthRecord.medications)
        ? currentHealthRecord.medications.join(', ')
        : currentHealthRecord.medications || 'N/A';
      const splitMeds = doc.splitTextToSize(`Medications: ${medications}`, 170);
      doc.text(splitMeds, 20, 184);
  
      // Current Doctor Notes
      doc.setFontSize(16);
      doc.text('Current Doctor Notes', 20, 200);
      doc.setFontSize(12);
      const notes = currentHealthRecord.doctor_notes || 'N/A';
      const splitNotes = doc.splitTextToSize(notes, 170);
      doc.text(splitNotes, 20, 210);

      // Past Health Records Section
      if (pastRecords && pastRecords.length > 0) {
        doc.addPage();
        doc.setFontSize(20);
        doc.setTextColor(0, 128, 128);
        doc.text('Past Health Records', 105, 20, { align: 'center' });
        doc.setDrawColor(0, 128, 128);
        doc.line(20, 25, 190, 25);

        let yPosition = 40;
        pastRecords.forEach((record, index) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 40;
          }

          doc.setFontSize(14);
          doc.setTextColor(0, 0, 0);
          doc.text(`Record #${index + 1} - ${formatDate(record.visit_date)}`, 20, yPosition);
          
          doc.setFontSize(12);
          yPosition += 10;
          doc.text(`Illness: ${record.illness || 'N/A'}`, 20, yPosition);
          
          yPosition += 10;
          doc.text(`Doctor: ${record.doctor_name || 'N/A'}`, 20, yPosition);
          
          yPosition += 10;
          if (record.blood_pressure) {
            doc.text(`Blood Pressure: ${record.blood_pressure.systolic}/${record.blood_pressure.diastolic} mmHg`, 20, yPosition);
            yPosition += 10;
          }
          
          if (record.heart_rate) {
            doc.text(`Heart Rate: ${record.heart_rate} bpm`, 20, yPosition);
            yPosition += 10;
          }

          const pastMedications = Array.isArray(record.medications)
            ? record.medications.join(', ')
            : record.medications || 'N/A';
          const splitPastMeds = doc.splitTextToSize(`Medications: ${pastMedications}`, 170);
          doc.text(splitPastMeds, 20, yPosition);
          yPosition += splitPastMeds.length * 7;

          const pastNotes = record.doctor_notes || 'N/A';
          const splitPastNotes = doc.splitTextToSize(`Notes: ${pastNotes}`, 170);
          doc.text(splitPastNotes, 20, yPosition);
          yPosition += splitPastNotes.length * 7 + 10;

          // Add a separator line between records
          doc.setDrawColor(200);
          doc.line(20, yPosition, 190, yPosition);
          yPosition += 10;
        });
      }
  
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 290);
      doc.text('© Family Health Records', 105, 290, { align: 'center' });
  
      // Save the PDF
      doc.save(`${member.familyMember.name}-health-record.pdf`);
      toast.success('PDF generated successfully');
    } catch (error) {
      console.error('Error generating PDF:', error);
      toast.error('Failed to generate PDF');
    }
  };

  const generateQRCode = async () => {
    if (!member || !currentHealthRecord) {
      toast.error("No health record data available");
      return;
    }
  
    try {
      // Generate PDF first
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Header
      doc.setFontSize(24);
      doc.setTextColor(0, 128, 128);
      doc.text('Family Health Records', 105, 20, { align: 'center' });
      doc.setDrawColor(0, 128, 128);
      doc.line(20, 25, 190, 25);

      // Member Info Section
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('Member Information', 20, 40);
      doc.setFontSize(12);
      doc.text(`Name: ${member.familyMember.name}`, 20, 50);
      doc.text(`Email: ${member.familyMember.email || 'N/A'}`, 20, 58);
      doc.text(`Relation: ${member.familyMember.relation || 'N/A'}`, 20, 66);
      doc.text(`Last Visit: ${formatDate(member.familyMember.last_doctor_visit) || 'N/A'}`, 20, 74);

      // Current Health Record Section
      doc.setFontSize(16);
      doc.text('Current Health Record', 20, 90);
      doc.setFontSize(12);
      doc.text(`Illness: ${currentHealthRecord.illness || 'N/A'}`, 20, 100);
      doc.text(`Doctor: ${currentHealthRecord.doctor_name || 'N/A'}`, 20, 108);
      doc.text(`Visit Date: ${formatDate(currentHealthRecord.visit_date) || 'N/A'}`, 20, 116);
      doc.text(`Follow-up Date: ${formatDate(currentHealthRecord.follow_up_date) || 'N/A'}`, 20, 124);

      // Current Vital Signs
      doc.setFontSize(16);
      doc.text('Current Vital Signs', 20, 140);
      doc.setFontSize(12);
      if (currentHealthRecord.blood_pressure) {
        doc.text(`Blood Pressure: ${currentHealthRecord.blood_pressure.systolic}/${currentHealthRecord.blood_pressure.diastolic} mmHg`, 20, 150);
      }
      if (currentHealthRecord.heart_rate) {
        doc.text(`Heart Rate: ${currentHealthRecord.heart_rate} bpm`, 20, 158);
      }

      // Current Medications
      doc.setFontSize(16);
      doc.text('Current Medications', 20, 174);
      doc.setFontSize(12);
      const medications = Array.isArray(currentHealthRecord.medications)
        ? currentHealthRecord.medications.join(', ')
        : currentHealthRecord.medications || 'N/A';
      const splitMeds = doc.splitTextToSize(`Medications: ${medications}`, 170);
      doc.text(splitMeds, 20, 184);

      // Current Doctor Notes
      doc.setFontSize(16);
      doc.text('Current Doctor Notes', 20, 200);
      doc.setFontSize(12);
      const notes = currentHealthRecord.doctor_notes || 'N/A';
      const splitNotes = doc.splitTextToSize(notes, 170);
      doc.text(splitNotes, 20, 210);

      // Past Health Records Section
      if (pastRecords && pastRecords.length > 0) {
        doc.addPage();
        doc.setFontSize(20);
        doc.setTextColor(0, 128, 128);
        doc.text('Past Health Records', 105, 20, { align: 'center' });
        doc.setDrawColor(0, 128, 128);
        doc.line(20, 25, 190, 25);

        let yPosition = 40;
        pastRecords.forEach((record, index) => {
          if (yPosition > 250) {
            doc.addPage();
            yPosition = 40;
          }

          doc.setFontSize(14);
          doc.setTextColor(0, 0, 0);
          doc.text(`Record #${index + 1} - ${formatDate(record.visit_date)}`, 20, yPosition);
          
          doc.setFontSize(12);
          yPosition += 10;
          doc.text(`Illness: ${record.illness || 'N/A'}`, 20, yPosition);
          
          yPosition += 10;
          doc.text(`Doctor: ${record.doctor_name || 'N/A'}`, 20, yPosition);
          
          yPosition += 10;
          if (record.blood_pressure) {
            doc.text(`Blood Pressure: ${record.blood_pressure.systolic}/${record.blood_pressure.diastolic} mmHg`, 20, yPosition);
            yPosition += 10;
          }
          
          if (record.heart_rate) {
            doc.text(`Heart Rate: ${record.heart_rate} bpm`, 20, yPosition);
            yPosition += 10;
          }

          const pastMedications = Array.isArray(record.medications)
            ? record.medications.join(', ')
            : record.medications || 'N/A';
          const splitPastMeds = doc.splitTextToSize(`Medications: ${pastMedications}`, 170);
          doc.text(splitPastMeds, 20, yPosition);
          yPosition += splitPastMeds.length * 7;

          const pastNotes = record.doctor_notes || 'N/A';
          const splitPastNotes = doc.splitTextToSize(`Notes: ${pastNotes}`, 170);
          doc.text(splitPastNotes, 20, yPosition);
          yPosition += splitPastNotes.length * 7 + 10;

          // Add a separator line between records
          doc.setDrawColor(200);
          doc.line(20, yPosition, 190, yPosition);
          yPosition += 10;
        });
      }

      // Footer
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 290);
      doc.text('© Family Health Records', 105, 290, { align: 'center' });

      // Convert PDF to base64
      const pdfBase64 = doc.output('datauristring');
      
      // Send PDF to backend for S3 upload
      try {
        // Create a Blob from the PDF data
        const base64Data = pdfBase64.split(',')[1];
        const pdfBlob = await fetch(`data:application/pdf;base64,${base64Data}`).then(res => res.blob());
        
        // Create FormData and append the PDF
        const formData = new FormData();
        formData.append('pdf', pdfBlob, `health_record_${member.familyMember._id}_${Date.now()}.pdf`);
        formData.append('memberId', member.familyMember._id);
        formData.append('timestamp', Date.now());

        const response = await axios.post(
          `${API_BASE_URL}/api/emergency/download/${member.familyMember._id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.data.success) {
          // Create a unique identifier for this record
          const recordId = `${member.familyMember.name}-${Date.now()}`;
          
          // Store the full data in localStorage
          const fullData = {
            member: {
              name: member.familyMember.name,
              email: member.familyMember.email,
              relation: member.familyMember.relation,
            },
            currentHealthRecord: {
              illness: currentHealthRecord.illness,
              doctor_name: currentHealthRecord.doctor_name,
              doctor_notes: currentHealthRecord.doctor_notes,
              visit_date: currentHealthRecord.visit_date,
              follow_up_date: currentHealthRecord.follow_up_date,
              medications: currentHealthRecord.medications,
              blood_pressure: currentHealthRecord.blood_pressure,
              heart_rate: currentHealthRecord.heart_rate,
            },
            pastRecords: pastRecords.map(record => ({
              illness: record.illness,
              doctor_name: record.doctor_name,
              doctor_notes: record.doctor_notes,
              visit_date: record.visit_date,
              follow_up_date: record.follow_up_date,
              medications: record.medications,
              blood_pressure: record.blood_pressure,
              heart_rate: record.heart_rate,
            })),
            timestamp: new Date().toISOString(),
          };

          // Store data in localStorage
          localStorage.setItem(`health-record-data-${recordId}`, JSON.stringify(fullData));

          // Create QR code data with the S3 URL and recordId
          setQrData(JSON.stringify({
            pdfUrl: response.data.data.pdfUrl,
            recordId: recordId
          }));

          // Show success message
          setShowQRCode(true);
          toast.success('PDF generated and uploaded successfully!');
        } else {
          throw new Error(response.data.message || 'Failed to upload PDF');
        }
      } catch (error) {
        console.error('Error uploading PDF:', error);
        toast.error(error.response?.data?.message || 'Failed to upload PDF. Please try again.');
      }
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast.error('Failed to generate QR code');
    }
  };
  

  if (loading) return <p className="text-center">Loading...</p>;

  if (!member) return <p className="text-center text-red-500 text-lg">Member not found!</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      ) : (
        <div>
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex justify-center items-center">
                <img
                  src={member.familyMember.image}
                  alt={member.familyMember.name}
                  className="w-48 h-48 object-cover rounded-full border-4 border-teal-500"
                />
              </div>
              <div className="text-left space-y-3 col-span-2">
                <div className="flex justify-between items-start">
                  <h1 className="text-3xl font-bold text-teal-600">{member.familyMember.name}</h1>
                  <div className="flex gap-2">
                    <button
                      onClick={generatePDF}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                    >
                      <FaDownload className="w-5 h-5" />
                      <span>Download PDF</span>
                    </button>
                    <button
                      onClick={generateQRCode}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95"
                    >
                      <FaQrcode className="w-5 h-5" />
                      <span>Generate QR</span>
                    </button>
                  </div>
                </div>
                <p className="text-gray-700"><strong>Email:</strong> {member.familyMember.email || "Please add your email address"}</p>
                <p className="text-gray-700"><strong>Relation:</strong> {member.familyMember.relation || "Please add your relationship"}</p>
                <p className="text-gray-700"><strong>Last Doctor Visit:</strong> {formatDate(member.familyMember.last_doctor_visit) || "N/A"}</p>
              </div>
            </div>
          </div>
           <div className="bg-teal-50 shadow-md rounded-lg p-6 mb-8 border border-teal-200">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">Current Health Record</h2>
            {currentHealthRecord ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Diagnosis</h3>
                    <p className="text-gray-600">{currentHealthRecord.illness}</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Doctor Information</h3>
                    <p className="text-gray-600"><span className="font-medium">Name:</span> {currentHealthRecord.doctor_name}</p>
                    <p className="text-gray-600 mt-2"><span className="font-medium">Notes:</span> {currentHealthRecord.doctor_notes}</p>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Dates</h3>
                    <p className="text-gray-600"><span className="font-medium">Visit Date:</span> {formatDate(currentHealthRecord.visit_date)}</p>
                    {currentHealthRecord.follow_up_date && (
                      <p className="text-gray-600 mt-2"><span className="font-medium">Follow-up Date:</span> {formatDate(currentHealthRecord.follow_up_date)}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Vital Signs</h3>
                    {currentHealthRecord.blood_pressure && (
                      <div className="mb-3">
                        <p className="text-gray-600">
                          <span className="font-medium">Blood Pressure:</span> {currentHealthRecord.blood_pressure.systolic}/{currentHealthRecord.blood_pressure.diastolic} mmHg
                        </p>
                      </div>
                    )}
                    {currentHealthRecord.heart_rate && (
                      <p className="text-gray-600">
                        <span className="font-medium">Heart Rate:</span> {currentHealthRecord.heart_rate} bpm
                      </p>
                    )}
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Medications</h3>
                    {currentHealthRecord.medications && currentHealthRecord.medications.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-600">
                        {currentHealthRecord.medications.split(',').map((medication, index) => (
                          <li key={index}>{medication}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 italic">No medications prescribed</p>
                    )}
                  </div>

                  {/* {currentHealthRecord.images && currentHealthRecord.images.length > 0 && (
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Documents</h3>
                      <div className="grid grid-cols-2 gap-2">
                        {currentHealthRecord.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image}
                              alt={`Document ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                              <button
                                onClick={() => handleDownloadImage(image)}
                                className="text-white p-2 hover:text-blue-300"
                              >
                                <FaDownload />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 text-lg">No current health record available</p>
                <button
                  onClick={handleAddNewRecord}
                  className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Add New Record
                </button>
              </div>
            )}
          </div>

          {/* Health Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <HealthChart 
              data={getChartData()} 
              title="Blood Pressure Trends" 
              dataKey="systolic" 
              color="#4F46E5"
              secondaryDataKey="diastolic"
              secondaryColor="#10B981"
            />
            <HealthChart 
              data={getChartData()} 
              title="Heart Rate Trends" 
              dataKey="heartRate" 
              color="#E84444"
            />
          </div>

          {/* Health Timeline Section */}
          <div className="mb-8">
            <HealthTimeline 
              healthRecords={pastRecords} 
              memberId={id}
              onAddOrUpdateRecord={handleUpdateRecord}
              onDeleteRecord={handleDeleteRecord}
              onViewRecord={handleViewRecord}
              onEditRecord={handleEditRecord}
              onAddRecord={handleAddNewRecord}
              onCloseModal={closeModal}
              onSetViewMode={setViewMode}
              onSetSelectedRecord={setSelectedRecord}
              onImageClick={handleImageClick}
            />
          </div>

          {/* Modal for Add/Edit/View Record */}
          {modalType && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[800px] max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-700">
                    {modalType === 'add' ? 'Add New Health Record' : viewMode === 'view' ? 'View Health Record' : 'Edit Health Record'}
                  </h3>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaWindowClose size={24} />
                  </button>
                </div>

                {viewMode === 'view' ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold">Illness</p>
                        <p className="text-gray-600">{selectedRecord.illness}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Doctor Name</p>
                        <p className="text-gray-600">{selectedRecord.doctor_name}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="font-semibold">Doctor Notes</p>
                        <p className="text-gray-600">{selectedRecord.doctor_notes}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Blood Pressure</p>
                        <p className="text-gray-600">
                          {selectedRecord.blood_pressure?.systolic && selectedRecord.blood_pressure?.diastolic
                            ? `${selectedRecord.blood_pressure.systolic}/${selectedRecord.blood_pressure.diastolic} mmHg`
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Heart Rate</p>
                        <p className="text-gray-600">
                          {selectedRecord.heart_rate ? `${selectedRecord.heart_rate} bpm` : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold">Visit Date</p>
                        <p className="text-gray-600">{formatDate(selectedRecord.visit_date)}</p>
                      </div>
                      <div>
                        <p className="font-semibold">Follow-up Date</p>
                        <p className="text-gray-600">{formatDate(selectedRecord.follow_up_date)}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="font-semibold">Medications</p>
                        <p className="text-gray-600">{selectedRecord.medications || "N/A"}</p>
                      </div>
                    </div>

                    {imagePreviews.length > 0 && (
                      <div className="mt-6">
                        <p className="font-semibold mb-3">Uploaded Documents</p>
                        <div className="grid grid-cols-3 gap-4">
                          {imagePreviews.map((image, index) => (
                            <div key={index} className="relative group cursor-pointer">
                              <img
                                src={image}
                                alt={`Document ${index + 1}`}
                                className="w-full h-40 object-cover rounded-lg"
                                onClick={() => handleImageClick(image)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={modalType === 'add' ? handleAddRecord : handleUpdateRecord} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Illness *</label>
                        <input
                          type="text"
                          value={selectedRecord.illness || ""}
                          onChange={(e) => setSelectedRecord({ ...selectedRecord, illness: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Doctor Name *</label>
                        <input
                          type="text"
                          value={selectedRecord.doctor_name || ""}
                          onChange={(e) => setSelectedRecord({ ...selectedRecord, doctor_name: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Doctor Notes *</label>
                        <textarea
                          value={selectedRecord.doctor_notes || ""}
                          onChange={(e) => setSelectedRecord({ ...selectedRecord, doctor_notes: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          rows="3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Blood Pressure (Systolic)</label>
                        <input
                          type="number"
                          min="60"
                          max="250"
                          value={selectedRecord.blood_pressure?.systolic || ""}
                          onChange={(e) => setSelectedRecord({
                            ...selectedRecord,
                            blood_pressure: {
                              ...selectedRecord.blood_pressure,
                              systolic: e.target.value
                            }
                          })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Systolic (60-250)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Blood Pressure (Diastolic)</label>
                        <input
                          type="number"
                          min="40"
                          max="150"
                          value={selectedRecord.blood_pressure?.diastolic || ""}
                          onChange={(e) => setSelectedRecord({
                            ...selectedRecord,
                            blood_pressure: {
                              ...selectedRecord.blood_pressure,
                              diastolic: e.target.value
                            }
                          })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Diastolic (40-150)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Heart Rate (bpm)</label>
                        <input
                          type="number"
                          min="40"
                          max="200"
                          value={selectedRecord.heart_rate || ""}
                          onChange={(e) => setSelectedRecord({ ...selectedRecord, heart_rate: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          placeholder="Heart Rate (40-200)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Visit Date *</label>
                        <input
                          type="date"
                          value={selectedRecord.visit_date || ""}
                          onChange={(e) => setSelectedRecord({ ...selectedRecord, visit_date: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Follow-up Date</label>
                        <input
                          type="date"
                          value={selectedRecord.follow_up_date || ""}
                          onChange={(e) => setSelectedRecord({ ...selectedRecord, follow_up_date: e.target.value })}
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Medications</label>
                        <input
                          type="text"
                          value={selectedRecord.medications || ""}
                          onChange={(e) => setSelectedRecord({ ...selectedRecord, medications: e.target.value })}
                          placeholder="Enter medications separated by commas"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Documents
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        multiple
                        className="w-full"
                      />
                      {imagePreviews.length > 0 && (
                        <div className="grid grid-cols-3 gap-4 mt-4">
                          {imagePreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-40 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(index, !preview.startsWith('blob:'))}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                              >
                                <FaTrash size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-end space-x-2 mt-6">
                      <button
                        type="button"
                        onClick={closeModal}
                        className="bg-gray-400 text-white py-2 px-4 rounded-xl hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-teal-600 text-white py-2 px-4 rounded-xl hover:bg-teal-700"
                      >
                        {modalType === 'add' ? 'Add Record' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
            )}

          

          {/* Image Viewer Modal */}
          {isImageViewerOpen && imageViewerImages.length > 0 && (
            <ImageViewer
              src={imageViewerImages}
              currentIndex={imageViewerIndex}
              onClose={() => setIsImageViewerOpen(false)}
              disableScroll={false}
              backgroundStyle={{ backgroundColor: 'rgba(0,0,0,0.9)' }}
              closeOnClickOutside={true}
            />
          )}

          {/* QR Code Modal */}
          {showQRCode && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Health Record QR Code</h3>
                  <button
                    onClick={() => setShowQRCode(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FaWindowClose size={24} />
                  </button>
                </div>
                <div className="flex flex-col items-center space-y-4">
                  <div className="p-4 bg-white rounded-lg shadow-md">
                    <QRCode
                      value={JSON.parse(qrData).pdfUrl}
                      size={256}
                      level="H"
                      includeMargin={true}
                      renderAs="svg"
                    />
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Scan this QR code to access the health record data. The QR code contains a reference to the full health record information.
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={generatePDF}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <FaDownload className="w-4 h-4" />
                      <span>Download PDF</span>
                    </button>
                    <button
                      onClick={() => {
                        try {
                          const data = JSON.parse(qrData);
                          const fullData = JSON.parse(localStorage.getItem(`health-record-data-${data.recordId}`));
                          if (!fullData) {
                            toast.error('Health record data not found');
                            return;
                          }
                          const blob = new Blob([JSON.stringify(fullData, null, 2)], { type: 'application/json' });
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${fullData.member.name}-health-record.json`;
                          document.body.appendChild(a);
                          a.click();
                          window.URL.revokeObjectURL(url);
                          document.body.removeChild(a);
                        } catch (error) {
                          toast.error('Failed to download JSON file');
                          console.error('Error downloading JSON:', error);
                        }
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
                    >
                      <FaDownload className="w-4 h-4" />
                      <span>Download JSON</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MemberDetails;