import React from 'react';

const TermsCondition = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-6 text-teal-600 text-center">Terms and Conditions</h1>
      <p className="mb-6 text-gray-600 text-lg text-justify">
        Welcome to our platform! By signing up and using our services, you agree to comply with the following terms and conditions. Please read them carefully before proceeding. These terms govern your use of the platform and define your responsibilities as a user.
      </p>

      <div className="space-y-6 text-gray-700">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-teal-600 text-lg font-bold">1.</div>
          <p>
            <span className="font-semibold">Account Responsibility:</span> You are
            responsible for maintaining the confidentiality of your account details,
            including your password. All activities performed under your account are
            considered your responsibility. Please notify us immediately of any unauthorized
            use.
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-teal-600 text-lg font-bold">2.</div>
          <p>
            <span className="font-semibold">Prohibited Activities:</span> You agree not to
            engage in activities such as unauthorized access, hacking, data theft, or
            transmitting malicious software. Such actions may result in immediate account
            termination and legal consequences.
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-teal-600 text-lg font-bold">3.</div>
          <p>
            <span className="font-semibold">Accuracy of Information:</span> You must provide
            accurate and truthful information during signup. False information may lead to
            account suspension or permanent termination.
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-teal-600 text-lg font-bold">4.</div>
          <p>
            <span className="font-semibold">Privacy Policy:</span> We value your privacy. Your personal data will be handled in accordance with our{' '}
            <a href="/privacy-policy" className="text-teal-600 hover:underline">
              Privacy Policy
            </a>. By using our platform, you consent to the collection and use of your information as described in the policy.
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-teal-600 text-lg font-bold">5.</div>
          <p>
            <span className="font-semibold">Changes to Terms:</span> We reserve the right to
            modify these terms and conditions at any time. Please review them periodically to stay informed of any updates.
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-teal-600 text-lg font-bold">6.</div>
          <p>
            <span className="font-semibold">Termination:</span> Accounts involved in
            violations of these terms or malicious activities may be terminated without prior
            notice.
          </p>
        </div>

        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 text-teal-600 text-lg font-bold">7.</div>
          <p>
            <span className="font-semibold">Service Availability:</span> While we strive to
            provide uninterrupted service, occasional downtimes may occur due to maintenance
            or unforeseen circumstances. We are not liable for such interruptions.
          </p>
        </div>
      </div>

      <p className="mt-8 text-gray-600 text-justify">
        If you have any questions or require assistance, feel free to reach out to our
        support team at{' '}
        <a href="mailto:support@example.com" className="text-teal-600 hover:underline">
          support@example.com
        </a>. Thank you for using our platform!
      </p>

      <div className="mt-10 flex justify-center">
        <a
          href="/signup"
          className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg shadow-md hover:bg-teal-700 transition"
        >
          Back to Signup
        </a>
      </div>
    </div>
  );
};

export default TermsCondition;
