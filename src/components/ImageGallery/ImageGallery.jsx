import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = images => {
  return (
    <Gallery>
      <ImageGalleryItem imagesData={images.images} />
    </Gallery>
  );
};
