import { motion } from 'framer-motion';
import { TrendingUp, Users, Star, Award } from 'lucide-react';

interface ProofChip {
  icon?: 'trending' | 'users' | 'star' | 'award';
  label: string;
  value: string;
}

interface ProofChipsProps {
  chips: ProofChip[];
  className?: string;
}

const iconMap = {
  trending: TrendingUp,
  users: Users,
  star: Star,
  award: Award
};

export function ProofChips({ chips, className = '' }: ProofChipsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className={`flex flex-wrap gap-3 justify-center ${className}`}
    >
      {chips.map((chip, index) => {
        const IconComponent = chip.icon ? iconMap[chip.icon] : null;
        return (
          <motion.div
            key={index}
            variants={chipVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full border border-primary/20"
          >
            {IconComponent && <IconComponent className="h-4 w-4" />}
            <span className="text-sm font-medium">{chip.value}</span>
            <span className="text-xs opacity-75">{chip.label}</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
