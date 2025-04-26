import { useState } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { Button } from './ui/button';
import { API_BASE_URL } from '../utils/constant';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import EmergencyContacts from './EmergencyContacts';

const EmergencyQR = ({ memberId }) => {
  const [qrValue, setQrValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateQR = async () => {
    setIsLoading(true);
    // Create URL for PDF download
    const downloadUrl = `${API_BASE_URL}/emergency/download/${memberId}`;
    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));
    setQrValue(downloadUrl);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4">
      {/* Emergency Contacts */}
      <div className="w-full md:w-1/2">
        <EmergencyContacts />
      </div>

      {/* QR Code */}
      <div className="w-full md:w-1/2">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-center">
              Emergency Health Record QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Scan this QR code to download emergency health information
            </p>
            
            <AnimatePresence mode="wait">
              {qrValue ? (
                <motion.div
                  key="qr-code"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center space-y-4"
                >
                  <div className="p-4 bg-white rounded-lg shadow-sm">
                    <QRCode 
                      value={qrValue} 
                      size={200}
                      level="H"
                      includeMargin
                    />
                  </div>
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={() => window.open(qrValue, '_blank')}
                  >
                    Download PDF
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="generate-button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full"
                >
                  <Button
                    variant="default"
                    className="w-full"
                    onClick={generateQR}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Generating...' : 'Generate QR Code'}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground">
              Keep this QR code accessible for emergency situations
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

EmergencyQR.propTypes = {
  memberId: PropTypes.string.isRequired
};

export default EmergencyQR; 