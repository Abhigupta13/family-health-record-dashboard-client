import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import PropTypes from 'prop-types';

const HealthChart = ({ data, title, dataKey, color, secondaryDataKey, secondaryColor }) => {
  const formatTooltip = (value, name) => {
    if (name === 'systolic') return [`${value} mmHg`, 'Systolic'];
    if (name === 'diastolic') return [`${value} mmHg`, 'Diastolic'];
    if (name === 'heartRate') return [`${value} bpm`, 'Heart Rate'];
    return [value, name];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString()
                  }
                  formatter={formatTooltip}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={dataKey}
                  stroke={color}
                  name={dataKey === 'heartRate' ? 'Heart Rate' : 'Systolic'}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
                {secondaryDataKey && (
                  <Line
                    type="monotone"
                    dataKey={secondaryDataKey}
                    stroke={secondaryColor}
                    name="Diastolic"
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

HealthChart.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    systolic: PropTypes.number,
    diastolic: PropTypes.number,
    heartRate: PropTypes.number
  })).isRequired,
  title: PropTypes.string.isRequired,
  dataKey: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  secondaryDataKey: PropTypes.string,
  secondaryColor: PropTypes.string
};

export default HealthChart; 