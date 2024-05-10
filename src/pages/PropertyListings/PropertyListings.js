import { useState, useEffect } from "react";
import Property from "./Property";
import getLocalStorageValue from "./getLocalStorageValue";

// Localstorage keys
const favoritesLSKey = "simplyrets.favorites";
const propertiesLSKey = "simplyrets.properties";

export default function PropertyListings() {
    useEffect(
        () => {
            document.title = "Property Listings";
        },
        [],
    );

    const [properties, setProperties] = useState([]);

    // Store a set of favorite properties
    const [favorites, setFavorites] = useState(
        new Set(getLocalStorageValue(favoritesLSKey, new Set())),
    );

    // Write favorites to local storage
    useEffect(
        () => {
            localStorage.setItem(
                favoritesLSKey,
                JSON.stringify([...favorites.keys()]),
            );
        },
        [favorites],
    );

    // Make a GET request to get properties
    // Try to use the value in local storage if one exists
    useEffect(
        () => {
            const lsValue = getLocalStorageValue(propertiesLSKey, -1);
            if (lsValue !== -1) {
                setProperties(lsValue);
                return;
            }

            fetch(
                "https://api.simplyrets.com/properties",
                {
                    method: "GET",
                    headers: {
                        "Authorization": "Basic " + btoa("simplyrets:simplyrets"),
                    },
                },
            )
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem(
                        propertiesLSKey,
                        JSON.stringify(data),
                    );

                    setProperties(data);
                });
        },
        [],
    );

    return (
        <>
            <div
                style={{
                    position: "sticky",
                    top: "0px",
                    padding: "20px",
                    fontSize: "24px",
                    backgroundColor: "#f4f4f4",
                    zIndex: "100",
                }}
            >
                Property Listings
            </div>
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    padding: "0px 0px 40px 20px"
                }}
            >
                {properties.map((p) => (
                    <Property
                        favorite={favorites.has(p.mlsId)}
                        property={p}
                        setFavorites={setFavorites}
                    />
                ))}
            </div>
        </>
    );
}
