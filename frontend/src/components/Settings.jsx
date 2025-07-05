import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Volume2, 
  Moon, 
  Sun, 
  Shield, 
  BookOpen, 
  Target,
  Save,
  X,
  Trophy
} from 'lucide-react';
import { Button } from './ui/button';

export default function Settings({ 
  userName, 
  onBack, 
  theme, 
  setTheme,
  onUpdateUserName 
}) {
  const [settings, setSettings] = useState({
    // User preferences
    displayName: userName || '',
    age: localStorage.getItem('userAge') || '',
    currentClass: localStorage.getItem('currentClass') || 'primary3',
    
    // App settings
    soundEnabled: localStorage.getItem('soundEnabled') !== 'false',
    notificationsEnabled: localStorage.getItem('notificationsEnabled') !== 'false',
    autoTheme: localStorage.getItem('autoTheme') !== 'false',
    
    // Learning preferences
    favoriteSubjects: JSON.parse(localStorage.getItem('favoriteSubjects') || '["primary3", "primary4"]'),
    difficultyLevel: localStorage.getItem('difficultyLevel') || 'medium',
    dailyGoal: localStorage.getItem('dailyGoal') || '30',
    
    // Achievement settings
    showAchievements: localStorage.getItem('showAchievements') !== 'false',
    achievementNotifications: localStorage.getItem('achievementNotifications') !== 'false',
    
    // Privacy settings
    dataCollection: localStorage.getItem('dataCollection') !== 'false',
    progressSharing: localStorage.getItem('progressSharing') !== 'false'
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [showSaveMessage, setShowSaveMessage] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    // Save to localStorage
    Object.entries(settings).forEach(([key, value]) => {
      if (typeof value === 'object') {
        localStorage.setItem(key, JSON.stringify(value));
      } else {
        localStorage.setItem(key, value);
      }
    });

    // Update parent component if name changed
    if (settings.displayName !== userName) {
      onUpdateUserName(settings.displayName);
    }

    // Show save message
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 2000);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'app', label: 'App Settings', icon: Bell },
    { id: 'learning', label: 'Learning', icon: BookOpen },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'privacy', label: 'Privacy', icon: Shield }
  ];

  const subjects = [
    { id: 'nursery1', label: 'Nursery 1', emoji: '👶' },
    { id: 'nursery2', label: 'Nursery 2', emoji: '👧' },
    { id: 'primary1', label: 'Primary 1', emoji: '📚' },
    { id: 'primary2', label: 'Primary 2', emoji: '📖' },
    { id: 'primary3', label: 'Primary 3', emoji: '📝' },
    { id: 'primary4', label: 'Primary 4', emoji: '✏️' },
    { id: 'primary5', label: 'Primary 5', emoji: '🎓' },
    { id: 'primary6', label: 'Primary 6', emoji: '🏆' }
  ];

  const nigerianClasses = [
    { id: 'nursery1', label: 'Nursery 1', description: 'Ages 3-4 years', emoji: '👶' },
    { id: 'nursery2', label: 'Nursery 2', description: 'Ages 4-5 years', emoji: '👧' },
    { id: 'primary1', label: 'Primary 1', description: 'Ages 5-6 years', emoji: '📚' },
    { id: 'primary2', label: 'Primary 2', description: 'Ages 6-7 years', emoji: '📖' },
    { id: 'primary3', label: 'Primary 3', description: 'Ages 7-8 years', emoji: '📝' },
    { id: 'primary4', label: 'Primary 4', description: 'Ages 8-9 years', emoji: '✏️' },
    { id: 'primary5', label: 'Primary 5', description: 'Ages 9-10 years', emoji: '🎓' },
    { id: 'primary6', label: 'Primary 6', description: 'Ages 10-11 years', emoji: '🏆' }
  ];

  const difficultyLevels = [
    { id: 'easy', label: 'Easy', description: 'Take your time' },
    { id: 'medium', label: 'Medium', description: 'Just right' },
    { id: 'hard', label: 'Hard', description: 'Challenge yourself' }
  ];

  return (
    <motion.div 
      className="min-h-screen bg-white dark:bg-gray-900 pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1 
              className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Settings
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-300"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Customize your learning experience! ⚙️
            </motion.p>
          </div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2"
          >
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button 
              onClick={handleSave}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
          </motion.div>
        </div>

        {/* Save Message */}
        {showSaveMessage && (
          <motion.div
            className="fixed top-24 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <span>✓ Settings saved!</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSaveMessage(false)}
              className="text-white hover:text-white/80"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div 
          className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Profile Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={settings.displayName}
                    onChange={(e) => handleSettingChange('displayName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    value={settings.age}
                    onChange={(e) => handleSettingChange('age', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your age"
                    min="3"
                    max="18"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Current Class Level
                  </label>
                  <select
                    value={settings.currentClass}
                    onChange={(e) => handleSettingChange('currentClass', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {nigerianClasses.map(classLevel => (
                      <option key={classLevel.id} value={classLevel.id}>
                        {classLevel.emoji} {classLevel.label} - {classLevel.description}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'app' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">App Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Sound Effects</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Play sounds during learning</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('soundEnabled', !settings.soundEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.soundEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get learning reminders</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('notificationsEnabled', !settings.notificationsEnabled)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.notificationsEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {theme === 'dark' ? <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" /> : <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />}
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Theme</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Light or dark mode</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {theme === 'dark' ? 'Dark' : 'Light'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Learning Preferences</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Favorite Class Levels
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {nigerianClasses.map(classLevel => (
                      <label key={classLevel.id} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={settings.favoriteSubjects.includes(classLevel.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleSettingChange('favoriteSubjects', [...settings.favoriteSubjects, classLevel.id]);
                            } else {
                              handleSettingChange('favoriteSubjects', settings.favoriteSubjects.filter(id => id !== classLevel.id));
                            }
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {classLevel.emoji} {classLevel.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={settings.difficultyLevel}
                    onChange={(e) => handleSettingChange('difficultyLevel', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {difficultyLevels.map(level => (
                      <option key={level.id} value={level.id}>
                        {level.label} - {level.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Daily Learning Goal (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.dailyGoal}
                    onChange={(e) => handleSettingChange('dailyGoal', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="10"
                    max="120"
                    step="5"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Achievement Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Show Achievements</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Display achievement badges and progress</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('showAchievements', !settings.showAchievements)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.showAchievements ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.showAchievements ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Achievement Notifications</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when you earn new badges</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('achievementNotifications', !settings.achievementNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.achievementNotifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.achievementNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <p className="text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Achievement Info:</strong> Earn badges by completing lessons, maintaining study streaks, and achieving high scores!
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Privacy Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Data Collection</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Help improve learning by sharing progress data</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('dataCollection', !settings.dataCollection)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.dataCollection ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.dataCollection ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Progress Sharing</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Share achievements with family</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSettingChange('progressSharing', !settings.progressSharing)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.progressSharing ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.progressSharing ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Privacy Note:</strong> We care about your privacy. All data is stored locally on your device and is never shared without your permission.
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
} 