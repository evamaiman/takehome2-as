import { useMemo } from "react";
import heartFill from "../../assets/heart-fill.svg";
import heartStroke from "../../assets/heart-stroke.svg";

export default function Property(props) {
    const {
        favorite,
        property,
        setFavorites,
    } = props;

    const details = useMemo(() => {
        // Bedrooms, bathrooms, and squarefeet
        const info = `${property.property.bedrooms} BR | `
            + `${property.property.bathsFull + property.property.bathsHalf * 0.5} Bath | `
            + `${property.property.area} Sq Ft`;

        // The price, formatted
        const price = property.listPrice.toLocaleString(
            "en",
            {   
                currency: "USD",
                maximumFractionDigits: 0,
                style: "currency",
            },  
        );  

        // Full address
        const address = property.address.full;

        // Listed date
        const listDate = new Date(property.listDate);
        const month = listDate.getMonth() + 1;
        const date = listDate.getDate();
        const year = listDate.getFullYear().toString().substr(-2);

        const dateString = `Listed: ${month}/${date}/${year}`;

        return [info, price, address, dateString];
    }, [property]);

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                padding: "40px 0px 0px 40px",
            }}
        >
            <div
                style={{
                    paddingBottom: "20px",
                }}
            >
                <img
                    alt={`img-${property.address.full}`}
                    height={250}
                    width={300}
                    src={property.photos[0]}
                />
                <img
                    alt="favorite-icon"
                    style={{
                        cursor: "pointer",
                        position: "relative",
                        right: "40px",
                        bottom: "100px",
                    }}
                    onClick={() => {
                        setFavorites((prev) => {
                            const copy = new Set(prev);
                            if (prev.has(property.mlsId)) {
                                copy.delete(property.mlsId);
                            } else {
                                copy.add(property.mlsId);
                            }
                            return copy;
                        });
                    }}
                    src={favorite ? heartFill : heartStroke}
                />
            </div>
            <div
                style={{
                    fontSize: "14px",
                }}
            >
                <b>{details[0]}</b>
            </div>
            <div
                style={{
                    fontSize: "20px",
                }}
            >
                <b>{details[1]}</b>
            </div>
            <div
                style={{
                    fontSize: "12px",
                }}
            >
                <b>{details[2]}</b>
            </div>
            <div
                style={{
                    color: "grey",
                    fontSize: "12px",
                }}
            >
                <b>{details[3]}</b>
            </div>
        </div>
    );
}
