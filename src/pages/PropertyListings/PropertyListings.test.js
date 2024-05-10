import { render, waitFor } from '@testing-library/react';
import PropertyListings from './PropertyListings';

jest.mock("./Property", () => () => "property");

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

global.fetch = () =>
    Promise.resolve({
        json: () => Promise.resolve([testProperty]),
    });

test('renders properties', async () => {
    const { getByText } = render(
        <PropertyListings />
    );
  
    await waitFor(() => {
        expect(getByText("Property Listings")).toBeInTheDocument();
        expect(getByText("property")).toBeInTheDocument();
    });
});

