import { useRef } from 'react';
import { Button, Card } from '@repo/playbook';
import type { UserCourse } from '../types/course';

interface CertificateProps {
  userCourse: UserCourse;
  userName: string;
}

export function Certificate({ userCourse, userName }: CertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!userCourse.completedAt || !userCourse.libraryCourse) {
    return null;
  }

  const course = userCourse.libraryCourse;

  const completionDate = new Date(userCourse.completedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const certificateId = `CERT-${userCourse.id.slice(0, 8).toUpperCase()}`;

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow || !certificateRef.current) return;

    const styles = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: #f5f5f5;
          padding: 20px;
        }

        .certificate {
          background: linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%);
          border: 8px solid #1e3a5f;
          border-radius: 8px;
          padding: 60px;
          max-width: 800px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          position: relative;
        }

        .certificate::before {
          content: '';
          position: absolute;
          inset: 15px;
          border: 2px solid #d4af37;
          border-radius: 4px;
          pointer-events: none;
        }

        .header {
          font-family: 'Playfair Display', serif;
          font-size: 36px;
          color: #1e3a5f;
          margin-bottom: 10px;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 40px;
          letter-spacing: 2px;
        }

        .presented-to {
          font-size: 14px;
          color: #888;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .recipient-name {
          font-family: 'Playfair Display', serif;
          font-size: 42px;
          color: #1e3a5f;
          margin-bottom: 30px;
          font-weight: 700;
        }

        .completion-text {
          font-size: 16px;
          color: #555;
          margin-bottom: 20px;
          line-height: 1.6;
        }

        .course-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: #d4af37;
          margin-bottom: 40px;
          font-weight: 700;
        }

        .details {
          display: flex;
          justify-content: space-between;
          margin-top: 50px;
          padding-top: 30px;
          border-top: 1px solid #ddd;
        }

        .detail-item {
          text-align: center;
        }

        .detail-label {
          font-size: 11px;
          color: #888;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }

        .detail-value {
          font-size: 14px;
          color: #333;
          font-weight: 500;
        }

        .seal {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #d4af37 0%, #c5a028 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          margin-top: -20px;
          color: white;
          font-weight: bold;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.4);
        }

        @media print {
          body {
            background: white;
            padding: 0;
          }
          .certificate {
            box-shadow: none;
          }
        }
      </style>
    `;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Certificate - ${course.title}</title>
          ${styles}
        </head>
        <body>
          <div class="certificate">
            <h1 class="header">Certificate</h1>
            <p class="subtitle">of Completion</p>

            <p class="presented-to">This is to certify that</p>
            <h2 class="recipient-name">${userName}</h2>

            <p class="completion-text">
              has successfully completed the course
            </p>

            <h3 class="course-title">${course.title}</h3>

            <div class="seal">Verified</div>

            <div class="details">
              <div class="detail-item">
                <p class="detail-label">Date of Completion</p>
                <p class="detail-value">${completionDate}</p>
              </div>
              <div class="detail-item">
                <p class="detail-label">Certificate ID</p>
                <p class="detail-value">${certificateId}</p>
              </div>
              <div class="detail-item">
                <p class="detail-label">Course Duration</p>
                <p class="detail-value">${course.estimatedHours} hours</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200">
      <div ref={certificateRef} className="text-center space-y-4">
        <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
          Course Completed
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Congratulations, {userName}!
        </h2>

        <p className="text-gray-600">
          You have successfully completed
        </p>

        <h3 className="text-xl font-semibold text-amber-700">
          {course.title}
        </h3>

        <div className="flex justify-center gap-6 text-sm text-gray-500 py-4">
          <div>
            <span className="block font-medium text-gray-700">Completed</span>
            {completionDate}
          </div>
          <div>
            <span className="block font-medium text-gray-700">Certificate ID</span>
            {certificateId}
          </div>
        </div>

        <div className="pt-4">
          <Button onClick={handlePrint} className="bg-amber-600 hover:bg-amber-700">
            Download Certificate
          </Button>
        </div>
      </div>
    </Card>
  );
}
