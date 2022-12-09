import type { ImageProps } from 'next/image';
import Image from 'next/image';
import styled from 'styled-components';

export interface ProfileImageProps extends ImageProps {
  size: 'small' | 'medium' | 'large';
}

const imgSize = {
  small: '3.6rem',
  medium: '5.6rem',
  large: '6.4rem',
  xlarge: '8rem',
};

const ProfileImg = ({ size = 'small', alt = 'profile-img', src }: ProfileImageProps) => {
  return (
    <ImageWrapper className="relative" width={imgSize[size]} height={imgSize[size]}>
      <Image
        alt={alt}
        src={src}
        fill
        className="rounded-full"
        sizes="30vw"
        style={{
          objectFit: 'cover',
        }}
      />
    </ImageWrapper>
  );
};

export default ProfileImg;

interface ImageSize {
  width: string;
  height: string;
}

const ImageWrapper = styled.div<ImageSize>`
  ${({ width, height }: ImageSize) => `width: ${width}; height: ${height}`}
`;
