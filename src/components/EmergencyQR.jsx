import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/Card';

const EmergencyQR = ({ memberId, memberName }) => {
  const qrValue = JSON.stringify({
    id: memberId,
    name: memberName,
    timestamp: new Date().toISOString(),
    type: 'emergency-access',
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Emergency Access QR</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <QRCodeSVG
            value={qrValue}
            size={200}
            level="H"
            includeMargin
            className="rounded-lg border p-2"
          />
          <p className="text-sm text-muted-foreground">
            Scan this QR code to access {memberName}'s emergency health information
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EmergencyQR; 