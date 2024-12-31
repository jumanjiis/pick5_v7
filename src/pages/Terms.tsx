import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-purple-200 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 sm:p-8 border border-purple-500/20">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <FileText className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Terms & Conditions</h1>
              <p className="text-purple-200">Last updated on 31-12-2024 09:07:44</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-purple-200 mb-6">
              These Terms and Conditions, along with privacy policy or other terms ("Terms") constitute a binding
              agreement by and between SHREYAS SUBRAMANI, ("Website Owner" or "we" or "us" or "our") and
              you ("you" or "your") and relate to your use of our website, goods (as applicable) or services (as
              applicable) (collectively, "Services").
            </p>

            <div className="space-y-6">
              <section className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Agreement to Terms</h2>
                <p className="text-purple-200">
                  By using our website and availing the Services, you agree that you have read and accepted these Terms
                  (including the Privacy Policy). We reserve the right to modify these Terms at any time and without
                  assigning any reason. It is your responsibility to periodically review these Terms to stay informed of
                  updates.
                </p>
              </section>

              <section className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Use of Services</h2>
                <ul className="space-y-4 text-purple-200">
                  <li>• To access and use the Services, you agree to provide true, accurate and complete information.</li>
                  <li>• You shall be responsible for all acts done through the use of your registered account.</li>
                  <li>• Your use of our Services and the website is solely at your own risk and discretion.</li>
                  <li>• You are required to independently assess and ensure that the Services meet your requirements.</li>
                </ul>
              </section>

              <section className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Intellectual Property</h2>
                <p className="text-purple-200">
                  The contents of the Website and the Services are proprietary to Us and you will not have any
                  authority to claim any intellectual property rights, title, or interest in its contents.
                </p>
              </section>

              <section className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Refunds & Cancellations</h2>
                <p className="text-purple-200">
                  You shall be entitled to claim a refund of the payment made by you in case we are not able to
                  provide the Service. The timelines for such return and refund will be according to the specific
                  Service you have availed or within the time period provided in our policies (as applicable).
                </p>
              </section>

              <section className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Jurisdiction</h2>
                <p className="text-purple-200">
                  These Terms and any dispute or claim relating to it, or its enforceability, shall be governed by and
                  construed in accordance with the laws of India. All disputes arising out of or in connection with
                  these Terms shall be subject to the exclusive jurisdiction of the courts in Chennai, Tamil Nadu.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;