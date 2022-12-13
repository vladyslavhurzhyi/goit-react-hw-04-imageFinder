import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  imagesData: data,
  showModal,
  getLargeImg,
}) => {
  return data.map(item => {
    return (
      <GalleryItem key={item.id}>
        <GalleryItemImage
          src={item.webformatURL}
          onClick={() => {
            getLargeImg(item.largeImageURL);
            showModal();
          }}
        />
      </GalleryItem>
    );
  });
};
