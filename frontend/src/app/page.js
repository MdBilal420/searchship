"use client";
import { useEffect, useState } from "react";

// const API_URL = "http://localhost:8000";
const API_URL = "https://bilal-420-search-ship.hf.space";

// First, let's update the common input classes for glassmorphic effect
const inputClasses =
	"w-full p-3 border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-blue-400/30 focus:border-blue-400/30 transition-all text-gray-800 bg-white/60 backdrop-blur-sm placeholder-gray-400";

const compactInputClasses =
	"w-full p-2 text-sm border border-gray-200/50 rounded-lg focus:ring-1 focus:ring-blue-400/30 focus:border-blue-400/30 transition-all text-gray-800 bg-white/60 backdrop-blur-sm placeholder-gray-400";

export default function Home() {
	const [scholarships, setScholarships] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		gpa: "",
		field: "",
		ethnicity: "",
		gender: "",
		disability: "",
		location: "",
		gradeLevel: "",
		financialNeed: false,
		extracurricular: "",
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
	const [isSearchStarted, setIsSearchStarted] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
		setIsSearchStarted(true);
		setIsLoading(true);
		try {
			const queryParams = new URLSearchParams({
				query: "scholarships",
				...formData,
			});

			const response = await fetch(
				`${API_URL}/search?${queryParams.toString()}`,
				{
					method: "GET",
				}
			);
			const data = await response.json();
			setScholarships(data.results.data.scholarships);
		} catch (error) {
			console.error("Error fetching scholarships:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const FilterForm = ({ isCompact = false }) => (
		<form
			onSubmit={handleSubmit}
			className={`space-y-3 ${isCompact ? "px-4" : ""}`}
		>
			<div className={`grid grid-cols-1 ${isCompact ? "gap-3" : "gap-4"}`}>
				{/* Filter Fields */}
				<div>
					<label
						htmlFor='gpa'
						className={`block ${
							isCompact ? "text-xs" : "text-sm"
						} font-semibold text-gray-700 mb-1`}
					>
						GPA
					</label>
					<input
						type='number'
						step='0.1'
						min='0'
						max='4.0'
						id='gpa'
						className={isCompact ? compactInputClasses : inputClasses}
						value={formData.gpa}
						onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
						placeholder='Enter GPA (e.g., 3.5)'
					/>
				</div>

				<div>
					<label
						htmlFor='field'
						className={`block ${
							isCompact ? "text-xs" : "text-sm"
						} font-semibold text-gray-700 mb-1`}
					>
						Field of Study
					</label>
					<input
						id='field'
						className={isCompact ? compactInputClasses : inputClasses}
						value={formData.field}
						onChange={(e) =>
							setFormData({ ...formData, field: e.target.value })
						}
						placeholder='Enter field of study'
					/>
				</div>

				<div>
					<label
						htmlFor='ethnicity'
						className={`block ${
							isCompact ? "text-xs" : "text-sm"
						} font-semibold text-gray-700 mb-1`}
					>
						Ethnicity
					</label>
					<input
						id='ethnicity'
						className={isCompact ? compactInputClasses : inputClasses}
						value={formData.ethnicity}
						onChange={(e) =>
							setFormData({ ...formData, ethnicity: e.target.value })
						}
						placeholder='Enter ethnicity'
					/>
				</div>

				<div>
					<label
						htmlFor='gender'
						className={`block ${
							isCompact ? "text-xs" : "text-sm"
						} font-semibold text-gray-700 mb-1`}
					>
						Gender
					</label>
					<select
						id='gender'
						className={isCompact ? compactInputClasses : inputClasses}
						value={formData.gender}
						onChange={(e) =>
							setFormData({ ...formData, gender: e.target.value })
						}
					>
						<option value=''>Select Gender</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
						<option value='other'>Other</option>
					</select>
				</div>

				<div>
					<label
						htmlFor='disability'
						className={`block ${
							isCompact ? "text-xs" : "text-sm"
						} font-semibold text-gray-700 mb-1`}
					>
						Disability Status
					</label>
					<select
						id='disability'
						className={isCompact ? compactInputClasses : inputClasses}
						value={formData.disability}
						onChange={(e) =>
							setFormData({ ...formData, disability: e.target.value })
						}
					>
						<option value=''>Select Status</option>
						<option value='yes'>Yes</option>
						<option value='no'>No</option>
					</select>
				</div>

				<div>
					<label
						htmlFor='location'
						className={`block ${
							isCompact ? "text-xs" : "text-sm"
						} font-semibold text-gray-700 mb-1`}
					>
						Location
					</label>
					<input
						id='location'
						className={isCompact ? compactInputClasses : inputClasses}
						value={formData.location}
						onChange={(e) =>
							setFormData({ ...formData, location: e.target.value })
						}
						placeholder='State or Country'
					/>
				</div>

				<div>
					<label
						htmlFor='gradeLevel'
						className={`block ${
							isCompact ? "text-xs" : "text-sm"
						} font-semibold text-gray-700 mb-1`}
					>
						Grade Level
					</label>
					<select
						id='gradeLevel'
						className={isCompact ? compactInputClasses : inputClasses}
						value={formData.gradeLevel}
						onChange={(e) =>
							setFormData({ ...formData, gradeLevel: e.target.value })
						}
					>
						<option value=''>Select Grade Level</option>
						<option value='high-school'>High School</option>
						<option value='undergraduate'>Undergraduate</option>
						<option value='graduate'>Graduate</option>
					</select>
				</div>

				<div>
					<label
						className={`flex items-center space-x-2 ${
							isCompact ? "text-xs" : "text-sm"
						}`}
					>
						<input
							type='checkbox'
							checked={formData.financialNeed}
							onChange={(e) =>
								setFormData({
									...formData,
									financialNeed: e.target.checked,
								})
							}
							className='form-checkbox h-4 w-4 text-blue-600/90 border-white/30 rounded'
						/>
						<span className='font-semibold text-gray-700'>Financial Need</span>
					</label>
				</div>

				<div>
					<label
						htmlFor='extracurricular'
						className={`block ${
							isCompact ? "text-xs" : "text-sm"
						} font-semibold text-gray-700 mb-1`}
					>
						Extracurricular Activities
					</label>
					<textarea
						id='extracurricular'
						className={isCompact ? compactInputClasses : inputClasses}
						value={formData.extracurricular}
						onChange={(e) =>
							setFormData({
								...formData,
								extracurricular: e.target.value,
							})
						}
						rows='2'
						placeholder='Enter your extracurricular activities'
					/>
				</div>
			</div>
			<button
				type='submit'
				className={`w-full bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 ${
					isCompact ? "py-2 text-sm" : "py-3"
				} transition-all duration-300 shadow-md shadow-blue-200/50 hover:shadow-lg hover:shadow-blue-300/50`}
			>
				{isCompact ? "Update Search" : "Find Scholarships"}
			</button>
		</form>
	);

	// First, let's create a separate component for the Applied Filters
	const AppliedFilters = ({ filters, onRemove }) => {
		return (
			<div className='mb-6'>
				<div className='flex flex-wrap gap-2'>
					{Object.entries(filters).map(
						([key, value]) =>
							value && (
								<div
									key={key}
									className='inline-flex items-center bg-blue-50/80 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-sm border border-blue-200/50'
								>
									<span className='capitalize'>
										{key.replace(/([A-Z])/g, " $1").trim()}: {value.toString()}
									</span>
									<button
										onClick={() => onRemove(key)}
										className='ml-2 hover:text-blue-900'
									>
										×
									</button>
								</div>
							)
					)}
				</div>
			</div>
		);
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'>
			{!isSearchStarted ? (
				// Initial Search Form View - Already responsive, just add some padding adjustments
				<div className='p-4 md:p-8 max-w-7xl mx-auto'>
					<main className='space-y-8 md:space-y-12'>
						<div className='text-center space-y-4'>
							<h1 className='text-3xl md:text-4xl font-bold text-gray-800 mb-2'>
								SearchShip
							</h1>
							<p className='text-gray-600 max-w-2xl mx-auto px-4'>
								Find scholarships tailored to your background. Enter your
								details below to discover opportunities.
							</p>
						</div>
						<div className='bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-200/50 p-4 md:p-8 max-w-2xl mx-auto border border-white/50'>
							<FilterForm />
						</div>
					</main>
				</div>
			) : (
				// Split View Layout with mobile responsiveness
				<div className='flex flex-col md:flex-row h-screen'>
					{/* Mobile Header with Filter Toggle */}
					<div className='md:hidden bg-white/70 backdrop-blur-sm border-b border-gray-100 px-4 py-3 flex justify-between items-center sticky top-0 z-20'>
						<h1 className='text-xl font-bold text-gray-800'>SearchShip</h1>
						<button
							onClick={() => setIsSidebarOpen(!isSidebarOpen)}
							className='p-2 rounded-lg bg-blue-50/80 hover:bg-blue-100/80 text-blue-600 border border-blue-200/50'
							aria-label='Toggle filters'
						>
							{/* Menu Icon - More visible and simpler */}
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								strokeWidth={2}
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M4 6h16M4 12h16M4 18h16'
								/>
							</svg>
						</button>
					</div>

					{/* Sidebar */}
					<div
						className={`
						fixed md:static inset-0 bg-white/70 backdrop-blur-sm z-30 transform 
						${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
						md:translate-x-0 transition-transform duration-300 ease-in-out
						w-full md:w-72 shadow-lg shadow-blue-200/50 md:overflow-y-auto
						border-r border-gray-100
					`}
					>
						{/* Mobile Close Button */}
						<div className='md:hidden flex justify-between items-center p-4 border-b'>
							<h2 className='font-bold text-gray-800'>Filters</h2>
							<button
								onClick={() => setIsSidebarOpen(false)}
								className='p-2 rounded-lg hover:bg-blue-50/80 text-gray-600 border border-gray-200/50'
							>
								<span className='sr-only'>Close Filters</span>
								{/* X Icon */}
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>

						{/* Sidebar Content */}
						<div className='hidden md:block p-4 text-center'>
							<h1 className='text-2xl font-bold text-gray-800'>SearchShip</h1>
							<p className='text-xs text-gray-600 mt-1'>
								Refine your scholarship search
							</p>
						</div>
						<div className='px-4 py-2 border-b'>
							<h2 className='text-sm font-bold text-gray-800'>Filters</h2>
						</div>
						<div className='py-3'>
							<FilterForm isCompact={true} />
						</div>
					</div>

					{/* Overlay for mobile */}
					{isSidebarOpen && (
						<div
							className='fixed inset-0 bg-white/40 backdrop-blur-sm z-20 md:hidden'
							onClick={() => setIsSidebarOpen(false)}
						/>
					)}

					{/* Main Content */}
					<div className='flex-1 overflow-y-auto p-4 md:p-8'>
						{/* Loading State - Centered */}
						{isLoading && (
							<div className='h-full flex items-center justify-center'>
								<div className='bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg shadow-blue-200/50 p-4 md:p-8 max-w-lg w-full border border-white/50'>
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
															((loadingStage + 1) / loadingMessages.length) *
															100
														}%`,
													}}
												></div>
											</div>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Results with Applied Filters */}
						{!isLoading && (
							<>
								<div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6'>
									<h2 className='text-xl md:text-2xl font-bold text-gray-800'>
										Search Results
									</h2>
									<span className='text-sm text-gray-600'>
										{scholarships.length} scholarships found
									</span>
								</div>

								{/* Applied Filters Section */}
								<div className='mb-6 overflow-x-auto'>
									<AppliedFilters
										filters={formData}
										onRemove={(key) => {
											setFormData((prev) => ({
												...prev,
												[key]: key === "financialNeed" ? false : "",
											}));
										}}
									/>
								</div>

								{/* Results Grid */}
								<div className='grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6'>
									{scholarships.map((scholarship, index) => (
										<div
											key={index}
											className='bg-white/60 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-md shadow-blue-200/50 hover:shadow-lg hover:shadow-blue-300/50 transition-all duration-300 border border-white/50'
										>
											<h3 className='text-xl font-bold text-gray-800 mb-3'>
												{scholarship.name}
											</h3>
											<p className='text-gray-600 mb-4 text-sm'>
												{scholarship.description}
											</p>
											<div className='flex flex-col space-y-3 pt-4 border-t border-gray-100'>
												{scholarship.application_deadline && (
													<span className='text-sm font-medium text-red-600'>
														Deadline: {scholarship.application_deadline}
													</span>
												)}
												{scholarship.application_link && (
													<a
														href={scholarship.application_link}
														target='_blank'
														rel='noopener noreferrer'
														className='inline-flex items-center justify-center px-4 py-2 bg-blue-50/80 text-blue-600 rounded-lg hover:bg-blue-100/80 transition-colors duration-300 text-sm font-medium border border-blue-200/50'
													>
														Apply Now
													</a>
												)}
											</div>
										</div>
									))}
								</div>
							</>
						)}
					</div>
				</div>
			)}
		</div>
	);
}
