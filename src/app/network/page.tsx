import { useState } from "react";
import Layout from "~/components/layout/Layout";

interface User {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  bio: string;
  skills: string[];
  connectionStatus: "connected" | "pending" | "not_connected";
}

// Mock data - Replace with actual API calls
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    title: "Senior Software Engineer",
    company: "TechCorp",
    image: "https://via.placeholder.com/150",
    bio: "Passionate about building scalable web applications...",
    skills: ["JavaScript", "React", "Node.js", "TypeScript"],
    connectionStatus: "not_connected",
  },
  {
    id: "2",
    name: "Jane Smith",
    title: "Product Manager",
    company: "InnovateX",
    image: "https://via.placeholder.com/150",
    bio: "Experienced in product development and agile methodologies...",
    skills: ["Product Management", "Agile", "UX Design", "Data Analysis"],
    connectionStatus: "not_connected",
  },
  // Add more mock users as needed
];

export default function NetworkPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const allSkills = Array.from(
    new Set(mockUsers.flatMap((user) => user.skills)),
  );

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => user.skills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  const handleConnect = (userId: string) => {
    // Implement connection logic here
    console.log(`Connecting with user ${userId}`);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Build Your Network
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Connect with professionals in your field and grow your career
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 rounded-lg bg-white p-6 shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Search Professionals
              </label>
              <input
                type="text"
                id="search"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Name, title, or company"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Skills
              </label>
              <div className="mt-1 flex flex-wrap gap-2">
                {allSkills.map((skill) => (
                  <button
                    key={skill}
                    className={`rounded-full px-3 py-1 text-sm font-medium ${
                      selectedSkills.includes(skill)
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      setSelectedSkills((prev) =>
                        prev.includes(skill)
                          ? prev.filter((s) => s !== skill)
                          : [...prev, skill],
                      );
                    }}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* User Listings */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="overflow-hidden rounded-lg bg-white shadow"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-16 w-16 rounded-full"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {user.name}
                    </h2>
                    <p className="text-gray-600">{user.title}</p>
                    <p className="text-sm text-gray-500">{user.company}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="line-clamp-2 text-gray-700">{user.bio}</p>
                </div>
                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-6">
                  <button
                    className={`w-full rounded-md px-4 py-2 ${
                      user.connectionStatus === "connected"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                    onClick={() => handleConnect(user.id)}
                    disabled={user.connectionStatus === "connected"}
                  >
                    {user.connectionStatus === "connected"
                      ? "Connected"
                      : "Connect"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
