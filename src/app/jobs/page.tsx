import { useState } from "react";
import Layout from "~/components/layout/Layout";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
}

// Mock data - Replace with actual API calls
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    description:
      "We are looking for a Senior Software Engineer to join our team...",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "InnovateX",
    location: "Remote",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    description:
      "Join our product team to help shape the future of our platform...",
  },
  // Add more mock jobs as needed
];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesType = !jobType || job.type === jobType;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Find Your Dream Job
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse through thousands of job listings and find the perfect match
            for your skills
          </p>
        </div>

        {/* Search Filters */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Search Jobs
              </label>
              <input
                type="text"
                id="search"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Job title, company, or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="City, state, or remote"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="jobType"
                className="block text-sm font-medium text-gray-700"
              >
                Job Type
              </label>
              <select
                id="jobType"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div key={job.id} className="rounded-lg bg-white p-6 shadow">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {job.title}
                  </h2>
                  <p className="text-gray-600">{job.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-600">{job.location}</p>
                  <p className="text-gray-500">{job.type}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-700">{job.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="font-medium text-indigo-600">{job.salary}</p>
                <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
