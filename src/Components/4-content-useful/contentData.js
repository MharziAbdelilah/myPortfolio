import { BiCodeAlt } from 'react-icons/bi';
import { BsDatabaseFill } from 'react-icons/bs';
import { AiOutlineCloudServer } from 'react-icons/ai';
import { MdOutlineDesignServices } from 'react-icons/md';

export const contentData = [
  {
    id: 1,
    title: 'Frontend Development',
    description: 'Master modern frontend development with React, Next.js, and cutting-edge UI/UX practices. Learn responsive design, state management, and performance optimization.',
    Icon: BiCodeAlt,
    link: '#',
    category: 'Development',
    color: '#4A90E2'
  },
  {
    id: 2,
    title: 'Backend Architecture',
    description: 'Deep dive into backend development with Node.js, Express, and database design. Learn API development, authentication, and scalable architectures.',
    Icon: BsDatabaseFill,
    category: 'Architecture',
    color: '#50C878'
  },
  {
    id: 3,
    title: 'DevOps Practices',
    description: 'Learn modern DevOps practices including CI/CD, Docker, Kubernetes, and cloud deployment. Master automation and infrastructure as code.',
    Icon: AiOutlineCloudServer,
    category: 'Infrastructure',
    color: '#FF6B6B'
  },
  {
    id: 4,
    title: 'UI/UX Design',
    description: 'Create stunning user interfaces with modern design principles. Master Figma, design systems, and user experience best practices.',
    Icon: MdOutlineDesignServices,
    category: 'Design',
    color: '#9B59B6'
  }
]; 