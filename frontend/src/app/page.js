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
			}, 8000); // Change message every 6 seconds
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
		<div className='min-h-screen p-8 max-w-7xl mx-auto'>
			<main className='space-y-8'>
				<h1 className='text-3xl font-bold text-center mb-8'>
					Scholarship Finder
				</h1>

				{/* Search Form */}
				<form onSubmit={handleSubmit} className='max-w-md mx-auto space-y-4'>
					<div>
						<label htmlFor='caste' className='block text-sm font-medium mb-1'>
							Caste
						</label>
						<select
							id='caste'
							className='w-full p-2 border rounded-md'
							value={formData.caste || "general"}
							onChange={(e) =>
								setFormData({ ...formData, caste: e.target.value })
							}
						>
							<option value='general'>General</option>
							<option value='SC/ST'>SC/ST</option>
							<option value='obc'>OBC</option>
							<option value='other'>Other</option>
						</select>
					</div>
					<div>
						<label
							htmlFor='religion'
							className='block text-sm font-medium mb-1'
						>
							Religion
						</label>
						<input
							type='text'
							id='religion'
							className='w-full p-2 border rounded-md'
							value={formData.religion}
							onChange={(e) =>
								setFormData({ ...formData, religion: e.target.value })
							}
							maxLength={20}
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
					>
						Find Scholarships
					</button>
				</form>

				{/* Enhanced Loading State */}
				{isLoading && (
					<div className='flex flex-col items-center justify-center py-8 space-y-4'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
						<div className='text-center space-y-2'>
							<p className='text-lg font-medium text-gray-700'>
								{loadingMessages[loadingStage]}
							</p>
							<div className='w-48 h-2 bg-gray-200 rounded-full overflow-hidden'>
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
				)}

				{/* Results Section - Only show when not loading and has results */}
				{!isLoading && scholarships.length > 0 && (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8'>
						{scholarships.map((scholarship, index) => (
							<div
								key={index}
								className='border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'
							>
								<h2 className='text-xl font-semibold mb-2'>
									{scholarship.name}
								</h2>
								<p className='text-gray-600 mb-4'>{scholarship.description}</p>
								<div className='flex justify-between items-center'>
									<span className='text-sm text-red-600'>
										Deadline: {scholarship.application_deadline}
									</span>
									<a
										href={scholarship.application_link}
										target='_blank'
										rel='noopener noreferrer'
										className='text-blue-600 hover:underline'
									>
										Apply Now
									</a>
								</div>
							</div>
						))}
					</div>
				)}
			</main>
		</div>
	);
}
