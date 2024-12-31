import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, RefreshCcw } from 'lucide-react';

const CancellationPolicy: React.FC = () => {
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
              <RefreshCcw className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Cancellation & Refund Policy</h1>
              <p className="text-purple-200">Last updated on 31-12-2024 09:42:31</p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <p className="text-purple-200 mb-6">
              SHREYAS SUBRAMANI believes in helping its customers as far as possible, and has therefore a liberal
              cancellation policy. Under this policy:
            </p>

            <div className="space-y-6">
              <section className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Cancellation Terms</h2>
                <ul className="space-y-4 text-purple-200">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Cancellations will be considered only if the request is made immediately after placing the order.
                    However, the cancellation request may not be entertained if the orders have been communicated to the
                    vendors/merchants and they have initiated the process of shipping them.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    SHREYAS SUBRAMANI does not accept cancellation requests for perishable items like flowers,
                    eatables etc. However, refund/replacement can be made if the customer establishes that the quality of
                    product delivered is not good.
                  </li>
                </ul>
              </section>

              <section className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Refund Process</h2>
                <ul className="space-y-4 text-purple-200">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    In case of receipt of damaged or defective items please report the same to our Customer Service team.
                    The request will, however, be entertained once the merchant has checked and determined the same at his
                    own end. This should be reported within 2 Days of receipt of the products.
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    In case you feel that the product received is not as shown on the site or as per your expectations,
                    you must bring it to the notice of our customer service within 2 Days of receiving the product.
                  </li>
                </ul>
              </section>

              <section className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Warranty Claims</h2>
                <p className="text-purple-200">
                  In case of complaints regarding products that come with a warranty from manufacturers, please refer
                  the issue to them.
                </p>
              </section>

              <section className="bg-white/5 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Refund Timeline</h2>
                <p className="text-purple-200">
                  In case of any Refunds approved by SHREYAS SUBRAMANI, it'll take 1-2 Days for the refund to be
                  processed to the end customer.
                </p>
              </section>

              <div className="bg-yellow-500/10 rounded-xl p-6 border border-yellow-500/20">
                <p className="text-yellow-200 text-sm">
                  Note: The Customer Service Team after looking into your complaint will take an appropriate decision
                  and the same will be communicated to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancellationPolicy;