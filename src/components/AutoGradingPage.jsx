import React, { useState } from 'react';
import axios from 'axios';

const AutoGradingPage = () => {
    const [submissionLink, setSubmissionLink] = useState('');
    const [gradingResult, setGradingResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setGradingResult(null);

        try {
            // Make GET request to autograder endpoint
            const response = await axios.get('https://teachmate-backend.onrender.com/autograder/', {
                params: {
                    doc_url: submissionLink
                },
                headers: {
                    'Accept': 'application/json'
                }
            });

            setGradingResult(response.data);
        } catch (err) {
            setError('Failed to fetch grading results. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-w-3xl max-w-3xl rounded-3xl text-gray-500 min-h-screen bg-gray-100 p-8">
            <div className="w-full mx-auto bg-white rounded-xl shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Auto Grading System</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <a  href="https://drive.google.com/file/d/1afdSIKGLuhpo_r3kSJD3swcoCZ-AAMlp/view?usp=sharing">https://drive.google.com/file/d/1afdSIKGLuhpo_r3kSJD3swcoCZ-AAMlp/view?usp=sharing</a>
                    <div className='mt-4'>

                        <label
                            htmlFor="submissionLink"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Submission Link
                        </label>

                        <input
                            type="url"
                            id="submissionLink"
                            value={submissionLink}
                            onChange={(e) => setSubmissionLink(e.target.value)}
                            placeholder="Paste your Google Drive link here"
                            required
                            className="w-full text-gray-600  px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center"
                    >
                        {loading ? 'Grading...' : 'Submit for Grading'}
                    </button>
                </form>

                {error && (
                    <div className="mt-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded-lg">
                        {error}
                    </div>
                )}

                {gradingResult && (
                    <div className="mt-6 bg-green-50 border border-green-200 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold mb-4 text-green-800">Grading Results</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="font-medium">Total Questions:</span>
                                <span className="font-bold text-green-700">
                                    {gradingResult.totalQuestions}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="font-medium">Total Marks:</span>
                                <span className="font-bold text-green-700">
                                    {gradingResult.obtainedMarks} / {gradingResult.totalMarks}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">Marks Breakdown:</h3>
                                <ul className="space-y-2">
                                    {Object.entries(gradingResult.marksPerQuestion).map(([question, marks]) => (
                                        <li
                                            key={question}
                                            className="flex justify-between bg-green-100 p-2 rounded"
                                        >
                                            <span>{question.toUpperCase()}</span>
                                            <span className="font-bold">{marks} Marks</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AutoGradingPage;