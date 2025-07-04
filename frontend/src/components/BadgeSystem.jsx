import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Target, BookOpen, Clock, MessageSquare, Award } from 'lucide-react';
import { Button } from './ui/button';

export default function BadgeSystem({ totalMessages, studySessions, characterName, onBadgeEarned }) {
  const [badges, setBadges] = useState([]);
  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [newBadge, setNewBadge] = useState(null);

  const badgeDefinitions = [
    {
      id: 'first_message',
      name: 'First Steps',
      description: 'Sent your first message',
      icon: '💬',
      requirement: 1,
      type: 'message'
    },
    {
      id: 'conversation_starter',
      name: 'Conversation Starter',
      description: 'Sent 10 messages',
      icon: '🗣️',
      requirement: 10,
      type: 'message'
    },
    {
      id: 'chat_master',
      name: 'Chat Master',
      description: 'Sent 50 messages',
      icon: '👑',
      requirement: 50,
      type: 'message'
    },
    {
      id: 'study_beginner',
      name: 'Study Beginner',
      description: 'Completed 1 study session',
      icon: '📚',
      requirement: 1,
      type: 'session'
    },
    {
      id: 'study_regular',
      name: 'Study Regular',
      description: 'Completed 5 study sessions',
      icon: '📖',
      requirement: 5,
      type: 'session'
    },
    {
      id: 'study_expert',
      name: 'Study Expert',
      description: 'Completed 20 study sessions',
      icon: '🎓',
      requirement: 20,
      type: 'session'
    },
    {
      id: 'math_whiz',
      name: 'Math Whiz',
      description: 'Learned with Math tutor',
      icon: '🔢',
      requirement: 1,
      type: 'subject',
      subject: 'math'
    },
    {
      id: 'science_explorer',
      name: 'Science Explorer',
      description: 'Learned with Science tutor',
      icon: '🔬',
      requirement: 1,
      type: 'subject',
      subject: 'science'
    },
    {
      id: 'word_wizard',
      name: 'Word Wizard',
      description: 'Learned with English tutor',
      icon: '📝',
      requirement: 1,
      type: 'subject',
      subject: 'english'
    },
    {
      id: 'history_buff',
      name: 'History Buff',
      description: 'Learned with History tutor',
      icon: '🏛️',
      requirement: 1,
      type: 'subject',
      subject: 'history'
    },
    {
      id: 'daily_streak_3',
      name: '3-Day Streak',
      description: 'Studied for 3 days in a row',
      icon: '🔥',
      requirement: 3,
      type: 'streak'
    },
    {
      id: 'daily_streak_7',
      name: 'Week Warrior',
      description: 'Studied for 7 days in a row',
      icon: '⚡',
      requirement: 7,
      type: 'streak'
    },
    {
      id: 'game_champion',
      name: 'Game Champion',
      description: 'Scored 20+ in mini game',
      icon: '🎮',
      requirement: 20,
      type: 'game'
    }
  ];

  // Check for new badges
  useEffect(() => {
    const earnedBadges = [];
    
    badgeDefinitions.forEach(badge => {
      const alreadyEarned = badges.find(b => b.id === badge.id);
      if (!alreadyEarned) {
        let earned = false;
        
        switch (badge.type) {
          case 'message':
            earned = totalMessages >= badge.requirement;
            break;
          case 'session':
            earned = studySessions >= badge.requirement;
            break;
          case 'subject':
            // This would need to be tracked separately
            earned = false;
            break;
          case 'streak':
            // This would need to be tracked separately
            earned = false;
            break;
          case 'game':
            // This would need to be tracked separately
            earned = false;
            break;
        }
        
        if (earned) {
          earnedBadges.push(badge);
        }
      }
    });
    
    if (earnedBadges.length > 0) {
      const latestBadge = earnedBadges[0];
      setNewBadge(latestBadge);
      setShowBadgeModal(true);
      setBadges(prev => [...prev, latestBadge]);
      onBadgeEarned?.(latestBadge);
    }
  }, [totalMessages, studySessions, badges, onBadgeEarned]);

  return (
    <>
      {/* Badge Display */}
      <div className="flex flex-wrap gap-2 mb-4">
        {badges.map(badge => (
          <motion.div
            key={badge.id}
            className="flex items-center gap-2 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-800/30 dark:to-orange-800/30 px-3 py-2 rounded-full border-2 border-yellow-200 dark:border-yellow-600"
            whileHover={{ scale: 1.05 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-lg">{badge.icon}</span>
            <div>
              <div className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
                {badge.name}
              </div>
              <div className="text-xs text-yellow-600 dark:text-yellow-400">
                {badge.description}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Badge Earned Modal */}
      <AnimatePresence>
        {showBadgeModal && newBadge && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md mx-4 text-center shadow-2xl border-2 border-yellow-200 dark:border-yellow-600"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
            >
              <motion.div
                className="text-8xl mb-4"
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ duration: 1, repeat: 3, ease: "easeInOut" }}
              >
                {newBadge.icon}
              </motion.div>
              
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">
                🎉 Badge Earned! 🎉
              </h2>
              
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {newBadge.name}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {newBadge.description}
              </p>
              
              <motion.div
                className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg mb-6"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  🏆 Amazing work! Keep learning and earning more badges! 🏆
                </p>
              </motion.div>
              
              <Button
                onClick={() => setShowBadgeModal(false)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                Awesome! 🚀
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 