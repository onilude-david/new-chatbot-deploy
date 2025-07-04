import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const StorybookStore = ({ onStorySelect, onClose }) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ""}/api/stories`);
      const data = await response.json();
      setStories(data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStorySelect = (story) => {
    onStorySelect(story);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-lg font-semibold text-gray-700">Loading our wonderful stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-4 border-purple-200">
        {/* Store Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <span className="text-4xl mr-3">📚</span>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Lantern Books Store
            </h2>
            <span className="text-4xl ml-3">✨</span>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            Welcome to our magical bookstore! Choose a story to read together.
          </p>
          <Button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            Close Store
          </Button>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="bg-white hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300 cursor-pointer border-2 border-purple-200 hover:border-purple-400 shadow-lg hover:shadow-xl transform hover:scale-105"
              onClick={() => handleStorySelect(story)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold text-purple-700 flex items-center">
                  <span className="text-2xl mr-2">📖</span>
                  {story.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-semibold mr-2">Author:</span>
                  {story.author}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-semibold mr-2">Age:</span>
                  {story.ageGroup}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="font-semibold mr-2">Duration:</span>
                  {story.duration}
                </div>
                <div className="text-sm text-gray-700 leading-relaxed">
                  {story.summary}
                </div>
                <div className="flex flex-wrap gap-1 mt-3">
                  {story.themes.map((theme, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs rounded-full font-medium"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                  Read This Story 📚
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Store Footer */}
        <div className="text-center mt-8 pt-6 border-t-2 border-purple-200">
          <p className="text-gray-600">
            <span className="text-2xl mr-2">🌟</span>
            Each story is carefully crafted to inspire, educate, and entertain!
            <span className="text-2xl ml-2">🌟</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default StorybookStore; 