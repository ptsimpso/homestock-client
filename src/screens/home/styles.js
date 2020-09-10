import { StyleService } from '@ui-kitten/components';

export default StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  placeholderContainer: {
    flex: 1,
    paddingTop: 80,
  },
  placeholderButton: {
    height: 50,
    marginTop: 50,
  },
});
