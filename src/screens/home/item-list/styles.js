import { StyleService } from '@ui-kitten/components';

export default StyleService.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    marginRight: 15,
    borderRadius: 4,
  },
  title: {
    flex: 1,
    marginRight: 10,
  },
  restockIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'color-danger-default',
    marginLeft: 10,
  },
});
