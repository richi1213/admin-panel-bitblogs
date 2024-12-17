import React from 'react';
import { Avatar } from 'antd';
import { ProfileAvatarProps } from '@/components/layouts/default/components/ui/user-menu/types';
import { getInitials } from '@/utils/string-formatter';

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  avatarUrl,
  name,
  size = 'medium',
  className,
}) => {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 64,
    extraLarge: 80,
  };

  const avatarSize = sizeMap[size];

  const defaultImage = 'https://github.com/shadcn.png';

  return (
    <Avatar
      src={avatarUrl || defaultImage}
      alt={name}
      size={avatarSize}
      className={className}
    >
      {!avatarUrl && getInitials(name)}
      {/* Fallback to initials if no avatar */}
    </Avatar>
  );
};
