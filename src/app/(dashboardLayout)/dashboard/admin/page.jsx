import { Card } from "@heroui/react";
import {
  FaUsers,
  FaBookOpen,
  FaCrown,
  FaLayerGroup,
} from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      value: 120,
      icon: <FaUsers className="text-3xl text-blue-500" />,
    },
    {
      title: "Total Recipes",
      value: 350,
      icon: <FaBookOpen className="text-3xl text-green-500" />,
    },
    {
      title: "Premium Users",
      value: 25,
      icon: <FaCrown className="text-3xl text-yellow-500" />,
    },
    {
      title: "Categories",
      value: 12,
      icon: <FaLayerGroup className="text-3xl text-red-500" />,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">{item.title}</p>
                <h2 className="text-3xl font-bold mt-2">
                  {item.value}
                </h2>
              </div>

              <div>{item.icon}</div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}