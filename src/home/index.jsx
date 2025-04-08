import Header2 from '@/components/custom/Header2';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <Header2 />
      <div className="text-center py-20 px-4 max-w-4xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl font-bold text-gray-800 font-cursive"
        >
          <h1>Build Smart Resumes with AI in Minutes ✨</h1>
        </motion.div>

        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
          className="text-lg sm:text-xl text-gray-600 mt-6 font-light font-cursive"
        >
          Create professional resumes effortlessly with smart AI suggestions and modern templates tailored to you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5, ease: 'easeOut' }}
          className="mt-10 flex justify-center gap-4">

          <Link to={"/auth/sign-in"}>
            <motion.a
              href="/signup"
              whileHover={{ scale: 1.1 }}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-full shadow-lg font-medium">
              Get Started
            </motion.a>
          </Link>

          <Link to={"/auth/sign-in"}>
            <motion.a
              href="/login"
              whileHover={{ scale: 1.1 }}
              className="px-8 py-3 border border-blue-600 text-blue-600 rounded-full shadow-lg font-medium">
              Login
            </motion.a>
          </Link>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
          className="mt-16">
          <img
            src="https://t3.ftcdn.net/jpg/02/08/75/34/360_F_208753444_wxbyQdNk3HptqXepy0bW32KUvqh1jZ7V.jpg"
            alt="AI Resume Builder Illustration"
            className="rounded-xl shadow-2xl h-15 w-full"/>
        </motion.div>
      </div>
    </div>
  );
}

export default Home;
