import { useState } from "react";
import Layout from "~/components/layout/Layout";

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  price: number;
  duration: string;
  level: string;
  category: string;
  thumbnailUrl: string;
}

// Mock data - Replace with actual API calls
const mockCourses: Course[] = [
  {
    id: "1",
    title: "Advanced JavaScript Development",
    description: "Master modern JavaScript concepts and frameworks...",
    instructor: "John Doe",
    price: 99.99,
    duration: "8 weeks",
    level: "Advanced",
    category: "Programming",
    thumbnailUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: "2",
    title: "Data Science Fundamentals",
    description: "Learn the basics of data science and machine learning...",
    instructor: "Jane Smith",
    price: 149.99,
    duration: "12 weeks",
    level: "Intermediate",
    category: "Data Science",
    thumbnailUrl: "https://via.placeholder.com/300x200",
  },
  // Add more mock courses as needed
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [level, setLevel] = useState("");

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !category || course.category === category;
    const matchesLevel = !level || course.level === level;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Enhance Your Skills
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Browse our collection of courses and start learning today
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
                Search Courses
              </label>
              <input
                type="text"
                id="search"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                placeholder="Course title or keywords"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="category"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Programming">Programming</option>
                <option value="Data Science">Data Science</option>
                <option value="Design">Design</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-gray-700"
              >
                Level
              </label>
              <select
                id="level"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>

        {/* Course Listings */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="overflow-hidden rounded-lg bg-white shadow"
            >
              <img
                src={course.thumbnailUrl}
                alt={course.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {course.title}
                    </h2>
                    <p className="text-gray-600">{course.instructor}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-indigo-600">
                      ${course.price}
                    </p>
                    <p className="text-sm text-gray-500">{course.duration}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="line-clamp-2 text-gray-700">
                    {course.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800">
                      {course.level}
                    </span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                      {course.category}
                    </span>
                  </div>
                  <button className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700">
                    Enroll Now
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
