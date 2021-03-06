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
  },
  placeholderButton: {
    height: 50,
    marginTop: 50,
  },
  noItemContainer: {
    padding: 30,
  },
  noItemText: {
    textAlign: 'center',
    marginTop: 50,
  },
  searchInput: {
    marginTop: 10,
  },
});
