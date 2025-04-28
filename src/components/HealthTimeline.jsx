import PropTypes from 'prop-types';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { motion } from 'framer-motion';
import { FaStethoscope, FaEdit, FaTrash, FaPlus, FaEye } from 'react-icons/fa';
import { Card, CardContent } from './ui/card';

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

const HealthTimeline = ({ 
  healthRecords = [], 
  onDeleteRecord,
  onViewRecord,
  onEditRecord,
  onAddRecord,
  onCloseModal,
  onSetViewMode,
  onSetSelectedRecord,
  onImageClick
}) => {
  const sortedRecords = [...healthRecords].sort(
    (a, b) => new Date(b.visit_date) - new Date(a.visit_date)
  );

  const handleAddButtonClick = () => {
    onSetSelectedRecord({
      diagnosis: "",
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
    onSetViewMode('edit');
    onAddRecord();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Health Timeline</h3>
            <button
              type="button"
              onClick={handleAddButtonClick}
              className="flex items-center bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-all"
            >
              <FaPlus className="mr-2" /> Add Record
            </button>
          </div>
          <VerticalTimeline>
            {sortedRecords.length === 0 ? (
              <VerticalTimelineElement
                iconStyle={{ background: '#ccc', color: '#fff' }}
                icon={<FaStethoscope />}
                date="N/A"
              >
                <h3 className="text-lg font-bold text-gray-700">No Health Records</h3>
              </VerticalTimelineElement>
            ) : (
              sortedRecords.map((record) => (
                <VerticalTimelineElement
                  key={record._id}
                  date={formatDate(record.visit_date)}
                  iconStyle={{ background: '#0f766e', color: '#fff' }}
                  icon={<FaStethoscope />}
                  contentStyle={{ borderTop: '3px solid #0f766e' }}
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start p-4 bg-gray-50 rounded-lg transition-colors cursor-pointer" onClick={() => onViewRecord(record)}>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg lg:text-xl font-semibold text-teal-700">{record.diagnosis}</h3>
                      <h4 className="text-sm text-gray-600">{record.doctor_name}</h4>
                      <p className="mt-1 text-gray-500">{record.doctor_notes}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {record.blood_pressure?.systolic && record.blood_pressure?.diastolic && (
                          <span className="text-xs font-medium bg-teal-100 text-teal-800 px-2 py-1 rounded">
                            BP: {record.blood_pressure.systolic}/{record.blood_pressure.diastolic} mmHg
                          </span>
                        )}
                        {record.heart_rate && (
                          <span className="text-xs font-medium bg-teal-100 text-teal-800 px-2 py-1 rounded">
                            HR: {record.heart_rate} bpm
                          </span>
                        )}
                        {record.medications && (
                          <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded">
                            Meds: {record.medications}
                          </span>
                        )}
                      </div>
                      {record.images?.length > 0 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                          {record.images.map((imgUrl, idx) => (
                            <img
                              key={idx}
                              src={imgUrl}
                              alt="Health Record"
                              className="w-full h-24 object-cover rounded border"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0 flex items-start space-x-2 mt-4 lg:mt-0">
                      <button
                        onClick={() => onViewRecord(record)}
                        className="p-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 rounded transition"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditRecord(record);
                        }}
                        className="p-2 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 rounded transition"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDeleteRecord(record._id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </VerticalTimelineElement>
              ))
            )}
          </VerticalTimeline>
        </CardContent>
      </Card>
    </motion.div>
  );
};

HealthTimeline.propTypes = {
  healthRecords: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    diagnosis: PropTypes.string.isRequired,
    doctor_name: PropTypes.string.isRequired,
    doctor_notes: PropTypes.string.isRequired,
    visit_date: PropTypes.string.isRequired,
    follow_up_date: PropTypes.string,
    medications: PropTypes.string,
    blood_pressure: PropTypes.shape({
      systolic: PropTypes.number,
      diastolic: PropTypes.number
    }),
    heart_rate: PropTypes.number,
    images: PropTypes.arrayOf(PropTypes.string)
  })),
  onDeleteRecord: PropTypes.func.isRequired,
  onViewRecord: PropTypes.func.isRequired,
  onEditRecord: PropTypes.func.isRequired,
  onAddRecord: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onSetViewMode: PropTypes.func.isRequired,
  onSetSelectedRecord: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired
};

export default HealthTimeline;
