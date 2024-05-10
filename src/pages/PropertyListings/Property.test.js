import { render } from '@testing-library/react';
import Property from './Property';

const testProperty = {
    listPrice: 123456,
    property: {
        bedrooms: 1,
        bathsFull: 1,
        bathsHalf: 1,
        area: 100,
    },
    photos: ["test.png"],
    address: {
        full: "Test street",
    },
    listDate: "2011-05-23T18:50:30.184391Z",
};

test('renders text', () => {
    const { getByText } = render(
        <Property
            favorite
            property={testProperty}
            setFavorites={() => {}}
        />
    );
  
    expect(getByText("1 BR | 1.5 Bath | 100 Sq Ft")).toBeInTheDocument();
    expect(getByText("$123,456")).toBeInTheDocument();
    expect(getByText("Test street")).toBeInTheDocument();
    expect(getByText("Listed: 5/23/11")).toBeInTheDocument();
});

