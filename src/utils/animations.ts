import { Variants } from 'framer-motion';

// 基本的なフェードインアニメーション
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 }
  }
};

// 下から上へのスライドアップアニメーション
export const slideUp: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

// 上から下へのスライドダウンアニメーション
export const slideDown: Variants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

// 左からのスライドインアニメーション
export const slideInLeft: Variants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

// 右からのスライドインアニメーション
export const slideInRight: Variants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

// スケールアップアニメーション
export const scaleUp: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
      duration: 0.6
    }
  }
};

// スタガーアニメーション（子要素を連続して表示）のための遅延設定
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

// Amelioのロゴの水滴をイメージしたアニメーション
export const dropAnimation: Variants = {
  hidden: { y: -30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
      duration: 0.8
    }
  }
};

// ホバー時のアニメーション
export const hoverScale = {
  hover: {
    scale: 1.05,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

// ボタンホバー時のアニメーション
export const buttonHover = {
  hover: {
    scale: 1.05,
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  },
  tap: {
    scale: 0.95
  }
};

// スクロールトリガーのオプション
export const scrollAnimationOptions = {
  once: true,
  threshold: 0.2
};

// サービスカードのスタガーアニメーション
export const serviceCardContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const serviceCard: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    y: -10,
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

// ポートフォリオアイテムのアニメーション
export const portfolioItem: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  },
  hover: {
    scale: 1.03,
    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.15)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10
    }
  }
};

// 波紋エフェクトアニメーション
export const rippleEffect: Variants = {
  tap: (custom) => ({
    background: [
      'radial-gradient(circle at center, rgba(0, 102, 204, 0.5) 0%, rgba(0, 102, 204, 0) 0%)',
      'radial-gradient(circle at center, rgba(0, 102, 204, 0.5) 20%, rgba(0, 102, 204, 0) 70%)',
      'radial-gradient(circle at center, rgba(0, 102, 204, 0) 100%, rgba(0, 102, 204, 0) 100%)'
    ],
    transition: {
      duration: 0.8,
      times: [0, 0.5, 1]
    }
  })
};