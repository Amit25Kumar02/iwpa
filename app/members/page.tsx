import InnerPageLayout from "@/components/layout/InnerPageLayout";
import { FileText, Download } from "lucide-react";

export default function MembersPage() {
  return (
    <InnerPageLayout
      title="Members"
      breadcrumbs={[{ label: "Members" }]}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-[#1F7A4D0F] border-[0.86px] border-[#1F7A4D33] text-[#1F7A4D] px-4 py-2 rounded-md text-sm font-medium mb-4">
            MEMBERSHIP
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#001233] mb-4">
            Membership Information
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Download the membership forms and information sheets to join the Indian Wind Power Association.
          </p>
        </div>

        {/* PDF Links */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Membership Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#1F7A4D0F] rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#1F7A4D]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#001233] mb-2">
                  Membership Form
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Complete this form to apply for IWPA membership. Fill in all required details and submit as per instructions.
                </p>
                <a
                  href="/pdf/IWPA-Membership-Form(New).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1F7A4D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
                >
                  <FileText size={16} />
                  View PDF
                </a>
              </div>
            </div>
          </div>

          {/* Membership Information Sheet */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#1F7A4D0F] rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-[#1F7A4D]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[#001233] mb-2">
                  Membership Information Sheet
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Detailed information about IWPA membership benefits, categories, fees, and terms & conditions.
                </p>
                <a
                  href="/pdf/membership-information-sheet.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#1F7A4D] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
                >
                  <FileText size={16} />
                  View PDF
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-[#001233] mb-4">
            Need Help?
          </h3>
          <p className="text-gray-600 mb-4">
            For any queries regarding membership, please contact our membership team:
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> membership@windpro.org</p>
            <p><strong>Phone:</strong> +91-44-4550-4036</p>
            <p><strong>Office Hours:</strong> Monday to Friday, 9:00 AM - 6:00 PM</p>
          </div>
        </div>
      </div>
    </InnerPageLayout>
  );
}