import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Настраиваем оптимизацию изображений
  images: {
    // Разрешаем использовать качество 90 и 100 для красивых рендеров
    qualities: [25, 50, 75, 90, 100], 
  },
};

export default nextConfig;