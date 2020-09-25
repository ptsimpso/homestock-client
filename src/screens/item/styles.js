import { StyleService } from '@ui-kitten/components';

export default StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 4,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    textAlign: 'center',
    color: '#888',
  },
  input: {
    marginBottom: 10,
  },
  submitButton: {
    height: 50,
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
