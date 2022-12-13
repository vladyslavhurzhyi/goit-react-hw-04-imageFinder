import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ images, openModal, getLargeImg }) => {
  return (
    <Gallery>
      <ImageGalleryItem
        imagesData={images}
        showModal={openModal}
        getLargeImg={getLargeImg}
      />
    </Gallery>
  );
};
