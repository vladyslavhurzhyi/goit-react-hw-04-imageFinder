import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ imagesData: data }) => {
  return data.map(item => {
    return (
      <GalleryItem key={item.id}>
        <GalleryItemImage src={item.webformatURL} alt={item.webformatURL} />
      </GalleryItem>
    );
  });
};
