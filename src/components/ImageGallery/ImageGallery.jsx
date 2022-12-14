import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <Gallery>
      <ImageGalleryItem imagesData={images} showModal={openModal} />
    </Gallery>
  );
};
