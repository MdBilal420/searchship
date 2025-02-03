"use client";
import { useState } from "react";

export default function Home() {
	const [scholarships, setScholarships] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		caste: "",
		religion: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch(
				`http://localhost:8000/search?query=${encodeURIComponent(
					`College scholarships for ${formData.caste} students`
				)}`,
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
						<input
							type='text'
							id='caste'
							className='w-full p-2 border rounded-md'
							value={formData.caste}
							onChange={(e) =>
								setFormData({ ...formData, caste: e.target.value })
							}
						/>
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
						/>
					</div>
					<button
						type='submit'
						className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors'
					>
						Find Scholarships
					</button>
				</form>

				{/* Loading State */}
				{isLoading && (
					<div className='flex justify-center items-center py-8'>
						<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600'></div>
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
