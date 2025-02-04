"use client";
import { useEffect, useState } from "react";

// const API_URL = "http://localhost:8000";
const API_URL = "https://bilal-420-search-ship.hf.space";

export default function Home() {
	const [scholarships, setScholarships] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		caste: "",
		religion: "",
	});
	const [loadingStage, setLoadingStage] = useState(0);
	const loadingMessages = [
		"Initiating search...",
		"Scanning scholarship database...",
		"Fetching results...",
		"Analyzing eligibility criteria...",
		"Almost there...",
		"Finalizing results...",
	];

	useEffect(() => {
		let interval;
		if (isLoading) {
			interval = setInterval(() => {
				setLoadingStage((prev) =>
					prev < loadingMessages.length - 1 ? prev + 1 : prev
				);
			}, 9000); // Change message every 9 seconds
		} else {
			setLoadingStage(0);
		}
		return () => clearInterval(interval);
	}, [isLoading]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const query = `College scholarships for ${formData.caste} students ${
				formData.religion ? `from ${formData.religion} religion` : ""
			}`;
			const response = await fetch(
				`${API_URL}/search?query=${encodeURIComponent(query)}`,
				{
					method: "GET",
				}
			);
			const data = await response.json();
			console.log(data);
			setScholarships(data.results.data.scholarships);
		} catch (error) {
			console.error("Error fetching scholarships:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50'>
			<div className='p-8 max-w-7xl mx-auto'>
				<main className='space-y-12'>
					<div className='text-center space-y-4'>
						<h1 className='text-4xl font-bold text-gray-800 mb-2'>
							SearchShip
						</h1>
						<p className='text-gray-600 max-w-2xl mx-auto'>
							Find scholarships tailored to your background. Enter your details
							below to discover opportunities.
						</p>
					</div>

					{/* Search Form */}
					<div className='bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto space-y-6'>
						<form onSubmit={handleSubmit} className='space-y-5'>
							<div>
								<label
									htmlFor='caste'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Caste
								</label>
								<select
									id='caste'
									className='w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700'
									value={formData.caste}
									onChange={(e) =>
										setFormData({ ...formData, caste: e.target.value })
									}
								>
									<option value=''>Select Caste</option>
									<option value='general'>General</option>
									<option value='SC/ST'>SC/ST</option>
									<option value='obc'>OBC</option>
								</select>
							</div>
							<div>
								<label
									htmlFor='religion'
									className='block text-sm font-semibold text-gray-700 mb-2'
								>
									Religion
								</label>
								<input
									id='religion'
									className='w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-700'
									value={formData.religion}
									onChange={(e) =>
										setFormData({ ...formData, religion: e.target.value })
									}
								/>
							</div>
							<button
								type='submit'
								className='w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-300 shadow-md hover:shadow-lg'
							>
								Find Scholarships
							</button>
						</form>
					</div>

					{/* Enhanced Loading State */}
					{isLoading && (
						<div className='bg-white rounded-2xl shadow-lg p-8 max-w-lg mx-auto'>
							<div className='flex flex-col items-center justify-center space-y-6'>
								<div className='animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent'></div>
								<div className='text-center space-y-3'>
									<p className='text-xl font-medium text-gray-800'>
										{loadingMessages[loadingStage]}
									</p>
									<div className='w-64 h-2 bg-gray-100 rounded-full overflow-hidden'>
										<div
											className='h-full bg-blue-600 transition-all duration-500'
											style={{
												width: `${
													((loadingStage + 1) / loadingMessages.length) * 100
												}%`,
											}}
										></div>
									</div>
								</div>
							</div>
						</div>
					)}

					{/* Results Section */}
					{!isLoading && scholarships.length > 0 && (
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
							{scholarships.map((scholarship, index) => (
								<div
									key={index}
									className='bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300'
								>
									<h2 className='text-xl font-bold text-gray-800 mb-3'>
										{scholarship.name}
									</h2>
									<p className='text-gray-600 mb-4 text-sm'>
										{scholarship.description}
									</p>
									<div className='flex flex-col justify-between items-center pt-4 border-t border-gray-100'>
										{scholarship.application_deadline && (
											<span className='text-sm font-medium text-red-600 mb-3'>
												Deadline: {scholarship.application_deadline}
											</span>
										)}
										{scholarship.application_link && (
											<a
												href={scholarship.application_link}
												target='_blank'
												rel='noopener noreferrer'
												className='inline-flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-300 text-sm font-medium'
											>
												Apply Now
											</a>
										)}
									</div>
								</div>
							))}
						</div>
					)}
				</main>
			</div>
		</div>
	);
}
