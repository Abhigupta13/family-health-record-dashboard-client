import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateHealthSummary = async (healthData) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a medical assistant helping to summarize health records.',
        },
        {
          role: 'user',
          content: `Please provide a concise summary of the following health data: ${JSON.stringify(
            healthData
          )}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating health summary:', error);
    throw error;
  }
};

export const analyzeHealthTrends = async (healthData) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a medical assistant analyzing health trends.',
        },
        {
          role: 'user',
          content: `Please analyze the following health data and identify any concerning trends: ${JSON.stringify(
            healthData
          )}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing health trends:', error);
    throw error;
  }
};

export const suggestFollowUps = async (healthData) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a medical assistant suggesting follow-up actions.',
        },
        {
          role: 'user',
          content: `Based on the following health data, what follow-up actions would you recommend? ${JSON.stringify(
            healthData
          )}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error suggesting follow-ups:', error);
    throw error;
  }
}; 