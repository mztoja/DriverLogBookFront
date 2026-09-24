import React from "react";
import {FriendCargoInterface, FriendPositionInterface, userLangEnum} from "types";
import {friends as friendsTxt} from "../../assets/txt/friends";
import {formatDate} from "../../utils/formats/formatDate";

interface Props {
    lang: userLangEnum;
    position: FriendPositionInterface | null;
    cargo: FriendCargoInterface | null;
}

// Blok "Ostatnia pozycja" + "Cel" — identyczny dla znajomego i dla nas samych, na mapie
// (PlacesMap) i na liście znajomych (FriendsList), więc wydzielony zamiast powielony.
export const FriendPositionInfo = (props: Props) => (
    <>
        <div className="PlacesMap__category">
            {friendsTxt[props.lang].lastPositionLabel}
        </div>
        <div className="PlacesMap__address">
            {props.position
                ? `${formatDate(props.position.date, props.lang)} - ` +
                    `${props.position.placeName}` +
                    `${props.position.city ? ' - ' + props.position.city : ''}`
                : friendsTxt[props.lang].noPosition}
        </div>
        <br/>
        <div className="PlacesMap__category">
            {friendsTxt[props.lang].currentCargoLabel}
        </div>
        {props.cargo && (props.cargo.targetPlace || props.cargo.destinations.length > 0)
            ? (
                <>
                    {props.cargo.targetPlace && (
                        <div className="PlacesMap__address">
                            {friendsTxt[props.lang].targetPlaceLabel}: {props.cargo.targetPlace}
                        </div>
                    )}
                    {props.cargo.destinations.length > 0 && (
                        <div className="PlacesMap__address">
                            {friendsTxt[props.lang].loadDestinationsLabel}: {props.cargo.destinations.join(', ')}
                        </div>
                    )}
                </>
            )
            : <div className="PlacesMap__address">{friendsTxt[props.lang].noActiveTour}</div>
        }
    </>
);
